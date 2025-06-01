"use client"

import type React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-teal-500 text-white hover:bg-teal-600",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        outline: "border border-slate-200 text-slate-700 hover:bg-slate-100",
        success: "bg-green-100 text-green-800 hover:bg-green-200",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        danger: "bg-red-100 text-red-800 hover:bg-red-200",
        info: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        purple: "bg-purple-100 text-purple-800 hover:bg-purple-200",
        gradient: "bg-gradient-to-r from-teal-500 to-purple-600 text-white",
      },
      size: {
        default: "px-2.5 py-0.5",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1",
        icon: "p-0 h-5 w-5",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
      },
      rounded: {
        default: "rounded-full",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
      rounded: "default",
    },
  },
)

export interface CustomBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  count?: number
  dot?: boolean
  icon?: React.ReactNode
  animated?: boolean
}

const CustomBadge = ({
  className,
  variant,
  size,
  animation,
  rounded,
  count,
  dot,
  icon,
  animated = false,
  children,
  ...props
}: CustomBadgeProps) => {
  const BadgeComponent = animated ? motion.div : "div"

  const animationProps = animated
    ? {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.2 },
      }
    : {}

  return (
    <BadgeComponent
      className={cn(badgeVariants({ variant, size, animation, rounded, className }))}
      {...animationProps}
      {...props}
    >
      {dot && <span className="block h-2 w-2 rounded-full bg-current" />}
      {icon && <span className="mr-1">{icon}</span>}
      {count !== undefined ? count : children}
    </BadgeComponent>
  )
}

export { CustomBadge, badgeVariants }
