"use client"

import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"

interface PublicPageLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export function PublicPageLayout({ children, title, subtitle }: PublicPageLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col bg-muted/20">
      <SiteHeader />
      {(title || subtitle) && (
        <div className="border-b bg-white py-10 mx-auto">
          <div className="mx-auto max-w-7xl px-4 text-center">
            {title && <h1 className="text-3xl font-bold tracking-tight">{title}</h1>}
            {subtitle && (
              <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
      )}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

/** @deprecated Use SiteHeader directly */
export function PublicHeader() {
  return <SiteHeader />
}
