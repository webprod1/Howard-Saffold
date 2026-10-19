import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Privacy Policy",
  "How Howard Saffold Books handles information and contact inquiries.",
  "/privacy",
);
export default function Privacy() {
  return (
    <>
      <PageIntro
        label="YOUR INFORMATION"
        title="Privacy Policy"
        description="A clear explanation of how this website handles information."
      />
      <article className="section container prose">
        <h2>Browsing this website</h2>
        <p>
          This website does not add advertising trackers or analytics scripts.
          Embedded video is provided by Vimeo, as described below.
          The hosting provider may process technical request
          information, such as IP addresses and access logs, to deliver and
          protect the website.
        </p>
        <h2>Contact inquiries</h2>
        <p>
          Message delivery is disabled until the author’s receiving address and
          an email provider are configured. While disabled, the contact form
          does not transmit messages. When enabled, the form sends the name,
          email address, subject, and message you provide to the configured
          email service, Resend, so the recipient can respond. Please do not
          include sensitive personal information.
        </p>
        <h2>Browser storage</h2>
        <p>
          The website uses session storage to remember whether you have seen the
          introductory animation. This preference lasts for the browser session
          and does not contain personal information.
        </p>
        <h2>Embedded video</h2>
        <p>
          The About the Author page embeds a Vimeo player. When the player
          loads, your browser connects to Vimeo, which may process request
          information and use cookies or browser storage under its own privacy
          policy. Video playback is controlled by you; it does not autoplay.
        </p>
        <h2>External links</h2>
        <p>
          Amazon and biographical source links take you to independent websites
          with their own privacy policies. Using the share button may open your
          device’s sharing interface or copy the book link to your clipboard.
        </p>
        <h2>Questions and updates</h2>
        <p>
          Contact arrangements are being confirmed. The contact page will
          provide the approved method when available. This policy should be
          reviewed by the site owner before public launch, including a retention
          policy for correspondence and a method for privacy requests.
        </p>
      </article>
    </>
  );
}
