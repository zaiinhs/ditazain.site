import type { Locale } from "@/i18n";
import { chatReply } from "@/i18n/chat";

export const STATIC_CHAT_SUGGESTIONS = [
  "Apa peran Zainal saat ini?",
  "Apa yang dikerjakan di DDL?",
  "Apa kontribusinya di Project Bersama?",
  "Skill teknis apa yang digunakan?",
  "Bagaimana cara menghubungi Zainal?",
];

const normalize = (value: string) => value.toLowerCase().trim();

const hasAnyKeyword = (value: string, keywords: string[]) =>
  keywords.some((keyword) => value.includes(keyword));

export function getStaticAIReply(question: string, locale: Locale = "id") {
  const input = normalize(question);

  if (!input) {
    return chatReply("empty", locale);
  }

  if (/^(halo|hai|hello|hi|assalamualaikum|pagi|siang|malam)\b/.test(input)) {
    return chatReply("greeting", locale);
  }

  // Data and pipeline questions — diletakkan sebelum 'skill' agar lebih spesifik
  if (
    hasAnyKeyword(input, [
      "data engineer",
      "data engineering",
      "etl",
      "elt",
      "pipeline",
      "sql",
      "python",
      "transform",
      "data warehouse",
      "standardisasi",
      "bersama",
      "contribution",
      "contribute",
      "kontribusine",
      "kontribusi",
    ])
  ) {
    return chatReply("data", locale);
  }

  if (
    hasAnyKeyword(input, [
      "siapa",
      "profil",
      "profile",
      "tentang",
      "about",
      "background",
      "bio",
      "babagan",
      "zainal itu",
    ])
  ) {
    return chatReply("profile", locale);
  }

  if (input.includes("ddl")) {
    return chatReply("projects", locale);
  }

  if (
    hasAnyKeyword(input, [
      "pengalaman",
      "experience",
      "kerja",
      "work",
      "karier",
      "career",
      "pengalamane",
      "pekerjaane",
      "company",
      "perusahaan",
      "indivara",
      "delman",
      "ninja",
      "freelance",
      "gatherloop",
      "goto",
      "peran",
      "role",
    ])
  ) {
    return chatReply("experience", locale);
  }

  if (
    hasAnyKeyword(input, [
      "skill",
      "keahlian",
      "kemampuan",
      "tech stack",
      "teknologi",
      "tools",
      "skills",
      "keahliane",
      "react",
      "typescript",
      "next",
      "frontend",
    ])
  ) {
    return chatReply("skills", locale);
  }

  if (
    hasAnyKeyword(input, [
      "project",
      "projek",
      "portfolio",
      "portofolio",
      "aplikasi",
      "spotify",
      "dashboard",
      "task",
      "weather",
      "website",
      "proyek",
    ])
  ) {
    return chatReply("projects", locale);
  }

  if (
    hasAnyKeyword(input, [
      "komunitas",
      "community",
      "probolinggo",
      "frontend community",
      "tech talk",
      "gatherloop",
    ])
  ) {
    return chatReply("community", locale);
  }

  if (
    hasAnyKeyword(input, [
      "cv",
      "resume",
      "curriculum",
      "riwayat hidup",
      "download",
    ])
  ) {
    return chatReply("cv", locale);
  }

  if (
    hasAnyKeyword(input, [
      "kontak",
      "contact",
      "hubungi",
      "ngubungi",
      "email",
      "linkedin",
      "github",
      "instagram",
      "twitter",
      "x.com",
      "sosial",
      "social",
    ])
  ) {
    return chatReply("contact", locale);
  }

  if (
    hasAnyKeyword(input, ["artikel", "article", "blog", "tulisan", "read", "menulis", "wacan"])
  ) {
    return chatReply("articles", locale);
  }

  if (
    hasAnyKeyword(input, [
      "cocok",
      "hire",
      "rekrut",
      "recruit",
      "data engineer",
      "developer",
      "kerjasama",
      "kolaborasi",
    ])
  ) {
    return chatReply("career", locale);
  }

  return chatReply("fallback", locale);
}
