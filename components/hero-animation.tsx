import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const devicePixelRatio = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Node class
    class Node {
      x: number
      y: number
      size: number
      color: string
      speed: number
      directionX: number
      directionY: number
      connected: boolean

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 2
        this.color = this.getRandomColor()
        this.speed = Math.random() * 0.5 + 0.2
        this.directionX = Math.random() * 2 - 1
        this.directionY = Math.random() * 2 - 1
        this.connected = false
      }

      getRandomColor() {
        const colors = [
          "rgba(20, 184, 166, 0.7)", // teal-500
          "rgba(126, 34, 206, 0.7)", // purple-700
          "rgba(217, 70, 239, 0.7)", // fuchsia-500
          "rgba(14, 165, 233, 0.7)", // sky-500
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY
        }

        this.x += this.directionX * this.speed
        this.y += this.directionY * this.speed
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create nodes
    const nodeCount = Math.min(Math.floor(canvas.width / 20), 50)
    const nodes: Node[] = []

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      nodes.push(new Node(x, y))
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update()
        nodes[i].draw()
        nodes[i].connected = false
      }

      // Connect nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = 1 - distance / 150
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(20, 184, 166, ${opacity * 0.5})`
            ctx.lineWidth = 1
            ctx.stroke()

            nodes[i].connected = true
            nodes[j].connected = true
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100"
        style={{ width: "100%", height: "100%" }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-md">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-teal-700 mb-2">Connect with 10,000+ Developers</h3>
            <p className="text-slate-700">Build your network and find your next opportunity or collaboration.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
