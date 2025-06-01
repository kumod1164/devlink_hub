"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const avatarVariants = cva("relative inline-flex items-center justify-center overflow-hidden", {
  variants: {
    size: {
      xs: "h-6 w-6 text-xs",
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
      xl: "h-16 w-16 text-xl",
      "2xl": "h-20 w-20 text-2xl",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-md",
      rounded: "rounded-xl",
    },
    border: {
      none: "",
      thin: "ring-1",
      medium: "ring-2",
      thick: "ring-4",
    },
    borderColor: {
      default: "ring-slate-200",
      primary: "ring-teal-500",
      secondary: "ring-purple-500",
      white: "ring-white",
      gradient: "ring-gradient",
    },
    status: {
      none: "",
      online: "online",
      offline: "offline",
      busy: "busy",
      away: "away",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
    border: "none",
    borderColor: "default",
    status: "none",
  },
})

export interface CustomAvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string | React.ReactNode
  statusPosition?: "top-right" | "bottom-right" | "bottom-left" | "top-left"
  animated?: boolean
  group?: boolean
  groupIndex?: number
}

const CustomAvatar = ({
  className,
  size,
  shape,
  border,
  borderColor,
  status,
  src,
  alt = "Avatar",
  fallback,
  statusPosition = "bottom-right",
  animated = false,
  group = false,
  groupIndex = 0,
  ...props
}: CustomAvatarProps) => {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    setImgError(false)
  }, [src])

  const handleError = () => {
    setImgError(true)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const getStatusClass = () => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-slate-400"
      case "busy":
        return "bg-red-500"
      case "away":
        return "bg-yellow-500"
      default:
        return ""
    }
  }

  const getStatusPosition = () => {
    switch (statusPosition) {
      case "top-right":
        return "top-0 right-0"
      case "bottom-right":
        return "bottom-0 right-0"
      case "bottom-left":
        return "bottom-0 left-0"
      case "top-left":
        return "top-0 left-0"
      default:
        return "bottom-0 right-0"
    }
  }

  const AvatarComponent = animated ? motion.div : "div"

  const animationProps = animated
    ? {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.3, delay: group ? groupIndex * 0.1 : 0 },
      }
    : {}

  const groupStyle = group ? { marginLeft: groupIndex > 0 ? "-0.75rem" : "0" } : {}

  return (
    <AvatarComponent
      className={cn(avatarVariants({ size, shape, border, borderColor, status, className }))}
      style={groupStyle}
      {...animationProps}
      {...props}
    >
      {!imgError && src ? (
        <img src={src || "/placeholder.svg"} alt={alt} onError={handleError} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-800">
          {typeof fallback === "string" ? getInitials(fallback || alt) : fallback}
        </div>
      )}

      {status !== "none" && (
        <span
          className={cn(
            "absolute block h-3 w-3 rounded-full border-2 border-white",
            getStatusClass(),
            getStatusPosition(),
          )}
        />
      )}
    </AvatarComponent>
  )
}

export { CustomAvatar, avatarVariants }
