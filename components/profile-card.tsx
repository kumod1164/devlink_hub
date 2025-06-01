"use client"
import { MapPin, Star, Award, Edit, Github, Linkedin, Globe } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileCardProps {
  user: {
    name: string
    title: string
    location: string
    avatar: string
    verified: boolean
    rating: number
    completedProjects: number
    connections: number
    profileViews: number
  }
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="relative mx-auto">
          <Avatar className="h-20 w-20 mx-auto">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {user.verified && (
            <div className="absolute -bottom-1 -right-1 bg-teal-500 rounded-full p-1">
              <Award className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-slate-600">{user.title}</p>
          <div className="flex items-center justify-center text-sm text-slate-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {user.location}
          </div>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="font-medium">{user.rating}</span>
          <span className="text-slate-500">({user.completedProjects} projects)</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-teal-600">{user.connections}</p>
            <p className="text-sm text-slate-600">Connections</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{user.profileViews}</p>
            <p className="text-sm text-slate-600">Profile Views</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {["React", "Node.js", "TypeScript", "Python"].map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Links</h4>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button className="w-full" variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  )
}
