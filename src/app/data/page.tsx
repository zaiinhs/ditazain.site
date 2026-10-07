import { Footer, Navbar } from "@/components";
import CodeBlock from "@/components/CodeBlock";
import { Mermaid } from "@/components/Mermaid";
import {
  ArrowRight,
  Boxes,
  Database,
  GitBranch,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { Locale, languageAlternates, localizedPath } from "@/i18n";
import { getMessages } from "@/i18n/messages";

export const metadata: Metadata = {
  title: "Data solutions",
  description:
    "How I work across data solutions: cleaning and standardization with Python and SQL, API delivery, and analytics dashboards.",
  alternates: { canonical: "/data", languages: languageAlternates("/data") },
  openGraph: {
    title: "Data solutions | Zainal Abidin",
    description:
      "Data cleaning, standardization, SQL transformations and API/dashboard delivery.",
    type: "website",
    url: "/data",
  },
};

const capabilities = [
  {
    icon: <Database className="h-5 w-5" />,
    title: "Understand",
    description:
      "Trace source data and business rules before deciding how a product or report should use them.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Transform",
    description:
      "Clean and standardize source records with Python and SQL, keeping transformation rules clear.",
  },
  {
    icon: <Boxes className="h-5 w-5" />,
    title: "Deliver",
    description:
      "Serve analysis-ready datasets for dashboards, reporting, and product features.",
  },
];

const stack = [
  { group: "Core", items: ["SQL", "Python", "TypeScript"] },
  { group: "Data work", items: ["Cleaning", "Standardization", "Transformation"] },
  { group: "Delivery", items: ["REST APIs", "Dashboards", "PostgreSQL"] },
  { group: "Deployment", items: ["Docker", "Linux / VM", "Git"] },
];

const sqlSample = `-- Daily revenue per customer, deduplicated and cleaned
WITH ranked_orders AS (
  SELECT
    customer_id,
    order_id,
    order_date::date           AS order_day,
    amount,
    ROW_NUMBER() OVER (
      PARTITION BY order_id
      ORDER BY updated_at DESC
    ) AS rn                       -- keep the latest version of each order
  FROM raw.orders
  WHERE status = 'paid'
    AND amount > 0
)
SELECT
  customer_id,
  order_day,
  COUNT(*)            AS orders,
  SUM(amount)         AS revenue,
  ROUND(AVG(amount),2) AS avg_order_value
FROM ranked_orders
WHERE rn = 1            -- drop duplicate order rows
GROUP BY customer_id, order_day
ORDER BY order_day DESC, revenue DESC;`;

const pythonSample = `import pandas as pd
from sqlalchemy import create_engine

def transform_orders(raw_path: str) -> pd.DataFrame:
    """Extract raw orders, clean them, return analysis-ready rows."""
    df = pd.read_csv(raw_path)

    # 1. Standardize & clean
    df.columns = [c.strip().lower() for c in df.columns]
    df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")
    df = df.dropna(subset=["order_id", "customer_id", "order_date"])

    # 2. Keep only valid, paid orders and drop duplicates
    df = df[(df["status"] == "paid") & (df["amount"] > 0)]
    df = df.sort_values("updated_at").drop_duplicates("order_id", keep="last")

    # 3. Derive features
    df["order_day"] = df["order_date"].dt.date
    df["revenue"] = df["amount"].round(2)
    return df[["customer_id", "order_day", "order_id", "revenue"]]

def load(df: pd.DataFrame, table: str, dsn: str) -> int:
    engine = create_engine(dsn)
    df.to_sql(table, engine, schema="marts", if_exists="replace", index=False)
    return len(df)

if __name__ == "__main__":
    clean = transform_orders("data/raw/orders.csv")
    rows = load(clean, "fct_orders", "postgresql://localhost/warehouse")
    print(f"Loaded {rows} clean rows into marts.fct_orders")`;

const pipelineChart = `flowchart LR
  A[Sources<br/>APIs · CSV · DB] --> B[Ingestion<br/>Python / Extract]
  B --> C[(Raw / Staging<br/>Data)]
  C --> D[Transform<br/>Python · SQL]
  D --> E[(Analytics-ready data)]
  E --> F[Dashboard APIs]
  E --> G[Product Features]
  D -.->|validation| H{Data Quality<br/>Checks}`;

export default function DataPage({ locale = "en" }: { locale?: Locale }) {
  const text = getMessages(locale).data;
  return (
    <div className="min-h-screen px-4 sm:px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <Navbar locale={locale} />

      <main id="main-content" className="mt-10 flex w-full flex-1 flex-col sm:mt-14">
        {/* Hero */}
        <section className="relative">
          <p className="text-sm font-semibold tracking-wide text-blue-700 dark:text-blue-300">
            {text.label}
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-gray-950 sm:text-5xl dark:text-white">
            {text.title}
          </h1>
          <p className="mt-4 max-w-[65ch] text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 dark:text-gray-400">
            {text.intro}
          </p>
        </section>

        {/* Capabilities */}
        <section className="mt-12 grid grid-cols-1 gap-0 border-y border-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-gray-200 dark:border-gray-800 dark:sm:divide-gray-800">
          {capabilities.map((cap, index) => (
            <article
              key={cap.title}
              className="border-b border-gray-200 py-5 last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0 dark:border-gray-800"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                {cap.icon}
              </span>
              <h3 className="mt-3 font-semibold text-gray-950 dark:text-white">{text.capabilities[index][0]}</h3>
              <p className="mt-1 max-w-[34ch] text-sm leading-6 text-gray-600 dark:text-gray-400">
                {text.capabilities[index][1]}
              </p>
            </article>
          ))}
        </section>

        {/* Stack */}
        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-semibold text-gray-950 dark:text-white">
            {text.tools}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stack.map((col, index) => (
              <div key={col.group}>
                <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  {text.stackGroups[index]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {col.items.map((item, itemIndex) => (
                    <span
                      key={item}
                      className="rounded-lg bg-gray-100 px-2.5 py-1 font-mono text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {index === 1 ? text.stackItems[itemIndex] : index === 2 && itemIndex === 1 ? text.stackItems[3] : item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 border-y border-gray-200 py-7 dark:border-gray-800" aria-labelledby="bersama-case-heading">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Project Bersama
            </p>
            <h2 id="bersama-case-heading" className="mt-2 text-2xl font-semibold tracking-tight text-gray-950 dark:text-white">
              {text.caseTitle}
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {text.caseIntro}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-gray-800">
            <div className="py-3 sm:py-0 sm:pr-5">
              <p className="font-mono text-2xl font-semibold tabular-nums text-gray-950 dark:text-white">1.7M+</p>
              <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">{text.metrics[0]}</p>
            </div>
            <div className="py-3 sm:px-5 sm:py-0">
              <p className="font-mono text-2xl font-semibold tabular-nums text-gray-950 dark:text-white">6.4M+</p>
              <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">{text.metrics[1]}</p>
            </div>
            <div className="py-3 sm:pl-5 sm:py-0">
              <p className="font-mono text-2xl font-semibold tabular-nums text-gray-950 dark:text-white">{text.upTo}</p>
              <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">{text.metrics[2]}</p>
            </div>
          </div>
        </section>

        {/* SQL sample */}
        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-semibold dark:text-white">
            {text.sqlTitle}
          </h2>
          <p className="mb-5 text-gray-600 dark:text-gray-400">
            {text.sqlIntro}
          </p>
          <CodeBlock code={sqlSample} language="sql" filename="daily_revenue.sql" locale={locale} />
        </section>

        {/* Python sample */}
        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-semibold dark:text-white">
            {text.pythonTitle}
          </h2>
          <p className="mb-5 text-gray-600 dark:text-gray-400">
            {text.pythonIntro}
          </p>
          <CodeBlock code={pythonSample} language="python" filename="transform_orders.py" locale={locale} />
        </section>

        {/* Pipeline diagram */}
        <section className="mt-12">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-semibold dark:text-white">
            <GitBranch className="h-5 w-5 text-blue-500" />
            {text.workflowTitle}
          </h2>
          <p className="mb-5 text-gray-600 dark:text-gray-400">
            {text.workflowIntro}
          </p>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <Mermaid chart={pipelineChart} />
          </div>
        </section>

        {/* Case study */}
        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-semibold text-gray-950 dark:text-white">
            {text.exampleTitle}
          </h2>
          <p className="mb-5 text-gray-600 dark:text-gray-400">
            {text.exampleIntro}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="bg-red-50 px-4 py-2 text-sm font-medium text-red-700 dark:bg-red-950/40 dark:text-red-300">
                {text.raw}
              </div>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-left text-sm">
                  <thead className="text-gray-400">
                    <tr>
                      <th className="pb-2 pr-3 font-medium">customer</th>
                      <th className="pb-2 pr-3 font-medium">date</th>
                      <th className="pb-2 font-medium">amount</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-gray-600 dark:text-gray-400">
                    <tr>
                      <td className="py-1 pr-3">  Andi </td>
                      <td className="py-1 pr-3">12/03/26</td>
                      <td className="py-1">&quot;150.000&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-3">andi</td>
                      <td className="py-1 pr-3">2026-03-12</td>
                      <td className="py-1">150000</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-3">Budi</td>
                      <td className="py-1 pr-3">null</td>
                      <td className="py-1">-5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="bg-green-50 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-950/40 dark:text-green-300">
                {text.clean}
              </div>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-left text-sm">
                  <thead className="text-gray-400">
                    <tr>
                      <th className="pb-2 pr-3 font-medium">customer_id</th>
                      <th className="pb-2 pr-3 font-medium">order_day</th>
                      <th className="pb-2 font-medium">revenue</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-gray-600 dark:text-gray-400">
                    <tr>
                      <td className="py-1 pr-3">andi</td>
                      <td className="py-1 pr-3">2026-03-12</td>
                      <td className="py-1">150000</td>
                    </tr>
                    <tr className="text-gray-400 line-through decoration-red-400">
                      <td className="py-1 pr-3">budi</td>
                      <td className="py-1 pr-3">—</td>
                      <td className="py-1">invalid</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-3 text-xs text-gray-400">
                  {text.tableNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="my-14 border-y border-gray-200 py-9 dark:border-gray-800">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-950 dark:text-white">
            {text.ctaTitle}
          </h2>
          <p className="mt-2 max-w-xl text-gray-600 dark:text-gray-400">
            {text.ctaIntro}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="https://linkedin.com/in/zaiinhs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-white dark:text-gray-950 dark:hover:bg-blue-100"
            >
               {locale === "en" ? "Connect on LinkedIn" : locale === "id" ? "Hubungi lewat LinkedIn" : "Hubungi liwat LinkedIn"}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
               href={localizedPath(locale, "/projects")}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-blue-500 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-700 dark:text-gray-100 dark:hover:border-blue-500 dark:hover:text-blue-300"
            >
               {locale === "en" ? "See projects" : locale === "id" ? "Lihat proyek" : "Deleng proyek"}
            </Link>
          </div>
        </section>
      </main>
       <Footer locale={locale} />
    </div>
    </div>
  );
}
