
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "TechSolutions Inc.",
      image: "/professional-woman-glasses.png",
      content:
        "DevLink Hub helped me find my dream job at a startup that values my skills. The platform made it easy to showcase my portfolio and connect with the right people.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Full Stack Developer",
      company: "Innovate Labs",
      image: "/placeholder.svg?key=uvjdp",
      content:
        "As a freelancer, DevLink Hub has been invaluable for finding quality clients. The verification process ensures I only work with serious companies, and the messaging system is seamless.",
      rating: 5,
    },
    {
      name: "Jessica Williams",
      role: "CTO",
      company: "StartupBoost",
      image: "/professional-black-woman-smiling.png",
      content:
        "We've hired three developers through DevLink Hub, and each one has exceeded our expectations. The platform's filtering tools helped us find exactly the skills we needed for our project.",
      rating: 4,
    },
    {
      name: "David Rodriguez",
      role: "Mobile Developer",
      company: "AppWorks",
      image: "/placeholder.svg?key=ok1uw",
      content:
        "The connections I've made through DevLink Hub have opened doors I never thought possible. I've collaborated on exciting projects and grown my skills exponentially.",
      rating: 5,
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const handlePrevious = () => {
    setAutoplay(false)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="relative h-[350px] md:h-[300px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="absolute w-full"
            >
              <Card className="border-none shadow-lg bg-white mx-auto max-w-4xl">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img
                          src={testimonials[currentIndex].image || "/placeholder.svg"}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < testimonials[currentIndex].rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-lg text-slate-700 italic mb-6">"{testimonials[currentIndex].content}"</p>
                      <div>
                        <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                        <p className="text-slate-600">
                          {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setAutoplay(false)
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-teal-500" : "bg-slate-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
        onClick={handlePrevious}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
        onClick={handleNext}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
