import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Users,
  BookOpen,
} from "lucide-react";
import {
  BookCover,
  BookFeature,
  Biography,
  LegacyTimeline,
  Closing,
  VerifiedContent,
} from "@/components/editorial";
import { books } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Howard Saffold Books | Official Author Website",
  "Explore Howard Saffold Books, discover the author's background in Chicago law enforcement and community advocacy, and learn about Police, Prisons, Politics & Power.",
  "/",
);
export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid container">
          <div className="hero-copy">
            <p className="eyebrow hero-reveal">
              <span /> THE WRITINGS & LEGACY OF HOWARD SAFFOLD
            </p>
            <h1 id="hero-title" className="hero-reveal">
              A life of service.
              <br />A voice for <em>justice.</em>
            </h1>
            <p className="hero-description hero-reveal">
              Discover the writings and legacy of Howard Saffold — author,
              former Chicago police officer, and lifelong advocate for community
              empowerment and criminal justice reform.
            </p>
            <div className="button-row hero-reveal">
              <Link
                className="button gold"
                href="/books/police-prisons-politics-power"
              >
                Explore the Book <ArrowRight size={17} />
              </Link>
              <Link className="text-link light" href="/about">
                Meet the Author <ArrowRight size={17} />
              </Link>
            </div>
            <div className="hero-footnote hero-reveal">
              <span className="tiny-rule" /> CHICAGO ROOTS. A LIFETIME OF
              PERSPECTIVE.
            </div>
          </div>
          <div className="hero-art hero-reveal">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="book-stage" data-parallax>
              <BookCover book={books[0]} large />
            </div>
            <p className="art-caption">
              FEATURED PUBLICATION <span>2026</span>
            </p>
          </div>
        </div>
        <div className="hero-bottom container">
          <a href="#story">
            SCROLL TO DISCOVER <ArrowDown size={14} />
          </a>
          <span>AUTHOR. ADVOCATE. CHICAGOAN.</span>
        </div>
      </section>
      <div className="identity-strip">
        <div className="container">
          <span>
            <ShieldCheck /> A lifetime of public service
          </span>
          <span>
            <Users /> A commitment to community
          </span>
          <span>
            <BookOpen /> A perspective worth reading
          </span>
        </div>
      </div>
      <section className="section container" id="story">
        <Biography />
      </section>
      <section className="book-section section">
        <div className="container">
          <BookFeature book={books[0]} />
        </div>
      </section>
      <section className="section container">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">THE THROUGH LINE</p>
            <h2>
              A legacy of leadership
              <br />
              and advocacy.
            </h2>
          </div>
          <Link className="text-link" href="/legacy">
            Explore his legacy <ArrowRight size={17} />
          </Link>
        </div>
        <LegacyTimeline compact />
      </section>
      <VerifiedContent book={books[0]} />
      <Closing />
    </>
  );
}
