"use client";

import { LineBorderDown, LineBorderUp } from "@/assets/Icon";
import { photoGallery } from "@/constants/gallery";
import { AudioContext, AudioContextType } from "@/contexts/audioContext";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import TextBlurIn from "../TextBlurIn";
import Fade from "../Fade";

const HeroCover = () => {
  const { handlePlaying } = useContext(AudioContext) as AudioContextType;
  const [isClose, setIsClose] = useState<boolean>(false);
  const isOpened = isClose
    ? "-translate-y-full transition transform duration-500 delay-150 motion-reduce:transition-none motion-reduce:transform-none"
    : null;

  const searchParams = useSearchParams();
  const guest = searchParams.get("guest");
  const params = searchParams.get("p");

  const handleClose = () => {
    setIsClose(true);
    handlePlaying();
  };

  return (
    <div
      className={`fixed z-30 min-h-screen max-w-[480px] w-full bg-primary ${isOpened}`}
    >
      <div className="relative min-h-screen w-full">
        <div className="h-screen relative">
          <Image
            src={photoGallery[10].photo}
            width={480}
            height={720}
            className="h-screen object-cover"
            alt=""
          />
          <span className="absolute inset-0 bg-gradient-to-t from-neutral-600/90 to-neutral-600/20" />
        </div>
        <div className="absolute bottom-0 h-screen w-full flex flex-col items-center justify-around">
          <div className="text-center text-primary space-y-6">
            <Fade
              className="text-xl font-medium drop-shadow-xl"
              direction="down"
              framerProps={{
                show: { transition: { delay: 0.2 } },
              }}
            >
              THE WEDDING OF
            </Fade>
            <div className="space-y-4">
              <LineBorderUp className="text-primary" />
              <div className="flex flex-col items-center gap-y-4">
                <div className="font-dancing-script font-bold text-2xl">
                  <TextBlurIn
                    as="h1"
                    word="Zainal & Dita"
                    className="text-4xl drop-shadow-xl"
                  />
                </div>
                <TextBlurIn
                  as="span"
                  word={params === "husband" ? "26.10.2024" : "20.10.2024"}
                  className="font-semibold text-xl drop-shadow-xl"
                />
              </div>
              <LineBorderDown className="text-primary" />
            </div>
          </div>
          <div>
            <div className="mt-12 mb-8 text-center text-primary px-4">
              <Fade
                className="text-lg"
                direction="up"
                framerProps={{
                  show: { transition: { delay: 0.4 } },
                }}
              >
                Kepada
              </Fade>
              <Fade
                className="font-bold text-xl drop-shadow-xl capitalize"
                direction="up"
                framerProps={{
                  show: { transition: { delay: 0.6 } },
                }}
              >
                {guest ? guest : "Guest"}
              </Fade>
            </div>
            <Fade
              as="button"
              className="bg-accent text-primary flex items-center gap-x-2 font-medium rounded-md px-4 py-2 cursor-pointer w-fit m-auto"
              direction="up"
              framerProps={{
                show: { transition: { delay: 0.8 } },
              }}
              onClick={handleClose}
            >
              <Mail /> Buka Undangan
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCover;
