# Di balik zainalabidin.my.id

**Paket dokumentasi untuk menceritakan rancangan dan pengembangan personal website Zainal Abidin.** Ditulis dalam Bahasa Indonesia untuk pembaca LinkedIn, rekan produk/desain/engineering, dan siapa pun yang ingin melihat alasan di balik tampilan akhir.

> **Cara membaca:** Ini adalah **rekonstruksi retrospektif**, disusun setelah situs dibuat dari keputusan yang dapat diperiksa pada kode, konten, dan pengujian. Ini **bukan** dokumen brief, riset pengguna, wireframe, atau catatan sprint asli yang diklaim sudah ada sebelum proyek dimulai. Bagian *blueprint* menjelaskan cara yang masuk akal untuk merencanakan versi ini dari nol; bagian *implementasi* menjelaskan yang benar-benar tersedia di repo. Tanggal riwayat lama tidak digunakan sebagai kronologi ideasi karena tidak seluruhnya dapat diverifikasi.

## Mulai dari mana?

| Jika ingin... | Baca |
|---|---|
| Memahami masalah, audiens, tujuan, prioritas, dan batasan | [01 — Product brief](./01-product-brief.md) |
| Melihat alur keputusan dari ide sampai rilis beserta artefak dan trade-off | [02 — Workflow dan roadmap](./02-workflow-dan-roadmap.md) |
| Menjelaskan arah visual, warna, tipografi, komponen, responsivitas, dan dark mode | [03 — Design system](./03-design-system.md) |
| Memastikan daftar fitur, arsitektur, bukti, dan hal yang belum selesai | [04 — Fitur dan validasi](./04-fitur-dan-validasi.md) |
| Menyalin caption dan menyiapkan slide carousel LinkedIn | [05 — LinkedIn content kit](./05-linkedin-content-kit.md) |
| Membagikan ringkasan sebagai satu berkas | [Ringkasan proyek (Markdown)](./ringkasan-proyek.md) · [HTML](./ringkasan-proyek.html) |

## Posisi cerita

**Pertanyaan utamanya bukan “bagaimana membuat portfolio yang lebih ramai?”, melainkan “bagaimana membuat satu website yang menjelaskan pekerjaan lintas produk, data, dan implementasi tanpa mengaburkan peran?”** Jawaban situs saat ini: hierarki konten yang jelas, contoh teknis yang diberi label ilustratif, bukti pengalaman yang proporsional, artikel untuk menunjukkan cara berpikir, dan jalur cepat ke CV atau kontak.

Alur baca pengunjung: **siapa dan mengerjakan apa** (`/`) → **rekam pengalaman** (`/about`) atau **contoh pendekatan** (`/data`, `/projects`) → **tulisan lebih dalam** (`/articles`) → **CV/kontak**. Reading List dan Uses memberi konteks personal, bukan klaim keahlian tambahan.

## Sumber dan batas klaim

- **Sumber implementasi:** `src/app/`, `src/components/`, `src/i18n/`, `content/articles/`, `src/app/globals.css`, `next.config.mjs`, `.github/workflows/deploy.yml`, dan `tests/e2e/site.spec.ts`.
- **Sumber konteks:** `README.md`, `docs/testing.md`, `docs/CHANGELOG.md`, dan `docs/PRD.md`. Dua dokumen terakhir adalah snapshot lama; beberapa deskripsi peran, tampilan, dan kronologinya tidak lagi sejalan dengan situs sekarang. Dokumen ini tidak menimpa arsip tersebut.
- **Tidak diklaim:** wawancara pengguna, Figma/wireframe awal, sprint formal, desain yang tidak ada di kode, traffic atau conversion rate, peningkatan performa produksi website, serta arsitektur atau data milik klien.
- **Belum selesai:** penggantian `public/avatar.jpeg` dengan foto berlatar/berpakaian lebih profesional; CV yang dapat diunduh masih PDF berbahasa Inggris. Perubahan website di working tree lokal tidak otomatis berarti sudah terpasang di domain produksi.

## Sebelum publikasi LinkedIn

1. Konfirmasi situs produksi telah memuat versi yang ingin ditunjukkan; cek `/`, `/id`, `/jv`, satu artikel tiap bahasa, dan mobile.
2. Tinjau kembali klaim pengalaman yang menyebut proyek klien; gunakan hanya informasi yang aman dipublikasikan. Contoh di `/data` adalah **ilustrasi**, bukan potongan sistem klien.
3. Jika ingin menceritakan motivasi pribadi, tambahkan 1–2 kalimat dari Zainal sendiri—jangan mengubah rekonstruksi ini menjadi kisah riset atau workshop yang tidak pernah didokumentasikan.
4. Ambil screenshot aktual sesuai [shot list dalam LinkedIn kit](./05-linkedin-content-kit.md). Jangan menampilkan data internal atau halaman admin.
