import type { Metadata } from "next";
import { Header, Footer } from "@/components/navigation";
import { Motion } from "@/components/motion";
import { siteUrl, jsonLd } from "@/lib/seo";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Howard Saffold Books",
    template: "%s | Howard Saffold Books",
  },
  description: "The writings and legacy of Chicago author Howard Saffold.",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  url: siteUrl,
                  name: "Howard Saffold Books",
                },
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#author`,
                  name: "Howard Saffold",
                  url: `${siteUrl}/about`,
                  birthDate: "1941",
                  birthPlace: { "@type": "Place", name: "Chicago, Illinois" },
                  jobTitle: "Author",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
