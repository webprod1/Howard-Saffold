import Link from "next/link";
import { assetPath } from "@/lib/assets";
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, MapPin } from "lucide-react";
import { author, milestones, type Book } from "@/lib/content";
import { ShareBook } from "./share-book";
export function BookCover({
  book,
  large = false,
}: {
  book: Book;
  large?: boolean;
}) {
  return (
    <div
      className={`book-object ${large ? "large" : ""} ${book.cover ? "has-cover" : ""}`}
      style={book.spine ? { "--book-spine": `url("${assetPath(book.spine)}")` } as CSSProperties : undefined}
      aria-label={`${book.title} by ${book.author}${book.cover ? "" : " — placeholder cover"}`}
    >
      {book.cover ? (
        <Image
          src={assetPath(book.cover)}
          alt={`Cover of ${book.title} by ${book.author}`}
          width={600}
          height={900}
          sizes="(max-width: 580px) 240px, (max-width: 1100px) 260px, 320px"
          priority={large}
        />
      ) : (
        <div className="cover-placeholder">
          <div className="cover-border" />
          <div className="cover-topline">A LIFETIME OF PERSPECTIVE</div>
          <div className="cover-emblem">
            <BookOpen size={26} strokeWidth={1} />
          </div>
          <div className="cover-title">
            POLICE,
            <br />
            PRISONS,
            <br />
            POLITICS
            <br />
            <i>&</i> POWER
          </div>
          <div className="cover-rule" />
          <div className="cover-author">
            HOWARD
            <br />
            SAFFOLD
          </div>
          <div className="cover-bottom">COVER ART FORTHCOMING</div>
        </div>
      )}
    </div>
  );
}
export function BookFeature({
  book,
  detail = false,
}: {
  book: Book;
  detail?: boolean;
}) {
  return (
    <div className="book-feature">
      <div className="book-feature-art reveal">
        <span className="background-letter" aria-hidden="true">
          P
        </span>
        <BookCover book={book} />
        <span className="placeholder-note">
          {book.cover
            ? ""
            : "Illustrative cover placeholder · Official artwork forthcoming"}
        </span>
      </div>
      <div className="book-feature-copy reveal">
        <p className="eyebrow">
          {detail ? "BY HOWARD SAFFOLD" : "THE FEATURED BOOK"}{" "}
          <span className="year-chip">{book.year}</span>
        </p>
        <h2>{book.title}</h2>
        <p className="book-byline">By Howard Saffold</p>
        <div className="small-rule" />
        {book.description ? (
          <p>{book.description}</p>
        ) : (
          <>
            <p>
              A book by Howard Saffold, whose life and work span military
              service, Chicago law enforcement, and community advocacy.
            </p>
            <p className="muted">
              Explore the publication and available editions on Amazon. An
              author-approved synopsis will be added here.
            </p>
          </>
        )}
        <div className="button-row">
          <a
            href={book.amazon}
            className="button navy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Purchase on Amazon <ArrowUpRight size={17} />
          </a>
          <ShareBook title={book.title} slug={book.slug} />
        </div>
        {!detail && (
          <Link className="text-link book-details" href={`/books/${book.slug}`}>
            Discover the book <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
export function Biography({ full = false }: { full?: boolean }) {
  return (
    <div className="biography">
      <div className="portrait-wrap reveal">
        {author.portrait ? (
          <Image
            className="portrait"
          src={assetPath(author.portrait)}
            alt="Howard Saffold, author and community advocate"
            width={720}
            height={850}
          />
        ) : (
          <div className="portrait-placeholder">
            <span className="portrait-initials">HS</span>
            <div className="portrait-line" />
            <span>HOWARD SAFFOLD</span>
            <small>AUTHOR PORTRAIT FORTHCOMING</small>
          </div>
        )}
        <div className="portrait-label">
          <MapPin size={14} /> CHICAGO, ILLINOIS
        </div>
      </div>
      <div className="bio-copy reveal">
        <p className="eyebrow">THE MAN BEHIND THE WORDS</p>
        <h2>
          Meet Howard
          <br />
          <em>Saffold.</em>
        </h2>
        <p className="lead">
          A Chicago story. A lifetime
          <br className="desktop-break" /> committed to change.
        </p>
        {author.biography.slice(0, full ? 3 : 2).map((p) => (
          <p key={p}>{p}</p>
        ))}
        {full ? (
          <div className="source-note">
            Biographical source:{" "}
            <a href={author.source} target="_blank" rel="noopener noreferrer">
              Positive Anti-Crime Thrust, Inc. <ArrowUpRight size={12} />
            </a>
          </div>
        ) : (
          <Link className="text-link" href="/about">
            Read his story <ArrowRight size={17} />
          </Link>
        )}
      </div>
    </div>
  );
}
export function LegacyTimeline({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "timeline compact" : "timeline"}>
      {(compact
        ? [milestones[0], milestones[2], milestones[4], milestones[5]]
        : milestones
      ).map((m, i) => (
        <article className="timeline-item reveal" key={m.title}>
          <div className="timeline-number">0{i + 1}</div>
          <div className="timeline-dot" />
          <p className="eyebrow">{m.year}</p>
          <h3>{m.title}</h3>
          <p>{m.text}</p>
        </article>
      ))}
    </div>
  );
}
export function Closing() {
  return (
    <section className="closing">
      <div className="container reveal">
        <p className="eyebrow">CONTINUE THE CONVERSATION</p>
        <h2>
          Stories start with a voice.
          <br />
          <em>This is Howard’s.</em>
        </h2>
        <Link href="/books" className="button gold">
          Discover his writing <ArrowRight size={17} />
        </Link>
      </div>
      <span className="closing-mark" aria-hidden="true">
        “
      </span>
    </section>
  );
}
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
export function VerifiedContent({ book }: { book: Book }) {
  if (
    !book.reviews.length &&
    !book.excerpts.length &&
    !book.endorsements.length &&
    !book.upcoming
  )
    return null;
  return (
    <section className="section container">
      <p className="eyebrow">FROM THE BOOK & ITS READERS</p>
      {book.excerpts.map((text, i) => (
        <blockquote key={i}>{text}</blockquote>
      ))}
      {[...book.reviews, ...book.endorsements].map((r, i) => (
        <figure key={i}>
          <blockquote>{r.text}</blockquote>
          <figcaption>
            {r.by} ·{" "}
            <a href={r.source} rel="noopener noreferrer" target="_blank">
              Source
            </a>
          </figcaption>
        </figure>
      ))}
      {book.upcoming && <p>{book.upcoming}</p>}
    </section>
  );
}
