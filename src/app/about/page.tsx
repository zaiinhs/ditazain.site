import { Footer, Navbar } from "@/components";
import { AUTHOR } from "@/constants/site";
import {
  BriefcaseBusiness,
  Code2,
  Database,
  MapPin,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import { Locale } from "@/i18n";
import { getMessages } from "@/i18n/messages";
import { languageAlternates } from "@/i18n";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zainal Abidin is a Technical Product Specialist at Indivara Group, working across product delivery, data solutions and enterprise implementation.",
  alternates: { canonical: "/about", languages: languageAlternates("/about") },
  openGraph: {
    title: "About | Zainal Abidin",
    description:
      "Product delivery, data solutions and enterprise implementation at Indivara Group.",
    type: "profile",
    url: "/about",
  },
};

const skillGroups = [
  {
    label: "Product & implementation",
    icon: <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />,
    skills: [
      "Requirements analysis",
      "Stakeholder coordination",
      "Client implementation",
      "SIT / UAT",
      "Troubleshooting",
    ],
  },
  {
    label: "Data & backend",
    icon: <Database className="h-4 w-4" aria-hidden="true" />,
    skills: [
      "Python",
      "SQL",
      "Data cleaning & standardization",
      "REST APIs",
      "PostgreSQL",
    ],
  },
  {
    label: "Software & deployment",
    icon: <Code2 className="h-4 w-4" aria-hidden="true" />,
    skills: [
      "TypeScript",
      "React / Next.js",
      "Docker",
      "Linux / VM",
      "GitLab / GitHub",
    ],
  },
];

const experiences = [
  {
    title: "Technical Product Specialist",
    company: "Indivara Group",
    employmentType: "Full-time",
    period: "Jan 2026 – Present",
    location: "Indonesia",
    achievements: [
      "Supported Delman Data Lab (DDL) through Delman’s acquisition by Indivara, delivering feature improvements, resolving frontend/backend issues, supporting deployment, and migrating both product repositories to Indivara’s GitLab organization.",
      "Coordinated joint Delman–Bersama work, connecting Product, IOC/Infrastructure, developers and stakeholders to turn product requirements and internal data issues into technical delivery.",
      "Contributed to Bersama data cleaning, product standardization, SQL transformations, and dashboard/API delivery for a pipeline with 1.7M+ source product records and 6.4M+ analytics output rows.",
      "Optimized 10+ API endpoints across Bersama and SamaSamaApps Philippines to improve service reliability and dashboard data accuracy. Contributed to Bersama forecasting work associated with accuracy improvements of up to 50%.",
      "Supported DDL SIT/UAT and acceptance at Avantrade, Goodie, KB Bank and Seedbox. Built a Python demo script and HTML email template for Seedbox notification scenarios, and deployed DDL without Docker to an SMBC production VM in October 2026.",
    ],
  },
  {
    title: "Software Engineer · Full-time",
    company: "PT Delman Data Teknologi",
    period: "Sep 2024 – Dec 2025",
    location: "Jakarta, Indonesia · Remote",
    achievements: [
      "Developed and maintained DDL features, resolved frontend/backend issues, and improved client-facing data applications.",
      "Contributed to approximately 30% faster application load time and 25% fewer production bugs through performance work and targeted fixes.",
      "Improved AI chatbot experiences through prompt and context engineering, alongside product usability and code-quality improvements.",
    ],
  },
  {
    title: "Frontend Engineer · Contract",
    company: "PT Delman Data Teknologi",
    period: "May 2024 – Aug 2024",
    location: "Jakarta, Indonesia · Remote",
    achievements: [
      "Helped establish frontend architecture for two client projects with Next.js, Chakra UI, React Query, Context API and Docker; discussed feature flows and product needs directly with clients.",
    ],
  },
  {
    title: "Frontend Engineer · Internship",
    company: "PT Delman Data Teknologi",
    period: "Oct 2023 – Apr 2024",
    location: "Jakarta, Indonesia · Remote",
    achievements: [
      "Maintained DDL data-cleaning and visualization features built with Next.js, translating designs into responsive interfaces and improving client-side performance.",
    ],
  },
  {
    title: "Frontend Developer · Part-time freelance",
    company: "PT Lumbung Mandiri Bersama",
    period: "Aug 2024 – Dec 2024",
    location: "Remote",
    achievements: [
      "Contributed to client-facing React/Next.js and TypeScript products, working with business stakeholders on requirements and backend integration.",
    ],
  },
  {
    title: "Frontend Engineer · Internship",
    company: "Ninja Van",
    period: "May 2022 – Aug 2022",
    location: "Jakarta, Indonesia · Remote",
    achievements: [
      "Selected through Generasi GIGIH 2.0 and built internal QA applications using Next.js, TypeScript, React Query, Zustand, Axios and Ant Design.",
    ],
  },
  {
    title: "Frontend Engineer · Freelance",
    company: "Enoram Inc. / JA Software Solution Ltd.",
    period: "Oct 2022 – Apr 2023",
    location: "Remote · United States & United Kingdom",
    achievements: [
      "Built and maintained web products with React, Next.js, TypeScript and Firebase; contributed to browser-based Web3 interfaces and memory optimization.",
    ],
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl dark:text-white">
      {children}
    </h2>
  );
}

export default function AboutPage({ locale = "en" }: { locale?: Locale }) {
  const text = getMessages(locale).about;
  return (
    <div className="min-h-screen px-4 sm:px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <Navbar locale={locale} />
        <main id="main-content" className="flex-1">
          <section className="grid gap-8 border-b border-gray-200 py-10 sm:py-14 md:grid-cols-[minmax(0,1fr)_15rem] md:items-end dark:border-gray-800">
            <div>
              <p className="mb-3 text-sm font-semibold tracking-wide text-blue-700 dark:text-blue-300">
                {text.label}
              </p>
              <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-gray-950 sm:text-5xl dark:text-white">
                {text.title}
              </h1>
              <p className="mt-5 max-w-[62ch] text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 dark:text-gray-300">
                {text.intro}
              </p>
            </div>

            <aside className="flex items-center gap-4 md:justify-self-end">
              <Image
                src="/avatar.jpeg"
                 alt={locale === "en" ? "Portrait of Zainal Abidin" : locale === "id" ? "Potret Zainal Abidin" : "Potrete Zainal Abidin"}
                width={88}
                height={88}
                className="h-20 w-20 rounded-2xl object-cover object-[center_30%] ring-1 ring-gray-200 dark:ring-gray-700"
              />
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Zainal Abidin
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {getMessages(locale).home.location}
                </p>
                <p className="mt-1 text-blue-700 dark:text-blue-300">
                  Indivara Group
                </p>
              </div>
            </aside>
          </section>

          <section className="py-12 sm:py-16" aria-labelledby="background-heading">
            <SectionTitle>
               <span id="background-heading">{text.journeyTitle}</span>
            </SectionTitle>
            <p className="mt-4 max-w-[68ch] text-base leading-7 text-gray-600 dark:text-gray-400">
               {text.journey}
            </p>
          </section>

          <section className="border-y border-gray-200 py-10 sm:py-12 dark:border-gray-800" aria-labelledby="skills-heading">
            <div className="mb-7 max-w-2xl">
              <SectionTitle>
                 <span id="skills-heading">{text.skillsTitle}</span>
              </SectionTitle>
              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                 {text.skillsIntro}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:divide-x md:divide-gray-200 dark:md:divide-gray-800">
               {skillGroups.map((group, index) => (
                <section
                  key={group.label}
                  className="border-t border-gray-200 pt-4 first:border-0 first:pt-0 md:border-0 md:px-6 md:pt-0 md:first:pl-0 md:last:pr-0 dark:border-gray-800"
                >
                  <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                    <span className="text-blue-700 dark:text-blue-300">
                      {group.icon}
                    </span>
                     {text.skillGroups[index][0]}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                     {group.skills.map((skill, skillIndex) => (
                      <li
                        key={skill}
                        className="rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-900 dark:text-gray-300"
                      >
                         {text.skillGroups[index][skillIndex + 1]}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          <section className="py-12 sm:py-16" aria-labelledby="experience-heading">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
              <div>
                <SectionTitle>
                   <span id="experience-heading">{text.experience}</span>
                </SectionTitle>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                   {text.experienceIntro}
                </p>
              </div>
              <a
                href="https://linkedin.com/in/zaiinhs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:text-blue-300 dark:hover:text-blue-200"
              >
                 {text.linkedin}
              </a>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800">
               {experiences.map((experience, index) => (
                <article
                  key={`${experience.company}-${experience.period}`}
                  className="grid gap-3 border-b border-gray-200 py-7 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8 md:py-8 dark:border-gray-800"
                >
                  <div>
                    <p className="font-mono text-xs font-medium text-blue-700 tabular-nums dark:text-blue-300">
                       {text.experiences[index][1]}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                       {text.experiences[index][2]}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-gray-950 dark:text-white">
                       {text.experiences[index][0]}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {experience.company}
                      {"employmentType" in experience && (
                        <>
                          <span aria-hidden="true"> · </span>
                           <span>{text.fullTime}</span>
                        </>
                      )}
                    </p>
                    <ul className="mt-4 space-y-2.5 text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {experience.achievements.map((_, achievementIndex) => (
                        <li key={achievementIndex} className="grid grid-cols-[1rem_1fr] gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-[0.6rem] h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
                          />
                           <span>{text.experiences[index][achievementIndex + 3]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 border-t border-gray-200 py-10 sm:grid-cols-2 sm:py-12 dark:border-gray-800">
            <div>
               <SectionTitle>{text.education}</SectionTitle>
              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                     {text.degree}
                  </p>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                     {text.degreeDetails}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                     {text.program}
                  </p>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Hacktiv8 Indonesia · 2021–2022
                  </p>
                </div>
              </div>
            </div>
            <div>
               <SectionTitle>{text.community}</SectionTitle>
              <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                <Workflow className="mt-1 h-4 w-4 shrink-0 text-blue-700 dark:text-blue-300" />
                 {text.communityDescription}
              </p>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {AUTHOR.email}
              </p>
            </div>
          </section>
        </main>
         <Footer locale={locale} />
      </div>
    </div>
  );
}
