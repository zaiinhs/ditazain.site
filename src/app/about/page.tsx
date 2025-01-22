"use client";

import { Footer, Navbar } from "@/components";
import Image from "next/image";

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
              I'm a frontend developer with a passion for creating beautiful and
              functional web applications. I specialize in React, TypeScript,
              and Next.js, and I love working with modern web technologies.
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
              <div>
                <h3 className="text-xl font-medium mb-2 dark:text-white">
                  Frontend Developer
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Company Name • 2022 - Present
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  <li>Developed and maintained multiple React applications</li>
                  <li>Implemented responsive designs using Tailwind CSS</li>
                  <li>Collaborated with backend teams on API integration</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
