"use client"

import { motion } from "framer-motion"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProfileCompletionCardProps {
  percentage: number
  missingFields: string[]
}

export default function ProfileCompletionCard({ percentage, missingFields }: ProfileCompletionCardProps) {
  const getCompletionColor = () => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 50) return "text-amber-600"
    return "text-red-600"
  }

  const getProgressColor = () => {
    if (percentage >= 80) return "bg-green-600"
    if (percentage >= 50) return "bg-amber-600"
    return "bg-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-teal-600" />
          Profile Completion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Completion Status</span>
            <span className={`font-bold ${getCompletionColor()}`}>{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" indicatorClassName={getProgressColor()} />
        </div>

        {missingFields.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
              Complete these items:
            </h4>
            <ul className="space-y-2">
              {missingFields.map((field, index) => (
                <motion.li
                  key={index}
                  className="text-sm text-slate-600 flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2"></div>
                  {field}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-teal-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-teal-700 mb-2">Why complete your profile?</h4>
          <ul className="space-y-2">
            <li className="text-xs text-teal-600 flex items-start">
              <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-teal-500" />
              Complete profiles get 4x more project invitations
            </li>
            <li className="text-xs text-teal-600 flex items-start">
              <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-teal-500" />
              Verified skills increase your visibility in search results
            </li>
            <li className="text-xs text-teal-600 flex items-start">
              <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-teal-500" />
              Showcase your best work to attract quality opportunities
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
