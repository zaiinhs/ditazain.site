import { CalendarDays, MapPin, Mic, Play, Presentation } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n";
import { getMessages } from "@/i18n/messages";
import { getTalks } from "@/utils/talks";

export default function Talks({ locale = "en" }: { locale?: Locale }) {
  const talks = getTalks(locale);
  const text = getMessages(locale).talks;

  return (
    <div className="mb-12 flex flex-col gap-6">
      {talks.map((talk) => (
        <article
          key={talk.id}
          className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-blue-300 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-blue-700"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <Mic className="h-3 w-3" aria-hidden="true" />
              {talk.event}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {talk.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {talk.location}
            </span>
          </div>

          <h2 className="mt-3 text-xl font-semibold tracking-tight text-gray-950 dark:text-white">
            {talk.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
            {talk.description}
          </p>

          {(talk.slides || talk.recording) && (
            <div className="mt-4 flex flex-wrap gap-3">
              {talk.slides && (
                <Link
                  href={talk.slides}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:text-blue-300"
                >
                  <Presentation className="h-4 w-4" aria-hidden="true" />
                  {text.slides}
                </Link>
              )}
              {talk.recording && (
                <Link
                  href={talk.recording}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:text-blue-300"
                >
                  <Play className="h-4 w-4" aria-hidden="true" />
                  {text.recording}
                </Link>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
