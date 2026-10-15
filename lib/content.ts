export const author = {
  name: "Howard Saffold",
  siteName: "Howard Saffold Books",
  logo: null as string | null,
  portrait: null as string | null,
  biography: [
    "Born in Chicago in 1941, Howard Saffold served in the United States Army before joining the Chicago Police Department in 1965.",
    "During his police career, he became involved with the Afro-American Police League, challenging racial discrimination and misconduct within the department. He later served as its president.",
    "After approximately 25 years of service, he retired from the department. His work in crime prevention, police-community relations, community advocacy, and criminal justice reform continued through Positive Anti-Crime Thrust, Inc.",
  ],
  source: "https://www.positiveact.info/howard-saffold-bio/",
};
export type Book = {
  slug: string;
  title: string;
  author: string;
  year: number;
  amazon: string;
  cover: string | null;
  spine?: string | null;
  description: string | null;
  excerpts: string[];
  reviews: { text: string; by: string; source: string }[];
  endorsements: { text: string; by: string; source: string }[];
  upcoming: string | null;
};
export const books: Book[] = [
  {
    slug: "police-prisons-politics-power",
    title: "Police, Prisons, Politics & Power",
    author: author.name,
    year: 2026,
    amazon:
      "https://www.amazon.com/Police-Prisons-Politics-Howard-Saffold/dp/B0HGQJMW5Q",
    cover: "/images/police-prisons-politics-power-cover.webp",
    spine: "/images/police-prisons-politics-power-spine.webp",
    description: null,
    excerpts: [],
    reviews: [],
    endorsements: [],
    upcoming: null,
  },
];
export const milestones = [
  {
    year: "1941",
    title: "Chicago beginnings",
    text: "Born in Chicago, the city at the heart of his life and work.",
  },
  {
    year: "Before 1965",
    title: "Service to country",
    text: "Served in the United States Army before entering law enforcement.",
  },
  {
    year: "1965",
    title: "A career in public service",
    text: "Joined the Chicago Police Department.",
  },
  {
    year: "During his career",
    title: "A voice within the department",
    text: "Joined the Afro-American Police League and later served as president, advocating against discrimination and misconduct.",
  },
  {
    year: "1991 onward",
    title: "Community at the center",
    text: "Following retirement after approximately 25 years, continued his work in crime prevention and police-community relations through Positive Anti-Crime Thrust, Inc.",
  },
  {
    year: "2026",
    title: "A new chapter in print",
    text: "Police, Prisons, Politics & Power brings Howard Saffold’s name to the bookshelf.",
  },
];
export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About the Author" },
  { href: "/books", label: "Books" },
  { href: "/legacy", label: "Legacy" },
  { href: "/contact", label: "Contact" },
];
