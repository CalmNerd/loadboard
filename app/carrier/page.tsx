"use client"

import Link from "next/link"
import { Truck, Send, Package, CheckCircle } from "lucide-react"
import { RoleGuard } from "@/components/layout/RoleGuard"
import { PageHeader } from "@/components/shared/PageHeader"
import { useAuth } from "@/hooks/use-auth"
import { useStore } from "@/hooks/use-store"
import { getCarrierStats } from "@/lib/services/offers"
import { getLoadsForUser } from "@/lib/services/loads"
import { getOffersForCarrier } from "@/lib/services/offers"
import { LoadCard } from "@/components/loads/LoadCard"
import { OfferCard } from "@/components/offers/OfferCard"
import { StatCard } from "@/components/shared/StatCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"

export default function CarrierDashboardPage() {
  return (
    <RoleGuard role="carrier">
      <CarrierDashboard />
    </RoleGuard>
  )
}

function CarrierDashboard() {
  const { user } = useAuth()
  const db = useStore()

  if (!user) return null

  const stats = getCarrierStats(user.id)
  const offers = getOffersForCarrier(user.id).slice(0, 3)
  const deliveries = getLoadsForUser(user)
    .filter((l) => ["assigned", "in_transit"].includes(l.status))
    .slice(0, 3)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Carrier Dashboard"
        description="Manage trucks, offers, and active deliveries"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="My Trucks" value={db.trucks.filter((t) => t.carrierId === user.id).length} icon={Truck} />
        <StatCard title="Pending Offers" value={stats.pendingOffers} icon={Send} />
        <StatCard title="Active Deliveries" value={stats.activeDeliveries} icon={Package} />
        <StatCard title="Completed" value={stats.completed} icon={CheckCircle} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Offers</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/carrier/loads">Find Loads</Link>
            </Button>
          </div>
          {offers.length === 0 ? (
            <EmptyState title="No offers yet" description="Search loads and submit your first offer." />
          ) : (
            <div className="space-y-3">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Active Deliveries</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/carrier/deliveries">View All</Link>
            </Button>
          </div>
          {deliveries.length === 0 ? (
            <EmptyState title="No active deliveries" />
          ) : (
            <div className="space-y-3">
              {deliveries.map((load) => (
                <LoadCard
                  key={load.id}
                  load={load}
                  href={`/loads/${load.id}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
