# Panduan Testing

Website ini punya dua lapis test: **unit test** untuk logika AI chat statis, dan **E2E Playwright** yang menjalankan seluruh halaman & fitur pada static export.

## 1. Unit Test — Static AI Chat

```bash
npm run test:static-ai
```

File: `scripts/test-static-ai-chat.ts` (dijalankan dengan `tsx`).
Memverifikasi `getStaticAIReply()` menjawab dengan benar untuk intent:
profil, **data engineering** (SQL/Python/pipeline), pengalaman (Indivara & Delman), skill, project, dan fallback tetap dalam scope "tentang Zainal".

## 2. E2E — Playwright

```bash
npm run test:e2e        # headless, builds + serves out/
npm run test:e2e:ui     # mode UI interaktif
```

### Cara kerjanya
- `playwright.config.ts` mendefinisikan **`webServer`** dengan perintah
  `npm run build && node scripts/serve-out.mjs`.
- `scripts/serve-out.mjs` adalah static server tanpa dependency yang menyajikan
  folder `out/` **persis seperti production** (memetakan `/data` → `data.html`,
  `/articles/<slug>` → `articles/<slug>.html`, fallback `404.html`).
- Dua project dijalankan: **`desktop`** (Desktop Chrome) dan **`mobile`** (Pixel 7).

> Server diserve dari `out/`, jadi test menguji hasil **static export** — bukan
> dev server — sehingga regresi seperti bug "Latest Articles" pada export akan
> tertangkap.

### Cakupan test (`tests/e2e/site.spec.ts`)

| Test | Yang divalidasi |
|------|-----------------|
| `pages render without errors` | 7 halaman (`/`, `/about`, `/data`, `/projects`, `/articles`, `/readlist`, `/uses`) tampil dengan heading benar **dan tanpa page error / console.error** |
| `no horizontal overflow (mobile friendliness)` | Setiap halaman + 1 artikel detail **tidak melebihi lebar viewport** (`scrollWidth ≤ viewport`). Berjalan di project desktop **dan** mobile — penjaga utama mobile friendliness |
| `What's New modal opens centered over the full viewport` | Modal What's New muncul lewat portal, overlay menutup penuh viewport, dan `Escape` menutupnya |
| `no hydration error when dark theme is pre-set` | Tidak ada error hydration saat `theme=dark` sudah diset sebelum load |
| `homepage shows current role, socials, and latest articles` | "Indivara Group", "Data Engineer", link GitHub, dan **Latest Articles tidak kosong** (guard untuk bug static export) |
| `dark mode toggle flips the theme` | Klik toggle membalik class `.dark` pada `<html>` |
| `data page shows SQL, Python samples and a pipeline diagram` | Ada `daily_revenue.sql`, `transform_orders.py`, isi SQL, dan SVG Mermaid ter-render |
| `AI chat widget opens and answers` | Widget terbuka, klik saran → balasan statis muncul |
| `articles list links through to a detail page` | List → detail artikel + tombol "Back to Articles" |
| `desktop nav links route to each page` | (desktop) item nav `Data`/`About` berpindah halaman |
| `mobile hamburger menu opens and navigates` | (mobile) hamburger membuka menu & navigasi |

### Catatan implementasi test
- Asersi "tanpa error" mendengarkan event `pageerror` dan `console.error`.
- Query nav dibatasi ke `page.locator("nav").first()` karena footer juga punya elemen `<nav>`.
- Test khusus project memakai `test.skip(testInfo.project.name !== ...)`.

## 3. Lint & Build

```bash
npm run lint     # ESLint 9 flat config — harus bersih
npm run build    # static export ke out/ — harus sukses
```

## 4. Ringkasan hasil terakhir

- `npm run lint` → bersih (0 error, 0 warning).
- `npm run build` → sukses (Next.js 16, static export).
- `npm run test:static-ai` → lulus.
- `npm run test:e2e` → **45 passed, 3 skipped** (skip = test khusus device yang sengaja dilewati di project lain). Mencakup uji **horizontal overflow di desktop & mobile** untuk semua halaman.
