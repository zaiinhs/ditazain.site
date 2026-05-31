import { Footer, Navbar } from "@/components";
import {
  Briefcase,
  Code2,
  Database,
  MapPin,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Zainal | @zaiinhs",
  description:
    "Zainal Abidin — Software Engineer & Data Engineer from Indonesia. Building products and data pipelines with SQL, Python, React, and Next.js.",
};

const skillGroups = [
  {
    label: "Data Engineering",
    icon: <Database className="h-4 w-4" />,
    skills: ["SQL", "Python", "ETL / ELT", "dbt", "Airflow", "Data Modeling"],
  },
  {
    label: "Languages & Frameworks",
    icon: <Code2 className="h-4 w-4" />,
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js"],
  },
  {
    label: "Tools & Platforms",
    icon: <Wrench className="h-4 w-4" />,
    skills: [
      "PostgreSQL",
      "BigQuery",
      "Docker",
      "Git",
      "Tailwind CSS",
      "Cloudflare",
    ],
  },
];

const experiences = [
  {
    title: "Technical Product Specialist",
    company: "Indivara Group",
    period: "Jan 2026 - Present",
    location: "Indonesia",
    description: null,
    achievements: [
      "Work across both roles — as a Software Engineer building product features and as a Data Engineer building the data infrastructure behind them.",
      "Design and maintain data pipelines (ingestion, transformation, and delivery) using SQL and Python to power analytics and product features.",
      "Translate business and product requirements into technical specifications and data solutions, bridging stakeholders and engineering teams.",
      "Ensure data quality and reliability through validation, transformation logic, and clear documentation.",
    ],
  },
  {
    title: "Frontend Engineer - Full Time",
    company: "Delman (PT. Delman Data Teknologi)",
    period: "Sept 2024 - Dec 2025",
    location: "Jakarta, Indonesia (Remote)",
    description: null,
    achievements: [
      "Collaborated on 2+ client projects by attending regular meetings to analyze business requirements, propose technical solutions, and ensure alignment between technical teams and stakeholders.",
      "Developed and maintained company products, including web applications and internal data platforms, with a focus on enhancing performance and user experience.",
      "Spearheaded frontend development for 3+ large-scale applications using modern technologies such as React.js, Next.js, and JavaScript, achieving a 30% improvement in load time.",
      "Worked closely with data products (data cleaning & visualization), which sparked my move deeper into Data Engineering.",
      "Contributed to codebase improvement by reducing production bugs by 25% through best practices and regular code reviews.",
    ],
  },
  {
    title: "Frontend Engineer - Contract",
    company: "Delman (PT. Delman Data Teknologi)",
    period: "May 2024 - Aug 2024",
    location: "Jakarta, Indonesia (Remote)",
    description:
      "Contributed to 2 client projects and was trusted to initialize project architecture using Next.js, Chakra-UI, React-Query, Context API, and Docker, with GitLab for version control. Also communicated with clients to discuss feature flows, product objectives, and mobile-friendly UI.",
    achievements: [],
  },
  {
    title: "Frontend Engineer - Internship",
    company: "Delman (PT. Delman Data Teknologi)",
    period: "Oct 2023 - April 2024",
    location: "Jakarta, Indonesia (Remote)",
    description: null,
    achievements: [
      "Maintained cloud.delman.io Data-Cleaning and Data Visualization as the company's core products, built with Next.js.",
      "Transformed designs into actual products by optimizing code for client-side performance.",
      "Researched and implemented the latest frontend technologies (signature libraries and other frontend tooling).",
    ],
  },
  {
    title: "Frontend Developer - Freelancer",
    company: "PT. Lumbung Mandiri Bersama",
    period: "Aug 2024 – Dec 2024",
    location: "Jakarta, Indonesia (Remote)",
    description: null,
    achievements: [
      "Collaborated on 5+ strategic projects with key stakeholders including the Founder and CEO, designing technical solutions aligned with business vision.",
      "Developed and maintained 3+ core products using React.js, Next.js, and TypeScript, improving application performance by 40%.",
      "Managed responsibilities beyond frontend, including UI/UX design and backend integration with Firebase.",
      "Reduced production bugs by 30% through best practices, code reviews, and adopting TypeScript.",
    ],
  },
  {
    title: "Frontend Engineer - Volunteering",
    company: "gatherloop.co",
    period: "Aug 2023 – Present",
    location: "Probolinggo, Indonesia",
    description:
      "Studying problem-solving paradigms and revisiting JavaScript fundamentals. Currently lead of the Probolinggo Frontend community (145+ members), running monthly tech talks to motivate members and share knowledge.",
    achievements: [],
  },
  {
    title: "Frontend Engineer - Internship",
    company: "Ninja Van",
    period: "May 2022 – Aug 2022",
    location: "Jakarta, Indonesia (Remote)",
    description:
      "Selected for an internship at Ninja Van through the Generasi GIGIH 2.0 by GoTo program — chosen from 300+ Frontend Engineer participants. Worked on UI with Ant Design, payload shaping on the backend side, and integration.",
    achievements: [
      "Built internal applications for the QA team using Next.js, TypeScript, React Query, Zustand, Axios, and Ant Design.",
      "Maintained good communication with team members and mentors via Google Chat, Jira, Bitbucket, and Git.",
    ],
  },
  {
    title: "Frontend Engineer - Generasi GIGIH 2.0",
    company: "YABB / GoTo Impact Foundation",
    period: "Feb 2022 – Aug 2022",
    location: "Jakarta, Indonesia (Remote)",
    description: null,
    achievements: [
      "Learned from basic to advanced Frontend Engineering with instructors from Gojek and Tokopedia.",
      "Built a Spotify API clone (login, playlist creation) using React, TypeScript, Chakra UI, React Redux, React Router, and React Testing Library, hosted on Vercel.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="w-full max-w-screen-md">
        <Navbar />
      </div>
      <main className="mt-16 flex w-full max-w-screen-md flex-col">
        {/* Header */}
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Image
            src="/avatar.jpeg"
            alt="Zainal Abidin"
            width={112}
            height={112}
            className="rounded-2xl shadow-lg ring-2 ring-white dark:ring-gray-800"
          />
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Zainal Abidin</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Software Engineer &amp; Data Engineer
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-blue-500" />
                Technical Product Specialist @ Indivara Group
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-blue-500" />
                Indonesia
              </span>
            </div>
          </div>
        </div>

        {/* Background */}
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold dark:text-white">
            Background
          </h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            I started as a frontend engineer building web products with React,
            TypeScript, and Next.js. Working closely with data products at
            Delman pulled me toward the data side of engineering — and today I
            work as both a Software Engineer and a Data Engineer. My current
            focus is Data Engineering: writing SQL, building pipelines in
            Python, and transforming raw data into clean, reliable datasets that
            power products and decisions.
          </p>
        </section>

        {/* Skills */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-semibold dark:text-white">Skills</h2>
          <div className="space-y-6">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <span className="text-blue-500">{group.icon}</span>
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience timeline */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-semibold dark:text-white">
            Experience
          </h2>
          <div className="space-y-8 border-l border-gray-200 pl-6 dark:border-gray-700">
            {experiences.map((experience, index) => (
              <div key={index} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500 dark:border-gray-950" />
                <h3 className="text-lg font-semibold dark:text-white">
                  {experience.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {experience.company} • {experience.period} •{" "}
                  {experience.location}
                </p>
                {experience.description && (
                  <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
                    {experience.description}
                  </p>
                )}
                {experience.achievements.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-gray-600 dark:text-gray-400">
                    {experience.achievements.map(
                      (achievement, achievementIndex) => (
                        <li key={achievementIndex}>{achievement}</li>
                      )
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
