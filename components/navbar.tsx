import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <motion.div
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              DevLink Hub
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* <NavLink href="/features">Features</NavLink>
            <NavLink href="/developers">Developers</NavLink>
            <NavLink href="/companies">Companies</NavLink>
            <NavLink href="/pricing">Pricing</NavLink> */}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Button variant="ghost" className="text-slate-700 hover:text-teal-700" onClick={() => router.push("/auth" )}>
              Log In
            </Button> */}
            <Button className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white" onClick={() => router.push("/auth")}>
              Log In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {/* <MobileNavLink href="/features" onClick={() => setIsMobileMenuOpen(false)}>
                Features
              </MobileNavLink>
              <MobileNavLink href="/developers" onClick={() => setIsMobileMenuOpen(false)}>
                Developers
              </MobileNavLink>
              <MobileNavLink href="/companies" onClick={() => setIsMobileMenuOpen(false)}>
                Companies
              </MobileNavLink>
              <MobileNavLink href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
                Pricing
              </MobileNavLink> */}
              <div className="pt-4 flex flex-col space-y-3">
                <Button variant="outline" className="w-full justify-center" onClick={() => router.push("/auth")}>
                  Log In 
                </Button>
                <Button className="w-full justify-center bg-gradient-to-r from-teal-500 to-teal-700" onClick={() => router.push("/auth")}>Sign Up</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-slate-700 hover:text-teal-700 font-medium transition-colors">
      <motion.span whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        {children}
      </motion.span>
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="text-slate-700 hover:text-teal-700 font-medium py-2 transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
