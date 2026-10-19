export const author = {
  name: "Howard Saffold",
  siteName: "Howard Saffold Books",
  logo: null as string | null,
  portrait: "/images/howard-saffold-portrait.png" as string | null,
  biography: [
    "Howard Saffold was born in Chicago on January 26, 1941. After graduating from Farragut High School in 1959, he entered the U.S. Army, completing his service in 1962.",
    "He joined the Chicago Police Department in 1965. Experiences of discrimination and police misconduct helped shape his commitment to reform. He joined the Afro-American Police League and later became its president.",
    "In 1979, Saffold and Renault Robinson co-founded Positive Anti-Crime Thrust to strengthen cooperation between police and the communities they serve.",
    "Mayor Harold Washington appointed him chief of executive security in 1983. He continued in that role under Mayor Eugene Sawyer.",
    "After retiring from the department in 1991, Saffold returned his focus to Positive Anti-Crime Thrust and community-based crime prevention. His advocacy has included work with community organizations, schools, and prison ministries.",
    "Saffold earned a bachelor’s degree in business administration from Chicago State University and a master’s degree in urban studies from Northeastern Illinois University.",
  ],
  source: "https://www.positiveact.info/howard-saffold-bio/",
  biographyReference: "https://www.thehistorymakers.org/biography/howard-saffold-39",
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
