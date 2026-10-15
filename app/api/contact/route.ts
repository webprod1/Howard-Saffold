import { z } from "zod";
export const runtime = "nodejs";
const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0),
  started: z.number().positive(),
});
const response = (message: string, status: number) =>
  Response.json(
    { message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return response("This request is not permitted.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return response("JSON content is required.", 415);
  const reader = request.body?.getReader();
  if (!reader) return response("Please provide a message.", 400);
  let raw = "";
  let size = 0;
  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 16000) {
      // Return without cancelling the transport stream; the host drains it.
      return response("Your message is too large.", 413);
    }
    raw += decoder.decode(value, { stream: true });
  }
  raw += decoder.decode();
  let input;
  try {
    input = schema.safeParse(JSON.parse(raw));
  } catch {
    return response("Please check your form fields.", 400);
  }
  if (!input.success)
    return response("Please check your form fields and try again.", 400);
  const data = input.data;
  const elapsed = Date.now() - data.started;
  if (elapsed < 2500 || elapsed > 86400000)
    return response("Please take a moment and try again.", 429);
  if (
    !process.env.CONTACT_TO ||
    !process.env.CONTACT_FROM ||
    !process.env.RESEND_API_KEY
  )
    return response(
      "Message delivery is not configured. Your message has not been sent.",
      409,
    );
  // Plain text email avoids HTML injection. User input never becomes an address header.
  try {
    const upstream = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [process.env.CONTACT_TO],
        reply_to: data.email,
        subject: `Website inquiry: ${data.subject.replace(/[\r\n]/g, " ")}`,
        text: `From: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!upstream.ok)
      return response(
        "Delivery is temporarily unavailable. Please try again later.",
        502,
      );
    const result = (await upstream.json()) as { id?: string };
    if (!result.id)
      return response(
        "Delivery could not be confirmed. Please try again later.",
        502,
      );
    return response(
      "Your message has been accepted for delivery. Thank you for getting in touch.",
      200,
    );
  } catch {
    return response(
      "Delivery is temporarily unavailable. Please try again later.",
      502,
    );
  }
}


