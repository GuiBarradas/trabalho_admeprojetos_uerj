"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion, useSpring, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  source?: string
}

export function AnimatedCounter({ value, duration = 2, decimals = 0, source }: AnimatedCounterProps) {
  const [ref, inView] = useInView({ triggerOnce: true })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(0, { duration: duration * 1000, bounce: 0.1 })
  const display = useTransform(spring, (current) => current.toFixed(decimals))

  useEffect(() => {
    if (inView && !hasAnimated) {
      spring.set(value)
      setHasAnimated(true)
    }
  }, [inView, spring, value, hasAnimated])

  return (
    <div>
      <motion.span ref={ref}>{display}</motion.span>
      {source && <div className="text-xs text-emerald-100 mt-1 opacity-70">{source}</div>}
    </div>
  )
}
