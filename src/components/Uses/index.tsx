import { Laptop, Monitor, Mouse, Speaker } from "lucide-react";
import { Locale } from "@/i18n";
import { getMessages } from "@/i18n/messages";

const setupCategories = [
  {
    title: "Computer / Laptop",
    icon: <Laptop className="w-6 h-6" />,
    items: [
      {
        name: "MacBook Pro 14-inch (2023)",
        description: "M2 Pro, 32GB RAM, 1TB SSD",
        image: "/logo.webp",
        link: "https://www.apple.com/macbook-pro/",
      },
      {
        name: "Custom PC Build",
        description: "AMD Ryzen 9 5900X, 64GB RAM, RTX 3080",
        image: "/logo.webp",
        link: "https://pcpartpicker.com/",
      },
    ],
  },
  {
    title: "Displays",
    icon: <Monitor className="w-6 h-6" />,
    items: [
      {
        name: "LG 27GP950-B",
        description: '27" 4K UHD Nano IPS, 144Hz',
        image: "/logo.webp",
        link: "https://www.lg.com/gaming-monitor",
      },
      {
        name: "Dell U2720Q",
        description: '27" 4K USB-C Monitor',
        image: "/logo.webp",
        link: "https://www.dell.com/monitors",
      },
    ],
  },
  {
    title: "Audio",
    icon: <Speaker className="w-6 h-6" />,
    items: [
      {
        name: "Sony WH-1000XM4",
        description: "Wireless Noise Cancelling Headphones",
        image: "/logo.webp",
        link: "https://electronics.sony.com/audio/headphones",
      },
      {
        name: "PreSonus Eris E3.5",
        description: "Professional Studio Monitors",
        image: "/logo.webp",
        link: "https://www.presonus.com/eris",
      },
    ],
  },
  {
    title: "Peripherals",
    icon: <Mouse className="w-6 h-6" />,
    items: [
      {
        name: "Keychron K3",
        description: "Low Profile Mechanical Keyboard, Brown Switches",
        image: "/logo.webp",
        link: "https://www.keychron.com/k3",
      },
      {
        name: "Logitech MX Master 3S",
        description: "Wireless Mouse with Ultra-fast Scrolling",
        image: "/logo.webp",
        link: "https://www.logitech.com/mx-master-3s",
      },
    ],
  },
];

export default function Uses({ locale = "en" }: { locale?: Locale }) {
  const text = getMessages(locale).uses;
  return (
    <section className="w-full">
      <div className="mb-12">
         <h1 className="text-4xl font-bold mb-4 dark:text-white">{text.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">
           {text.intro}
        </p>
      </div>

      <div className="space-y-12">
        {setupCategories.map((category, index) => (
          <div key={index} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                {category.icon}
              </div>
              <h2 className="text-2xl font-semibold dark:text-white">
                 {text.categories[index]}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <article className="flex h-full items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                      {category.icon}
                    </span>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {item.name}
                      </h3>
                       <p className="text-sm text-gray-600 dark:text-gray-400">
                         {text.descriptions[setupCategories.slice(0, index).reduce((count, entry) => count + entry.items.length, 0) + itemIndex]}
                      </p>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
