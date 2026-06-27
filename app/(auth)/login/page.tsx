"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { DEMO_ACCOUNTS } from "@/lib/seed/data"
import { PublicPageLayout } from "@/components/layout/PublicHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = login(email, password)
    if (!result.success) {
      toast.error(result.error)
    }
  }

  const fillDemo = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <PublicPageLayout
      title="Login"
      subtitle="Sign in to your LoadBoard Iraq account"
    >
      <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-12">
        <Card className="rounded-sm shadow-md">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              <Button type="submit" className="h-11 w-full font-semibold uppercase tracking-wide">
                Login
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              No account?{" "}
              <Link href="/register" className="font-medium text-brand hover:underline">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-brand/20 bg-brand-light/50">
          <CardHeader>
            <CardTitle className="text-base text-brand">Demo Accounts</CardTitle>
            <CardDescription>Click to auto-fill credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {DEMO_ACCOUNTS.map((account) => (
              <Button
                key={account.email}
                variant="outline"
                size="sm"
                className="w-full justify-between border-brand/30"
                onClick={() => fillDemo(account.email, account.password)}
              >
                <span className="capitalize font-medium">{account.role}</span>
                <span className="text-muted-foreground">{account.email}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </PublicPageLayout>
  )
}
