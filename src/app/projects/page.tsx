import { Footer, Navbar, Projects } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Data engineering pipelines and software products built by Zainal Abidin.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Zainal Abidin",
    description:
      "Data engineering pipelines and software products built by Zainal Abidin.",
    type: "website",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="w-full max-w-screen-md">
        <Navbar />
      </div>
      <main className="mt-16 flex w-full max-w-screen-md flex-col">
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
