# Changelog — ditazain.site (zainalabidin.my.id)

Catatan fitur yang disusun secara retrospektif untuk personal website Zainal Abidin. Tanggal pada entri fitur bukan bukti tanggal deployment; cek riwayat Git dan situs produksi sebelum menyebutnya sebagai tanggal rilis.

---

## v0.4.0 — WebGL Hero (7 Oct 2026)

- Added a procedural 3D orbit around the existing profile photo using React Three Fiber and Three.js.
- Pointer movement tilts the scene; demand rendering avoids a continuous animation loop.
- The WebGL scene is client-only and code-split. The original portrait remains visible as the no-WebGL fallback.
- Added an E2E regression check for the profile photo and rendered Canvas.

---

## v0.3.0 — UX Improvements (1 Sep 2026)

### Fitur Baru

#### 1. Reading Progress Bar
- **File:** `src/components/ReadingProgressBar/index.tsx`
- **Digunakan di:** `src/app/articles/[slug]/page.tsx`
- Bar tipis gradient (blue → indigo → purple) di bagian paling atas halaman artikel.
- Melacak scroll progress dari 0% hingga 100% secara real-time.
- Accessible: menggunakan `role="progressbar"` + `aria-valuenow/min/max`.
- Passive scroll listener untuk performa optimal.

#### 2. Scroll to Top Button
- **File:** `src/components/ScrollToTop/index.tsx`
- **Digunakan di:** `src/app/layout.tsx` (global, semua halaman)
- Tombol floating muncul otomatis setelah scroll 300px ke bawah.
- Smooth scroll ke atas saat diklik.
- Posisi: `bottom-24 right-4` (desktop: `bottom-28 right-6`) agar tidak menimpa AI chat widget.
- Style: glass-morphism dengan backdrop-blur, dark mode support.

#### 3. Typewriter Role Animation
- **File:** `src/components/TypewriterRole/index.tsx`
- **Digunakan di:** `src/app/(common)/page.tsx`
- Animasi mengetik yang menampilkan peran Technical Product Specialist saat ini serta pengalaman software dan data engineering.
- Kecepatan: 80ms per karakter saat mengetik, 45ms saat menghapus, pause 2 detik setelah selesai.
- Cursor berkedip (`animate-pulse`) untuk efek terminal yang natural.
- Pure React state — tidak butuh library eksternal.

#### 4. Article Tag Filter
- **File:** `src/components/Articles/ArticlesFilter.tsx`
- **Digunakan di:** `src/app/articles/page.tsx`
- Filter strip interaktif di atas daftar artikel dengan semua tag unik.
- Klik tag untuk filter, klik lagi untuk reset, atau klik "All" untuk tampilkan semua.
- Tag di dalam card artikel juga bisa diklik untuk filter langsung.
- Menampilkan jumlah artikel yang sedang ditampilkan.
- Client component (`"use client"`) — filter terjadi di browser tanpa reload.

### Perubahan Lainnya
- `src/components/WhatsNewModal.tsx` — ditambah entry "1 Sep 2026" sebagai Latest update.

---

## v0.2.0 — Major Overhaul (1 Jun 2026)

### Fitur Baru & Perubahan Besar
- Penyegaran profil dengan posisi Technical Product Specialist di Indivara Group dan cakupan product delivery, data solutions, serta client implementation.
- Halaman `/data`: contoh SQL/Python ilustratif, workflow representatif, dan studi kasus transformasi data.
- Update pengalaman kerja: Technical Product Specialist di Indivara Group (Jan 2026 – sekarang).
- Upgrade stack: Next.js 16, React 19, Tailwind CSS v4, ESLint 9.
- Navbar sticky modern dengan backdrop-blur, mobile hamburger menu.
- Hero section dengan role badges, aurora glow background.
- Dark mode tanpa flash (script inline di `<head>`).
- Fix bug: Latest Articles tidak muncul di static export.
- Playwright E2E tests untuk semua halaman (desktop & mobile).

---

## v0.1.0 — Awal repository (25 Jun 2024)

- Commit awal berasal dari Create Next App; tanggal peluncuran publik pertama belum terverifikasi.
- Stack: Next.js, TypeScript, Tailwind CSS.
- Halaman: Homepage, About, Articles (MDX), Projects, Reading List, Uses.

---

## Informasi Teknis

### Tech Stack
| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 16 (App Router, static export) |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 + Typography plugin |
| Animasi | Framer Motion, CSS keyframes |
| Content | MDX via `next-mdx-remote`, `gray-matter` |
| Diagram | Mermaid.js |
| Foto | `react-photo-view` |
| Icons | Lucide React |
| Testing | Playwright (E2E) |
| Deploy | Cloudflare Pages |
| Language | TypeScript 5.9 |

### Struktur Direktori
```
src/
  app/
    (common)/page.tsx       # Homepage
    about/page.tsx          # Halaman About + pengalaman kerja
    articles/
      page.tsx              # Daftar artikel dengan tag filter
      [slug]/page.tsx       # Artikel detail + reading progress
    data/page.tsx           # Data Engineering showcase
    projects/page.tsx       # Daftar project
    readlist/page.tsx       # Reading list
    uses/page.tsx           # Tools & setup
    layout.tsx              # Root layout (AI chat, scroll to top, dark mode)
  components/
    AIChatWidget/           # Static AI chatbot (keyword-based, no API)
    Articles/
      index.tsx             # Latest 3 articles untuk homepage
      ArticlesList.tsx      # Article list renderer
      ArticlesFilter.tsx    # Tag filter (NEW v0.3.0)
    CodeBlock/              # Code block dengan copy button
    DarkModeToggle/         # Dark mode toggle (class-based, no flash)
    Footer/                 # Footer dengan nav links
    JsonLd/                 # JSON-LD structured data
    Mermaid/                # Mermaid diagram renderer
    Navbar.tsx              # Sticky navbar dengan mobile menu
    PhotoGallery/           # Foto gallery dengan lightbox
    Projects/               # Project cards
    ReadingProgressBar/     # Reading progress bar (NEW v0.3.0)
    ResumeButton/           # Resume preview/download modal
    ScrollToTop/            # Scroll to top button (NEW v0.3.0)
    Socmed/                 # Social media links
    TypewriterRole/         # Typewriter animation (NEW v0.3.0)
    Uses/                   # Tools/uses list
    WhatsNewModal.tsx       # Changelog modal
  constants/
    content.ts              # Copy: title, description, roles, location
    site.ts                 # Site URL, author info, social links
  utils/
    articles.ts             # MDX article reader (fs + gray-matter)
    static-ai-chat.ts       # Keyword-based AI chat responses
content/
  articles/                 # 12 artikel MDX
    api-security-practices.mdx
    building-modern-web-applications.mdx
    clean-code-principles.mdx
    data-roles-explained.mdx
    deploy-like-a-pro.mdx
    docker-containerization.mdx
    github-actions-cicd.mdx
    react-state-management.mdx
    system-design-intro.mdx
    typescript-design-patterns.mdx
    understanding-microservices.mdx
    web-performance-optimization.mdx
tests/
  e2e/site.spec.ts          # Playwright E2E tests
```

### Arsitektur
- **Static Export** (`output: "export"` di `next.config.mjs`) — deploy ke Cloudflare Pages sebagai file statis.
- **Dark Mode** — class-based (`dark` class di `<html>`), script inline di `<head>` untuk mencegah flash.
- **MDX Articles** — dibaca dari filesystem saat build time via `gray-matter` + `next-mdx-remote`.
- **AI Chat** — static keyword-based, tidak ada API call, aman untuk static hosting.
- **SEO** — metadata lengkap, Open Graph, Twitter Card, JSON-LD (Person + WebSite + BlogPosting), sitemap, robots.txt.

### Scripts
```bash
npm run dev          # Development server
npm run build        # Production build (static export ke /out)
npm run start        # Preview production build
npm run lint         # ESLint check
npm run test:e2e     # Playwright E2E tests
npm run test:e2e:ui  # Playwright dengan UI mode
npm run test:static-ai  # Test static AI chat responses
```

### Environment Variables
Tidak ada environment variable atau kredensial database yang digunakan.
- `@neondatabase/serverless` terdaftar di `package.json` tapi **tidak digunakan** di source code (legacy dependency, aman dihapus).
- Semua data (profil, artikel, project, reading list) bersifat **hardcoded** atau dibaca dari filesystem MDX.

### Deployment
- **Platform:** Cloudflare Pages
- **Config:** `wrangler.toml`, `cloudflare.json`
- **Output:** `/out` directory (static HTML/CSS/JS)
- **Domain:** `zainalabidin.my.id`

### Testing
Playwright E2E tests di `tests/e2e/site.spec.ts` mencakup:
- Semua halaman load tanpa error (desktop + mobile)
- Tidak ada horizontal overflow (mobile responsiveness)
- Homepage menampilkan role, social links, dan latest articles
- Dark mode toggle berfungsi
- AI chat widget buka/tutup dan mengirim pesan
- WhatsNew modal buka/tutup
- Mermaid diagram render di halaman /data
- Desktop nav links routing
- Mobile hamburger menu
