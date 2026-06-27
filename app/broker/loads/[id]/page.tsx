"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"
import { RoleGuard } from "@/components/layout/RoleGuard"
import { LoadDetailView } from "@/components/loads/LoadDetailView"
import { useAuth } from "@/hooks/use-auth"
import { useStore } from "@/hooks/use-store"
import { Button } from "@/components/ui/button"

export default function BrokerLoadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <RoleGuard role="broker">
      <BrokerLoadDetail params={params} />
    </RoleGuard>
  )
}

function BrokerLoadDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { user } = useAuth()
  const db = useStore()
  const load = db.loads.find((l) => l.id === id)

  if (!load || !user || load.brokerId !== user.id) notFound()

  return (
    <div className="space-y-4">
      <Button asChild variant="ghost" size="sm">
        <Link href="/broker/loads">← Back to loads</Link>
      </Button>
      <LoadDetailView
        load={load}
        user={user}
        canManageOffers
      />
    </div>
  )
}
