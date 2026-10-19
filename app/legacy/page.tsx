import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro, LegacyTimeline } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Howard Saffold’s Legacy",
  "Explore Howard Saffold’s service, police career, community advocacy, and writing.",
  "/legacy",
);
export default function Legacy() {
  return (
    <>
      <PageIntro
        label="SERVICE. COMMUNITY. CHANGE."
        title="A legacy of leadership and advocacy."
        description="A life connecting public service, police-community relations, criminal justice reform, and the written word."
      />
      <section className="section container">
        <LegacyTimeline />
        <Link href="/books" className="text-link">
          Explore his writing <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
