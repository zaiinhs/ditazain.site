import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n";

const talksPath = path.join(process.cwd(), "content/talks.json");

type Localized = Record<Locale, string>;

type RawTalk = {
  id: string;
  event: string;
  title: Localized;
  description: Localized;
  date: string;
  location: Localized;
  slides?: string | null;
  recording?: string | null;
};

export interface Talk {
  id: string;
  event: string;
  title: string;
  description: string;
  date: string;
  location: string;
  slides: string | null;
  recording: string | null;
}

export function getTalks(locale: Locale = "en"): Talk[] {
  const raw: { talks: RawTalk[] } = JSON.parse(fs.readFileSync(talksPath, "utf8"));
  return raw.talks.map((talk) => ({
    id: talk.id,
    event: talk.event,
    title: talk.title[locale] ?? talk.title.en,
    description: talk.description[locale] ?? talk.description.en,
    date: talk.date,
    location: talk.location[locale] ?? talk.location.en,
    slides: talk.slides ?? null,
    recording: talk.recording ?? null,
  }));
}
