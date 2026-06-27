"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Truck,
  LogOut,
  User,
  RotateCcw,
  LayoutDashboard,
  Package,
  Search,
  Users,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { resetDatabase } from "@/lib/storage/storage"
import { NotificationBell } from "@/components/shared/NotificationBell"
import { BrandLogo } from "@/components/shared/BrandLogo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/types"
import { toast } from "sonner"

const navItems: Record<
  UserRole,
  { href: string; label: string; icon: React.ElementType }[]
> = {
  shipper: [
    { href: "/shipper", label: "Overview", icon: LayoutDashboard },
    { href: "/shipper/loads/new", label: "Post Load", icon: Package },
  ],
  carrier: [
    { href: "/carrier", label: "Overview", icon: LayoutDashboard },
    { href: "/carrier/loads", label: "Find Loads", icon: Search },
    { href: "/carrier/trucks", label: "My Trucks", icon: Truck },
    { href: "/carrier/deliveries", label: "Deliveries", icon: Package },
  ],
  broker: [
    { href: "/broker", label: "Overview", icon: LayoutDashboard },
    { href: "/broker/loads", label: "Loads", icon: Package },
    { href: "/broker/loads/new", label: "Post Load", icon: Package },
    { href: "/broker/clients", label: "Clients", icon: Users },
  ],
}

interface AppShellProps {
  children: React.ReactNode
  role?: UserRole
}

export function AppShell({ children, role }: AppShellProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const items = role ? navItems[role] : []

  const handleReset = () => {
    resetDatabase()
    toast.success("Demo data reset successfully")
    window.location.href = "/"
  }

  return (
    <div className="flex min-h-svh bg-muted/20">
      <aside className="hidden w-64 shrink-0 bg-sidebar text-sidebar-foreground md:flex md:flex-col">
        <div className="flex h-16 items-center border-b border-sidebar-border px-4">
          <BrandLogo light />
        </div>

        <div className="border-b border-sidebar-border px-4 py-3">
          <p className="text-xs font-semibold tracking-wider text-sidebar-foreground/50 uppercase">
            {role} Portal
          </p>
        </div>

        <nav className="flex-1 space-y-0.5 p-3">
          {items.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
          <Link href="/loads" className="mt-2 flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <Search className="size-4" />
            Public Load Board
          </Link>
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={handleReset}
          >
            <RotateCcw className="size-4" />
            Reset Demo
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          <div className="md:hidden">
            <BrandLogo />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold capitalize">{role} Dashboard</p>
            <p className="text-xs text-muted-foreground">
              Manage your freight operations
            </p>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <NotificationBell />
            {user && (
              <div className="hidden items-center gap-2 rounded-sm border bg-muted/40 px-3 py-1.5 text-sm sm:flex">
                <User className="size-4 text-brand" />
                <span>{user.companyName ?? user.name}</span>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={logout} className="gap-1.5">
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
