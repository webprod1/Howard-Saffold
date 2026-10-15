# Howard Saffold Books

A complete author website using Next.js App Router, TypeScript, Tailwind CSS, GSAP / ScrollTrigger, Lucide, and local Inter / Playfair Display fonts.

## Run locally

Requires Node 22.13+ and pnpm 11.25.0.

```sh
pnpm install
pnpm dev
```

The default dev/build commands use the Sites Vinext adapter for hosting Next.js App Router source on Cloudflare Workers. `pnpm dev` prints the local preview URL.

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

For standard Next.js hosting (e.g. a Node server or Vercel), use `pnpm build:next`, then `pnpm exec next start`. The App Router pages and API handler work in both builds. The Sites build retains its required Vite/Worker integration.

## Edit content and assets

`lib/content.ts` is the central author / books / timeline data file. Add a book there; the bookshelf, book routes, and sitemap update automatically. Reviews, excerpts, endorsements, and upcoming content render only when their arrays/values have approved content. Do not add unverified claims.

Put approved artwork in `public/images/`, then set `author.logo`, `author.portrait`, and each book's `cover` to the appropriate `/images/...` path. Supplied artwork uses next/image. The logo mark and monogram portrait remain fallbacks. The book uses the supplied official artwork, with front and spine extracted from the full print wrap in public/images.

The organization name Positive Anti-Crime Thrust, Inc. was checked against its own biography: https://www.positiveact.info/howard-saffold-bio/. The supplied phrase P Anti-Crime Trust was corrected. No reviews or endorsements have been invented. The publication year is the supplied 2026 reference; a full publication date, ISBN, editions, prices, and synopsis remain unconfirmed and are omitted from structured data.

## Contact delivery

The form stays disabled and the API returns 409 until all three server environment variables are configured:

- `CONTACT_TO`: approved receiving address
- `CONTACT_FROM`: verified sending address on Resend
- `RESEND_API_KEY`: secret API key

Never use NEXT_PUBLIC_ for secrets or commit a populated environment file. Configure secrets through the hosting provider's runtime environment settings. The contact page renders dynamically to reflect current server configuration.

The handler enforces same-origin JSON requests, streams at most 16KB, validates all fields with Zod, includes a honeypot and timing trap, and sends plain text mail with a fixed sender/recipient. It never reports successful delivery when disabled or when the provider fails. Before enabling a high-traffic public form, configure platform rate limiting or an anti-bot challenge. No message database or analytics is included. Review the privacy policy, data retention, and privacy contact with the owner before public launch.

## SEO and publication

Set `NEXT_PUBLIC_SITE_URL` to the exact public HTTPS domain before building if it changes. The default is the registered Sites origin. Canonicals, Open Graph, Twitter, JSON-LD, sitemap.xml, and robots.txt use this origin. Social preview image is a local 1200x630 PNG. Public content allows indexing; private hosting access still prevents public crawling. Public launch and custom-domain setup require changing hosting access / domain settings intentionally. Add the public domain to Google Search Console and submit `/sitemap.xml` after launch. Indexing and rankings are not guaranteed.

## Accessibility and motion

Semantic pages, skip link, labeled forms, visible focus, active navigation, Escape-to-close mobile menu, secure external links, and live contact/share status messages are included. The 2.05-second intro runs once per browser session, has a 3.2-second removal fallback, never takes focus, and clears on keyboard input. GSAP matchMedia respects reduced motion, and all animation contexts/listeners clean up on navigation. Content is server-rendered and visible without JavaScript.

## Launch items awaiting author approval

- Official logo and author portrait.
- Approved synopsis, publication/edition details, excerpts, and any verified reviews.
- Receiving address, sending domain, and email service credentials.
- Final public domain, public hosting access, privacy contact, and retention terms.

See `QA.md` for verification performed during delivery.

Type checking uses tsconfig.check.json to exclude generated build caches, because Next.js and Vinext generate different route-type files in .next. Stop the development server before switching production build engines.




## GitHub Pages

The public GitHub-hosted website is https://webprod1.github.io/Howard-Saffold/.
Every push to main runs .github/workflows/pages.yml, checks the source, exports the site, and deploys through GitHub Pages.

`pnpm build:pages` builds an isolated snapshot in .pages-build and writes the static export to out. It sets the repository base path for links, artwork, local fonts, metadata, sitemap, and sharing URLs. It excludes server API routes and explicitly disables contact delivery in the exported version. The original server-enabled source is preserved for Node or Sites hosting. GitHub Pages cannot run the email endpoint; enabling contact delivery there requires a separately hosted backend.
