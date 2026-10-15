import type { Metadata } from "next";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://howard-saffold-books.michelle-fagan29.chatgpt.site"
).replace(/\/$/, "");
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      title: { absolute: title },
      description,
      url: `${siteUrl}${path}`,
      siteName: "Howard Saffold Books",
      type: "website",
      images: [
        {
          url: `${siteUrl}/social-card.png`,
          width: 1200,
          height: 630,
          alt: "Howard Saffold Books",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: { absolute: title },
      description,
      images: [`${siteUrl}/social-card.png`],
    },
  };
}
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

