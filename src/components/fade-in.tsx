"use client";

import { HTMLMotionProps, motion, MotionProps, Variants } from "framer-motion";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  PropsWithChildren,
} from "react";

const item: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

export interface FadeInProps extends HTMLMotionProps<"ul"> {}

function FadeIn({ ...props }: FadeInProps) {
  return (
    <motion.ul
      initial={"hidden"}
      whileInView={"visible"}
      viewport={{ once: true }}
      variants={{
        visible: {
          // opacity: 1,
          transition: {
            //   delayChildren: 0.3,
            staggerChildren: 0.05,
          },
        },
        hidden: {
          // opacity: 0,
          // transition: {
          //   when: "afterChildren",
          // },
        },
      }}
      {...props}
    />
  );
}
FadeIn.displayName = "FadeIn";

export interface FadeInItemProps extends HTMLMotionProps<"li"> {}
function FadeInItem({ ...props }: FadeInItemProps) {
  return <motion.li variants={item} {...props} />;
}
FadeInItem.displayName = "FadeInItem";

export { FadeIn, FadeInItem };
