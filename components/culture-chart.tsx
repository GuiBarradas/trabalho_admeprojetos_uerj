"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function CultureChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (!canvasRef.current || !inView) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const padding = 40
    const width = rect.width - padding * 2
    const height = rect.height - padding * 2
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(width, height) / 2

    const categories = ["Colaboração", "Inovação", "Adaptabilidade", "Comunicação", "Transparência", "Confiança"]

    const collaborativeValues = [0.9, 0.8, 0.85, 0.75, 0.8, 0.9]
    const hierarchicalValues = [0.5, 0.4, 0.3, 0.6, 0.5, 0.7]

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const levels = 5
    ctx.strokeStyle = "#e2e8f0"
    ctx.fillStyle = "#f8fafc"

    for (let i = levels; i > 0; i--) {
      const levelRadius = (radius * i) / levels

      ctx.beginPath()
      for (let j = 0; j < categories.length; j++) {
        const angle = (Math.PI * 2 * j) / categories.length - Math.PI / 2
        const x = centerX + levelRadius * Math.cos(angle)
        const y = centerY + levelRadius * Math.sin(angle)

        if (j === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }

    ctx.strokeStyle = "#cbd5e1"
    ctx.beginPath()
    for (let i = 0; i < categories.length; i++) {
      const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)

      ctx.save()
      ctx.fillStyle = "#334155"
      ctx.font = "bold 12px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const labelRadius = radius + 20
      const labelX = centerX + labelRadius * Math.cos(angle)
      const labelY = centerY + labelRadius * Math.sin(angle)

      ctx.fillText(categories[i], labelX, labelY)
      ctx.restore()
    }
    ctx.stroke()

    ctx.fillStyle = "rgba(16, 185, 129, 0.2)"
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 2

    ctx.beginPath()
    for (let i = 0; i < categories.length; i++) {
      const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2
      const value = collaborativeValues[i]
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = "rgba(100, 116, 139, 0.2)"
    ctx.strokeStyle = "#64748b"
    ctx.lineWidth = 2

    ctx.beginPath()
    for (let i = 0; i < categories.length; i++) {
      const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2
      const value = hierarchicalValues[i]
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = "#10b981"
    for (let i = 0; i < categories.length; i++) {
      const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2
      const value = collaborativeValues[i]
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.fillStyle = "#64748b"
    for (let i = 0; i < categories.length; i++) {
      const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2
      const value = hierarchicalValues[i]
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    const legendX = padding
    const legendY = padding

    ctx.fillStyle = "#10b981"
    ctx.beginPath()
    ctx.rect(legendX, legendY, 16, 16)
    ctx.fill()

    ctx.fillStyle = "#334155"
    ctx.font = "14px Inter, sans-serif"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText("Cultura Colaborativa", legendX + 24, legendY + 8)

    ctx.fillStyle = "#64748b"
    ctx.beginPath()
    ctx.rect(legendX, legendY + 24, 16, 16)
    ctx.fill()

    ctx.fillStyle = "#334155"
    ctx.fillText("Cultura Hierárquica", legendX + 24, legendY + 32)

    ctx.fillStyle = "#334155"
    ctx.font = "italic 12px Inter, sans-serif"
    ctx.textAlign = "right"
    ctx.textBaseline = "bottom"
    ctx.fillText("Fonte: MIT Sloan Management Review, 2022", rect.width - padding, rect.height - 10)
  }, [inView])

  return (
    <div ref={ref} className="mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-semibold mb-6 text-center">Comparativo de Características Culturais</h3>
        <div className="h-[400px] w-full">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
      </motion.div>
    </div>
  )
}
