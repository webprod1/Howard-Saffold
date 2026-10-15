import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { books } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/books",
    "/legacy",
    "/contact",
    "/privacy",
    ...books.map((b) => `/books/${b.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
