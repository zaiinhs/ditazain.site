"use client";

import { LoaderCircle, Send } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubmitBtn = ({ name, message }: { name: string; message: string }) => {
  const { pending } = useFormStatus();
  const isDisabled = !name || message.length < 5 || pending;

  return (
    <button
      className="flex justify-center items-center gap-x-1 w-24 bg-accent rounded-lg text-primary px-4 py-2 hover:bg-accent/80 disabled:bg-accent/80 disabled:cursor-not-allowed"
      disabled={isDisabled}
    >
      {pending ? (
        <LoaderCircle size={16} className="animate-spin" />
      ) : (
        <>
          Kirim <Send size={16} />
        </>
      )}
    </button>
  );
};

export default SubmitBtn;
