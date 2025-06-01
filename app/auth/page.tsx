
"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2, XCircle, Code, Users, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import GoogleSignInButton from "@/components/google-sign-in-button"
import GithubSignInButton from "@/components/github-sign-in-button"
import { signIn } from "next-auth/react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setEmailError("Email is required")
      return false
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required")
      return false
    } else if (password.length < 8 && !isLogin) {
      setPasswordError("Password must be at least 8 characters")
      return false
    }
    setPasswordError("")
    return true
  }

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
  
    // Log the form data before submitting
    console.log("Form Data Submitted:", { name, email, password });
  
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid || !isPasswordValid) {
      setLoading(false);
      console.log("Validation failed"); // Log if validation fails
      return;
    }
  
    if (isLogin) {
      // 👉 LOGIN FLOW
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/console",
      });
  
      if (res?.ok) {
        setMessage("Login successful. Redirecting...");
        window.location.href = res.url || "/console";
      } else {
        setMessage("Invalid email or password. Or you are not registered.");
      }
    } else {
      // 👉 SIGNUP FLOW
      try {
        console.log("Making API call to /api/register..."); // Log before API call
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
  
        console.log("API Response Status:", res.status); // Log status code
  
        if (!res.ok) {
          const errorData = await res.json();
          console.error("Error Response:", errorData); // Log error response
          setMessage(errorData.error || "Something went wrong.");
          return;
        }
  
        const data = await res.json();
        console.log("API Response Data:", data); // Log success response
  
        if (res.ok) {
          setMessage("Registered successfully. Redirecting to dashboard...");
          setTimeout(() => {
            signIn("credentials", {
              email,
              password,
              callbackUrl: "/console",
            });
          }, 2000);
        } else {
          setMessage(data.error || "Something went wrong.");
        }
      } catch (err) {
        console.error("❌ Register failed:", err);
        setMessage("Something went wrong. Try again.");
      }
    }
  
    setLoading(false);
  };

  const passwordStrength = () => {
    if (password.length === 0) return 0
    if (password.length < 8) return 1

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    return Math.min(strength, 4)
  }

  const getPasswordStrengthColor = () => {
    const strength = passwordStrength()
    if (strength === 0) return ""
    if (strength === 1) return "bg-red-500"
    if (strength === 2) return "bg-orange-500"
    if (strength === 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side - Content */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-teal-500 to-teal-700 text-white p-8 flex-col justify-between relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-white"></div>
        </div>

        <div className="relative z-10">
          <Link href="/" className="text-2xl font-bold">
            DevLink Hub
          </Link>
          <h1 className="text-4xl font-bold mt-16 mb-6">Connect with the best developers worldwide</h1>
          <p className="text-xl text-teal-100 mb-8">
            Join our community to showcase your skills, find opportunities, and collaborate on exciting projects.
          </p>

          <div className="space-y-6">
            {[
              {
                icon: <Code className="h-6 w-6 text-teal-300" />,
                title: "Developer Profiles",
                description: "Create a verified profile to showcase your skills and experience.",
              },
              {
                icon: <Users className="h-6 w-6 text-teal-300" />,
                title: "Connect with Teams",
                description: "Find the perfect team or project that matches your expertise.",
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-teal-300" />,
                title: "Secure Messaging",
                description: "Communicate directly with potential collaborators or employers.",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-4 mt-1">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-teal-100">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-sm text-teal-100">
          &copy; {new Date().getFullYear()} DevLink Hub. All rights reserved.
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-white relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-purple-300/30 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-teal-200/30 to-teal-300/30 rounded-tr-full"></div>

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2320a39e' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <motion.div
          className="w-full max-w-md relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8">
            <div className="text-center mb-8">
              {/* <div className="inline-block p-3 bg-gradient-to-br from-teal-50 to-purple-50 rounded-2xl mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div> */}
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600">
                {isLogin ? "Welcome Back" : "Create Your Account"}
              </h2>
              <p className="text-slate-600 mt-2">
                {isLogin ? "Sign in to access your DevLink Hub account" : "Join the community of developers and teams"}
              </p>
            </div>

            <div className="space-y-4">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}>
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      key="name-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="name" className="text-slate-700 font-medium">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10 bg-white border-slate-200 focus-visible:ring-teal-500"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={cn(
                        "pl-10 bg-white border-slate-200 focus-visible:ring-teal-500",
                        emailError && "border-red-500 focus-visible:ring-red-500",
                      )}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (emailError) validateEmail(e.target.value)
                      }}
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                      <XCircle className="h-4 w-4 mr-1" />
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-slate-700 font-medium">
                      Password
                    </Label>
                    {isLogin && (
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                      >
                        Forgot?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={isLogin ? "Your password" : "Create a password"}
                      className={cn(
                        "pl-10 pr-10 bg-white border-slate-200 focus-visible:ring-teal-500",
                        passwordError && "border-red-500 focus-visible:ring-red-500",
                      )}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (passwordError) validatePassword(e.target.value)
                      }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                      <XCircle className="h-4 w-4 mr-1" />
                      {passwordError}
                    </p>
                  )}

                  <AnimatePresence>
                    {!isLogin && password.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2"
                      >
                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full transition-all duration-300", getPasswordStrengthColor())}
                            style={{ width: `${passwordStrength() * 25}%` }}
                          ></div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-500">
                          <div className="flex items-center">
                            {password.length >= 8 ? (
                              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1 text-slate-400" />
                            )}
                            <span>8+ characters</span>
                          </div>
                          <div className="flex items-center">
                            {/[A-Z]/.test(password) ? (
                              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1 text-slate-400" />
                            )}
                            <span>Uppercase</span>
                          </div>
                          <div className="flex items-center">
                            {/[0-9]/.test(password) ? (
                              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1 text-slate-400" />
                            )}
                            <span>Number</span>
                          </div>
                          <div className="flex items-center">
                            {/[^A-Za-z0-9]/.test(password) ? (
                              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1 text-slate-400" />
                            )}
                            <span>Special char</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (isLogin ? "Logging in..." : "Creating account...") : (isLogin ? "Log In" : "Create Account")}
                </Button>
              </form>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <GoogleSignInButton />
                <GithubSignInButton />
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-slate-600">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button onClick={() => setIsLogin(false)} className="font-medium text-teal-600 hover:text-teal-700">
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setIsLogin(true)} className="font-medium text-teal-600 hover:text-teal-700">
                    Log in
                  </button>
                </>
              )}
            </div>

            <p className="text-center mt-6 text-xs text-slate-500">
              By continuing, you agree to DevLink Hub's{" "}
              <Link href="/terms" className="text-teal-600 hover:text-teal-700">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-teal-600 hover:text-teal-700">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
