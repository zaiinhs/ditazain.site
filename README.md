# ditazain.site — Personal Website of Zainal Abidin

Personal website & portfolio for **Zainal Abidin**, a Technical Product Specialist at Indivara Group. It presents his work across product delivery, data solutions, and client implementation, alongside selected projects, illustrative SQL/Python examples, MDX articles, and a static profile assistant.

🔗 Live: deployed as a static export to **Cloudflare Pages**.

## Tech Stack

| Area | Tech |
|------|------|
| Framework | Next.js 16 (App Router, `output: "export"`) |
| UI | React 19, Tailwind CSS v4, lucide-react, framer-motion |
| Content | MDX (`next-mdx-remote`), `gray-matter`, `@tailwindcss/typography` |
| Diagrams | Mermaid |
| Tooling | TypeScript, ESLint 9 (flat config) |
| Testing | Playwright (E2E), tsx (unit) |
| Hosting | Cloudflare Pages (static `out/`) |

## Getting Started

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:3000
```

## Scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Build the static export into `out/` |
| `npm run lint` | Run ESLint (flat config) |
| `npm run test:static-ai` | Unit test for the static AI chat replies |
| `npm run test:e2e` | Run Playwright E2E tests (builds + serves `out/`) |
| `npm run test:e2e:ui` | Run Playwright in UI mode |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero, social links, photo gallery, latest articles |
| `/about` | Bio, grouped skills, experience timeline |
| `/data` | **Data solutions** — illustrative SQL/Python samples, workflow diagram, and transformation case study |
| `/projects` | Data & software projects |
| `/articles` | MDX article list |
| `/articles/[slug]` | Article detail (MDX + Mermaid) |
| `/readlist` | Reading list |
| `/uses` | Hardware & tools |

## Languages

The original routes are in English. The same pages and 12 articles are available at `/id/...` (Bahasa Indonesia) and `/jv/...` (ngoko sopan). Use the language selector in the navigation; it keeps you on the equivalent page or article. Names, code, and technical terms without a natural Javanese equivalent remain unchanged. The downloadable CV is the original English PDF.

Article source files are in `content/articles/`; translations are in the `en/`, `id/`, and `jv/` subdirectories where the source language differs. Translated MDX files use `{{SOURCE_CODE_1}}`, `{{SOURCE_CODE_2}}`, etc. to reuse each original code/diagram block in order; the build rejects missing translations or examples. Route metadata and sitemap list all three language versions. `npm run build` also sets the language attribute in generated HTML for no-JavaScript visitors and crawlers.

## Documentation

- [`docs/website-story/README.md`](./docs/website-story/README.md) — retrospective product brief, workflow, as-built design system, feature inventory, and LinkedIn content kit (Bahasa Indonesia)
- [`docs/PRD.md`](./docs/PRD.md) — earlier PRD snapshot; some positioning and scope predate the current site
- [`docs/architecture.md`](./docs/architecture.md) — earlier architecture snapshot; use the website-story package for the current narrative
- [`docs/testing.md`](./docs/testing.md) — Testing guide
- [`docs/articles-system.md`](./docs/articles-system.md) — How the MDX article system works
- [`docs/homepage-articles.md`](./docs/homepage-articles.md) — Homepage "Latest Articles" section

## Deployment

Pushing to `develop` triggers `.github/workflows/deploy.yml`: it lints, runs the unit test, builds the static export, and deploys `out/` to Cloudflare Pages.
