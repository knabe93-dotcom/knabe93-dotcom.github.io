import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Eyebrow({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-accent-light",
        center && "justify-center",
      )}
    >
      <span className="h-0.5 w-6 rounded bg-gradient-to-r from-transparent to-accent" />
      {children}
      {center && <span className="h-0.5 w-6 rounded bg-gradient-to-l from-transparent to-accent" />}
    </span>
  )
}
