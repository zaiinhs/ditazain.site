"use client";

import { DividerLove, LineBorderDown } from "@/assets/Icon";
import {
  Fade,
  Marquee,
  Note,
  PhotoGallery,
  TextBlurIn,
  TimerCountdown,
} from "@/components";
import BankInfoComponent from "@/components/BankInfo";
import { photoGallery } from "@/constants/gallery";
import { RsvpForm } from "@/features";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import "react-photo-view/dist/react-photo-view.css";
import { useState, useEffect } from "react";
import { neon } from "@neondatabase/serverless";

const data = [
  {
    date: "Sabtu, 26 Oktober 2024",
    why: "Rumah Mempelai Pria",
    address:
      "Gang Masjid Dusun Krajan Tengah, Desa Curah Dringu, Tongas, Probolinggo.",
  },
  {
    date: "Minggu, 20 Oktober 2024",
    why: "Rumah Mempelai Wanita",
    address: "Dusun Krajan Kidul, Desa Curah Dringu, Tongas, Probolinggo.",
  },
];

export default function Home() {
  const searchParams = useSearchParams();
  const params = searchParams.get("p");
  const [result, setResult] = useState<any[]>([]);
  const [loveNotes, setLoveNotes] = useState<any[]>([]);

  useEffect(() => {
    const fetchLoveNotes = async () => {
      try {
        const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);
        const result = await sql`SELECT * FROM lovenotes ORDER BY id DESC`;
        setLoveNotes(result as any);
      } catch (error) {
        console.error("Error fetching love notes:", error);
      }
    };

    fetchLoveNotes();
  }, [result]);

  console.log({ loveNotes });

  return (
    <main className="flex w-full min-h-screen bg-primary flex-col items-center justify-between">
      <section className="relative min-h-screen w-full" id="main">
        <div className="h-screen relative">
          <Image
            src={photoGallery[1].photo}
            width={480}
            height={720}
            className="h-screen object-cover"
            alt=""
          />
          <span className="absolute inset-0 bg-gradient-to-t from-neutral-600/90 to-neutral-600/20" />
        </div>
        <div className="absolute top-0 h-screen w-full flex flex-col items-center justify-center  overflow-x-hidden md:top-10">
          <div className="text-center text-primary">
            <Fade
              as="h1"
              className="text-xl mb-6"
              direction="down"
              framerProps={{
                show: { transition: { delay: 0.2 } },
              }}
            >
              THE WEDDING OF
            </Fade>
            <div className="relative flex justify-center">
              <div className="flex flex-col items-center gap-y-4">
                <div className="flex flex-col gap-y-3 font-dancing-script font-bold text-2xl">
                  <TextBlurIn
                    as="h1"
                    className="tracking-wide"
                    word="Zainal Abidin, S.Kom"
                  />
                  <TextBlurIn as="span" word="&" />
                  <TextBlurIn
                    as="h1"
                    className="tracking-wide"
                    word="Dita Tia Mukarromah, S.Li"
                  />
                </div>
                <TextBlurIn
                  as="span"
                  className="font-semibold text-xl"
                  word={params === "husband" ? "26.10.2024" : "20.10.2024"}
                />
              </div>
            </div>
          </div>
          <TimerCountdown params={params} />
          <Marquee
            pauseOnHover
            className="[--gap:0.5rem] [--duration:15s] mt-16"
          >
            {photoGallery.map((gallery, idx) => {
              if (idx >= 4) return;

              return (
                <Image
                  src={gallery.photo}
                  width={480}
                  height={720}
                  className="w-20 object-cover"
                  key={gallery.id}
                  alt=""
                />
              );
            })}
          </Marquee>
        </div>
      </section>
      <section
        className="bg-gradient-to-br from-primary to-secondary w-full flex flex-col items-center text-center space-y-8 px-6 py-12"
        id="bride-and-groom"
      >
        <div className="space-y-20">
          <div className="text-center space-y-4">
            <Fade
              as="p"
              className="text-sm text-accent font-semibold"
              direction="left"
              framerProps={{
                show: { transition: { delay: 0.4 } },
              }}
            >
              Assalamualaikum Warahmatullahi Wabarakaatuh
            </Fade>
            <Fade
              as="p"
              className="text-sm text-accent"
              direction="right"
              framerProps={{
                show: { transition: { delay: 0.4 } },
              }}
            >
              Dengan memohon Rahmat dan Ridho Allah SWT, kami bermaksud
              menyelenggarakan pernikahan
            </Fade>
          </div>
          <div className="flex flex-col items-center gap-y-6">
            <Fade
              className="font-dancing-script font-bold text-accent text-4xl tracking-wider"
              direction="down"
              framerProps={{
                show: { transition: { delay: 0.3 } },
              }}
            >
              Groom
            </Fade>
            <Image
              className="object-cover w-48 h-72 rounded-t-full"
              src={photoGallery[5].photo}
              width={480}
              height={720}
              alt=""
            />
            <div className="space-y-2">
              <Fade
                as="p"
                className="font-dancing-script text-accent text-2xl font-semibold tracking-wide"
                direction="down"
                framerProps={{
                  show: { transition: { delay: 0.4 } },
                }}
              >
                Zainal Abidin, S.Kom
              </Fade>
              <Fade
                as="p"
                className="text-accent text-sm"
                direction="up"
                framerProps={{
                  show: { transition: { delay: 0.4 } },
                }}
              >
                Putra Pertama dari Bapak Hunin
                <br /> dan Ibu Sulami
              </Fade>
            </div>
          </div>
          <DividerLove className="w-44 text-accent mx-auto" />
          <div className="flex flex-col items-center gap-y-6">
            <Fade
              className="font-dancing-script font-bold text-accent text-4xl tracking-wider"
              direction="down"
              framerProps={{
                show: { transition: { delay: 0.3 } },
              }}
            >
              Bride
            </Fade>
            <Image
              className="object-cover w-48 h-72 rounded-t-full"
              src={photoGallery[4].photo}
              width={480}
              height={720}
              alt=""
            />
            <div className="space-y-2">
              <Fade
                as="p"
                className="font-dancing-script text-accent text-2xl font-semibold tracking-wide"
                direction="down"
                framerProps={{
                  show: { transition: { delay: 0.4 } },
                }}
              >
                Dita Tia Mukarromah, S.Li
              </Fade>
              <Fade
                as="p"
                className="text-accent text-sm"
                direction="up"
                framerProps={{
                  show: { transition: { delay: 0.4 } },
                }}
              >
                Putri Kedua dari Bapak Sugiono <br /> dan Ibu Tiyayah
              </Fade>
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-accent w-full flex flex-col items-center text-center space-y-8 px-6 py-12"
        id="save-the-date"
      >
        <div className="flex flex-col items-center gap-1">
          <Fade
            as="h1"
            className="font-dancing-script font-bold text-primary text-4xl tracking-wider"
            direction="down"
            framerProps={{
              show: { transition: { delay: 0.3 } },
            }}
          >
            Save The Date
          </Fade>
          <LineBorderDown className="text-primary w-40" />
        </div>
        <div className="text-primary space-y-4 mt-4">
          <Fade
            as="p"
            direction="left"
            framerProps={{
              show: { transition: { delay: 0.4 } },
            }}
          >
            وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا
            لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً
            وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
          </Fade>
          <Fade
            as="p"
            className="text-xs"
            direction="right"
            framerProps={{
              show: { transition: { delay: 0.4 } },
            }}
          >
            Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan
            pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu
            merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan
            kasih sayang. Sesungguhnya pada yang demikian itu benar-benar
            terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
          </Fade>
          <Fade
            as="p"
            className="text-xs"
            direction="right"
            framerProps={{
              show: { transition: { delay: 0.4 } },
            }}
          >
            Surah Ar`-`Rum Ayat 21
          </Fade>
        </div>
        <div className="relative">
          <Image
            src={photoGallery[3].photo}
            width={360}
            height={680}
            className="rounded-lg object-cover h-96"
            alt=""
          />
          <div className="absolute top-0 h-full grid place-items-center bg-gradient-to-t from-accent/80 to-accent/20 rounded-lg">
            <div className="flex flex-col items-center text-primary">
              <h2 className="font-bold text-xl drop-shadow-lg">Akad</h2>
              <p className="drop-shadow-lg">Kamis, 12 September 2024</p>
              <p className="drop-shadow-lg">19:00-21:00 WIB</p>
              <p className="drop-shadow-lg">Rumah Mempelai Wanita</p>
              <p className="drop-shadow-lg">
                Dusun Krajan Kidul, Desa Curah Dringu, Tongas, Probolinggo.
              </p>
              <a
                className="flex items-center gap-x-2 bg-primary text-accent rounded-md px-4 py-2 mt-2"
                href={"https://maps.app.goo.gl/LU5SamoYy5MXiUXZ6"}
                target="_blank"
              >
                <MapPin /> Lihat Peta
              </a>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            src={photoGallery[6].photo}
            width={360}
            height={680}
            className="rounded-lg object-cover h-96 "
            alt=""
          />
          <div className="absolute top-0 h-full grid place-items-center bg-gradient-to-t from-accent/80 to-accent/20 rounded-lg">
            <div className="flex flex-col items-center text-primary">
              <h2 className="font-bold text-xl drop-shadow-lg">Resepsi</h2>
              {params === "husband" ? (
                <>
                  <p className="drop-shadow-lg">{data[0].date}</p>
                  <p className="drop-shadow-lg">Jam Bebas</p>
                  <p className="drop-shadow-lg">{data[0].why}</p>
                  <p className="drop-shadow-lg">{data[0].address}</p>
                </>
              ) : (
                <>
                  <p className="drop-shadow-lg">{data[1].date}</p>
                  <p className="drop-shadow-lg">Jam Bebas</p>
                  <p className="drop-shadow-lg">{data[1].why}</p>
                  <p className="drop-shadow-lg">{data[1].address}</p>
                </>
              )}

              <a
                className="w-fit flex items-center gap-x-2 bg-primary text-accent rounded-md px-4 py-2 mt-2"
                href={
                  params === "husband"
                    ? "https://maps.app.goo.gl/wUQKqMHFw9kJJYzg7"
                    : "https://maps.app.goo.gl/LU5SamoYy5MXiUXZ6"
                }
                target="_blank"
              >
                <MapPin /> Lihat Peta
              </a>
            </div>
          </div>
        </div>
      </section>
      <PhotoGallery />

      <BankInfoComponent type={params ?? ""} />
      <RsvpForm setResult={setResult} />
      <section className="bg-accent w-full flex flex-col items-center space-y-8 px-6 py-12">
        <div className="flex flex-col items-center gap-1">
          <Fade
            as="h1"
            className="font-dancing-script font-bold text-primary text-4xl tracking-wider"
            direction="down"
            framerProps={{
              show: { transition: { delay: 0.3 } },
            }}
          >
            Love Notes
          </Fade>
          <LineBorderDown className="text-primary w-40" />
        </div>
        <div className="bg-primary w-full h-[420px] overflow-y-auto flex flex-col gap-y-4 rounded-lg shadow-xl p-3">
          {loveNotes.map((item) => (
            <Note key={item.id} data={item} />
          ))}
        </div>
      </section>

      <footer className="bg-gradient-to-b from-primary to-secondary w-full min-h-48 pt-12 flex justify-center">
        <span className="text-accent">
          made with ❤️{" "}
          <a
            className="font-semibold"
            href="http://instagram.com/zaiinhs"
            target="_blank"
            rel="noopener noreferrer"
          >
            @zaiinhs.
          </a>
        </span>
      </footer>
    </main>
  );
}
