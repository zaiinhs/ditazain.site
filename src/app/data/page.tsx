import { Footer, Navbar } from "@/components";
import CodeBlock from "@/components/CodeBlock";
import { Mermaid } from "@/components/Mermaid";
import {
  ArrowRight,
  Boxes,
  Database,
  GitBranch,
  Sparkles,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Engineering",
  description:
    "How I work as a Data Engineer — SQL, Python, ETL/ELT pipelines, and data transformation. Sample queries, a Python pipeline, and architecture diagrams.",
  alternates: { canonical: "/data" },
  openGraph: {
    title: "Data Engineering | Zainal Abidin",
    description:
      "How I work as a Data Engineer — SQL, Python, ETL/ELT pipelines, and data transformation.",
    type: "website",
    url: "/data",
  },
};

const capabilities = [
  {
    icon: <Database className="h-5 w-5" />,
    title: "Ingest",
    description:
      "Pull data from APIs, files, and databases into a warehouse — incrementally and reliably.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Transform",
    description:
      "Turn raw, messy data into clean, modeled fact & dimension tables with SQL and Python.",
  },
  {
    icon: <Boxes className="h-5 w-5" />,
    title: "Deliver",
    description:
      "Serve analysis-ready datasets for dashboards, reporting, and product features.",
  },
];

const stack = [
  { group: "Languages", items: ["SQL", "Python"] },
  { group: "Transformation", items: ["dbt", "Pandas", "Window Functions"] },
  { group: "Orchestration", items: ["Airflow", "Cron", "CI/CD"] },
  { group: "Storage", items: ["PostgreSQL", "BigQuery", "Parquet"] },
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
  B --> C[(Raw / Staging<br/>Warehouse)]
  C --> D[Transform<br/>SQL · dbt]
  D --> E[(Marts<br/>Fact + Dim)]
  E --> F[BI Dashboards]
  E --> G[Product Features / ML]
  D -.->|tests| H{Data Quality<br/>Checks}`;

export default function DataPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="w-full max-w-screen-md">
        <Navbar />
      </div>

      <main className="mt-16 flex w-full max-w-screen-md flex-col">
        {/* Hero */}
        <section className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 right-0 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-400 opacity-25 blur-3xl dark:opacity-15"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            Data Engineering Focus
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight dark:text-white sm:text-5xl">
            Building reliable data pipelines
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            My current focus is Data Engineering: ingesting raw data,
            transforming it with SQL and Python, and delivering clean datasets
            that products and teams can trust. Here&apos;s how I work — with real
            samples.
          </p>
        </section>

        {/* Capabilities */}
        <section className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                {cap.icon}
              </span>
              <h3 className="mt-3 font-semibold dark:text-white">{cap.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {cap.description}
              </p>
            </div>
          ))}
        </section>

        {/* Stack */}
        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-semibold dark:text-white">
            Data Stack
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stack.map((col) => (
              <div key={col.group}>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {col.group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {col.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg bg-gray-100 px-2.5 py-1 font-mono text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SQL sample */}
        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-semibold dark:text-white">
            Transforming with SQL
          </h2>
          <p className="mb-5 text-gray-600 dark:text-gray-400">
            Deduplicating raw orders and aggregating daily revenue per customer
            using window functions.
          </p>
          <CodeBlock code={sqlSample} language="sql" filename="daily_revenue.sql" />
        </section>

        {/* Python sample */}
        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-semibold dark:text-white">
            ETL with Python
          </h2>
          <p className="mb-5 text-gray-600 dark:text-gray-400">
            A small, readable extract → transform → load job with cleaning,
            deduplication, and feature derivation.
          </p>
          <CodeBlock code={pythonSample} language="python" filename="transform_orders.py" />
        </section>

        {/* Pipeline diagram */}
        <section className="mt-12">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-semibold dark:text-white">
            <GitBranch className="h-5 w-5 text-blue-500" />
            Pipeline Architecture
          </h2>
          <p className="mb-5 text-gray-600 dark:text-gray-400">
            A typical ELT flow I build — from sources to analytics-ready marts,
            with data-quality checks along the way.
          </p>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <Mermaid chart={pipelineChart} />
          </div>
        </section>

        {/* Case study */}
        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-semibold dark:text-white">
            Transform in Action
          </h2>
          <p className="mb-5 text-gray-600 dark:text-gray-400">
            Raw data is rarely clean. Here&apos;s a before/after of a typical
            transform step.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="bg-red-50 px-4 py-2 text-sm font-medium text-red-700 dark:bg-red-950/40 dark:text-red-300">
                Raw — messy
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
                Clean — modeled
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
                  Duplicates merged, dates normalized, invalid rows dropped.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="my-14 rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center dark:border-gray-700 dark:from-blue-950/30 dark:to-indigo-950/30">
          <h2 className="text-2xl font-semibold dark:text-white">
            Looking for a Data Engineer?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-gray-600 dark:text-gray-400">
            I love turning messy data into clean, reliable pipelines. Let&apos;s
            talk about your data challenges.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href="https://linkedin.com/in/zaiinhs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-600 dark:bg-white dark:text-gray-900 dark:hover:bg-blue-500 dark:hover:text-white"
            >
              Connect on LinkedIn
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-800 transition hover:border-blue-400 hover:text-blue-600 dark:border-gray-600 dark:text-gray-100 dark:hover:border-blue-500 dark:hover:text-blue-300"
            >
              See projects
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
