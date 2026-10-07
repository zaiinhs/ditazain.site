# 03 — Design system: identitas editorial yang dapat diimplementasikan

**Status:** spesifikasi *as-built* yang dirangkum dari `src/app/globals.css` dan komponen aktif, ditambah penjelasan rasional desain secara retrospektif. Tidak ada klaim bahwa sistem token atau file Figma formal telah ada sejak awal. Jika dokumen ini dipakai untuk pengembangan berikutnya, bagian “aturan” adalah pedoman konsistensi, bukan bukti proses masa lalu.

## Blueprint perancangan design system (bukan kronologi yang diklaim terjadi)

| Urutan keputusan | Input yang diperlukan | Output dan gerbang review |
|---|---|---|
| 1. Petakan pesan | Product brief, 3 tipe pembaca, urutan konten | Tentukan apa yang harus terlihat pada layar pertama; jangan mulai dari gradient/animasi |
| 2. Pilih arah visual | Contoh situs editorial dan teknis **jika nanti dikumpulkan** | Satu kalimat arah: kredibel, tenang, manusiawi; tolak layout dashboard generik bila mengaburkan cerita |
| 3. Tentukan fondasi | Panjang naskah tiga bahasa, potret, artikel panjang | Aturan tipe, warna, lebar baca, spacing, grid, light/dark; uji judul terpanjang |
| 4. Bentuk komponen | Alur Home → bukti → kontak | Navbar, CTA, daftar proyek, artikel, modal, galeri; definisikan state default/hover/focus/disabled |
| 5. Uji komposisi | Mobile 320px, laptop kecil, desktop, dark mode | Teks tidak terpotong, hierarki masih jelas, jalur utama bisa diikuti tanpa WebGL |
| 6. Validasi lalu dokumentasikan | Screenshot build dan hasil tes | Simpan aturan yang benar-benar dipakai; pisahkan ide visual baru dari komponen yang telah dikirim |

Tidak ada moodboard atau wireframe historis yang dilampirkan. Tabel ini adalah **proses yang dapat dipakai untuk merancang ulang secara jujur**, sedangkan rincian di bawah mendeskripsikan implementasi aktual.

## 1. Konsep visual

**“Technical clarity with a human center.”** Informasi kerja menjadi tokoh utama; foto asli dan detail visual memperlihatkan orang di baliknya. Halaman tidak dibuat seperti dashboard enterprise: informasi karier dibaca sebagai editorial, sementara warna biru, angka monospace, kode, dan diagram menunjukkan kedalaman teknis.

### Prinsip hierarki

1. **Judul menjelaskan fungsi, bukan sekadar efek.** Di Home: peran/organisasi → pesan “From product need to production.” → ringkasan kerja → dua CTA.
2. **Bukti sebelum dekorasi.** Metrik pengalaman diberi konteks; area kerja dan proyek diperlihatkan sebelum komponen tambahan.
3. **Satu fokus tiap section.** Batas, ruang kosong, dan grid memisahkan cerita agar bisa dipindai tanpa nesting kartu yang berlebihan.
4. **Gerak bukan prasyarat.** Portrait WebGL tidak menyembunyikan foto; diagram yang belum dirender tetap memiliki ruang placeholder; informasi tetap berupa teks/HTML.
5. **Bahasa bagian dari desain.** Panjang kalimat English, Indonesia, dan Jawa berbeda, sehingga judul memakai pembungkusan (`text-balance`/`text-pretty`) dan grid responsif.

## 2. Palet dan pemakaian warna

| Peran | Implementasi yang dapat diperiksa | Penggunaan |
|---|---|---|
| Aksen utama | `--color-accent: #2563eb` di `@theme`, utility `blue-*` pada banyak komponen | Tautan, titik fokus, label pilihan, tombol aksi, outline keyboard |
| Permukaan terang | `--color-primary: #f7f9fa`, `--color-secondary: #edf2f5` terdefinisi; komponen aktif sering memakai `white`, `gray-50`, `gray-100` | Latar, area pendukung, chip, kontainer kode terpisah |
| Teks terang | `gray-950` untuk judul; `gray-600`/`gray-500` untuk penjelasan | Kontras hierarki, bukan semua teks biru |
| Permukaan gelap | `gray-950` (body), `gray-900`/`gray-800` (kontainer), border `gray-800` | Dark mode class-based |
| Teks/aksi gelap | `white`, `gray-300`/`gray-400`, `blue-300`/`blue-400` | Menjaga pembedaan judul, body, dan link |
| Aksen dekoratif terbatas | Biru–indigo–ungu pada reading progress/efek tertentu | Bukan pengganti hierarki teks dan CTA |

**Catatan implementasi:** variabel `--color-primary/secondary/accent` memang dideklarasikan, tetapi sebagian besar komponen menggunakan utility Tailwind langsung. Jadi tabel ini mencatat **sistem visual yang ada**, bukan mengklaim semua warna sudah diatur oleh satu paket design tokens tersentralisasi.

## 3. Tipografi dan ritme baca

| Tingkat | Pola yang sudah tampak | Niat penggunaan |
|---|---|---|
| Hero | `clamp(2.8rem, 6.1vw, 5rem)`, tebal, tracking negatif, line-height rapat | Pernyataan posisi yang bisa terlihat pada laptop kecil |
| Judul halaman | `text-4xl` naik ke `text-5xl` pada breakpoint sesuai halaman | Menyatakan konteks halaman, bukan mengulang seluruh hero |
| Judul section | Umumnya `text-2xl` hingga `text-4xl` | Pemindaian cepat antartopik |
| Body | Font sistem `Avenir Next`, `Segoe UI`, Arial, sans-serif; body sekitar `text-base`/`text-lg` dengan leading longgar | Bacaan profil dan studi pendek yang nyaman |
| Label/UI | `text-xs`/`text-sm`, bobot medium/semibold | Navigasi, label, metadata, status |
| Data/angka | `font-mono`, `tabular-nums` di metrik tertentu | Angka stabil secara visual; terasa teknis tanpa menguasai halaman |
| Artikel | Plugin `@tailwindcss/typography` melalui kelas `prose` | Paragraf, tabel, heading, dan code lebih mudah dibaca |

**Batas lebar:** kerangka utama memakai `max-w-6xl`; halaman artikel memakai `max-w-screen-md`; paragraf ringkas sering dibatasi `max-w-[58ch]` hingga `max-w-[70ch]`. Ini menjaga baris tidak terlalu panjang pada desktop. Google Fonts di `layout.tsx` masih berupa komentar; jangan menyebutnya sebagai font aktif.

## 4. Grid, ruang, dan bentuk

- **Layout luar:** padding horizontal `px-4` di mobile, `sm:px-6`; wrapper `max-w-6xl` untuk halaman utama.
- **Hero:** satu kolom pada mobile; pada `lg` menjadi dua kolom dengan teks dan potret, menjaga konten utama terlihat sebelum dekorasi.
- **Area kerja:** tiga blok yang tersusun vertikal di mobile dan dipisah secara horizontal pada medium screen.
- **Latest Articles:** 1 → 2 → 3 kolom sesuai lebar; CTA “View all” tetap memiliki target sentuh minimum `min-h-11`.
- **Projects:** daftar bernomor dengan border antarbab, bukan kartu bertumpuk. Ini cocok untuk narasi kontribusi dan outcome yang panjang.
- **Komponen:** tombol/kartu umum menggunakan `rounded-lg`, `rounded-xl`, atau `rounded-2xl`; border abu-abu tipis dan perubahan warna/posisi kecil saat hover. Besaran persisnya berbeda per komponen; ini pola visual, bukan library komponen dengan token geometri tunggal.

## 5. Pola komponen yang membentuk pengalaman

| Komponen | Aturan desain dan alasan | Perilaku yang ada |
|---|---|---|
| Navbar | Tetap tersedia setelah scroll; identitas di kiri, rute dan utility di kanan | Sticky, backdrop blur, menu hamburger pada lebar sempit, switch bahasa dan tema |
| Hero potret | Foto mempertahankan unsur personal; lapisan 3D memberi diferensiasi | WebGL dimuat client-side, foto tetap terlihat sebagai fallback |
| Impact strip | Angka disandingkan dengan konteks verbal | Angka pengalaman Delman/produk data, **bukan** metrik kecepatan website |
| CTA | Jalur ke karya/CV jelas sebelum pengunjung membaca semua halaman | Resume modal/unduh PDF; Selected work ke Projects |
| Artikel | Format editorial untuk konten panjang | MDX, tabel, kode, Mermaid, filter tag di daftar, progres baca pada detail |
| Chat profil | Bantuan penemuan konten, bukan pengganti navigasi | Jawaban rule-based statis dan pesan batas kemampuan |
| Whats New & galeri | Detail pelengkap yang bisa ditutup | Modal/perbesar gambar; tidak menghalangi isi utama secara permanen |

## 6. State dan interaksi

**Light/dark:** `@custom-variant dark` mengikat utility ke class `.dark` pada `<html>`. Inline script memasang preferensi dari `localStorage.theme` atau `prefers-color-scheme` sebelum paint; toggle menyimpan pilihan. Periksa kontras di **dua mode**, bukan hanya mengganti latar.

**Hover/focus:** link/tombol memakai perubahan warna, border, atau translasi kecil; `focus-visible` diberi outline biru. Tombol ikon mempunyai label aksesibel; tinggi target interaksi belum semuanya seragam 44px, sehingga audit ukuran target menyeluruh masih layak sebagai tindak lanjut.

**Motion:** CSS menyediakan fade/float dan beberapa animasi dekoratif; role typewriter dan WebGL digunakan di Home. `prefers-reduced-motion: reduce` memang mempersingkat animasi/transisi global dan menonaktifkan smooth scroll, tetapi **belum cukup untuk mengklaim seluruh interaksi animasi non-CSS diuji untuk reduced motion**. Ini item audit, bukan fitur yang sudah tervalidasi penuh.

**Konten panjang:** Mermaid diimpor saat diagram mendekati viewport melalui `IntersectionObserver`, dengan fallback pada browser yang tidak mendukung observer. Diagram mempertahankan ruang sementara dimuat; test `/data` memverifikasi SVG muncul setelah digulir.

## 7. Responsivitas dan aksesibilitas

- Struktur navigasi berubah pada breakpoint `lg`; hero dan daftar kartu/section menyesuaikan urutan serta kolom.
- E2E memeriksa overflow pada mobile/desktop, termasuk lebar sempit 320px untuk beberapa rute lokal. Lulus tes bukan sertifikasi semua device atau semua WCAG.
- Artikel menyimpan tabel dalam kontainer yang dapat digulir horizontal daripada memaksa seluruh halaman melebar.
- Metadata bahasa dan `lang` dokumen statis disesuaikan untuk English (`/`), Indonesia (`/id`), Jawa (`/jv`).
- Foto, tombol, nav, dan progres baca memiliki label aksesibilitas; pemeriksaan manual keyboard dan screen reader penuh masih direkomendasikan.

## 8. Cara menerapkan sistem ini pada halaman baru

1. Tulis pesan inti halaman dalam satu kalimat dan satu CTA utama sebelum menambah efek.
2. Pilih lebar baca berdasarkan tipe konten (`max-w-6xl` untuk halaman, lebih sempit untuk artikel).
3. Gunakan peran warna di tabel di atas; pastikan light dan dark sama-sama terbaca.
4. Utamakan HTML semantik dan target fokus; cek urutan keyboard, alt text, dan bahasa.
5. Uji mobile 320px serta desktop, dengan teks tiga bahasa dan kata panjang.
6. Tandai klaim/data sebagai fakta terkonfirmasi atau ilustrasi. Screenshot baru harus mencerminkan build aktual.

**Artefak visual yang belum ada:** file Figma, moodboard asli, wireframe pra-implementasi, atau token lintas komponen yang sepenuhnya tersentralisasi. Jika dibuat belakangan, beri label sebagai dokumentasi/konsep baru, bukan bukti tahap awal.
