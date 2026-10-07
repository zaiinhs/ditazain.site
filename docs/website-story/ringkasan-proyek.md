---
title: "Di Balik Personal Website Zainal Abidin"
subtitle: "Ide, proses, design system, dan implementasi"
version: "1.0"
status: "Draft untuk ditinjau pemilik"
date: "2026-10-07"
author: "Disusun untuk Zainal Abidin"
audience: "Pembaca LinkedIn dan kolaborator"
language: "id"
---

# Ringkasan eksekutif

> **IMPORTANT** 🔴 Ini rekonstruksi retrospektif dari website dan kode yang ada, bukan brief, riset, atau wireframe asli yang diklaim dibuat sebelum proyek dimulai.

Bagaimana satu situs menjelaskan pekerjaan lintas produk, data, dan engineering tanpa menjadi CV panjang? Website ini memusatkan peran Technical Product Specialist di Indivara Group, kemudian membuka jalan menuju bukti pengalaman, contoh pendekatan, tulisan teknis, CV, dan kontak.

> Dari kebutuhan produk ke produksi: identitas → bukti kontribusi → cara kerja → pendalaman → percakapan.

# 1. Product brief

Hipotesis audiens dalam blueprint: recruiter yang ingin menilai peran dan CV; kolaborator yang ingin melihat kontribusi; pembaca teknis yang ingin membaca artikel; dan pemilik yang ingin memperbarui konten. Ini bukan hasil wawancara pengguna.

- Tujuan: positioning karier jelas, bukti yang aman dibagikan, konten mudah dipindai, kontak mudah ditemukan.
- Non-goals: login, CMS runtime, backend aplikasi, dataset klien, atau chatbot berbasis API model.
- Keberhasilan teknis diuji lewat lint, build static export, tes terjemahan, dan Playwright; traffic atau konversi pengunjung belum diukur.

# 2. Workflow yang direkonstruksi

| Tahap | Pertanyaan | Artefak ideal |
| --- | --- | --- |
| Framing | Siapa pembaca dan apa pesan utama? | Positioning dan hipotesis audiens |
| Inventaris | Mana fakta, kontribusi, dan ilustrasi? | Matriks konten, CV, proyek, tulisan |
| Struktur | Bagaimana bergerak dari identitas ke bukti? | Sitemap dan alur CTA |
| Visual | Bagaimana teknis tetap personal? | Tipografi, warna, grid, state |
| Build | Mana statis dan mana interaksi browser? | Halaman, MDX, locale, metadata |
| Validasi | Apakah konten aman dan rute berfungsi? | Lint, build, E2E, screenshot produksi |

Tabel ini adalah blueprint penjelas keputusan. Commit kode membuktikan iterasi implementasi, bukan adanya sprint formal atau file Figma awal.

# 3. Fitur yang tersedia

| Lapisan | Implementasi |
| --- | --- |
| Identitas | Home, About, Projects, Data, CV, dan kontak |
| Pendalaman | 12 artikel MDX, filter topik, progres baca, Mermaid dan kode |
| Pengalaman | Light/dark, navigasi mobile, galeri, potret asli dengan WebGL opsional |
| Bahasa dan SEO | English tanpa prefix, Indonesia /id, Jawa ngoko sopan /jv; URL dan metadata per bahasa |
| Bantuan | Chat profil statis berbasis aturan; bukan AI generatif yang terhubung ke model |

SQL, Python, workflow, dan transformasi di halaman Data adalah contoh ilustratif, bukan sistem atau data klien.

# 4. Design system as-built

Bahasa visualnya editorial dan tenang: judul besar untuk posisi, paragraf berlebar terbatas, ruang kosong untuk ritme, border tipis untuk memisahkan konteks, angka monospace, dan aksen biru #2563eb. Foto menempatkan manusia di tengah lapisan teknis.

| Elemen | Implementasi yang diamati |
| --- | --- |
| Tipografi | Avenir Next, Segoe UI, Arial; hero berskala responsif; artikel memakai prose |
| Layout | Kontainer max-w-6xl; artikel max-w-screen-md; grid mobile ke desktop |
| Tema | Light/dark class-based, pilihan tersimpan di browser, fokus keyboard terlihat |
| Motion | Efek pelengkap dengan fallback foto; Mermaid dimuat dekat viewport |

Dokumen design system disarikan setelah implementasi dari CSS dan komponen aktif; tidak mengklaim seluruh token terpusat atau rancangan Figma pra-proyek.

# 5. Trade-off dan bukti

- Static export memudahkan hosting tetapi tidak menyediakan backend atau CMS runtime.
- Artikel MDX dibaca saat build; tiga bahasa membutuhkan pemeliharaan terjemahan yang konsisten.
- Chat profil tidak mengirim pertanyaan ke AI API, tetapi hanya menjawab topik yang didukung.
- WebGL tidak menggantikan foto; diagram baru dirender ketika mendekati viewport.

Catatan pengujian lokal di docs/testing.md: build, lint, tes chat, dan verifikasi 12 artikel dalam tiga bahasa lulus; Playwright static export mencatat 95 passed, 3 skipped pada desktop/mobile. Angka ini bukan metrik sukses publik atau bukti deploy produksi.

# 6. Hal yang perlu dibereskan sebelum dibagikan

- [ ] Cek versi produksi pada domain dan semua bahasa sebelum memberi link.
- [ ] Tinjau keamanan klaim klien serta nuansa terjemahan Jawa dengan pemilik.
- [ ] Siapkan foto profesional jika sumber dan izin sudah tersedia; saat ini belum diganti.
- [ ] Sebut CV unduhan tetap berbahasa Inggris.
- [ ] Tambahkan motivasi awal pribadi hanya jika pemilik mengonfirmasi ceritanya.

# 7. Dokumen pendukung

[Product brief](./01-product-brief.md)

[Workflow dan roadmap](./02-workflow-dan-roadmap.md)

[Design system](./03-design-system.md)

[Fitur dan validasi](./04-fitur-dan-validasi.md)

[Caption dan carousel LinkedIn](./05-linkedin-content-kit.md)

[Personal website (cek versi live)](https://zainalabidin.my.id)
