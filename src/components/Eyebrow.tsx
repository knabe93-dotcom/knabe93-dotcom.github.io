import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Eyebrow({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <span
      className={cn(
        "items-center gap-2.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-gold-light",
        center ? "flex justify-center" : "inline-flex",
      )}
    >
      <span className="h-0.5 w-6 rounded bg-gradient-to-r from-transparent to-gold" />
      {children}
      {center && <span className="h-0.5 w-6 rounded bg-gradient-to-l from-transparent to-gold" />}
    </span>
  )
}
