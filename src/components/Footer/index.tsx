import Link from "next/link";

const menuItems = ["About", "Data", "Projects", "Articles", "ReadList", "Uses"];

export default function Footer() {
  return (
    <footer className="w-full max-w-screen-md mx-auto mt-auto py-8">
      <div className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-between px-4">
        <nav>
          <ul className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
            {menuItems.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white relative py-1 cursor-pointer transition-colors duration-200 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} @zaiinhs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
