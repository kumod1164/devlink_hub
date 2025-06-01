"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, DollarSign, TrendingUp, Bookmark, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface OpportunityCardProps {
  opportunity: {
    id: number
    title: string
    company: string
    type: string
    location: string
    salary: string
    posted: string
    match: number
    skills: string[]
  }
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const getMatchColor = (match: number) => {
    if (match >= 90) return "text-green-600 bg-green-100"
    if (match >= 80) return "text-blue-600 bg-blue-100"
    return "text-orange-600 bg-orange-100"
  }

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{opportunity.title}</CardTitle>
              <p className="text-slate-600">{opportunity.company}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getMatchColor(opportunity.match)}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {opportunity.match}% match
              </Badge>
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <div className="flex items-center">
              <Badge variant="outline">{opportunity.type}</Badge>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {opportunity.location}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {opportunity.salary}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {opportunity.posted}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Required Skills</p>
            <div className="flex flex-wrap gap-1">
              {opportunity.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1">Apply Now</Button>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
