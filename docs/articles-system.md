# Dokumentasi Sistem Artikel

## Ringkasan

Artikel di website personal sekarang menggunakan MDX (Markdown + JSX) untuk pengelolaan konten dinamis. Artikel disimpan sebagai file `.mdx` lokal alih-alih di-hardcode di TypeScript.

## Arsitektur

### Struktur File

```
ditazain.site/
├── content/
│   └── articles/
│       ├── building-modern-web-applications.mdx
│       ├── understanding-microservices.mdx
│       └── ... (total 10 artikel)
├── src/
│   └── utils/
│       └── articles.ts        # Utility untuk membaca MDX
└── src/app/
    └── articles/
        ├── page.tsx           # Menampilkan semua artikel
        └── [slug]/
            └── page.tsx       # Detail artikel + metadata
```

### Teknologi yang Digunakan

| Package | Fungsi |
|---------|--------|
| `gray-matter` | Parse frontmatter metadata dari MDX |
| `next-mdx-remote/rsc` | Render konten MDX di React Server Components |
| `@tailwindcss/typography` | Styling konten Markdown (headings, code, links, dll) |

### Styling Artikel

Styling menggunakan Tailwind Typography plugin (`prose` class). Konfigurasi tambahan di `tailwind.config.ts`:

```typescript
// tailwind.config.ts
plugins: [
  require('@tailwindcss/typography'),
],
```

Dan di halaman detail artikel:

```tsx
<article className="prose prose-lg dark:prose-invert max-w-none 
  prose-headings:dark:text-white 
  prose-a:text-blue-600 dark:prose-a:text-blue-400 
  prose-pre:bg-gray-800 dark:prose-pre:bg-gray-950 
  prose-code:text-blue-600 dark:prose-code:text-blue-400">
```

## Cara Kerja

### 1. Penyimpanan Artikel (`content/articles/*.mdx`)

Setiap artikel adalah file Markdown dengan frontmatter YAML:

```mdx
---
title: "Building Modern Web Applications with Next.js"
description: "A comprehensive guide..."
date: "2024-01-20"
readTime: "5 min read"
tags: ["Next.js", "React", "TypeScript"]
slug: "building-modern-web-applications"
---

# Konten dimulai dari sini...
```

### 2. Pengambilan Data (`src/utils/articles.ts`)

```typescript
// Mendapatkan semua artikel (diurutkan berdasarkan tanggal)
getAllArticles(): Article[]

// Mendapatkan satu artikel berdasarkan slug
getArticleBySlug(slug: string): Article | null
```

### 3. Halaman Daftar (`/articles`)

- Mengambil semua artikel melalui `getAllArticles()`
- Render sebagai server component
- Setiap artikel link ke `/articles/{slug}`
- Saat ini menampilkan **semua** artikel dalam satu halaman (belum ada pagination)

### 4. Halaman Detail (`/articles/[slug]`)

- Dynamic route menangkap parameter `slug`
- Mengambil konten artikel via `getArticleBySlug(slug)`
- Render MDX dengan `<MDXRemote />`
- Menghasilkan metadata dinamis (title, description, tags)
- Mengembalikan 404 jika artikel tidak ditemukan

### 5. Metadata Dinamis

Setiap halaman artikel menghasilkan metadata SEO-nya sendiri:

```typescript
export async function generateMetadata({ params }) {
  const article = getArticleBySlug(slug);
  return {
    title: `${article.title} | Zainal | @zaiinhs`,
    description: article.description,
    keywords: article.tags,
  };
}
```

## Pagination

> **Status:** belum diimplementasikan. Halaman `/articles` saat ini menampilkan
> semua artikel sekaligus. Pagination (mis. 5 artikel per halaman dengan query
> `?page=n`) masih berupa rencana — lihat bagian "Pengembangan Masa Depan".

## Menambah Artikel Baru

1. Buat file baru: `content/articles/{slug}.mdx`
2. Tambahkan frontmatter dengan field yang diperlukan
3. Tulis konten dalam Markdown
4. Commit dan deploy

## Field Frontmatter

| Field | Wajib | Deskripsi |
|-------|-------|-----------|
| `title` | Ya | Judul artikel |
| `description` | Ya | Deskripsi SEO (maks 160 karakter) |
| `date` | Ya | Tanggal publikasi (YYYY-MM-DD) |
| `readTime` | Ya | Estimasi waktu baca |
| `tags` | Ya | Array dari tags |
| `slug` | Ya | Identifier URL-friendly (nama file) |

## Riwayat Migrasi

### Sebelum (Statis)

- Artikel disimpan di `src/app/articles/data.ts` sebagai array TypeScript
- Konten adalah placeholder text
- Tidak ada dynamic routing
- Metadata global tunggal

### Sesudah (MDX)

- Artikel disimpan sebagai file `.mdx` di `content/articles/`
- Dukungan Markdown lengkap dengan code highlighting
- Dynamic routing dengan SSG (Static Site Generation)
- Metadata SEO per-artikel
- Komponen React dimungkinkan dalam konten
- Styling menggunakan `@tailwindcss/typography`

## Link Terkait

- [Homepage Articles Section](./homepage-articles.md) - Latest Articles di halaman utama

## Pengembangan Masa Depan

- [ ] Pagination (5 artikel per halaman)
- [ ] Tambahkan komponen MDX (callouts, code blocks)
- [ ] Implementasi perhitungan waktu baca otomatis
- [ ] Tambahkan table of contents
- [ ] Tambahkan navigasi artikel sebelumnya/berikutnya di detail page
- [ ] Generate RSS feed
