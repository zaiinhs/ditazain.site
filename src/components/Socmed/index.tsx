import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "lucide-react";

const socialMedia = [
  {
    name: "Twitter",
    icon: <XIcon />,
    url: "https://x.com/zaiinhs",
  },
  {
    name: "Instagram",
    icon: <InstagramIcon />,
    url: "https://instagram.com/zaiinhs",
  },
  {
    name: "Linkedin",
    icon: <LinkedinIcon />,
    url: "https://linkedin.com/in/zaiinhs",
  },
  {
    name: "Github",
    icon: <GithubIcon />,
    url: "https://github.com/zaiinhs",
  },
];

export default function Socmed() {
  return (
    <div className="flex space-x-6">
      {socialMedia.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          className="relative group p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="dark:text-white text-black transition-transform duration-300 group-hover:scale-110 inline-block">
            {social.icon}
          </span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-black dark:bg-white rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
        </a>
      ))}
    </div>
  );
}
