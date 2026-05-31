# ditazain.site — Personal Website of Zainal Abidin

Personal website & portfolio for **Zainal Abidin** — Software Engineer & Data Engineer from Indonesia. It showcases projects, a dedicated Data Engineering page (SQL, Python, ETL), MDX articles, and a static AI assistant.

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
| `/data` | **Data Engineering showcase** — SQL/Python samples, pipeline diagram, transform case study |
| `/projects` | Data & software projects |
| `/articles` | MDX article list |
| `/articles/[slug]` | Article detail (MDX + Mermaid) |
| `/readlist` | Reading list |
| `/uses` | Hardware & tools |

## Documentation

- [`docs/PRD.md`](./docs/PRD.md) — Product Requirements Document
- [`docs/architecture.md`](./docs/architecture.md) — Repository structure & data models
- [`docs/testing.md`](./docs/testing.md) — Testing guide
- [`docs/articles-system.md`](./docs/articles-system.md) — How the MDX article system works
- [`docs/homepage-articles.md`](./docs/homepage-articles.md) — Homepage "Latest Articles" section

## Deployment

Pushing to `develop` triggers `.github/workflows/deploy.yml`: it lints, runs the unit test, builds the static export, and deploys `out/` to Cloudflare Pages.
