"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BackgroundStreaksProps {
  className?: string
  variant?: "hero" | "subtle" | "panel"
}

export function BackgroundStreaks({ className, variant = "subtle" }: BackgroundStreaksProps) {
  const streakVariants = {
    hero: "opacity-30",
    subtle: "opacity-10",
    panel: "opacity-20",
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Animated gradient streaks */}
      <motion.div
        className={cn(
          "absolute -top-1/2 -left-1/4 w-1/2 h-full rounded-full",
          "bg-gradient-to-br from-streak-primary to-transparent blur-3xl",
          streakVariants[variant]
        )}
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={cn(
          "absolute top-1/4 -right-1/4 w-1/2 h-3/4 rounded-full",
          "bg-gradient-to-bl from-streak-secondary to-transparent blur-3xl",
          streakVariants[variant]
        )}
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={cn(
          "absolute bottom-0 left-1/3 w-1/3 h-1/2 rounded-full",
          "bg-gradient-to-t from-streak-primary to-transparent blur-2xl",
          streakVariants[variant]
        )}
        animate={{
          x: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
