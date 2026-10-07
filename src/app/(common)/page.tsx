import { Footer, Navbar, PhotoGallery, Socmed } from "@/components";
import Articles from "@/components/Articles";
import HeroExperience3D from "@/components/HeroExperience3D";
import ResumeButton from "@/components/ResumeButton";
import TypewriterRole from "@/components/TypewriterRole";
import { CURRENT_ROLE, ROLES, SELECTED_IMPACTS } from "@/constants/content";
import { ArrowUpRight, Database, Layers3, Workflow } from "lucide-react";
import Link from "next/link";
import { Locale, localizedPath } from "@/i18n";
import { getMessages } from "@/i18n/messages";

const workAreas = [
  {
    number: "01",
    icon: <Layers3 className="h-5 w-5" aria-hidden="true" />,
    title: "Product delivery",
    description:
      "Turn business needs into scoped features, technical decisions and reliable releases.",
  },
  {
    number: "02",
    icon: <Database className="h-5 w-5" aria-hidden="true" />,
    title: "Data solutions",
    description:
      "Clean and standardize data, shape SQL workflows, and deliver useful APIs and dashboards.",
  },
  {
    number: "03",
    icon: <Workflow className="h-5 w-5" aria-hidden="true" />,
    title: "Client implementation",
    description:
      "Coordinate engineering, infrastructure and product teams through integration, UAT and deployment.",
  },
];

export default function HomePage({ locale = "en" }: { locale?: Locale }) {
  const text = getMessages(locale).home;
  return (
    <div className="min-h-screen px-4 sm:px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <Navbar locale={locale} />

        <main id="main-content" className="flex-1">
          <section className="grid grid-cols-1 items-center gap-7 py-8 sm:py-10 lg:min-h-[min(78dvh,760px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)] lg:gap-14 lg:py-14">
            <div className="order-2 max-w-2xl lg:order-1">
              <p className="mb-4 flex min-h-6 items-center gap-2 text-sm font-semibold tracking-wide text-blue-700 dark:text-blue-300">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"
                />
                {CURRENT_ROLE.title} <span className="text-gray-400">{text.at}</span>{" "}
                {CURRENT_ROLE.company}
              </p>

              <h1 className="max-w-[12ch] text-balance text-[clamp(2.8rem,6.1vw,5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-gray-950 dark:text-white">
                {text.title}
              </h1>

              <p className="mt-5 max-w-[58ch] text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 dark:text-gray-300">
                {text.description}
              </p>

              <p className="mt-4 min-h-6 text-sm text-gray-500 dark:text-gray-400">
                {text.background}{" "}
                <TypewriterRole
                  roles={ROLES.slice(1)}
                  className="font-medium text-gray-800 dark:text-gray-200"
                />
                <span className="mx-2 text-gray-300 dark:text-gray-700">/</span>
                {text.location}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ResumeButton locale={locale} />
                <Link
                  href={localizedPath(locale, "/projects")}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-800 transition duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-700 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-700 dark:text-gray-100 dark:hover:border-blue-400 dark:hover:text-blue-300"
                >
                  {text.selectedWork}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="mt-6">
                <Socmed />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <HeroExperience3D locale={locale} />
            </div>
          </section>

          <section
            aria-labelledby="impact-heading"
            className="border-y border-gray-200 py-7 dark:border-gray-800"
          >
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <h2
                id="impact-heading"
                className="text-sm font-semibold text-gray-900 dark:text-white"
              >
                {text.impact}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {text.impactContext}
              </p>
            </div>
            <div className="grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-gray-800">
              {SELECTED_IMPACTS.map((impact, index) => (
                <div
                  key={impact.value}
                  className="flex items-baseline gap-3 py-4 first:pt-0 last:pb-0 sm:block sm:px-5 sm:py-1 sm:first:pl-0 sm:last:pr-0"
                >
                  <p className="min-w-20 font-mono text-3xl font-semibold tracking-tight text-gray-950 tabular-nums sm:min-w-0 dark:text-white">
                    {impact.value}
                  </p>
                  <p className="max-w-[26ch] text-sm leading-5 text-gray-600 dark:text-gray-400">
                    {text.impactLabels[index]}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-14 sm:py-20" aria-labelledby="work-areas-heading">
            <div className="max-w-2xl">
              <h2
                id="work-areas-heading"
                className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl dark:text-white"
              >
                {text.workTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">
                {text.workDescription}
              </p>
            </div>

            <div className="mt-9 grid grid-cols-1 gap-0 md:grid-cols-3 md:divide-x md:divide-gray-200 dark:md:divide-gray-800">
              {workAreas.map((area, index) => (
                <article
                  key={area.number}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-gray-200 py-5 first:border-t md:block md:px-6 md:py-2 md:first:pl-0 md:last:pr-0 dark:border-gray-800"
                >
                  <span className="row-span-2 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700 md:mb-4 dark:bg-blue-950/60 dark:text-blue-300">
                    {area.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    <span className="mr-2 font-mono text-xs font-medium text-gray-400">
                      {area.number}
                    </span>
                    {text.workAreas[index][0]}
                  </h3>
                  <p className="col-start-2 mt-1 text-sm leading-6 text-gray-600 md:mt-2 dark:text-gray-400">
                    {text.workAreas[index][1]}
                  </p>
                </article>
              ))}
            </div>
            <Link
              href={localizedPath(locale, "/about")}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-900 dark:text-blue-300 dark:decoration-blue-800 dark:hover:text-blue-200"
            >
              {text.experience}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </section>

          <div className="border-t border-gray-200 dark:border-gray-800">
            <PhotoGallery locale={locale} />
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800">
            <Articles locale={locale} />
          </div>
        </main>

        <Footer locale={locale} />
      </div>
    </div>
  );
}
