"use client"

import { getUserById } from "@/lib/services/auth"
import { getOffersForLoad } from "@/lib/services/offers"
import { getTrucksForCarrier } from "@/lib/services/trucks"
import { submitOffer, acceptOffer, rejectOffer } from "@/lib/services/offers"
import { cancelLoad, updateLoadStatus } from "@/lib/services/loads"
import { useStore } from "@/hooks/use-store"
import type { Load, User } from "@/types"
import { LoadStatusBadge } from "@/components/loads/LoadStatusBadge"
import { OfferCard } from "@/components/offers/OfferCard"
import { OfferForm } from "@/components/offers/OfferForm"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface LoadDetailViewProps {
  load: Load
  user: User | null
  canManageOffers?: boolean
  canUpdateStatus?: boolean
}

export function LoadDetailView({
  load,
  user,
  canManageOffers = false,
  canUpdateStatus = false,
}: LoadDetailViewProps) {
  useStore()
  const shipper = getUserById(load.shipperId)
  const broker = load.brokerId ? getUserById(load.brokerId) : null
  const carrier = load.assignedCarrierId
    ? getUserById(load.assignedCarrierId)
    : null
  const offers = getOffersForLoad(load.id)
  const trucks = user?.role === "carrier" ? getTrucksForCarrier(user.id) : []

  const canSubmitOffer =
    user?.role === "carrier" &&
    ["published", "pending_offers"].includes(load.status) &&
    !offers.some((o) => o.carrierId === user.id && o.status === "pending")

  const handleSubmitOffer = (data: { price: number; message?: string; truckId?: string }) => {
    if (!user) return
    const result = submitOffer({
      loadId: load.id,
      carrierId: user.id,
      ...data,
    })
    if (result.success) {
      toast.success("Offer submitted successfully")
    } else {
      toast.error(result.error)
    }
  }

  const handleAccept = (offerId: string) => {
    const result = acceptOffer(offerId)
    if (result.success) toast.success("Offer accepted")
    else toast.error(result.error)
  }

  const handleReject = (offerId: string) => {
    const result = rejectOffer(offerId)
    if (result.success) toast.success("Offer rejected")
    else toast.error(result.error)
  }

  const handleStatusUpdate = (status: "in_transit" | "delivered") => {
    updateLoadStatus(load.id, status)
    toast.success(`Status updated to ${status.replace("_", " ")}`)
  }

  const handleCancel = () => {
    const result = cancelLoad(load.id)
    if (result) toast.success("Load cancelled")
    else toast.error("Cannot cancel this load")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{load.title}</h1>
          <p className="text-muted-foreground mt-1">
            Posted {new Date(load.createdAt).toLocaleDateString()}
          </p>
        </div>
        <LoadStatusBadge status={load.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="corporate-card p-6">
            <h2 className="mb-4 text-lg font-bold">Shipment Details</h2>
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <Detail label="Route" value={`${load.pickupCity} → ${load.deliveryCity}`} />
              <Detail label="Governorates" value={`${load.pickupGovernorate} → ${load.deliveryGovernorate}`} />
              <Detail label="Cargo Type" value={load.cargoType} />
              <Detail label="Truck Type" value={load.truckType} />
              <Detail label="Weight" value={`${load.weightKg.toLocaleString()} kg`} />
              {load.volumeM3 && <Detail label="Volume" value={`${load.volumeM3} m³`} />}
              <Detail label="Pickup Date" value={load.pickupDate} />
              {load.deliveryDeadline && (
                <Detail label="Delivery Deadline" value={load.deliveryDeadline} />
              )}
              {(load.priceRangeMin || load.priceRangeMax) && (
                <Detail
                  label="Price Range"
                  value={`$${load.priceRangeMin ?? "?"} – $${load.priceRangeMax ?? "?"}`}
                />
              )}
              {load.description && (
                <div className="sm:col-span-2">
                  <Detail label="Description" value={load.description} />
                </div>
              )}
            </div>
          </div>

          {(canManageOffers || offers.length > 0) && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                Offers ({offers.length})
              </h2>
              {offers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No offers yet.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {offers.map((offer) => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      showActions={canManageOffers}
                      onAccept={handleAccept}
                      onReject={handleReject}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {canSubmitOffer && (
            <OfferForm trucks={trucks} onSubmit={handleSubmitOffer} />
          )}
        </div>

        <div className="space-y-4">
          <div className="corporate-card p-6">
            <h3 className="mb-4 text-base font-bold">Posted By</h3>
            <div className="space-y-3 text-sm">
              <PartyInfo user={shipper} label="Shipper" />
              {broker && <PartyInfo user={broker} label="Broker" />}
              {carrier && <PartyInfo user={carrier} label="Assigned Carrier" />}
            </div>
          </div>

          {canUpdateStatus && load.status === "assigned" && (
            <Button className="w-full" onClick={() => handleStatusUpdate("in_transit")}>
              Mark In Transit
            </Button>
          )}
          {canUpdateStatus && load.status === "in_transit" && (
            <Button className="w-full" onClick={() => handleStatusUpdate("delivered")}>
              Mark Delivered
            </Button>
          )}

          {canManageOffers &&
            !["in_transit", "delivered", "cancelled"].includes(load.status) && (
              <Button variant="destructive" className="w-full" onClick={handleCancel}>
                Cancel Load
              </Button>
            )}
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium capitalize">{value}</p>
    </div>
  )
}

function PartyInfo({ user, label }: { user: ReturnType<typeof getUserById>; label: string }) {
  if (!user) return null
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium">{user.companyName ?? user.name}</p>
      {user.verified && (
        <Badge variant="outline" className="mt-1 gap-1">
          <CheckCircle className="size-3" />
          Verified
        </Badge>
      )}
    </div>
  )
}
