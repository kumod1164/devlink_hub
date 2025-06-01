"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileHeader from "@/components/profile/profile-header"
import BasicInfoForm from "@/components/profile/basic-info-form"
import ProfessionalDetailsForm from "@/components/profile/professional-details-form"
import ProjectShowcase from "@/components/profile/project-showcase"
import ResumeWorkSamples from "@/components/profile/resume-work-samples"
import SecuritySettings from "@/components/profile/security-settings"
import ProfileCompletionCard from "@/components/profile/profile-completion-card"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardHeader from "@/components/dashboard-header"
import LogoutPopup from "@/components/logout-popup"
import { Button } from "@/components/ui/button"
import { Save, Undo2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("basic-info")
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const { toast } = useToast()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleSaveChanges = () => {
    // Here you would save all the form data
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved successfully.",
    })
    setIsEditing(false)
  }

  const handleCancelChanges = () => {
    // Here you would reset the form data
    setIsEditing(false)
    toast({
      title: "Changes discarded",
      description: "Your profile changes have been discarded.",
      variant: "destructive",
    })
  }

  // Mock user data (same as before)
  const userData = {
    name: "Alex Johnson",
    username: "alexj",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Full stack developer with 5+ years of experience in React, Node.js, and cloud technologies. Passionate about building scalable web applications and contributing to open source projects.",
    location: "San Francisco, CA",
    avatarUrl: "/placeholder.svg?height=200&width=200",
    title: "Full Stack Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    socialLinks: {
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      website: "https://alexjohnson.dev",
    },
    professionalDetails: {
      currentRole: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      yearsOfExperience: 5,
      skills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS", "Docker", "GraphQL", "Next.js", "TailwindCSS"],
      interestedIn: ["Full-time", "Open Source", "Mentoring"],
      availability: "1 month",
    },
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        techStack: ["React", "Node.js", "MongoDB", "Stripe"],
        githubLink: "https://github.com/alexjohnson/ecommerce",
        liveLink: "https://ecommerce-demo.alexjohnson.dev",
        description:
          "A full-featured e-commerce platform with product management, cart functionality, payment processing, and order tracking.",
        image: "/placeholder.svg?height=150&width=300",
      },
      {
        id: 2,
        title: "Task Management App",
        techStack: ["React", "Firebase", "Material UI"],
        githubLink: "https://github.com/alexjohnson/taskmanager",
        liveLink: "https://tasks.alexjohnson.dev",
        description:
          "A collaborative task management application with real-time updates, team workspaces, and progress tracking.",
        image: "/placeholder.svg?height=150&width=300",
      },
      {
        id: 3,
        title: "Weather Dashboard",
        techStack: ["Vue.js", "OpenWeather API", "Chart.js"],
        githubLink: "https://github.com/alexjohnson/weather",
        liveLink: "https://weather.alexjohnson.dev",
        description:
          "An interactive weather dashboard with 7-day forecasts, historical data visualization, and location search.",
        image: "/placeholder.svg?height=150&width=300",
      },
    ],
    resume: {
      url: "/resume-placeholder.pdf",
      lastUpdated: "2023-11-15",
    },
    workSamples: [
      {
        id: 1,
        name: "UI Design Portfolio",
        type: "pdf",
        url: "/sample-portfolio.pdf",
        size: "2.4 MB",
      },
      {
        id: 2,
        name: "Code Quality Certificate",
        type: "pdf",
        url: "/certificate.pdf",
        size: "1.1 MB",
      },
    ],
    security: {
      lastPasswordChange: "2023-10-05",
      twoFactorEnabled: false,
      linkedAccounts: {
        google: true,
        github: true,
        credentials: true,
      },
    },
    profileCompletion: {
      percentage: 85,
      missingFields: ["Mobile Number", "Work Samples"],
    },
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar />

      {/* Main content with responsive padding */}
      <div className={`${isMobile ? "pl-0" : "lg:pl-64"} transition-all duration-300`}>
        <DashboardHeader user={userData} onLogout={() => setShowLogoutPopup(true)} />

        <main className="p-4 md:p-6">
          <div className="mb-6 md:mb-8">
            <ProfileHeader user={userData} isEditing={isEditing} onEditToggle={() => setIsEditing(!isEditing)} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left sidebar - Profile completion card */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <ProfileCompletionCard
                percentage={userData.profileCompletion.percentage}
                missingFields={userData.profileCompletion.missingFields}
              />
            </div>

            {/* Main content */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6 md:mb-8 w-full">
                  <TabsTrigger value="basic-info" className="text-xs md:text-sm">
                    Basic
                  </TabsTrigger>
                  <TabsTrigger value="professional" className="text-xs md:text-sm">
                    Work
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="text-xs md:text-sm">
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="resume" className="text-xs md:text-sm">
                    Resume
                  </TabsTrigger>
                  <TabsTrigger value="security" className="text-xs md:text-sm">
                    Security
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic-info">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BasicInfoForm user={userData} isEditing={isEditing} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="professional">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProfessionalDetailsForm user={userData} isEditing={isEditing} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="projects">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectShowcase projects={userData.projects} isEditing={isEditing} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="resume">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ResumeWorkSamples
                      resume={userData.resume}
                      workSamples={userData.workSamples}
                      isEditing={isEditing}
                    />
                  </motion.div>
                </TabsContent>

                <TabsContent value="security">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SecuritySettings security={userData.security} />
                  </motion.div>
                </TabsContent>
              </Tabs>

              {isEditing && (
                <motion.div
                  className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 mt-6 md:mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Button variant="outline" onClick={handleCancelChanges} className="w-full md:w-auto">
                    <Undo2 className="mr-2 h-4 w-4" />
                    Cancel Changes
                  </Button>
                  <Button onClick={handleSaveChanges} className="w-full md:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>

      <LogoutPopup isOpen={showLogoutPopup} onClose={() => setShowLogoutPopup(false)} />
    </div>
  )
}
