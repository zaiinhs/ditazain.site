# Panduan Testing

Website ini punya dua lapis test: **unit test** untuk logika AI chat statis, dan **E2E Playwright** yang menjalankan seluruh halaman & fitur pada static export.

## 1. Unit Test — Static AI Chat

```bash
npm run test:static-ai
```

File: `scripts/test-static-ai-chat.ts` (dijalankan dengan `tsx`).
Memverifikasi `getStaticAIReply()` menjawab dengan benar untuk intent:
profil dan peran saat ini, **solusi data** (SQL/Python/pipeline), pengalaman
(Indivara & Delman), skill, project, dan fallback tetap dalam scope "tentang Zainal".

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
| `homepage shows current role, socials, and latest articles` | "Indivara Group", "Technical Product Specialist", link GitHub, dan **Latest Articles tidak kosong** (guard untuk bug static export) |
| `homepage latest articles reflow cleanly from mobile to desktop` | Header "Latest Articles" / "View all" tidak bertumpuk, target View all minimal 44px, kartu tetap di dalam section, dan grid berpindah 1/2/3 kolom pada lebar 320–1440px |
| `about page identifies the Indivara role as full-time` | Entri Technical Product Specialist menampilkan keterangan "Indivara Group · Full-time" |
| `homepage keeps the profile photo with the WebGL hero scene` | Foto profil tetap tersedia bersama scene Canvas, tanpa page error / console.error |
| `localized static pages` | Ketujuh halaman utama untuk Indonesia dan Jawa merespons tanpa error, memiliki heading, canonical URL, dan atribut `lang` HTML sesuai locale |
| `language switcher keeps the current article and its translation` | Pemilih bahasa membuka slug artikel yang sama dalam Jawa maupun Indonesia dan memperbarui bahasa dokumen |
| `localized mobile layouts fit narrow screens in light and dark themes` | Pada lebar 320px, halaman lokal tidak overflow dan toggle dark mode berfungsi |
| `translated article retains its code samples` | Isi artikel terjemahan dan contoh kode asli tersedia bersama hreflang |
| `canonical links and sitemap use the current domain` | Canonical serta sitemap memakai `zainalabidin.my.id`, bukan domain lama |
| `resume button serves the current English CV` | Preview CV terbuka, tautan unduh menunjuk `/cv.pdf`, dan file dilayani sebagai PDF |
| `dark mode toggle flips the theme` | Klik toggle membalik class `.dark` pada `<html>` |
| `data page shows SQL, Python samples and a pipeline diagram` | Ada `daily_revenue.sql`, `transform_orders.py`, isi SQL, dan SVG Mermaid ter-render ketika diagram mendekati viewport |
| `AI chat widget opens and answers` | Widget terbuka, klik saran → balasan statis muncul |
| `article tag filter works on /articles page` | Filter tag mengubah daftar dan tombol All mengembalikan daftar penuh; status pilihan diumumkan melalui `aria-pressed` |
| `articles list links through to a detail page` | List → detail artikel + tombol "Back to Articles" |
| `reading progress bar appears on article page` | Progress bar tersedia pada halaman artikel |
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
- `npm run test:i18n` → 12 artikel diverifikasi di tiga bahasa, termasuk seluruh blok kode/diagram.
- `npm run test:e2e` → **95 passed, 3 skipped** (skip = test khusus device yang sengaja dilewati di project lain). Mencakup **overflow di desktop & mobile**, locale, artikel, dan metadata domain.
- Pada uji lokal Pixel 7, perpindahan bahasa di artikel panjang sebelumnya memerlukan sekitar 13–17 detik sampai URL berubah lewat navigasi client-side; navigasi langsung ke HTML statis menurunkannya menjadi sekitar 0,3–0,4 detik (pengukuran lokal, bukan metrik pengguna produksi). Mermaid kini dimuat ketika diagram mendekati viewport, dan E2E tetap memastikan diagram muncul saat digulir.
