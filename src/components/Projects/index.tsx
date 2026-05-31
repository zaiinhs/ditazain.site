import { ArrowUpRight, Database, Globe } from "lucide-react";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  status: "Completed" | "In Progress" | "Ongoing";
  category: "Data Engineering" | "Software Engineering";
};

const projects: Project[] = [
  {
    title: "Personal Website (this site)",
    description:
      "A modern personal site and portfolio built with Next.js 16, React 19, and Tailwind CSS v4. Static-exported to Cloudflare, with MDX articles, dark mode, a static AI assistant, and a Data Engineering showcase.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MDX"],
    link: "https://github.com/zaiinhs",
    status: "Ongoing",
    category: "Software Engineering",
  },
  {
    title: "Sales Analytics Data Pipeline",
    description:
      "End-to-end ELT pipeline: ingest raw sales data, stage it in a warehouse, and transform it into clean fact/dimension tables for reporting. Orchestrated runs with scheduling, with data-quality checks at each stage.",
    technologies: ["Python", "SQL", "Airflow", "dbt", "PostgreSQL"],
    link: "https://github.com/zaiinhs",
    status: "Completed",
    category: "Data Engineering",
  },
  {
    title: "Data Cleaning & Transformation Toolkit",
    description:
      "Reusable Python + SQL utilities for profiling, cleaning, deduplicating, and normalizing messy datasets into analysis-ready tables — the kind of transform work that powers dashboards and ML features.",
    technologies: ["Python", "Pandas", "SQL", "BigQuery"],
    link: "https://github.com/zaiinhs",
    status: "Ongoing",
    category: "Data Engineering",
  },
  {
    title: "Spotify Clone (Generasi GIGIH)",
    description:
      "A Spotify API clone with login, playlist creation, and music browsing — built during the Generasi GIGIH 2.0 program with instructors from Gojek and Tokopedia.",
    technologies: ["React", "TypeScript", "Chakra UI", "Redux"],
    link: "https://github.com/zaiinhs",
    status: "Completed",
    category: "Software Engineering",
  },
];

export default function Projects() {
  return (
    <section className="w-full">
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold dark:text-white">Projects</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A mix of data engineering pipelines and software products I&apos;ve
          built. For data work, also check the{" "}
          <Link href="/data" className="text-blue-600 underline dark:text-blue-400">
            Data
          </Link>{" "}
          page.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <Link
            href={project.link}
            key={project.title}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <article className="rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-blue-700">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      project.category === "Data Engineering"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
                        : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300"
                    }`}
                  >
                    {project.category === "Data Engineering" ? (
                      <Database className="h-5 w-5" />
                    ) : (
                      <Globe className="h-5 w-5" />
                    )}
                  </span>
                  <h2 className="text-lg font-semibold text-black group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {project.title}
                  </h2>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>

              <p className="mb-4 text-gray-600 dark:text-gray-400">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
                <span
                  className={`ml-auto rounded-full px-3 py-1 text-xs font-medium ${
                    project.status === "Completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
