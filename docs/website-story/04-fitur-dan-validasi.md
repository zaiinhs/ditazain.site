# 04 — Peta fitur dan validasi

**Status:** inventaris implementasi yang dapat diperiksa pada repo saat dokumen ini ditulis, bukan janji fitur masa depan. Kata “tersedia” berarti ada di kode/build lokal; **bukan** bukti perubahan working tree sudah dideploy ke domain publik.

## 1. Perjalanan pengunjung dan halaman

| Rute English | Yang ditampilkan | Peran dalam cerita produk |
|---|---|---|
| `/` | Peran saat ini, pesan inti, potret + WebGL opsional, CTA CV/Projects, dampak pilihan, tiga area kerja, galeri, tiga artikel terbaru | Orientasi pertama: “siapa, fokus apa, ke mana berikutnya?” |
| `/about` | Ringkasan latar, kelompok skill, kronologi pengalaman, pendidikan, komunitas | Bukti perjalanan dan peran yang lebih lengkap |
| `/projects` | Empat rangkuman pekerjaan produk/data, kontribusi, outcome, dan teknologi | Contoh ruang lingkup pekerjaan tanpa membuka repositori klien |
| `/data` | Kapabilitas, stack, konteks pekerjaan Bersama, contoh SQL/Python, diagram, tabel before/after, CTA | Menjelaskan pendekatan data melalui **contoh ilustratif**, bukan arsitektur klien |
| `/articles` | Daftar 12 artikel MDX dan filter tag di browser | Akses ke tulisan menurut topik |
| `/articles/[slug]` | Artikel lengkap dengan metadata, tabel, code/diagram yang relevan, progres baca, tautan kembali | Pendalaman topik, dapat dibagikan per tulisan |
| `/readlist` | Daftar buku, deskripsi, rating/status yang tersimpan di kode | Konteks minat baca; verifikasi ulang data personal sebelum dipromosikan |
| `/uses` | Daftar kategori perangkat dan tautan produk yang tersimpan di kode | Konteks tools/setup; verifikasi ulang perangkat pribadi sebelum dipromosikan |

Semua rute di atas memiliki padanan Indonesia di `/id/...` dan Jawa ngoko sopan di `/jv/...`; English tetap tanpa prefix. Pemilih bahasa mempertahankan halaman atau slug artikel yang setara. CV yang dibuka/diunduh masih **PDF berbahasa Inggris**, bukan dokumen tiga bahasa.

## 2. Fitur lintas halaman

| Kemampuan | Cara kerja | Batas yang perlu diucapkan apa adanya |
|---|---|---|
| Navigasi | Sticky desktop; menu mobile; Footer menautkan halaman | Tidak ada search lintas situs |
| Tema | Light/dark, preferensi di `localStorage`, script sebelum paint untuk mengurangi flash | Audit WCAG lengkap belum dicatat |
| Bahasa | Copy dan metadata per locale, canonical + `hreflang`, sitemap tiga bahasa, `lang` pada HTML export | Terjemahan Jawa masih layak ditinjau penutur untuk nuansa personal |
| Artikel | MDX + frontmatter; daftar, filter tag client-side, detail dan progres baca | Tidak ada CMS, komentar, atau publikasi tanpa build |
| Diagram | Mermaid di artikel/Data, import ketika mendekati viewport | Dapat membutuhkan JavaScript; placeholder menjaga ruang saat memuat |
| Chat profil | Saran pertanyaan dan jawaban lokal berdasarkan kata kunci/topik | **Bukan** model AI/API generatif; bisa memberi fallback di luar cakupan |
| CV | Modal preview dan unduh `public/cv.pdf` | Satu file PDF English |
| Potret/galeri | Foto profil asli dengan WebGL on-demand, strip foto yang dapat digulir, tampilan penuh | Foto baru berlatar/pakaian profesional **belum dibuat** |
| Utility | Whats New, scroll-to-top, label tombol/kontrol | Rincian release notes lama bukan bukti tanggal ideasi asli |

## 3. Struktur konten dan batas teknis

```text
Konten profil + pesan per bahasa          MDX asli + terjemahan
            │                                  │
            └─────────── Next build ──────────┘
                           │
                 out/ HTML + CSS + JS statis
                           │
                 Cloudflare Pages (workflow)
                           │
           interaksi browser, tanpa API runtime
```

- Next.js App Router dengan `output: "export"` di `next.config.mjs`; konten MDX dibaca saat build (`src/utils/articles.ts`).
- 12 slug tetap sama di seluruh locale. Dua naskah asli berbahasa Indonesia diberi versi English/Jawa; artikel lain sumbernya English dengan versi Indonesia/Jawa. Terjemahan merujuk ulang blok kode/diagram sumber sehingga contoh tetap utuh.
- Halaman `/data` memiliki label eksplisit bahwa diagram/alur dan transformasi merupakan ilustrasi. Angka hasil kerja yang tampil di About/Projects/Home adalah konteks pengalaman, **bukan** data demo atau metrik traffic website.
- `src/constants/site.ts` memuat domain `https://zainalabidin.my.id`; metadata, URL artikel, sitemap, robots, dan gambar share mengikuti domain tersebut pada build lokal.
- Workflow `.github/workflows/deploy.yml` menyiapkan build/deploy Cloudflare Pages pada push ke `develop`. Keberadaan workflow **tidak** membuktikan revisi lokal saat ini telah terdeploy.

## 4. Bukti kualitas yang tersedia

| Pertanyaan | Bukti yang bisa diulang | Batas kesimpulan |
|---|---|---|
| Bisa diekspor tanpa server aplikasi? | `npm run build` menghasilkan `out/` dan rute bahasa/artikel statis | Tidak mengukur uptime hosting publik |
| Kode mengikuti lint? | `npm run lint` | Bukan audit desain/aksesibilitas menyeluruh |
| Semua artikel ada di tiga bahasa dan code block tidak hilang? | `npm run test:i18n` memeriksa 12 artikel × 3 locale | Tidak menggantikan review editorial penutur |
| Chat menjawab pertanyaan profil lintas bahasa? | `npm run test:static-ai` | Tidak menjamin setiap pertanyaan bebas punya jawaban |
| Halaman, overflow, dark mode, rute bahasa, domain, dan fitur utama bekerja? | Playwright terhadap static export (`npm run test:e2e`) pada desktop + mobile; catatan terakhir **95 passed, 3 skipped** di `docs/testing.md` | Belum menjadi data RUM, survei pengguna, atau tes semua browser |
| Diagram muncul saat dibutuhkan? | E2E menggulir ke `/data` dan memeriksa SVG Mermaid | Perlu cek visual manual untuk setiap diagram panjang |

## 5. Checklist pra-publikasi dan backlog

- [ ] **Cek produksi:** domain, versi konten tiga bahasa, halaman artikel, canonical, gambar share, dan link CV sesudah deployment terbaru.
- [ ] **Review klaim publik:** pemilik mengonfirmasi fakta kerja, status buku/perangkat, dan informasi klien yang aman diunggah.
- [ ] **Tinjau bahasa:** baca ulang Jawa ngoko sopan bersama penutur sesuai gaya yang diinginkan, terutama kalimat teknis yang sengaja tidak diterjemahkan.
- [ ] **Aset sosial:** ambil screenshot light/dark dan mobile dari versi yang sama dengan posting; sembunyikan informasi pribadi/klien yang tidak boleh dibagikan.
- [ ] **Foto profesional:** belum dikerjakan; butuh sumber foto/izin pemilik untuk perubahan visual. Jangan menyebutnya sudah diperbarui.
- [ ] **Aksesibilitas lanjutan:** audit manual keyboard, ukuran target sentuh, kontras, dan pengalaman reduced motion non-CSS.

**Pesan untuk LinkedIn:** cukup tunjukkan 3–4 keputusan yang punya alasan kuat dan bukti nyata; daftar fitur lengkap ini berfungsi sebagai sumber pengecekan, bukan semuanya perlu dimasukkan ke satu caption.
