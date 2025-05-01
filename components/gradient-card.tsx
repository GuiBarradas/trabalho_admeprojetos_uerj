import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GradientCardProps {
  children: ReactNode
  className?: string
}

export function GradientCard({ children, className }: GradientCardProps) {
  return (
    <div
      className={cn(
        "relative bg-white rounded-xl shadow-xl overflow-hidden group transition-all duration-500 hover:shadow-2xl",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
