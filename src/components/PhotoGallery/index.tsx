"use client";

import { LineBorderDown } from "@/assets/Icon";
import { photoGallery } from "@/constants/gallery";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import BlurFade from "../BlurFade";
import Fade from "../Fade";
const PhotoGallery = () => {
  return (
    <section className="bg-gradient-to-br from-primary to-secondary w-full flex flex-col items-center text-center space-y-8 px-6 py-12" id="our-gallery">
      <div className="flex flex-col items-center gap-1">
        <Fade
          as="h1"
          className="font-dancing-script font-bold text-accent text-4xl tracking-wider"
          direction="down"
          framerProps={{
            show: { transition: { delay: 0.3 } },
          }}
        >
          Our Gallery
        </Fade>
        <LineBorderDown className="text-accent w-40" />
      </div>
      <PhotoProvider>
        <div className="grid grid-cols-2 gap-4">
          {photoGallery.map((gallery) => (
            <BlurFade key={gallery.id} delay={0.25 + gallery.id * 0.05} inView>
              <PhotoView src={gallery.photo}>
                <Image src={gallery.photo} width={320} height={640} className="h-64 object-cover rounded-md cursor-pointer" alt="" />
              </PhotoView>
            </BlurFade>
          ))}
        </div>
      </PhotoProvider>
    </section>
  );
};

export default PhotoGallery;
