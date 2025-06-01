"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import TagInput from "@/components/profile/tag-input"
import ImageUpload from "@/components/profile/image-upload"

interface Project {
  id: number
  title: string
  techStack: string[]
  githubLink: string
  liveLink: string
  description: string
  image: string
}

interface ProjectFormProps {
  project?: Project
  onSubmit: (project: Project) => void
  onCancel: () => void
}

export default function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || "")
  const [techStack, setTechStack] = useState<string[]>(project?.techStack || [])
  const [githubLink, setGithubLink] = useState(project?.githubLink || "")
  const [liveLink, setLiveLink] = useState(project?.liveLink || "")
  const [description, setDescription] = useState(project?.description || "")
  const [image, setImage] = useState(project?.image || "/placeholder.svg?height=150&width=300")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      id: project?.id || 0,
      title,
      techStack,
      githubLink,
      liveLink,
      description,
      image,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="project-title">Project Title</Label>
          <Input
            id="project-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="project-description">Description</Label>
          <Textarea
            id="project-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project"
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github-link">GitHub Link</Label>
          <Input
            id="github-link"
            type="url"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="live-link">Live Demo Link</Label>
          <Input
            id="live-link"
            type="url"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            placeholder="https://your-project.com"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="tech-stack">Tech Stack</Label>
          <TagInput
            id="tech-stack"
            defaultTags={techStack}
            onChange={setTechStack}
            placeholder="Add technologies (press Enter)"
            maxTags={10}
            suggestions={[
              "React",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "Node.js",
              "Express",
              "MongoDB",
              "PostgreSQL",
              "TailwindCSS",
              "GraphQL",
            ]}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="project-image">Project Image</Label>
          <ImageUpload
            currentImage={image}
            onImageSelected={setImage}
            className="h-48 w-full object-cover rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{project ? "Update Project" : "Add Project"}</Button>
      </div>
    </form>
  )
}
