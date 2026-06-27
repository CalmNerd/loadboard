import { generateId } from "@/lib/id"
import { getUserById } from "@/lib/services/auth"
import { getLoadById } from "@/lib/services/loads"
import { createNotification } from "@/lib/services/notifications"
import { getDatabase, updateDatabase } from "@/lib/storage/storage"
import type { CreateOfferInput, Offer } from "@/types"

export function getAllOffers(): Offer[] {
  return getDatabase().offers
}

export function getOfferById(id: string): Offer | null {
  return getDatabase().offers.find((o) => o.id === id) ?? null
}

export function getOffersForLoad(loadId: string): Offer[] {
  return getDatabase().offers.filter((o) => o.loadId === loadId)
}

export function getOffersForCarrier(carrierId: string): Offer[] {
  return getDatabase().offers.filter((o) => o.carrierId === carrierId)
}

export function submitOffer(input: CreateOfferInput): { success: boolean; error?: string; offer?: Offer } {
  const load = getLoadById(input.loadId)
  if (!load) {
    return { success: false, error: "Load not found" }
  }

  if (!["published", "pending_offers"].includes(load.status)) {
    return { success: false, error: "This load is no longer accepting offers" }
  }

  const existing = getDatabase().offers.find(
    (o) =>
      o.loadId === input.loadId &&
      o.carrierId === input.carrierId &&
      o.status === "pending"
  )

  if (existing) {
    return { success: false, error: "You already have a pending offer on this load" }
  }

  const offer: Offer = {
    id: generateId(),
    ...input,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  updateDatabase((db) => {
    const loads = db.loads.map((l) => {
      if (l.id === input.loadId && l.status === "published") {
        return { ...l, status: "pending_offers" as const }
      }
      return l
    })

    return {
      ...db,
      loads,
      offers: [...db.offers, offer],
    }
  })

  const carrier = getUserById(input.carrierId)
  const notifyUserId = load.brokerId ?? load.shipperId

  createNotification({
    userId: notifyUserId,
    type: "offer_received",
    message: `New offer from ${carrier?.companyName ?? carrier?.name ?? "a carrier"} on "${load.title}" — $${input.price}`,
    loadId: load.id,
    offerId: offer.id,
  })

  return { success: true, offer }
}

export function acceptOffer(offerId: string): { success: boolean; error?: string } {
  const offer = getOfferById(offerId)
  if (!offer) return { success: false, error: "Offer not found" }
  if (offer.status !== "pending") {
    return { success: false, error: "Offer is no longer pending" }
  }

  const load = getLoadById(offer.loadId)
  if (!load) return { success: false, error: "Load not found" }

  updateDatabase((db) => ({
    ...db,
    loads: db.loads.map((l) =>
      l.id === offer.loadId
        ? { ...l, status: "assigned" as const, assignedCarrierId: offer.carrierId }
        : l
    ),
    offers: db.offers.map((o) => {
      if (o.loadId !== offer.loadId) return o
      if (o.id === offerId) return { ...o, status: "accepted" as const }
      if (o.status === "pending") return { ...o, status: "rejected" as const }
      return o
    }),
  }))

  createNotification({
    userId: offer.carrierId,
    type: "offer_accepted",
    message: `Your offer on "${load.title}" was accepted — $${offer.price}`,
    loadId: load.id,
    offerId: offer.id,
  })

  const rejectedOffers = getDatabase().offers.filter(
    (o) => o.loadId === offer.loadId && o.status === "rejected" && o.id !== offerId
  )

  for (const rejected of rejectedOffers) {
    createNotification({
      userId: rejected.carrierId,
      type: "offer_rejected",
      message: `Your offer on "${load.title}" was not selected`,
      loadId: load.id,
      offerId: rejected.id,
    })
  }

  return { success: true }
}

export function rejectOffer(offerId: string): { success: boolean; error?: string } {
  const offer = getOfferById(offerId)
  if (!offer) return { success: false, error: "Offer not found" }
  if (offer.status !== "pending") {
    return { success: false, error: "Offer is no longer pending" }
  }

  const load = getLoadById(offer.loadId)

  updateDatabase((db) => ({
    ...db,
    offers: db.offers.map((o) =>
      o.id === offerId ? { ...o, status: "rejected" as const } : o
    ),
  }))

  if (load) {
    createNotification({
      userId: offer.carrierId,
      type: "offer_rejected",
      message: `Your offer on "${load.title}" was rejected`,
      loadId: load.id,
      offerId: offer.id,
    })
  }

  return { success: true }
}

export function getCarrierStats(carrierId: string) {
  const offers = getOffersForCarrier(carrierId)
  const loads = getDatabase().loads.filter((l) => l.assignedCarrierId === carrierId)

  return {
    totalOffers: offers.length,
    pendingOffers: offers.filter((o) => o.status === "pending").length,
    acceptedOffers: offers.filter((o) => o.status === "accepted").length,
    activeDeliveries: loads.filter((l) =>
      ["assigned", "in_transit"].includes(l.status)
    ).length,
    completed: loads.filter((l) => l.status === "delivered").length,
  }
}
