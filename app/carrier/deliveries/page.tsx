"use client"

import Link from "next/link"
import { RoleGuard } from "@/components/layout/RoleGuard"
import { PageHeader } from "@/components/shared/PageHeader"
import { useAuth } from "@/hooks/use-auth"
import { useStore } from "@/hooks/use-store"
import { getLoadsForUser } from "@/lib/services/loads"
import { updateLoadStatus } from "@/lib/services/loads"
import { LoadCard } from "@/components/loads/LoadCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function CarrierDeliveriesPage() {
  return (
    <RoleGuard role="carrier">
      <CarrierDeliveries />
    </RoleGuard>
  )
}

function CarrierDeliveries() {
  const { user } = useAuth()
  useStore()

  if (!user) return null

  const deliveries = getLoadsForUser(user).filter((l) =>
    ["assigned", "in_transit", "delivered"].includes(l.status)
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deliveries"
        description="Track and update your assigned shipments"
      />

      {deliveries.length === 0 ? (
        <EmptyState title="No deliveries yet" description="Accepted offers will appear here." />
      ) : (
        <div className="space-y-4">
          {deliveries.map((load) => (
            <div key={load.id} className="space-y-2">
              <LoadCard load={load} href={`/loads/${load.id}`} />
              <div className="flex gap-2 pl-1">
                {load.status === "assigned" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      updateLoadStatus(load.id, "in_transit")
                      toast.success("Marked in transit")
                    }}
                  >
                    Mark In Transit
                  </Button>
                )}
                {load.status === "in_transit" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      updateLoadStatus(load.id, "delivered")
                      toast.success("Marked delivered")
                    }}
                  >
                    Mark Delivered
                  </Button>
                )}
                <Button asChild size="sm" variant="outline">
                  <Link href={`/loads/${load.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
