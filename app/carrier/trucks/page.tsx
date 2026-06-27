"use client"

import { RoleGuard } from "@/components/layout/RoleGuard"
import { PageHeader } from "@/components/shared/PageHeader"
import { useAuth } from "@/hooks/use-auth"
import { useStore } from "@/hooks/use-store"
import {
  createTruck,
  deleteTruck,
  getTrucksForCarrier,
  updateTruck,
} from "@/lib/services/trucks"
import { TruckCard } from "@/components/trucks/TruckCard"
import { TruckForm } from "@/components/trucks/TruckForm"
import { EmptyState } from "@/components/shared/EmptyState"
import { toast } from "sonner"

export default function CarrierTrucksPage() {
  return (
    <RoleGuard role="carrier">
      <CarrierTrucks />
    </RoleGuard>
  )
}

function CarrierTrucks() {
  const { user } = useAuth()
  useStore()

  if (!user) return null

  const trucks = getTrucksForCarrier(user.id)

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Trucks"
        description="Manage your fleet and availability"
        action={
          <TruckForm
            carrierId={user.id}
            onSubmit={(input) => {
              createTruck(input)
              toast.success("Truck added")
            }}
          />
        }
      />

      {trucks.length === 0 ? (
        <EmptyState
          title="No trucks registered"
          description="Add your first truck to start submitting offers."
          action={
            <TruckForm
              carrierId={user.id}
              onSubmit={(input) => {
                createTruck(input)
                toast.success("Truck added")
              }}
            />
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trucks.map((truck) => (
            <TruckCard
              key={truck.id}
              truck={truck}
              onToggleAvailability={(id, available) => {
                updateTruck(id, { available })
                toast.success(available ? "Truck marked available" : "Truck marked unavailable")
              }}
              onDelete={(id) => {
                deleteTruck(id)
                toast.success("Truck removed")
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
