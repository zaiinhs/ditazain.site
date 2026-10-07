import { notFound } from "next/navigation";
import { isLocale } from "@/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "id" }, { locale: "jv" }];
}

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return children;
}
