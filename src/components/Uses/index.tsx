import {
  Cpu,
  Headphones,
  Keyboard,
  Laptop,
  Monitor,
  Mouse,
  Speaker,
} from "lucide-react";
import Image from "next/image";

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

export default function Uses() {
  return (
    <section className="w-full">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">Uses</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A detailed look at the hardware and tools I use for development.
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
                {category.title}
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
                  <article className="h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <div className="aspect-video relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.description}
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
