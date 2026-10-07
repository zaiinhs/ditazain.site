import Link from "next/link";
import { Locale, localizedPath } from "@/i18n";
import { getMessages } from "@/i18n/messages";

const projects = [
  {
    number: "01",
    title: "Delman Data Lab",
    context: "Product delivery · Indivara Group",
    description:
      "Helped maintain product momentum through Delman’s acquisition by Indivara, from feature improvements and full-stack issue resolution to repository migration and deployment.",
    outcome:
      "Supported client SIT/UAT and acceptance, plus a Docker-free DDL deployment on an SMBC production VM in October 2026.",
    stack: "React · Next.js · Python · Docker · Linux / VM",
  },
  {
    number: "02",
    title: "Bersama analytics & data standardization",
    context: "Data solutions · Project Bersama",
    description:
      "Contributed to data cleaning, product standardization, SQL transformations, and API/dashboard delivery with the joint Delman–Bersama team.",
    outcome:
      "The broader pipeline handled 1.7M+ source product records and produced 6.4M+ analytics rows. Contributed to forecasting work associated with accuracy improvements of up to 50%.",
    stack: "Python · SQL · PostgreSQL · REST APIs · Dashboards",
  },
  {
    number: "03",
    title: "SamaSamaApps Philippines",
    context: "API reliability · Analytics product",
    description:
      "Worked on API and dashboard data improvements, connecting product requirements with implementation and troubleshooting.",
    outcome:
      "Optimized 10+ API endpoints across Bersama and SamaSamaApps to improve service reliability and dashboard data accuracy.",
    stack: "Python · SQL · REST APIs · Data validation",
  },
  {
    number: "04",
    title: "Seedbox notification demo",
    context: "Client discovery · UAT preparation",
    description:
      "Built a Python demo script and reusable HTML email template to demonstrate DDL-triggered notifications to third-party systems.",
    outcome:
      "Discussed notification requirements with users and prepared a concrete scenario for UAT review.",
    stack: "Python · HTML email · Requirements discovery",
  },
];

export default function Projects({ locale = "en" }: { locale?: Locale }) {
  const text = getMessages(locale).projects;
  return (
    <section className="w-full">
      <header className="max-w-3xl border-b border-gray-200 pb-8 dark:border-gray-800">
        <p className="mb-3 text-sm font-semibold tracking-wide text-blue-700 dark:text-blue-300">
           {text.label}
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-[-0.045em] text-gray-950 sm:text-5xl dark:text-white">
           {text.title}
        </h1>
        <p className="mt-4 max-w-[62ch] text-base leading-7 text-gray-600 dark:text-gray-400">
           {text.intro}
        </p>
      </header>

      <div className="mt-3 border-b border-gray-200 dark:border-gray-800">
         {projects.map((project, index) => (
          <article
            key={project.number}
            className="grid gap-3 border-t border-gray-200 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 sm:py-9 dark:border-gray-800"
          >
            <p className="font-mono text-sm font-medium text-blue-700 tabular-nums dark:text-blue-300">
              {project.number}
            </p>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                 {text.entries[index][1]}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-950 sm:text-2xl dark:text-white">
                 {text.entries[index][0]}
              </h2>
              <p className="mt-3 max-w-[70ch] text-sm leading-6 text-gray-600 dark:text-gray-400">
                 {text.entries[index][2]}
              </p>
              <div className="mt-4 grid gap-2 border-l-2 border-blue-600 pl-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4 dark:border-blue-400">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                   {text.contribution}
                </p>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                   {text.entries[index][3]}
                </p>
              </div>
              <p className="mt-4 text-xs leading-5 text-gray-500 dark:text-gray-500">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                   {text.tools}
                </span>
                {project.stack}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <Link
           href={localizedPath(locale, "/about")}
          className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:text-blue-300 dark:hover:text-blue-200"
        >
           {text.experience}
        </Link>
        <Link
           href={localizedPath(locale, "/data")}
          className="font-medium text-gray-600 underline decoration-gray-300 underline-offset-4 transition hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:text-gray-400 dark:decoration-gray-700 dark:hover:text-white"
        >
           {text.data}
        </Link>
      </div>
    </section>
  );
}
