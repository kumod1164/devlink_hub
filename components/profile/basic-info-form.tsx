"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Twitter, Globe } from "lucide-react"

interface BasicInfoFormProps {
  user: {
    name: string
    username: string
    email: string
    phone: string
    bio: string
    location: string
    socialLinks: {
      github: string
      linkedin: string
      twitter: string
      website: string
    }
  }
  isEditing: boolean
}

export default function BasicInfoForm({ user, isEditing }: BasicInfoFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            {isEditing ? (
              <Input id="name" defaultValue={user.name} />
            ) : (
              <div className="text-slate-700 py-2">{user.name}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            {isEditing ? (
              <Input id="username" defaultValue={user.username} />
            ) : (
              <div className="text-slate-700 py-2">@{user.username}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            {isEditing ? (
              <Input id="email" type="email" defaultValue={user.email} />
            ) : (
              <div className="text-slate-700 py-2">{user.email}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Mobile Number</Label>
            {isEditing ? (
              <Input id="phone" type="tel" defaultValue={user.phone} />
            ) : (
              <div className="text-slate-700 py-2">{user.phone}</div>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="location">Location</Label>
            {isEditing ? (
              <Input id="location" defaultValue={user.location} placeholder="City, Country" />
            ) : (
              <div className="text-slate-700 py-2">{user.location}</div>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">About Me</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                defaultValue={user.bio}
                placeholder="Write a short bio about yourself..."
                className="min-h-[120px]"
              />
            ) : (
              <div className="text-slate-700 py-2 whitespace-pre-wrap">{user.bio}</div>
            )}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="github" className="flex items-center">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Label>
              {isEditing ? (
                <Input id="github" defaultValue={user.socialLinks.github} placeholder="https://github.com/username" />
              ) : (
                <a
                  href={user.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline py-2 inline-block"
                >
                  {user.socialLinks.github}
                </a>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Label>
              {isEditing ? (
                <Input
                  id="linkedin"
                  defaultValue={user.socialLinks.linkedin}
                  placeholder="https://linkedin.com/in/username"
                />
              ) : (
                <a
                  href={user.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline py-2 inline-block"
                >
                  {user.socialLinks.linkedin}
                </a>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter" className="flex items-center">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Label>
              {isEditing ? (
                <Input
                  id="twitter"
                  defaultValue={user.socialLinks.twitter}
                  placeholder="https://twitter.com/username"
                />
              ) : (
                <a
                  href={user.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline py-2 inline-block"
                >
                  {user.socialLinks.twitter}
                </a>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Portfolio/Website
              </Label>
              {isEditing ? (
                <Input id="website" defaultValue={user.socialLinks.website} placeholder="https://yourwebsite.com" />
              ) : (
                <a
                  href={user.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline py-2 inline-block"
                >
                  {user.socialLinks.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
