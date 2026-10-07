import { ImageResponse } from "next/og";
import { getAllArticles, getArticleBySlug } from "@/utils/articles";
import { SITE_URL } from "@/constants/site";

export const dynamic = "force-static";
export const alt = "Article by Zainal Abidin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export default async function ArticleOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const title = article?.title ?? "Article";

  return renderArticleOgImage(title, "articles");
}

export function renderArticleOgImage(title: string, label: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#111c2b",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, color: "#93c5fd" }}>
           {`${new URL(SITE_URL).hostname} / ${label}`}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ fontSize: 30, color: "#cbd5e1" }}>
          Zainal Abidin — Technical Product Specialist
        </div>
      </div>
    ),
    { ...size }
  );
}
