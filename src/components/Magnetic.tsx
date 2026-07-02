import { useRef, type ReactNode, type MouseEvent } from "react"
import { cn } from "@/lib/utils"

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const fine = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches

  function move(e: MouseEvent) {
    if (!fine || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * strength
    const y = (e.clientY - r.top - r.height / 2) * strength
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }
  function leave() {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <span
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={cn("inline-block transition-transform duration-300 ease-out will-change-transform", className)}
    >
      {children}
    </span>
  )
}
