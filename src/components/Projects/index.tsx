import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Personal Website",
    description:
      "A modern personal website built with Next.js, React, and Tailwind CSS. Features dark mode, responsive design, and smooth animations.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/logo.webp",
    link: "https://github.com/yourusername/personal-website",
    status: "Completed",
  },
  {
    title: "E-commerce Dashboard",
    description:
      "A comprehensive dashboard for managing e-commerce operations. Includes analytics, order management, and inventory tracking.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    image: "/logo.webp",
    link: "https://github.com/yourusername/ecommerce-dashboard",
    status: "In Progress",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team collaboration features.",
    technologies: ["React", "Firebase", "Material-UI", "Redux"],
    image: "/logo.webp",
    link: "https://github.com/yourusername/task-manager",
    status: "Completed",
  },
  {
    title: "Weather Application",
    description:
      "A weather forecast application with location-based services and detailed weather information.",
    technologies: ["React", "OpenWeather API", "Styled Components"],
    image: "/logo.webp",
    link: "https://github.com/yourusername/weather-app",
    status: "Completed",
  },
];

export default function Projects() {
  return (
    <section className="w-full">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">Projects</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A collection of my recent work and side projects.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <Link
            href={project.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <article className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {project.title}
                      </h2>
                      <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
