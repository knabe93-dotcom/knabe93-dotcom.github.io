import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Section({
  id,
  alt,
  className,
  children,
}: {
  id?: string
  alt?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-[clamp(3.5rem,9vh,6.5rem)]",
        alt && "bg-elevated/55 border-y border-line backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1120px] px-[clamp(1.1rem,4vw,2.2rem)]">{children}</div>
    </section>
  )
}
