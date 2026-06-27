"use client"

import Link from "next/link"
import { RoleGuard } from "@/components/layout/RoleGuard"
import { PageHeader } from "@/components/shared/PageHeader"
import { useAuth } from "@/hooks/use-auth"
import { useStore } from "@/hooks/use-store"
import { getLoadsForUser } from "@/lib/services/loads"
import { LoadCard } from "@/components/loads/LoadCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"

export default function BrokerLoadsPage() {
  return (
    <RoleGuard role="broker">
      <BrokerLoads />
    </RoleGuard>
  )
}

function BrokerLoads() {
  const { user } = useAuth()
  useStore()

  if (!user) return null

  const loads = getLoadsForUser(user).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Managed Loads"
        description="All shipments you manage for clients"
        action={
          <Button asChild className="font-semibold uppercase tracking-wide">
            <Link href="/broker/loads/new">Post Load</Link>
          </Button>
        }
      />

      {loads.length === 0 ? (
        <EmptyState title="No loads yet" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loads.map((load) => (
            <LoadCard
              key={load.id}
              load={load}
              href={`/broker/loads/${load.id}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
