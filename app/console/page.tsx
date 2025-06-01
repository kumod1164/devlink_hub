"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MessageSquare, Briefcase, Users, Plus, Eye, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardHeader from "@/components/dashboard-header"
import ProfileCard from "@/components/profile-card"
import ProjectCard from "@/components/project-card"
import ConnectionCard from "@/components/connection-card"
import MessageCard from "@/components/message-card"
import OpportunityCard from "@/components/opportunity-card"
import LogoutPopup from "@/components/logout-popup"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function DashboardPage() {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Mock data (same as before)
  const user = {
    name: "Alex Johnson",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=100&width=100",
    verified: true,
    rating: 4.9,
    completedProjects: 47,
    connections: 234,
    profileViews: 1250,
  }

  const stats = [
    { label: "Profile Views", value: "1,250", change: "+12%", icon: <Eye className="h-5 w-5" /> },
    { label: "Project Invites", value: "8", change: "+3", icon: <Briefcase className="h-5 w-5" /> },
    { label: "New Connections", value: "15", change: "+5", icon: <Users className="h-5 w-5" /> },
    { label: "Messages", value: "23", change: "+7", icon: <MessageSquare className="h-5 w-5" /> },
  ]

  const recentProjects = [
    {
      id: 1,
      title: "E-commerce Platform",
      client: "TechCorp Inc.",
      status: "In Progress",
      progress: 75,
      deadline: "Dec 15, 2024",
      budget: "$5,000",
      technologies: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: "Mobile Banking App",
      client: "FinanceFlow",
      status: "Completed",
      progress: 100,
      deadline: "Nov 30, 2024",
      budget: "$8,500",
      technologies: ["React Native", "Firebase"],
    },
    {
      id: 3,
      title: "AI Dashboard",
      client: "DataViz Solutions",
      status: "Pending",
      progress: 0,
      deadline: "Jan 20, 2025",
      budget: "$12,000",
      technologies: ["Python", "TensorFlow", "React"],
    },
  ]

  const recentConnections = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "UI/UX Designer",
      company: "Design Studio",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualConnections: 12,
      status: "online" as const,
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      title: "Backend Developer",
      company: "CloudTech",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualConnections: 8,
      status: "offline" as const,
    },
    {
      id: 3,
      name: "Emily Davis",
      title: "Product Manager",
      company: "StartupXYZ",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualConnections: 15,
      status: "online" as const,
    },
  ]

  const recentMessages = [
    {
      id: 1,
      sender: "TechCorp Inc.",
      message: "Great work on the latest milestone! Looking forward to the next phase.",
      time: "2 hours ago",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      sender: "Sarah Chen",
      message: "Would love to collaborate on your next project. Let's discuss!",
      time: "5 hours ago",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      sender: "DevLink Hub",
      message: "Your profile has been viewed 50 times this week!",
      time: "1 day ago",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const opportunities = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "InnovateTech",
      type: "Full-time",
      location: "Remote",
      salary: "$120k - $150k",
      posted: "2 days ago",
      match: 95,
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      id: 2,
      title: "Freelance Mobile App Developer",
      company: "StartupBoost",
      type: "Contract",
      location: "San Francisco, CA",
      salary: "$80/hour",
      posted: "1 week ago",
      match: 88,
      skills: ["React Native", "iOS", "Android"],
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "GrowthCorp",
      type: "Full-time",
      location: "New York, NY",
      salary: "$100k - $130k",
      posted: "3 days ago",
      match: 92,
      skills: ["Python", "Django", "React"],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar onMobileMenuToggle={setMobileMenuOpen} />

      {/* Main content with responsive padding */}
      <div className={`${isMobile ? "pl-0" : "lg:pl-64"} transition-all duration-300`}>
        <DashboardHeader user={user} onLogout={() => setShowLogoutPopup(true)} />

        <main className="p-4 md:p-6">
          {/* Tips/Announcements Banner */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white border-none">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🚀</div>
                    <div>
                      <h3 className="font-semibold">Pro tip: Add your GitHub to get verified faster</h3>
                      <p className="text-teal-100 text-sm">Verified profiles get 3x more project invitations</p>
                    </div>
                  </div>
                  {!isMobile && (
                    <Button variant="secondary" size="sm">
                      Add GitHub
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="connections">Network</TabsTrigger>
              <TabsTrigger value="opportunities">Jobs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs md:text-sm font-medium text-slate-600">{stat.label}</p>
                            <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
                            <p className="text-xs text-green-600">{stat.change} this week</p>
                          </div>
                          <div className="text-teal-600">{stat.icon}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                  <ProfileCard user={user} />
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Recent Projects */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Recent Projects</CardTitle>
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentProjects.slice(0, 2).map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recent Messages */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Recent Messages</CardTitle>
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentMessages.slice(0, 3).map((message) => (
                        <MessageCard key={message.id} message={message} />
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">My Projects</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} detailed />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="connections" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">My Network</h2>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Find People
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentConnections.map((connection) => (
                  <ConnectionCard key={connection.id} connection={connection} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Job Opportunities</h2>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <LogoutPopup isOpen={showLogoutPopup} onClose={() => setShowLogoutPopup(false)} />
    </div>
  )
}
