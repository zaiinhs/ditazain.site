"use client";

import { cn } from "@/utils/cn";
import {
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
  useInView,
} from "framer-motion";
import { useRef } from "react";

type TextBlurProps = {
  word: string;
  as?: "div" | "span" | "h1" | "p";
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
};

type TagType =
  | ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>
  | ForwardRefComponent<HTMLSpanElement, HTMLMotionProps<"span">>
  | ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h1">>
  | ForwardRefComponent<HTMLParagraphElement, HTMLMotionProps<"p">>;

const TextBlurIn = ({
  word,
  as = "div",
  className,
  variant,
  duration = 1,
}: TextBlurProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  const blurRef = useRef(null);
  const isInView = useInView(blurRef);

  const Tag: TagType =
    as === "div"
      ? motion.div
      : as === "span"
      ? motion.span
      : as === "h1"
      ? motion.h1
      : motion.p;

  return (
    <Tag
      ref={blurRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration }}
      variants={combinedVariants}
      className={cn(
        className,
        "font-display text-center font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
      )}
    >
      {word}
    </Tag>
  );
};

export default TextBlurIn;
