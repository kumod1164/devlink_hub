"use client"

import { motion } from "framer-motion"
import { Calendar, DollarSign, ExternalLink, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    client: string
    status: string
    progress: number
    deadline: string
    budget: string
    technologies: string[]
  }
  detailed?: boolean
}

export default function ProjectCard({ project, detailed = false }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <p className="text-sm text-slate-600">{project.client}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              {detailed && (
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {project.status === "In Progress" && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-slate-400" />
              <span>{project.deadline}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-slate-400" />
              <span>{project.budget}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Technologies</p>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {detailed && (
            <div className="flex space-x-2 pt-2">
              <Button size="sm" className="flex-1">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
