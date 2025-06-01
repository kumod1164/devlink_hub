"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Clock } from "lucide-react"
import TagInput from "@/components/profile/tag-input"

interface ProfessionalDetailsFormProps {
  user: {
    professionalDetails: {
      currentRole: string
      company: string
      yearsOfExperience: number
      skills: string[]
      interestedIn: string[]
      availability: string
    }
  }
  isEditing: boolean
}

export default function ProfessionalDetailsForm({ user, isEditing }: ProfessionalDetailsFormProps) {
  const { professionalDetails } = user

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="currentRole">Current Role / Designation</Label>
            {isEditing ? (
              <Input id="currentRole" defaultValue={professionalDetails.currentRole} />
            ) : (
              <div className="text-slate-700 py-2">{professionalDetails.currentRole}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company / Organization</Label>
            {isEditing ? (
              <Input id="company" defaultValue={professionalDetails.company} />
            ) : (
              <div className="text-slate-700 py-2">{professionalDetails.company}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearsOfExperience">Years of Experience</Label>
            {isEditing ? (
              <Input
                id="yearsOfExperience"
                type="number"
                defaultValue={professionalDetails.yearsOfExperience.toString()}
                min="0"
                max="50"
              />
            ) : (
              <div className="text-slate-700 py-2">{professionalDetails.yearsOfExperience} years</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Availability
            </Label>
            {isEditing ? (
              <Select defaultValue={professionalDetails.availability}>
                <SelectTrigger id="availability">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Immediately</SelectItem>
                  <SelectItem value="1 week">1 week</SelectItem>
                  <SelectItem value="1 month">1 month</SelectItem>
                  <SelectItem value="not available">Not available</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="text-slate-700 py-2 flex items-center">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Available in {professionalDetails.availability}
                </Badge>
              </div>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="skills">Technical Skills</Label>
            {isEditing ? (
              <TagInput
                id="skills"
                defaultTags={professionalDetails.skills}
                placeholder="Add skills (press Enter)"
                maxTags={15}
              />
            ) : (
              <div className="flex flex-wrap gap-2 py-2">
                {professionalDetails.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="interestedIn">Interested In</Label>
            {isEditing ? (
              <TagInput
                id="interestedIn"
                defaultTags={professionalDetails.interestedIn}
                placeholder="Add interests (press Enter)"
                maxTags={5}
                suggestions={["Freelance", "Full-time", "Part-time", "Contract", "Open Source", "Mentoring"]}
              />
            ) : (
              <div className="flex flex-wrap gap-2 py-2">
                {professionalDetails.interestedIn.map((interest, index) => (
                  <Badge key={index} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {interest}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
