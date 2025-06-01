"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface MessageCardProps {
  message: {
    id: number
    sender: string
    message: string
    time: string
    unread: boolean
    avatar: string
  }
}

export default function MessageCard({ message }: MessageCardProps) {
  return (
    <motion.div
      className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
        message.unread ? "bg-teal-50 hover:bg-teal-100" : "hover:bg-slate-50"
      }`}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
        <AvatarFallback>
          {message.sender
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium truncate">{message.sender}</p>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-slate-500">{message.time}</p>
            {message.unread && <Badge className="h-2 w-2 p-0 bg-teal-500" />}
          </div>
        </div>
        <p className="text-sm text-slate-600 truncate">{message.message}</p>
      </div>
    </motion.div>
  )
}
