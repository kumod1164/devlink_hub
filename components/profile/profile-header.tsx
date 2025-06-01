"use client"

import { useState } from "react"
import { Edit, MapPin, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import ImageUpload from "@/components/profile/image-upload"

interface ProfileHeaderProps {
  user: {
    name: string
    username: string
    location: string
    avatarUrl: string
    bio: string
  }
  isEditing: boolean
  onEditToggle: () => void
}

export default function ProfileHeader({ user, isEditing, onEditToggle }: ProfileHeaderProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-teal-500 to-teal-600"></div>
      <div className="px-6 py-4 md:px-8 md:py-6 relative">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 -mt-16 md:-mt-20 relative mb-4 md:mb-0">
            {isEditing ? (
              <ImageUpload
                currentImage={previewImage || user.avatarUrl}
                onImageSelected={(image) => setPreviewImage(image)}
                className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white shadow-md"
              />
            ) : (
              <Avatar className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white shadow-md">
                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="absolute bottom-0 right-0 bg-teal-500 rounded-full p-1 border-2 border-white">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </div>

          <div className="md:ml-6 flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
                <p className="text-slate-500">@{user.username}</p>
              </div>
              <Button
                onClick={onEditToggle}
                variant={isEditing ? "default" : "outline"}
                className="mt-4 md:mt-0"
                size="sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Editing Profile" : "Edit Profile"}
              </Button>
            </div>

            <div className="flex items-center mt-2 text-slate-500 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{user.location}</span>
              <span className="mx-2">•</span>
              <Calendar className="h-4 w-4 mr-1" />
              <span>Joined June 2023</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">Full Stack Developer</Badge>
              <Badge variant="secondary">Open to Work</Badge>
              <Badge variant="outline">Verified Profile</Badge>
            </div>

            <p className="mt-4 text-slate-700">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
