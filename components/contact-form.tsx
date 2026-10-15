"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function ContactForm({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const started = useRef(0);
  return (
    <form
      className="contact-form"
      onFocus={() => {
        if (!started.current) started.current = Date.now();
      }}
      onSubmit={async (e) => {
        e.preventDefault();
        if (!enabled) {
          setStatus(
            "Message delivery is not yet available. Your message has not been sent.",
          );
          return;
        }
        setSending(true);
        setStatus("Sending your message…");
        const form = e.currentTarget;
        const fields = Object.fromEntries(new FormData(form));
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...fields, started: started.current }),
          });
          const result = (await res.json()) as { message: string };
          setStatus(result.message);
          if (res.ok) {
            form.reset();
            started.current = Date.now();
          }
        } catch {
          setStatus("We could not send your message. Please try again later.");
        } finally {
          setSending(false);
        }
      }}
    >
      <div className="field">
        <label htmlFor="full-name">
          Full name <span>*</span>
        </label>
        <input
          id="full-name"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          placeholder="Your full name"
        />
      </div>
      <div className="field">
        <label htmlFor="email">
          Email address <span>*</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@example.com"
        />
      </div>
      <div className="field">
        <label htmlFor="subject">
          Subject <span>*</span>
        </label>
        <input
          id="subject"
          name="subject"
          required
          minLength={3}
          maxLength={150}
          placeholder="What would you like to discuss?"
        />
      </div>
      <div className="field">
        <label htmlFor="message">
          Message <span>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Write your message…"
        />
      </div>
      <div className="honey" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="form-privacy">
        Your information is used to respond to your inquiry. Read our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
      <button
        className="button navy"
        type="submit"
        disabled={!enabled || sending}
      >
        {sending
          ? "Sending…"
          : enabled
            ? "Send message"
            : "Message delivery coming soon"}
        <ArrowUpRight size={16} />
      </button>
      <p role="status" aria-live="polite" className="form-status">
        {status}
      </p>
    </form>
  );
}
