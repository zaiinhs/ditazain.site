# PRD — Personal Website & Portfolio Zainal Abidin

> **Product Requirements Document**
> Versi: 2.0 · Tanggal: 2026-05-31 · Owner: Zainal Abidin (@zaiinhs)

## 1. Ringkasan

Website pribadi Zainal Abidin adalah portfolio statis yang memposisikan dirinya sebagai **Software Engineer & Data Engineer** dari Indonesia. Tujuan utamanya adalah meyakinkan **recruiter** dan kolaborator bahwa Zainal mampu mengerjakan pekerjaan Data Engineering (SQL, Python, transformasi data) maupun Software Engineering (React/Next.js/TypeScript), sambil tetap personal dan "kekinian".

## 2. Latar Belakang & Konteks

- Sebelumnya situs memposisikan Zainal sebagai **Frontend Engineer** saja.
- **Perubahan karier:** keluar dari PT. Delman Data Teknologi (delman.io) sejak **Desember 2025**. Mulai **Januari 2026** menjadi **Technical Product Specialist** di **Indivara Group**.
- **Fokus baru:** Data Engineering — SQL, Python, dan transform data.
- Stack lama (Next 14, React 18, Tailwind 3) sudah usang dan ada bug pada section "Latest Articles" saat static export.

## 3. Tujuan (Goals)

| # | Goal | Ukuran Sukses |
|---|------|---------------|
| G1 | Reposisi sebagai Software + Data Engineer | Hero, About, dan AI chat konsisten menyebut kedua peran |
| G2 | Showcase kemampuan Data Engineering | Halaman `/data` berisi contoh SQL, Python ETL, diagram pipeline, dan studi kasus transform |
| G3 | Tampilan modern & kekinian | Navbar pill sticky, hero gradient, kartu rapi, dark mode tanpa flash |
| G4 | Mobile friendly | Semua halaman lulus uji pada viewport mobile (Pixel 7) |
| G5 | Update semua versi library | Next 16, React 19, Tailwind v4, ESLint 9 — build hijau |
| G6 | Tidak ada error | Lint bersih + seluruh E2E Playwright lulus tanpa page error |
| G7 | Dokumentasi lengkap | PRD, arsitektur, struktur data, panduan testing |

### Non-Goals

- Belum ada backend dinamis / database runtime (situs tetap **static export**).
- AI chat masih **statis** (rule-based), belum memanggil API model.
- Belum ada CMS; artikel ditulis sebagai file MDX.

## 4. Target Pengguna (Personas)

1. **Recruiter / Hiring Manager** — ingin cepat menilai skill Data Engineering & Software Engineering, melihat CV, dan menghubungi.
2. **Sesama Engineer / Kolaborator** — membaca artikel, melihat pendekatan teknis, dan project.
3. **Diri sendiri (Zainal)** — memperbarui konten (artikel MDX, experience) dengan mudah.

## 5. Fitur & Requirements

### 5.1 Homepage (`/`)
- Hero: avatar, badge peran (Software Engineer, Data Engineer), headline gradient, deskripsi.
- Baris peran saat ini: *Technical Product Specialist @ Indivara Group* + lokasi.
- Tombol **View Resume** (modal PDF + download) dan CTA **Explore my Data Engineering work** → `/data`.
- Strip tech stack, social links, photo gallery, dan **Latest Articles** (3 terbaru, dari MDX, server component).

### 5.2 Data Engineering (`/data`) — fitur unggulan
- Hero "Data Engineering Focus".
- Kapabilitas: **Ingest → Transform → Deliver**.
- Data Stack (Languages / Transformation / Orchestration / Storage).
- **Contoh SQL** (dedup + agregasi window function) dengan tombol copy.
- **Contoh Python ETL** (extract → transform → load).
- **Diagram pipeline** (Mermaid flowchart).
- **Studi kasus transform** (tabel before "messy" vs after "clean").
- CTA kontak (LinkedIn) + link ke Projects.

### 5.3 About (`/about`)
- Header profil + role saat ini.
- Background naratif (transisi dari frontend ke data engineering).
- Skills dikelompokkan: Data Engineering / Languages & Frameworks / Tools & Platforms.
- Experience timeline (Indivara Group di atas; periode Delman dikoreksi menjadi Sept 2024 – Des 2025).

### 5.4 Konten lain
- **Projects:** campuran project Data Engineering & Software Engineering.
- **Articles:** daftar + detail MDX (mendukung Mermaid, tabel, code).
- **ReadList & Uses:** placeholder rapi (tanpa gambar broken).

### 5.5 Global
- **Navbar:** sticky, blur, pill, item `Home · About · Data · Projects · Articles · ReadList · Uses`, "What's New?", dark mode toggle. Mobile pakai hamburger.
- **Dark mode:** class-based, persist di `localStorage`, tanpa flash (inline script di `<head>`).
- **AI Chat Widget:** floating, jawaban statis tentang profil/data engineering/pengalaman/kontak.
- **What's New modal:** changelog, entri terbaru 2026-05-31.

## 6. Requirement Non-Fungsional

| Kategori | Requirement |
|----------|-------------|
| Performa | Static export, gambar `unoptimized`, first load JS kecil |
| Kompatibilitas | Harus jalan sebagai static (`output: "export"`) — tanpa API route runtime |
| Aksesibilitas | `aria-label` pada tombol ikon, fokus keyboard, kontras dark/light |
| SEO | Metadata per halaman (title, description, OpenGraph, Twitter) |
| Kualitas | `npm run lint` bersih; semua test Playwright lulus |

## 7. Keputusan Teknis Penting

1. **Static export dipertahankan** → menghapus `/api/articles`; homepage memakai server component (`getAllArticles()` baca file MDX saat build).
2. **Upgrade major menyeluruh** → Next 16, React 19, Tailwind v4 (CSS-first config), ESLint 9 (flat config). **TypeScript ditahan di 5.9** karena Next 16 & `typescript-eslint` belum mendukung TS 6 secara resmi (satu-satunya pengecualian dari "semua paling baru").
3. **Brand icons** (GitHub/LinkedIn/X/Instagram) dibuat inline SVG karena dihapus dari `lucide-react` v1.

## 8. Risiko & Mitigasi

| Risiko | Mitigasi |
|--------|----------|
| Major upgrade memecah build/MDX | Build + lint + E2E dijalankan; semua hijau |
| TS 6 belum didukung toolchain | Tetap di TS 5.9, didokumentasikan |
| Konten Data Engineering terkesan "kosong" | Contoh SQL/Python nyata + diagram + studi kasus |

## 9. Status

✅ Semua goal (G1–G7) selesai pada 2026-05-31. Lihat `docs/architecture.md` untuk struktur dan `docs/testing.md` untuk cakupan test.
