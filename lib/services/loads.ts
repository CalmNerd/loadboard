import { generateId } from "@/lib/id"
import { createNotification } from "@/lib/services/notifications"
import { getDatabase, updateDatabase } from "@/lib/storage/storage"
import type {
  CreateLoadInput,
  Load,
  LoadFilters,
  LoadStatus,
  User,
} from "@/types"

export function getAllLoads(): Load[] {
  return getDatabase().loads
}

export function getLoadById(id: string): Load | null {
  return getDatabase().loads.find((l) => l.id === id) ?? null
}

export function getLoadsForUser(user: User): Load[] {
  const loads = getAllLoads()
  if (user.role === "shipper") {
    return loads.filter((l) => l.shipperId === user.id)
  }
  if (user.role === "broker") {
    return loads.filter((l) => l.brokerId === user.id)
  }
  if (user.role === "carrier") {
    return loads.filter((l) => l.assignedCarrierId === user.id)
  }
  return []
}

export function filterLoads(filters: LoadFilters): Load[] {
  let loads = [...getAllLoads()]

  if (filters.status?.length) {
    loads = loads.filter((l) => filters.status!.includes(l.status))
  }

  if (filters.pickupCity) {
    loads = loads.filter((l) => l.pickupCity === filters.pickupCity)
  }

  if (filters.deliveryCity) {
    loads = loads.filter((l) => l.deliveryCity === filters.deliveryCity)
  }

  if (filters.truckType) {
    loads = loads.filter((l) => l.truckType === filters.truckType)
  }

  if (filters.cargoType) {
    loads = loads.filter((l) => l.cargoType === filters.cargoType)
  }

  if (filters.pickupDateFrom) {
    loads = loads.filter((l) => l.pickupDate >= filters.pickupDateFrom!)
  }

  if (filters.shipperId) {
    loads = loads.filter((l) => l.shipperId === filters.shipperId)
  }

  if (filters.brokerId) {
    loads = loads.filter((l) => l.brokerId === filters.brokerId)
  }

  if (filters.assignedCarrierId) {
    loads = loads.filter((l) => l.assignedCarrierId === filters.assignedCarrierId)
  }

  switch (filters.sortBy) {
    case "price_asc":
      loads.sort((a, b) => (a.priceRangeMin ?? 0) - (b.priceRangeMin ?? 0))
      break
    case "price_desc":
      loads.sort((a, b) => (b.priceRangeMax ?? 0) - (a.priceRangeMax ?? 0))
      break
    case "date_asc":
      loads.sort((a, b) => a.pickupDate.localeCompare(b.pickupDate))
      break
    case "date_desc":
    default:
      loads.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      break
  }

  return loads
}

export function createLoad(input: CreateLoadInput): Load {
  const load: Load = {
    id: generateId(),
    ...input,
    status: "published",
    createdAt: new Date().toISOString(),
  }

  updateDatabase((db) => ({
    ...db,
    loads: [...db.loads, load],
  }))

  return load
}

export function updateLoadStatus(
  loadId: string,
  status: LoadStatus,
  assignedCarrierId?: string
): Load | null {
  const load = getLoadById(loadId)
  if (!load) return null

  const updated: Load = {
    ...load,
    status,
    ...(assignedCarrierId ? { assignedCarrierId } : {}),
  }

  updateDatabase((db) => ({
    ...db,
    loads: db.loads.map((l) => (l.id === loadId ? updated : l)),
  }))

  const notifyUserId = load.brokerId ?? load.shipperId
  createNotification({
    userId: notifyUserId,
    type: "status_changed",
    message: `Load "${load.title}" status updated to ${status.replace(/_/g, " ")}`,
    loadId: load.id,
  })

  if (load.assignedCarrierId && load.assignedCarrierId !== notifyUserId) {
    createNotification({
      userId: load.assignedCarrierId,
      type: "status_changed",
      message: `Load "${load.title}" status updated to ${status.replace(/_/g, " ")}`,
      loadId: load.id,
    })
  }

  return updated
}

export function cancelLoad(loadId: string): Load | null {
  const load = getLoadById(loadId)
  if (!load) return null
  if (load.status === "in_transit" || load.status === "delivered") {
    return null
  }
  return updateLoadStatus(loadId, "cancelled")
}

export function getShipperStats(shipperId: string) {
  const loads = getAllLoads().filter((l) => l.shipperId === shipperId)
  const db = getDatabase()
  const pendingOffers = db.offers.filter(
    (o) =>
      o.status === "pending" &&
      loads.some((l) => l.id === o.loadId)
  ).length

  return {
    totalLoads: loads.length,
    activeLoads: loads.filter((l) =>
      ["published", "pending_offers", "assigned", "in_transit"].includes(l.status)
    ).length,
    pendingOffers,
    delivered: loads.filter((l) => l.status === "delivered").length,
  }
}

export function getBrokerStats(brokerId: string) {
  const loads = getAllLoads().filter((l) => l.brokerId === brokerId)
  const db = getDatabase()
  const pendingOffers = db.offers.filter(
    (o) =>
      o.status === "pending" &&
      loads.some((l) => l.id === o.loadId)
  ).length
  const clients = new Set(loads.map((l) => l.shipperId))

  return {
    totalLoads: loads.length,
    activeLoads: loads.filter((l) =>
      ["published", "pending_offers", "assigned", "in_transit"].includes(l.status)
    ).length,
    pendingOffers,
    clientCount: clients.size,
    delivered: loads.filter((l) => l.status === "delivered").length,
  }
}

export function getBrokerClients(brokerId: string) {
  const loads = getAllLoads().filter((l) => l.brokerId === brokerId)
  const db = getDatabase()
  const clientMap = new Map<string, { shipper: User; loadCount: number; activeCount: number }>()

  for (const load of loads) {
    const shipper = db.users.find((u) => u.id === load.shipperId)
    if (!shipper) continue

    const existing = clientMap.get(load.shipperId)
    const isActive = ["published", "pending_offers", "assigned", "in_transit"].includes(
      load.status
    )

    if (existing) {
      existing.loadCount++
      if (isActive) existing.activeCount++
    } else {
      clientMap.set(load.shipperId, {
        shipper,
        loadCount: 1,
        activeCount: isActive ? 1 : 0,
      })
    }
  }

  return Array.from(clientMap.values())
}
