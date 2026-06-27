"use client"

import Link from "next/link"
import { Package, Users, Inbox, CheckCircle } from "lucide-react"
import { RoleGuard } from "@/components/layout/RoleGuard"
import { PageHeader } from "@/components/shared/PageHeader"
import { useAuth } from "@/hooks/use-auth"
import { useStore } from "@/hooks/use-store"
import { getBrokerStats, getLoadsForUser } from "@/lib/services/loads"
import { LoadCard } from "@/components/loads/LoadCard"
import { StatCard } from "@/components/shared/StatCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"

export default function BrokerDashboardPage() {
  return (
    <RoleGuard role="broker">
      <BrokerDashboard />
    </RoleGuard>
  )
}

function BrokerDashboard() {
  const { user } = useAuth()
  useStore()

  if (!user) return null

  const stats = getBrokerStats(user.id)
  const loads = getLoadsForUser(user)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Broker Dashboard"
        description="Manage client shipments and carrier offers"
        action={
          <Button asChild className="font-semibold uppercase tracking-wide">
            <Link href="/broker/loads/new">Post Load for Client</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Managed Loads" value={stats.totalLoads} icon={Package} />
        <StatCard title="Active Loads" value={stats.activeLoads} icon={Inbox} />
        <StatCard title="Clients" value={stats.clientCount} icon={Users} />
        <StatCard title="Delivered" value={stats.delivered} icon={CheckCircle} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Loads</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/broker/loads">View All</Link>
          </Button>
        </div>
        {loads.length === 0 ? (
          <EmptyState
            title="No loads managed yet"
            action={
              <Button asChild>
                <Link href="/broker/loads/new">Post Load</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
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
    </div>
  )
}
