# 02 — Workflow: dari ide hingga artefak yang bisa dibagikan

**Status:** alur perencanaan ini direkonstruksi dari versi website saat ini. Urutan di bawah adalah **cara menjelaskan keputusan secara logis**, bukan klaim bahwa tujuh tahap ini pernah dijalankan sebagai sprint formal. Bukti implementasi dan rencana lanjutan dipisahkan.

## Benang merah keputusan

```text
Kebutuhan: profil kerja yang lintas disiplin
    ↓
Pesan inti: product need → production
    ↓
Arsitektur informasi: identitas → bukti → pendekatan → kedalaman → kontak
    ↓
Bahasa visual: editorial, kredibel, tenang; blue accent + tipografi besar
    ↓
Konten dan implementasi: halaman inti + artikel MDX + static export
    ↓
Validasi: mobile, dark mode, rute bahasa, metadata, lint/build/E2E
    ↓
Distribusi: domain pribadi + cerita proses di LinkedIn
```

## Blueprint tahapan, artefak, dan gerbang keputusan

| Tahap | Pertanyaan yang harus dijawab | Artefak yang sebaiknya ada | Keputusan/gerbang sebelum lanjut | Bukti pada versi sekarang |
|---|---|---|---|---|
| 1. Framing | Siapa yang datang dan apa yang harus dipahami dalam sekali pindai? | Problem statement, hipotesis audiens, positioning satu kalimat | “Technical Product Specialist” jadi pusat narasi, bukan mengklaim tiga jabatan sekaligus | Home, About, `src/constants/content.ts` |
| 2. Inventaris konten | Apa bukti publik yang aman dan dapat dipertanggungjawabkan? | Matriks: fakta kerja, proyek, contoh ilustratif, aset CV/foto, artikel | Bedakan kontribusi, capaian proyek, dan contoh yang tidak berasal dari klien | About, Projects, Data, 12 MDX |
| 3. Arsitektur informasi | Jalur tercepat dari perkenalan ke bukti dan kontak? | Sitemap, user flow, urutan section/CTA | Hero harus menjawab identitas; halaman Data/Projects memberikan konteks sebelum CTA | Nav, Home, About, Data, Projects, Articles |
| 4. Arah visual | Bagaimana terlihat teknis dan personal tanpa menjadi dashboard generik? | Moodboard/low-fidelity sebagai **usulan artefak**, aturan warna, tipe, grid, komponen | Gunakan tipografi dan whitespace sebagai prioritas; motion hanya membantu orientasi | `src/app/globals.css`, komponen UI, [design system](./03-design-system.md) |
| 5. Build & konten | Apa yang harus statis dan apa yang perlu interaksi browser? | Komponen halaman, sumber konten, keputusan routing/SEO | Artikel build-time; interaksi client-side untuk filter, tema, modal, chat statis | Next static export, MDX, `src/i18n/` |
| 6. Verifikasi | Apakah situs dapat dibaca dan dipakai lintas kondisi? | Checklist manual + lint/build + tes E2E desktop/mobile | Jangan menyatakan selesai sebelum rute, konten, overflow, dan domain lolos | `docs/testing.md`, `tests/e2e/site.spec.ts` |
| 7. Publikasi & iterasi | Apa yang sudah benar-benar live dan apa pelajaran yang dapat dibagikan? | Preview, screenshot versi aktual, caption, backlog | Verifikasi domain produksi; jangan mengklaim halaman lokal sudah live | Workflow deploy ke Cloudflare Pages; [LinkedIn kit](./05-linkedin-content-kit.md) |

### Alur kerja per jenis pekerjaan

**Konten:** cek fakta profil/CV → susun headline dan ringkasan kontribusi → pisahkan contoh ilustratif → tulis Home/About/Projects/Data → tandai copy yang perlu diterjemahkan → review tiap artikel/metadata di URL padanan.

**Visual:** tentukan hierarki sebelum efek → uji hero pada laptop kecil dan mobile → tetapkan ritme section + batas lebar baca → terapkan state light/dark + fokus keyboard → gunakan gerak hanya ketika membantu (mis. progres baca, hover, potret 3D).

**Engineering:** pilih static export → petakan rute yang bisa diprerender → baca MDX di build → sambungkan metadata/hreflang/sitemap → tambahkan interaksi browser tanpa API runtime → jalankan lint, build, dan E2E terhadap hasil `out/`.

**Review:** periksa klaim publik dan privasi → lihat screenshot nyata, bukan mockup yang berbeda dari implementasi → uji pemilih bahasa pada artikel panjang → pastikan contoh Mermaid tetap terbaca saat digulir → verifikasi URL domain produksi sebelum menekan Publish di LinkedIn.

## Trade-off yang layak diceritakan

| Pilihan | Mengapa masuk akal | Konsekuensi yang perlu jujur disebut |
|---|---|---|
| Static export alih-alih backend aplikasi | Hosting sederhana; konten profil dan artikel dapat diprerender | Tidak ada CMS runtime atau jawaban AI generatif real-time |
| Chat profil berbasis aturan | Pengunjung dapat bertanya hal umum tanpa API/model eksternal | Hanya menjawab topik profil yang didukung, bukan chatbot pengetahuan umum |
| `/data` menampilkan contoh SQL/Python | Memberi bentuk konkret pada cara bekerja | Contoh **ilustratif**, bukan pipeline klien atau benchmark produk |
| Tiap bahasa punya URL | Pengunjung bisa membagikan halaman setara; metadata bahasa lebih jelas | Perlu pemeliharaan semua versi konten dan pengecekan terjemahan |
| WebGL sebagai pelengkap potret | Memberi identitas visual tanpa mengganti foto asli | Tidak boleh menjadi satu-satunya cara melihat foto; fallback harus tetap ada |
| Diagram dimuat dekat viewport | Halaman artikel panjang tetap lebih responsif saat dibuka | Diagram muncul setelah halaman didekati/digulir, bukan dirender semua di awal |

## Riwayat yang dapat dibuktikan vs ideasi yang tidak tercatat

`git log` memperlihatkan commit awal scaffolding Next pada **25 Juni 2024** (`98d36fd`), pekerjaan chat profil statis pada **18 Mei 2026** (`0225f28`), serta pembaruan positioning/UI pada **1 Juni 2026** (`520b874`). Versi multibahasa dan pembaruan terbaru terlihat pada **working tree saat dokumen ini disusun**, bukan otomatis pada commit atau situs produksi. Commit-commit ini menunjukkan **iterasi kode**, bukan bukti kapan ide pertama muncul atau bahwa persona/wireframe pernah diuji. Tanggal “launch” pada arsip changelog lama tidak dipakai sebagai fakta sejarah produk tanpa konfirmasi pemilik.

## Roadmap jika ingin diteruskan (usulan, belum dilaksanakan)

1. **Sebelum membagikan:** konfirmasi perubahan benar-benar terdeploy; review konten per bahasa dengan penutur yang sesuai; pilih screenshot terbaru; pastikan informasi klien aman.
2. **Iterasi visual:** siapkan foto profil profesional dengan izin dan aset sumber dari pemilik; uji potret baru di light/dark dan ukuran kecil.
3. **Validasi produk:** minta 3–5 pembaca dari audiens berbeda mencoba alur “pahami peran → temukan bukti → hubungi”, lalu catat bagian yang membingungkan. Jumlah ini **saran riset ke depan**, bukan studi yang sudah dilakukan.
4. **Iterasi konten:** perbarui artikel, studi kasus publik, dan CV ketika fakta kerja berubah; jangan menambahkan angka performa website tanpa pengukuran yang sah.

## Jika dijadikan seri LinkedIn

- **Posting 1 — Masalah dan positioning:** mengapa situs pribadi perlu lebih dari CV online.
- **Posting 2 — Design decisions:** content hierarchy, tipografi, warna, interaksi, dark mode.
- **Posting 3 — Engineering trade-offs:** static export, MDX, tiga bahasa, chat statis, validasi.

Posting 1 dapat langsung menggunakan [caption utama dalam LinkedIn kit](./05-linkedin-content-kit.md). Posting lanjutan sebaiknya memakai screenshot nyata agar proses dapat dilihat, bukan hanya diklaim.
