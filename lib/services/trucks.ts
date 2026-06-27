import { generateId } from "@/lib/id"
import { getDatabase, updateDatabase } from "@/lib/storage/storage"
import type { CreateTruckInput, Truck } from "@/types"

export function getAllTrucks(): Truck[] {
  return getDatabase().trucks
}

export function getTruckById(id: string): Truck | null {
  return getDatabase().trucks.find((t) => t.id === id) ?? null
}

export function getTrucksForCarrier(carrierId: string): Truck[] {
  return getDatabase().trucks.filter((t) => t.carrierId === carrierId)
}

export function createTruck(input: CreateTruckInput): Truck {
  const truck: Truck = {
    id: generateId(),
    ...input,
    createdAt: new Date().toISOString(),
  }

  updateDatabase((db) => ({
    ...db,
    trucks: [...db.trucks, truck],
  }))

  return truck
}

export function updateTruck(
  truckId: string,
  updates: Partial<Omit<Truck, "id" | "carrierId" | "createdAt">>
): Truck | null {
  const truck = getTruckById(truckId)
  if (!truck) return null

  const updated = { ...truck, ...updates }

  updateDatabase((db) => ({
    ...db,
    trucks: db.trucks.map((t) => (t.id === truckId ? updated : t)),
  }))

  return updated
}

export function deleteTruck(truckId: string): boolean {
  const truck = getTruckById(truckId)
  if (!truck) return false

  updateDatabase((db) => ({
    ...db,
    trucks: db.trucks.filter((t) => t.id !== truckId),
  }))

  return true
}
