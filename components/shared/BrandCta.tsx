import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BrandCtaProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode
  variant?: "solid" | "outline" | "ghost"
  size?: "default" | "lg"
}

export function BrandCta({
  children,
  className,
  variant = "solid",
  size = "default",
  ...props
}: BrandCtaProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wide transition-colors",
        size === "lg" ? "px-8 py-4 text-sm" : "px-5 py-2.5 text-xs",
        variant === "solid" && "bg-brand text-white hover:bg-brand-dark",
        variant === "outline" &&
          "border-2 border-brand bg-transparent text-brand hover:bg-brand hover:text-white",
        variant === "ghost" && "text-brand hover:bg-brand-light",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="size-4" />
    </Link>
  )
}
