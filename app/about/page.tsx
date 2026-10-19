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
      <section className="interview-section section">
        <div className="container interview-layout">
          <div>
            <p className="eyebrow">IN HIS OWN WORDS</p>
            <h2>Hear Howard’s story.</h2>
            <p className="interview-description">
              Hear Howard Saffold reflect on his life, public service, and
              commitment to community in the video below.
            </p>
          </div>
          <div>
            <div className="interview-video">
              <iframe
                title="Howard Saffold video on Vimeo"
                src="https://player.vimeo.com/video/1128362191?h=7b4342c4f2"
                width="640"
                height="360"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
              />
            </div>
            <p className="interview-caption">
              Video hosted by Vimeo. If the player is unavailable,{' '}
              <a href="https://player.vimeo.com/video/1128362191?h=7b4342c4f2" target="_blank" rel="noopener noreferrer">
                open the video in a new tab
              </a>.
            </p>
          </div>
        </div>
      </section>
      <Closing />
    </>
  );
}
