"use client"

import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react"
import { motion, MotionValue, useScroll, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    
    // --- THIS IS THE CHANGE ---
    // Make the animation faster by shortening the scroll distance
    offset: ["start 80%", "end 20%"],
    // Was: offset: ["start end", "end start"], 
    // --- END OF CHANGE ---
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <span
      ref={targetRef}
      className={cn(
        "flex flex-wrap text-black/20 dark:text-white/20",
        className, // This applies your 'text-2xl max-w-3xl' classes
      )}
    >
      {words.map((word, i) => {
        // This logic maps each word to a part of the scroll progress
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </span>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  // This line is fine, it maps the scroll progress to the opacity
  const opacity = useTransform(progress, range, [0, 1])
  
  return (
    <span className="relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  )
}