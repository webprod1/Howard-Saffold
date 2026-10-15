import {
  PageIntro,
  BookFeature,
  VerifiedContent,
} from "@/components/editorial";
import { books } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Books by Howard Saffold",
  "Discover Police, Prisons, Politics & Power and explore the publications of Chicago author Howard Saffold.",
  "/books",
);
export default function Books() {
  return (
    <>
      <PageIntro
        label="THE BOOKSHELF"
        title="Words with a lifetime behind them."
        description="Explore the publications of Howard Saffold."
      />
      {books.map((book) => (
        <section className="section container" key={book.slug}>
          <BookFeature book={book} />
          <VerifiedContent book={book} />
        </section>
      ))}
    </>
  );
}
