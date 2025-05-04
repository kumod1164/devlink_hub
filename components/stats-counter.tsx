

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface StatsCounterProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  delay?: number
}

export default function StatsCounter({ value, label, prefix = "", suffix = "", delay = 0 }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000 // 2 seconds
    const increment = Math.ceil(value / (duration / 16)) // 60fps

    const timer = setInterval(() => {
      start += increment
      if (start > value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value, isInView])

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      onViewportEnter={() => setIsInView(true)}
    >
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {prefix}
        {Math.round(count).toLocaleString()}
        {suffix}
      </div>
      <div className="text-teal-200">{label}</div>
    </motion.div>
  )
}
