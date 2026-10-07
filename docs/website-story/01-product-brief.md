# 01 — Product brief: website sebagai peta kerja, bukan CV panjang

**Status:** blueprint retrospektif + pemetaan ke situs yang ada. **Bukan** PRD asli yang diklaim ditulis sebelum proyek dimulai.

## 1. Masalah yang hendak dijawab

Perjalanan dari frontend/software engineering ke peran **Technical Product Specialist di Indivara Group** membuat satu label pekerjaan saja tidak cukup menjelaskan kontribusi. Pengunjung yang baru mengenal Zainal perlu cepat memahami hubungan antara **product delivery, data solutions, dan client implementation**, lalu menemukan bukti yang relevan tanpa membaca seluruh CV.

Sebuah halaman profil bisa gagal ketika setiap pengalaman diperlakukan sama pentingnya, metrik karier tercampur dengan performa situs, atau contoh teknis tampil seolah berasal dari sistem klien. Brief ini mengusulkan hierarki: **identitas → fokus kerja → bukti → kedalaman → tindakan**.

## 2. Pernyataan produk

> Sebuah personal website multibahasa yang menjelaskan cara Zainal menghubungkan kebutuhan produk, pekerjaan data, dan engineering sampai implementasi; cukup cepat dipindai untuk perekrut, tetapi cukup dalam untuk calon kolaborator dan pembaca teknis.

**Janji konten:** jelas tentang peran sekarang, spesifik tentang kontribusi, terbuka tentang batas contoh ilustratif, dan tidak menyebut chat statis sebagai AI generatif yang terhubung ke model.

## 3. Audiens, kebutuhan, dan jalur yang disediakan

| Audiens yang diasumsikan dalam blueprint | Pertanyaan ketika membuka situs | Jalur konten saat ini |
|---|---|---|
| Recruiter atau hiring manager | “Peran saat ini apa, apa dampaknya, dan di mana CV-nya?” | Hero → ringkasan dampak → About → CV/kontak |
| Calon kolaborator atau tim produk | “Bagaimana ia bekerja lintas kebutuhan, data, dan delivery?” | Home → Projects atau Data → About → LinkedIn |
| Engineer atau pembaca | “Bagaimana cara berpikir teknisnya?” | Data (contoh ilustratif) → Articles → profil |
| Pemilik situs | “Bagaimana memperbarui tulisan dan profil tanpa CMS runtime?” | Konten MDX dan copy terstruktur di repo; build static export |

Ini **hipotesis audiens**, bukan hasil riset atau wawancara yang pernah dilakukan. Validasi pengguna nyata masih bisa dilakukan setelah dipublikasikan.

## 4. Tujuan dan indikator penerimaan

| Tujuan produk | Indikator yang dapat diperiksa sekarang | Yang belum bisa diklaim |
|---|---|---|
| Positioning tidak ambigu | Peran **Technical Product Specialist** tampil di Home, About, metadata, serta jawaban chat profil | Pemahaman pengunjung tanpa wawancara/riset |
| Bukti mudah dipindai | Hero → dampak pilihan → area kerja → Projects/About/Data dengan tautan jelas | Rasio klik, lead, atau conversion rate |
| Kedalaman teknis tanpa membocorkan klien | SQL/Python/diagram di `/data` diberi label ilustratif; artikel dan 12 sumber MDX tersedia | Klaim bahwa contoh sama dengan arsitektur atau data klien |
| Terbaca di berbagai kondisi | Layout mobile, light/dark, keyboard labels, dan tes overflow; jalur English, Indonesia, Jawa | Audit aksesibilitas formal atau pengujian semua perangkat |
| Terbit tanpa server aplikasi | `output: "export"`; halaman/artikel diprerender, chat rule-based berjalan di browser | Layanan AI runtime, CMS, backend, atau analytics pengguna |

## 5. Ruang lingkup yang dipilih

**Prioritas pertama — cerita inti:** Home, About, Projects, Data, CTA ke CV/kontak. Halaman ini menjawab “siapa, mengerjakan apa, dan bagaimana ia berkontribusi”.

**Prioritas kedua — kedalaman:** Articles (daftar + detail 12 tulisan), Reading List, Uses, galeri, ringkasan perubahan, interaksi mikro. Konten ini memperpanjang percakapan tanpa menutupi cerita inti.

**Lintas halaman:** navigasi responsif, dark mode, pemilih bahasa yang mempertahankan halaman/slug, metadata/hreflang/sitemap, dan chat profil statis.

**Non-goals untuk versi yang ada:** login, dashboard personal, pelacakan pengunjung, CMS, API chat berbasis model, serta menampilkan source code/data internal klien. Foto profil profesional baru belum selesai dan tidak boleh dipresentasikan sebagai fitur yang telah dikirim.

## 6. Prinsip konten dan keamanan publikasi

1. Gunakan peran saat ini sebagai judul utama; pengalaman software dan data sebagai konteks, bukan pengganti jabatan.
2. Bedakan **kontribusi pribadi** dari hasil pipeline/proyek secara keseluruhan; angka karier yang tampil di situs bukan benchmark performa website.
3. Pertahankan nama produk dan istilah teknis yang tidak alami diterjemahkan, khususnya pada versi Jawa ngoko sopan.
4. Tandai contoh `/data` sebagai ilustratif; tidak ada detail implementasi privat, data klien, atau credentials.
5. Jadikan CV dan kontak jalan keluar yang dapat ditemukan tanpa menggantungkan konversi pada chat.

## 7. Batasan dan keputusan produk

- **Static-first:** halaman diprerender ke `out/`; pengunjung tetap bisa membaca konten inti ketika JavaScript terbatas. Interaksi seperti filter, tema, chat, modal, dan diagram membutuhkan browser.
- **Bahasa per URL:** English tanpa prefix; Indonesia `/id/...`; Jawa `/jv/...`. Setiap varian punya canonical dan alternatif bahasa sendiri.
- **Konten artikel di repo:** MDX untuk 12 tulisan; blok kode/diagram sumber tetap menjadi rujukan saat menerjemahkan.
- **Kehati-hatian naratif:** desain sistem berikut adalah dokumentasi *as-built* dan rasionalisasi keputusan, bukan bukti ada file Figma atau design review formal pada fase awal.

**Titik keputusan yang masih memerlukan masukan pemilik:** kalimat motivasi paling personal (“mengapa ingin membangun situs sendiri”), bukti sketsa/versi lama yang aman dibagikan, dan apakah target utama posting LinkedIn adalah recruiter, kolaborator, atau developer.
