"use client"

import { motion } from "framer-motion"
import { MessageSquare, UserPlus, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ConnectionCardProps {
  connection: {
    id: number
    name: string
    title: string
    company: string
    avatar: string
    mutualConnections: number
    status: "online" | "offline"
  }
}

export default function ConnectionCard({ connection }: ConnectionCardProps) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                  <AvatarFallback>
                    {connection.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    connection.status === "online" ? "bg-green-400" : "bg-slate-400"
                  }`}
                />
              </div>
              <div>
                <h3 className="font-semibold">{connection.name}</h3>
                <p className="text-sm text-slate-600">{connection.title}</p>
                <p className="text-xs text-slate-500">{connection.company}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-slate-600 mb-4">{connection.mutualConnections} mutual connections</p>

          <div className="flex space-x-2">
            <Button size="sm" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
