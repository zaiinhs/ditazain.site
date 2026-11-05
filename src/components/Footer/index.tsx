import Link from "next/link";
import { Mail } from "lucide-react";
import { AUTHOR } from "@/constants/site";
import { Locale, localizedPath, navigationLabels } from "@/i18n";
import { GithubBrand, LinkedinBrand } from "@/components/Socmed";

const menuItems = [
  { key: "About", path: "/about" },
  { key: "Data", path: "/data" },
  { key: "Projects", path: "/projects" },
  { key: "Talks", path: "/talks" },
  { key: "Articles", path: "/articles" },
  { key: "ReadingList", path: "/readlist" },
  { key: "Uses", path: "/uses" },
];

const contactLabels: Record<Locale, { contact: string; email: string; github: string; linkedin: string }> = {
  en: { contact: "Contact", email: "Email", github: "GitHub", linkedin: "LinkedIn" },
  id: { contact: "Kontak", email: "Email", github: "GitHub", linkedin: "LinkedIn" },
  jv: { contact: "Kontak", email: "Email", github: "GitHub", linkedin: "LinkedIn" },
};

const copyright: Record<Locale, string> = {
  en: "All rights reserved.",
  id: "Hak cipta dilindungi.",
  jv: "Hak cipta dilindhungi.",
};

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const labels = contactLabels[locale];
  const contactLinks = [
    { href: `mailto:${AUTHOR.email}`, label: labels.email, icon: <Mail className="h-4 w-4" />, external: false },
    { href: AUTHOR.sameAs.find((url) => url.includes("github")) ?? "https://github.com/zaiinhs", label: labels.github, icon: <GithubBrand className="h-4 w-4" />, external: true },
    { href: AUTHOR.sameAs.find((url) => url.includes("linkedin")) ?? "https://linkedin.com/in/zaiinhs", label: labels.linkedin, icon: <LinkedinBrand className="h-4 w-4" />, external: true },
  ];

  return (
    <footer className="mt-auto w-full border-t border-gray-200 py-6 dark:border-gray-800">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <nav>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-start sm:gap-x-5">
            {menuItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={localizedPath(locale, item.path)}
                  className="group relative cursor-pointer py-1 text-sm text-gray-600 transition-colors duration-200 hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  {navigationLabels[locale][item.key]}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-200 group-hover:w-full dark:bg-blue-400" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1" aria-label={labels.contact}>
          {contactLinks.map(({ href, label, icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-gray-400 dark:hover:text-blue-300"
            >
              {icon}
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} @zaiinhs. {copyright[locale]}
      </p>
    </footer>
  );
}
