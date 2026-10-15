import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section container error-page">
      <p className="eyebrow">404 · A PAGE OUT OF PLACE</p>
      <h1>
        Let’s turn to
        <br />
        another chapter.
      </h1>
      <p>The page you’re looking for could not be found.</p>
      <Link href="/" className="button navy">
        Return home
      </Link>
    </section>
  );
}
