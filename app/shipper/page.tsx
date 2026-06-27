"use client"

import Link from "next/link"
import { Package, Clock, CheckCircle, Inbox } from "lucide-react"
import { RoleGuard } from "@/components/layout/RoleGuard"
import { PageHeader } from "@/components/shared/PageHeader"
import { useAuth } from "@/hooks/use-auth"
import { useStore } from "@/hooks/use-store"
import { getLoadsForUser, getShipperStats } from "@/lib/services/loads"
import { LoadCard } from "@/components/loads/LoadCard"
import { StatCard } from "@/components/shared/StatCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"

export default function ShipperDashboardPage() {
  return (
    <RoleGuard role="shipper">
      <ShipperDashboard />
    </RoleGuard>
  )
}

function ShipperDashboard() {
  const { user } = useAuth()
  useStore()

  if (!user) return null

  const loads = getLoadsForUser(user)
  const stats = getShipperStats(user.id)
  const recentLoads = loads
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Shipper Dashboard"
        description="Manage your shipments and incoming carrier offers"
        action={
          <Button asChild className="font-semibold uppercase tracking-wide">
            <Link href="/shipper/loads/new">Post New Load</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Loads" value={stats.totalLoads} icon={Package} />
        <StatCard title="Active Loads" value={stats.activeLoads} icon={Clock} />
        <StatCard title="Pending Offers" value={stats.pendingOffers} icon={Inbox} />
        <StatCard title="Delivered" value={stats.delivered} icon={CheckCircle} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Your Loads</h2>
        {recentLoads.length === 0 ? (
          <EmptyState
            title="No loads yet"
            description="Post your first shipment to start receiving carrier offers."
            action={
              <Button asChild>
                <Link href="/shipper/loads/new">Post Load</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {recentLoads.map((load) => (
              <LoadCard
                key={load.id}
                load={load}
                href={`/shipper/loads/${load.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
