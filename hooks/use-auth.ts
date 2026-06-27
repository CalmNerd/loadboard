"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, login, logout, register } from "@/lib/services/auth"
import { useStore } from "@/hooks/use-store"
import type { RegisterInput } from "@/types"

export function useAuth() {
  const db = useStore()
  const router = useRouter()
  const user = db.session
    ? db.users.find((u) => u.id === db.session!.userId) ?? null
    : null

  const handleLogin = useCallback(
    (email: string, password: string) => {
      const result = login(email, password)
      if (result.success && result.user) {
        const dashboard =
          result.user.role === "shipper"
            ? "/shipper"
            : result.user.role === "carrier"
              ? "/carrier"
              : "/broker"
        router.push(dashboard)
      }
      return result
    },
    [router]
  )

  const handleRegister = useCallback(
    (input: RegisterInput) => {
      const result = register(input)
      if (result.success && result.user) {
        const dashboard =
          result.user.role === "shipper"
            ? "/shipper"
            : result.user.role === "carrier"
              ? "/carrier"
              : "/broker"
        router.push(dashboard)
      }
      return result
    },
    [router]
  )

  const handleLogout = useCallback(() => {
    logout()
    router.push("/")
  }, [router])

  return {
    user,
    isAuthenticated: !!user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    getCurrentUser,
  }
}
