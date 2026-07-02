import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-white shadow-[0_12px_26px_-12px_rgba(77,107,255,.6)] hover:-translate-y-0.5 hover:bg-accent-light hover:text-[#0a0f1c]",
        ghost:
          "border border-line-strong bg-surface/40 text-ink hover:-translate-y-0.5 hover:border-accent hover:text-accent",
        gold:
          "bg-gradient-to-r from-gold to-gold-light text-[#0a0f1c] hover:-translate-y-0.5 hover:brightness-110",
      },
      size: {
        default: "h-11 px-6 text-[0.95rem]",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  ),
)
Button.displayName = "Button"

export { Button, buttonVariants }
