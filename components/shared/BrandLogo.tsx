import Link from "next/link"
import { Truck } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
  light?: boolean
}

export function BrandLogo({ className, light }: BrandLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex size-9 items-center justify-center rounded-sm",
          light ? "bg-white/15" : "bg-brand"
        )}
      >
        <Truck className={cn("size-5", light ? "text-white" : "text-white")} />
      </div>
      <span
        className={cn(
          "text-lg font-bold tracking-tight",
          light ? "text-white" : "text-foreground"
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  )
}
