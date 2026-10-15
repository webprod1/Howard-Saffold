import { Biography, PageIntro, Closing } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About Howard Saffold",
  "Meet Chicago author Howard Saffold, former police officer, Army veteran, and advocate for police-community relations.",
  "/about",
);
export default function About() {
  return (
    <>
      <PageIntro
        label="ABOUT THE AUTHOR"
        title="A life shaped by service."
        description="From the streets of Chicago to a continuing commitment to community, meet the man behind the words."
      />
      <section className="section container">
        <Biography full />
      </section>
      <Closing />
    </>
  );
}
