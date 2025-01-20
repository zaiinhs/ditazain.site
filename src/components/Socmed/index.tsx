import { XIcon, LinkedinIcon, GithubIcon, InstagramIcon } from "lucide-react";

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
          className="text-2xl hover:opacity-80"
        >
          <span className="dark:text-white text-black">{social.icon}</span>
        </a>
      ))}
    </div>
  );
}
