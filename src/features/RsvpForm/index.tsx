"use client";

import { LineBorderDown } from "@/assets/Icon";
import { Fade, SubmitBtn } from "@/components";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { create } from "./action";

const RsvpForm = () => {
  const searchParams = useSearchParams();
  const guest = searchParams.get("kpd") ?? "Guest";

  const formRef = useRef<HTMLFormElement>(null);

  const createAction = async (formData: FormData) => {
    try {
      await create(formData);
      formRef.current?.reset();
    } catch (error) {
      throw new Error("error create data");
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary to-secondary w-full px-6 py-12 space-y-8 relative">
      <div className="flex flex-col items-center gap-1">
        <Fade
          as="h1"
          className="font-dancing-script font-bold text-accent text-4xl text-center tracking-wider"
          direction="down"
          framerProps={{
            show: { transition: { delay: 0.3 } },
          }}
        >
          RSVP
        </Fade>
        <LineBorderDown className="text-accent w-40" />
      </div>
      <form className="space-y-4" action={createAction} ref={formRef}>
        <div>
          <label htmlFor="name" className="block text-base font-medium leading-6 text-accent">
            Nama
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="name"
              defaultValue={guest.charAt(0).toUpperCase() + guest.slice(1)}
              autoComplete="name"
              className="block w-full rounded-md border-0 p-2 text-accent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="messages" className="block text-base font-medium leading-6 text-accent">
            Pesan Singkat
          </label>
          <div className="mt-2">
            <textarea
              id="messages"
              name="messages"
              rows={3}
              className="block w-full rounded-md border-0 p-2 text-accent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
        </div>
        <div>
          <span className="block text-base font-medium leading-6 text-accent">Kehadiran</span>
          <div className="flex items-center gap-x-6 mt-2">
            <div className="flex items-center gap-x-1">
              <input id="hadir" name="presence" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value={"true"} defaultChecked />
              <label htmlFor="hadir" className="block text-s font-medium leading-6 text-accent">
                Hadir
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input id="tidak-hadir" name="presence" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value={"false"} />
              <label htmlFor="tidak-hadir" className="block text-s font-medium leading-6 text-accent">
                Tidak Hadir
              </label>
            </div>
          </div>
        </div>
        <SubmitBtn />
      </form>
    </section>
  );
};

export default RsvpForm;
