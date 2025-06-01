"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  User,
  Briefcase,
  Users,
  MessageSquare,
  Search,
  Settings,
  HelpCircle,
  TrendingUp,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

const navigation = [
  { name: "Dashboard", href: "/console", icon: LayoutDashboard },
  { name: "Profile", href: "/console/profile", icon: User },
  { name: "Projects", href: "/console/projects", icon: Briefcase },
  { name: "Network", href: "/console/network", icon: Users },
  { name: "Messages", href: "/console/messages", icon: MessageSquare },
  { name: "Opportunities", href: "/console/opportunities", icon: Search },
  { name: "Analytics", href: "/console/analytics", icon: TrendingUp },
  { name: "Calendar", href: "/console/calendar", icon: Calendar },
  { name: "Achievements", href: "/console/achievements", icon: Award },
]

const bottomNavigation = [
  { name: "Settings", href: "/console/settings", icon: Settings },
  { name: "Help", href: "/console/help", icon: HelpCircle },
]

interface DashboardSidebarProps {
  onMobileMenuToggle?: (isOpen: boolean) => void
}

export default function DashboardSidebar({ onMobileMenuToggle }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Auto-collapse on tablet, auto-close mobile menu on mobile
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false)
      setCollapsed(false) // Reset collapsed state on mobile
    } else if (isTablet) {
      setCollapsed(true) // Auto-collapse on tablet
      setMobileMenuOpen(false)
    } else {
      setMobileMenuOpen(false)
    }
  }, [isMobile, isTablet])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen
    setMobileMenuOpen(newState)
    onMobileMenuToggle?.(newState)
  }

  const toggleCollapsed = () => {
    if (!isMobile) {
      setCollapsed(!collapsed)
    }
  }

  // Mobile menu button (only visible on mobile)
  if (isMobile) {
    return (
      <>
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Mobile sidebar */}
              <motion.div
                className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 md:hidden"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <MobileSidebarContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Desktop/tablet sidebar
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 hidden md:flex",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <DesktopSidebarContent collapsed={collapsed} onToggleCollapsed={toggleCollapsed} />
    </div>
  )
}

// Mobile sidebar content
function MobileSidebarContent() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-center p-4 border-b border-slate-200">
        <Link
          href="/"
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600"
        >
          DevLink Hub
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={cn(
                  "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3">{item.name}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={cn(
                  "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3">{item.name}</span>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// Desktop sidebar content
function DesktopSidebarContent({
  collapsed,
  onToggleCollapsed,
}: {
  collapsed: boolean
  onToggleCollapsed: () => void
}) {
  const pathname = usePathname()

  return (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        {!collapsed && (
          <Link
            href="/"
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600"
          >
            DevLink Hub
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapsed}
          className={cn("flex-shrink-0", collapsed && "mx-auto")}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group relative",
                  isActive ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  collapsed && "justify-center",
                )}
                whileHover={{ x: collapsed ? 0 : 2 }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="ml-3">{item.name}</span>}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group relative",
                  isActive ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  collapsed && "justify-center",
                )}
                whileHover={{ x: collapsed ? 0 : 2 }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="ml-3">{item.name}</span>}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
