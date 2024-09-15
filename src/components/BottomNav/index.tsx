"use client";
import { AudioContext, AudioContextType } from "@/contexts/audioContext";
import { CalendarClock, Heart, Images, Music, User } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";

const BottomNav = () => {
  const { isPlaying, handlePlaying } = useContext(AudioContext) as AudioContextType;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isSection, setIsSection] = useState<string>("main");

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, audioRef]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsSection(id);
  };

  return (
    <div className="flex justify-between items-center max-w-[480px] w-full fixed bottom-4 z-10 px-4">
      <div className="flex items-center justify-center bg-secondary shadow-lg w-56 p-4 rounded-full">
        <div className="flex items-center justify-between w-full">
          <button className={`p-2 rounded-full cursor-pointer ${isSection === "main" ? "bg-accent text-secondary " : "text-accent"}`} onClick={() => scrollToSection("main")}>
            <Heart />
          </button>
          <button className={`p-2 rounded-full cursor-pointer ${isSection === "bride-and-groom" ? "bg-accent text-secondary " : "text-accent"}`} onClick={() => scrollToSection("bride-and-groom")}>
            <User />
          </button>
          <button className={`p-2 rounded-full cursor-pointer ${isSection === "save-the-date" ? "bg-accent text-secondary " : "text-accent"}`} onClick={() => scrollToSection("save-the-date")}>
            <CalendarClock />
          </button>
          <button className={`p-2 rounded-full cursor-pointer ${isSection === "our-gallery" ? "bg-accent text-secondary " : "text-accent"}`} onClick={() => scrollToSection("our-gallery")}>
            <Images />
          </button>
        </div>
      </div>
      <div className={`${isPlaying ? "bg-accent text-secondary" : "bg-secondary text-accent"} shadow-lg rounded-full p-4 cursor-pointer`} onClick={handlePlaying}>
        <Music />
      </div>
      <audio src="/music.mp3" ref={audioRef} />
    </div>
  );
};

export default BottomNav;
