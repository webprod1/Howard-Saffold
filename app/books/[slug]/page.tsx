import { notFound } from "next/navigation";
import {
  BookFeature,
  PageIntro,
  VerifiedContent,
} from "@/components/editorial";
import { books } from "@/lib/content";
import { pageMetadata, siteUrl, jsonLd } from "@/lib/seo";
export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) return {};
  return pageMetadata(
    book.title,
    `Discover ${book.title} by Howard Saffold. Explore the publication and purchase on Amazon.`,
    `/books/${slug}`,
  );
}
export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();
  return (
    <>
      <PageIntro
        label="THE FEATURED PUBLICATION"
        title={book.title}
        description="By Howard Saffold · 2026"
      />
      <section className="section container">
        <BookFeature book={book} detail />
      </section>
      <VerifiedContent book={book} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Book",
            name: book.title,
            author: {
              "@type": "Person",
              "@id": `${siteUrl}/#author`,
              name: book.author,
            },
            url: `${siteUrl}/books/${book.slug}`,
            sameAs: book.amazon,
            inLanguage: "en",
            ...(book.cover ? { image: `${siteUrl}${book.cover}` } : {}),
          }),
        }}
      />
    </>
  );
}
