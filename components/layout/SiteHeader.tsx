"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Globe, Search } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { brandNav, utilityLinks } from "@/lib/site-config"
import { BrandLogo } from "@/components/shared/BrandLogo"
import { BrandCta } from "@/components/shared/BrandCta"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  transparent?: boolean
}

export function SiteHeader({ transparent }: SiteHeaderProps) {
  const { user, isAuthenticated } = useAuth()
  const pathname = usePathname()

  const dashboardHref = user
    ? user.role === "shipper"
      ? "/shipper"
      : user.role === "carrier"
        ? "/carrier"
        : "/broker"
    : "/login"

  return (
    <header className={cn("sticky top-0 z-50 w-full", transparent ? "bg-white" : "bg-white shadow-sm")}>
      {/* Utility bar */}
      <div className="hidden border-b border-border/60 bg-muted/40 lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-5">
            {utilityLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-brand">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1">
              <Globe className="size-3.5" />
              IQ — English
            </span>
            {isAuthenticated ? (
              <Link href={dashboardHref} className="font-medium text-brand hover:underline">
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(pathname === "/login" && "font-medium text-brand")}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={cn(pathname === "/register" && "font-medium text-brand")}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
          <BrandLogo />

          <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
            {brandNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand",
                  pathname === item.href || (item.href === "/loads" && pathname.startsWith("/loads"))
                    ? "text-brand"
                    : "text-foreground/80"
                )}
              >
                {item.label}
                {/* {(item.href.includes("#") || item.label === "Support") && (
                  <ChevronDown className="size-3.5 opacity-50" />
                )} */}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search loads..."
                className="h-9 w-44 rounded-full border-border/80 bg-muted/30 pl-9 text-sm lg:w-52"
              />
            </div>
            <BrandCta href="/register" className="hidden sm:inline-flex">
              Get Started
            </BrandCta>
          </div>
        </div>
      </div>
    </header>
  )
}
