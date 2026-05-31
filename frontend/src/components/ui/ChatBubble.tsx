"use client";

/**
 * Individual chat bubble.
 */

import {
  motion,
  useReducedMotion,
} from "framer-motion";

interface ChatBubbleProps {
  sender: "me" | "other";
  content: string;
}

export function ChatBubble({
  sender,
  content,
}: ChatBubbleProps) {
  const isMine =
    sender === "me";

  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 10,
            }
      }
      animate={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      className={`
        flex

        ${
          isMine
            ? "justify-end"
            : "justify-start"
        }
      `}
    >
      <div
        className={`
          max-w-[85%]
          md:max-w-[75%]

          break-words

          rounded-2xl

          px-4
          md:px-5

          py-3
          md:py-4

          text-sm
          md:text-base

          leading-7

          shadow-lg

          ${
            isMine
              ? `
                bg-blue-600
                text-white
              `
              : `
                bg-white
                text-slate-700
              `
          }
        `}
      >
        {content}
      </div>
    </motion.div>
  );
}