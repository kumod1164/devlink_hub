
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"

export default function GithubSignInButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn("github", { callbackUrl: "/console" });
    } catch (error) {
      console.error("GitHub sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleSignIn}
      disabled={isLoading}
      className="w-full font-medium bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
    >
      {isLoading ? (
        <div className="h-5 w-5 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
      ) : (
        <div className="flex items-center justify-center">
          <Github className="h-5 w-5 mr-2" />
          GitHub
        </div>
      )}
    </Button>
  )
}
