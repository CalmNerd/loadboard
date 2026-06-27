"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { AppShell } from "@/components/layout/AppShell"
import type { UserRole } from "@/types"

interface RoleGuardProps {
  children: React.ReactNode
  role: UserRole
}

export function RoleGuard({ children, role }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login")
      return
    }
    if (user && user.role !== role) {
      const dashboard =
        user.role === "shipper"
          ? "/shipper"
          : user.role === "carrier"
            ? "/carrier"
            : "/broker"
      router.replace(dashboard)
    }
  }, [isAuthenticated, user, role, router])

  if (!isAuthenticated || !user || user.role !== role) {
    return (
      <div className="flex min-h-svh items-center justify-center text-muted-foreground">
        Loading...
      </div>
    )
  }

  return <AppShell role={role}>{children}</AppShell>
}
