import { SUBTITLE, TITLE } from "@/constants/content";

export default function HomePage() {
  return (
    <div className="bg-gray-800 text-white h-screen flex flex-col items-center justify-center">
      <p className="text-2xl">{TITLE}</p>
      <h1 className="text-4xl font-bold">{SUBTITLE}</h1>
    </div>
  );
}
