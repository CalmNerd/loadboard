import type { Truck } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TruckCardProps {
  truck: Truck
  onEdit?: (truck: Truck) => void
  onDelete?: (truckId: string) => void
  onToggleAvailability?: (truckId: string, available: boolean) => void
}

export function TruckCard({ truck, onEdit, onDelete, onToggleAvailability }: TruckCardProps) {
  return (
    <div className="corporate-card p-5">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-base font-bold">{truck.plateNumber}</h4>
        <Badge variant={truck.available ? "default" : "secondary"}>
          {truck.available ? "Available" : "Unavailable"}
        </Badge>
      </div>
      <div className="mt-3 flex justify-between text-sm text-muted-foreground">
        <span>Type: <span className="font-medium text-foreground capitalize">{truck.truckType}</span></span>
        <span>Capacity: <span className="font-medium text-foreground">{truck.capacityKg.toLocaleString()} kg</span></span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {onToggleAvailability && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onToggleAvailability(truck.id, !truck.available)}
          >
            Mark {truck.available ? "Unavailable" : "Available"}
          </Button>
        )}
        {onEdit && (
          <Button size="sm" variant="outline" onClick={() => onEdit(truck)}>
            Edit
          </Button>
        )}
        {onDelete && (
          <Button size="sm" variant="destructive" onClick={() => onDelete(truck.id)}>
            Delete
          </Button>
        )}
      </div>
    </div>
  )
}
