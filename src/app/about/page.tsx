"use client";

import { Footer, Navbar } from "@/components";
import Image from "next/image";

const experiences = [
  {
    title: "Frontend Engineer - Full Time",
    company: "delman.io",
    period: "Sept 2024 - Present",
    location: "Jakarta, Indonesia (Remote)",
    description: null,
    achievements: [
      "Collaborated on 2+ client projects by attending regular meetings to analyze business requirements, propose technical solutions, and ensure alignment between technical teams and stakeholders.",
      "Developed and maintained company products, including web applications and internal platforms, with a focus on enhancing performance and user experience.",
      "Spearheaded frontend development for 3+ large-scale applications using modern technologies such as React.js, Next.js, and JavaScript, achieving a 30% improvement in load time.",
      "Managed responsibilities beyond frontend, including UI/UX design (streamlining client-provided designs for improved flow and visual appeal) and backend integration (optimizing 10+ API endpoints to boost system efficiency).",
      "Contributed to codebase improvement by reducing production bugs by 25% through the implementation of best practices and conducting regular code reviews.",
    ],
  },
  {
    title: "Frontend Engineer - Contract",
    company: "delman.io",
    period: "Mei 2024 - Aug 2024",
    location: "Jakarta, Indonesia (Remote)",
    description:
      "Contributed to the development of 2 projects with clients and was trusted to be one of the frontends who started initializing the project architecture by building it using Next.js, Chakra-ui, React-query, ContextAPI, Docker (containerize docker) and Gitlab for the git repository and communication with team members. Also contribute to communication with clients to discuss the flow of the web app features being built, the objectives of the product or problem to be solved and a mobile-friendly UI display.",
    achievements: [],
  },
  {
    title: "Frontend Engineer - Internship",
    company: "delman.io",
    period: "Oct 2023 - April 2024",
    location: "Jakarta, Indonesia (Remote)",
    description: null,
    achievements: [
      "Maintain cloud.delman.io Data-Cleaning and Data Visualization as the company's Core Products build using the React Framework Next.js",
      "Transform Designs into actual products by optimizing code for client-side performance",
      "Research and implement the latest technologies based on front-end (such as libraries for signatures and other front-end libraries)",
    ],
  },
  {
    title: "Frontend Developer - Freelancer",
    company: "PT. Lumbung Mandiri Bersama",
    period: "Aug 2024 – Des 2024",
    location: "Jakarta, Indonesia (Remote)",
    description: null,
    achievements: [
      "Collaborated on 5+ strategic projects by actively participating in meetings with key stakeholders, including the Founder and CEO, to understand business vision, design technical solutions, and ensure alignment between technical teams and company leadership.",
      "Developed and maintained 3+ core company products, including web applications and internal platforms, utilizing modern technologies such as React.js, Next.js, and TypeScript, resulting in a 40% improvement in application performance.",
      "Led frontend development for 2+ large-scale applications, optimizing load time by 35% and enhancing user satisfaction through improved UX.",
      "Managed responsibilities beyond frontend, including UI/UX design and backend integration with Firebase.",
      "Reduced production bugs by 30% through the implementation of best practices, regular code reviews, and the adoption of TypeScript.",
      "Contributed to team productivity improvements by introducing new tools and workflows, reducing feature development time by 20%.",
    ],
  },
  {
    title: "Frontend Engineer - Volunteering",
    company: "gatherloop.co",
    period: "Aug 2023 – Present",
    location: "Probolinggo, Indonesia",
    description:
      "Studying the concept of problem-solving thinking paradigms. Apart from that, we also relearn the basics of JavaScript. And currently he is the lead for building the Probolinggo Frontend community with a total of 145 members and every month we hold tech talks to motivate members and a place to share knowledge.",
    achievements: [],
  },
  {
    title: "Frontend Engineer - Internship",
    company: "Ninja Van",
    period: "Mei 2022 – Aug 2022",
    location: "Jakarta, Indonesia (Remote)",
    description:
      "I got this internship opportunity from participating in the Generasi GIGIH 2.0 by GoTO program. Of the more than 300 people in the Frontend Engineer field, I am the one who is trusted to get an internship at Ninja Van. I got to work on several tasks such as from the display side using Ant Design, forming appropriate payloads on the backend side, and carrying out integration.",
    achievements: [
      "Build internal applications for QA team using NextJS Typescript, React Query, Zustand, Axios, Ant Design.",
      "Good communication between team members and mentors using google chat, jira, bitbucket, GIT.",
    ],
  },
  {
    title: "Frontend Engineer - Generasi GIGIH 2.0",
    company: "YABB / GoTo Impact Foundation",
    period: "Feb 2022 – Aug 2022",
    location: "Jakarta, Indonesia (Remote)",
    description: null,
    achievements: [
      "Learn from basic to advanced to become a Frontend Engineer with instructors from Gojek and Tokopedia.",
      "Build a clone application from the Spotify API, where we can login to a spotify account, create playlists using React Typescript, Chakra UI, React Redux, React Router, React testing library and hosted on vercel.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="text-black min-h-screen flex flex-col items-center mt-5">
      <Navbar />
      <main className="flex flex-col mt-20 max-w-screen-md w-full mx-auto px-4">
        <div className="flex items-start space-x-6 mb-8">
          <Image
            src="/avatar.jpeg"
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-white">
              Zainal Abidin
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Software Engineer (Frontend) based in Indonesia
            </p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Background
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              I&apos;m a frontend developer with a passion for creating
              beautiful and functional web applications. I specialize in React,
              TypeScript, and Next.js, and I love working with modern web
              technologies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "React",
                "TypeScript",
                "Next.js",
                "Node.js",
                "Tailwind CSS",
                "Git",
              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-center text-gray-800 dark:text-gray-200"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div key={index}>
                  <h3 className="text-xl font-medium mb-2 dark:text-white">
                    {experience.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {experience.company} • {experience.period} •{" "}
                    {experience.location}
                  </p>
                  {experience.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {experience.description}
                    </p>
                  )}
                  {experience.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
