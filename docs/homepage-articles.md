# Homepage Articles Section

## Ringkasan

Section "Latest Articles" di halaman utama sekarang menampilkan artikel terbaru secara dinamis dari file MDX, bukan data statis.

## Perubahan

### Sebelum

- Data artikel di-hardcode di `src/components/Articles/index.tsx`
- Array statis dengan 3 artikel
- Link ke URL yang tidak ada

### Sesudah

- Mengambil data dari `src/utils/articles.ts`
- Menampilkan 3 artikel terbaru berdasarkan tanggal
- Link ke halaman detail artikel yang valid

## Struktur Komponen

```
src/components/Articles/
├── index.tsx          # Server component - fetch data
└── ArticlesList.tsx   # Client component - render UI
```

### index.tsx (Server Component)

```typescript
import { getAllArticles } from "@/utils/articles";
import ArticlesList from "./ArticlesList";

export default function Articles() {
  const allArticles = getAllArticles();
  const latestArticles = allArticles.slice(0, 3);

  return <ArticlesList articles={latestArticles} />;
}
```

### ArticlesList.tsx (Client Component)

```typescript
interface ArticlesListProps {
  articles: Article[];
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  // Render UI
}
```

## Alasan Pemisahan

Komponen dipisahkan karena:

1. **Server-side data fetching**: `getAllArticles()` menggunakan `fs` (file system) yang hanya berjalan di server
2. **Webpack limitation**: Next.js tidak bisa membundle `fs` module di client-side
3. **Solution**: Server component fetch data, lalu pass ke client component sebagai props

## Cara Kerja

1. Server component `Articles` fetch data dari MDX files
2. Ambil 3 artikel pertama (terbaru)
3. Pass array `articles` ke client component `ArticlesList`
4. `ArticlesList` render list dengan Link ke `/articles/{slug}`

## SEO Consideration & Static Export

Homepage (`src/app/(common)/page.tsx`) sekarang adalah **server component**. Ia
me-render `<Articles />` (juga server component) yang memanggil `getAllArticles()`
saat build, sehingga "Latest Articles" ikut ter-prerender ke HTML statis — aman
untuk `output: "export"`.

> **Riwayat bug:** sempat ada versi yang mengambil data via `fetch("/api/articles")`
> di client. Dengan `output: "export"`, API route tidak tersedia di production
> sehingga section ini kosong. Solusinya: hapus API route, kembali ke pola
> server component → `ArticlesList`. Interaksi (modal CV) dipindah ke komponen
> client kecil (`ResumeButton`) agar homepage tetap server component.

## Link Terkait

- [Sistem Artikel MDX](./articles-system.md)
