import { PageIntro } from "@/components/editorial";
import { ContactForm } from "@/components/contact-form";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Contact",
  "Contact information and inquiries for Howard Saffold Books.",
  "/contact",
);
export const dynamic = "force-dynamic";
export default function Contact() {
  const enabled = Boolean(
    process.env.CONTACT_TO &&
    process.env.CONTACT_FROM &&
    process.env.RESEND_API_KEY,
  );
  return (
    <>
      <PageIntro
        label="GET IN TOUCH"
        title="Every conversation matters."
        description="For questions about the books, media inquiries, and other correspondence."
      />
      <section className="section container contact-layout">
        <div>
          <p className="eyebrow">CORRESPONDENCE</p>
          <h2>
            Connect with
            <br />
            Howard Saffold Books.
          </h2>
          <p>We welcome your interest in Howard’s writing and legacy.</p>
          <div className="contact-notice">
            <h3>
              {enabled ? "Send an inquiry" : "Contact details forthcoming"}
            </h3>
            <p>
              {enabled
                ? "Complete the form to send your message."
                : "The author’s contact arrangements are being confirmed. Message delivery is currently unavailable. Please check back for updates."}
            </p>
          </div>
        </div>
        <ContactForm enabled={enabled} />
      </section>
    </>
  );
}
