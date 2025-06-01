"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ExternalLink, Github, Edit, Trash2, X } from "lucide-react"
import ProjectForm from "@/components/profile/project-form"

interface Project {
  id: number
  title: string
  techStack: string[]
  githubLink: string
  liveLink: string
  description: string
  image: string
}

interface ProjectShowcaseProps {
  projects: Project[]
  isEditing: boolean
}

export default function ProjectShowcase({ projects: initialProjects, isEditing }: ProjectShowcaseProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const handleAddProject = (project: Project) => {
    setProjects([...projects, { ...project, id: Date.now() }])
    setShowForm(false)
  }

  const handleUpdateProject = (project: Project) => {
    setProjects(projects.map((p) => (p.id === project.id ? project : p)))
    setEditingProject(null)
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Project Showcase</CardTitle>
        {isEditing && !showForm && !editingProject && (
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              key="project-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-medium">Add New Project</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <ProjectForm onSubmit={handleAddProject} onCancel={() => setShowForm(false)} />
            </motion.div>
          ) : editingProject ? (
            <motion.div
              key="project-edit-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-medium">Edit Project</h3>
                <Button variant="ghost" size="sm" onClick={() => setEditingProject(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <ProjectForm
                project={editingProject}
                onSubmit={handleUpdateProject}
                onCancel={() => setEditingProject(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="project-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500 mb-4">You haven't added any projects yet.</p>
                  {isEditing && (
                    <Button onClick={() => setShowForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Project
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      className="border rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-1">
                          <div className="h-48 md:h-full bg-slate-100 relative">
                            <img
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              className="w-full h-full object-cover object-center"
                            />
                            {isEditing && (
                              <div className="absolute top-2 right-2 flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="h-8 w-8 p-0"
                                  onClick={() => setEditingProject(project)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleDeleteProject(project.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-2 p-4 md:p-6">
                          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                          <p className="text-slate-600 mb-4">{project.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-slate-700 hover:text-teal-600"
                            >
                              <Github className="h-4 w-4 mr-1" />
                              GitHub Repository
                            </a>
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-slate-700 hover:text-teal-600"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Live Demo
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
