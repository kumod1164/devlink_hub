"use client"

import { motion, AnimatePresence } from "framer-motion"
import { LogOut, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LogoutPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function LogoutPopup({ isOpen, onClose }: LogoutPopupProps) {
  const handleLogout = () => {
    // Here you would handle the actual logout logic
    console.log("Logging out...")
    // Redirect to login page or home
    window.location.href = "/auth"
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Confirm Logout</CardTitle>
                <p className="text-slate-600 text-sm">Are you sure you want to log out of your DevLink Hub account?</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center text-sm text-slate-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    You'll need to sign in again to access your dashboard
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
