"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"
import { getLoadById } from "@/lib/services/loads"
import { useAuth } from "@/hooks/use-auth"
import { useStore } from "@/hooks/use-store"
import { PublicPageLayout } from "@/components/layout/PublicHeader"
import { LoadDetailView } from "@/components/loads/LoadDetailView"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function LoadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const db = useStore()
  const { user } = useAuth()
  const load = db.loads.find((l) => l.id === id) ?? getLoadById(id)

  if (!load) notFound()

  const canManageOffers =
    !!user &&
    (user.id === load.shipperId || user.id === load.brokerId)

  const canUpdateStatus =
    !!user &&
    user.role === "carrier" &&
    load.assignedCarrierId === user.id

  return (
    <PublicPageLayout title={load.title} subtitle={`${load.pickupCity} → ${load.deliveryCity}`}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Button asChild variant="ghost" size="sm" className="mb-6 gap-1 text-brand">
          <Link href="/loads">
            <ChevronLeft className="size-4" />
            Back to load board
          </Link>
        </Button>
        <LoadDetailView
          load={load}
          user={user}
          canManageOffers={canManageOffers}
          canUpdateStatus={canUpdateStatus}
        />
      </div>
    </PublicPageLayout>
  )
}
