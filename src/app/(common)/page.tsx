import { Footer, Navbar, PhotoGallery, Socmed } from "@/components";
import Articles from "@/components/Articles";
import ResumeButton from "@/components/ResumeButton";
import {
  CURRENT_ROLE,
  DESCRIPTION,
  LOCATION,
  ROLES,
  TITLE,
} from "@/constants/content";
import { ArrowRight, Briefcase, Database, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const techStack = [
  "Python",
  "SQL",
  "TypeScript",
  "React",
  "Next.js",
  "Airflow",
  "dbt",
  "PostgreSQL",
  "BigQuery",
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="w-full max-w-screen-md">
        <Navbar />
      </div>

      <section className="relative mt-16 w-full max-w-screen-md">
        {/* aurora glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-400 to-purple-400 opacity-30 blur-3xl dark:opacity-20"
        />

        <div className="animate-fade-up">
          <div className="mb-6 flex items-center gap-4">
            <Image
              src="/avatar.jpeg"
              alt="Zainal Abidin"
              width={72}
              height={72}
              className="rounded-2xl ring-2 ring-white shadow-lg dark:ring-gray-800"
              priority
            />
            <div className="flex flex-wrap gap-2">
              {ROLES.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-200"
                >
                  {role === "Data Engineer" ? (
                    <Database className="h-3.5 w-3.5 text-blue-500" />
                  ) : (
                    <Briefcase className="h-3.5 w-3.5 text-indigo-500" />
                  )}
                  {role}
                </span>
              ))}
            </div>
          </div>

          <h1 className="bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-5xl dark:from-white dark:via-gray-300 dark:to-white">
            {TITLE}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-400">
            {DESCRIPTION}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-blue-500" />
              {CURRENT_ROLE.title} @ {CURRENT_ROLE.company}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-blue-500" />
              {LOCATION}
            </span>
          </div>

          <div className="mt-7">
            <Socmed />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <ResumeButton />
            <Link
              href="/data"
              className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/70 px-5 py-3 text-sm font-medium text-gray-800 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100 dark:hover:border-blue-500 dark:hover:text-blue-300"
            >
              <Database className="h-4 w-4" />
              Explore my Data Engineering work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* tech stack strip */}
          <div className="mt-8 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg bg-gray-100 px-2.5 py-1 font-mono text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <PhotoGallery />
      <Articles />
      <Footer />
    </div>
  );
}
