"use client";

import { ForwardRefComponent, HTMLMotionProps, motion, useInView, Variants } from "framer-motion";
import { useMemo, useRef } from "react";

type FadeProps = {
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  framerProps?: Variants;
  children: React.ReactNode;
  as?: "span" | "h1" | "p" | "button";
  repeat?: boolean;
  onClick?: () => void;
};

type TagType =
  | ForwardRefComponent<HTMLSpanElement, HTMLMotionProps<"span">>
  | ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h1">>
  | ForwardRefComponent<HTMLParagraphElement, HTMLMotionProps<"p">>
  | ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">>;

const Fade = ({
  direction = "up",
  className,
  children,
  framerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { type: "spring" } },
  },
  as = "h1",
  repeat = false,
  onClick,
}: FadeProps) => {
  const directionOffset = useMemo(() => {
    const map = { up: 10, down: -10, left: -10, right: 10 };
    return map[direction];
  }, [direction]);

  const fadeRef = useRef(null);
  const isInView = useInView(fadeRef, { once: repeat });

  const axis = direction === "up" || direction === "down" ? "y" : "x";

  const Tag: TagType = as === "span" ? motion.span : as === "h1" ? motion.h1 : as === "p" ? motion.p : as === "button" ? motion.button : motion.div;

  const FADE_ANIMATION_VARIANTS = useMemo(() => {
    const { hidden, show, ...rest } = framerProps as {
      [name: string]: { [name: string]: number; opacity: number };
    };

    return {
      ...rest,
      hidden: {
        ...(hidden ?? {}),
        opacity: hidden?.opacity ?? 0,
        [axis]: hidden?.[axis] ?? directionOffset,
      },
      show: {
        ...(show ?? {}),
        opacity: show?.opacity ?? 1,
        [axis]: show?.[axis] ?? 0,
      },
    };
  }, [directionOffset, axis, framerProps]);

  return (
    <motion.div ref={fadeRef} initial="hidden" animate={isInView ? "show" : "hidden"} variants={FADE_ANIMATION_VARIANTS}>
      <Tag className={className} onClick={onClick}>
        {children}
      </Tag>
    </motion.div>
  );
};

export default Fade;
