import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

export default function FeatureCard({ title, description, icon, color }: FeatureCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="border-none shadow-lg h-full">
        <CardContent className="p-6">
          <div className={`w-16 h-16 rounded-lg ${color} flex items-center justify-center mb-4`}>{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-slate-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
