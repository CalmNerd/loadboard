"use client"

import { CARGO_TYPES, IRAQ_LOCATIONS, TRUCK_TYPES } from "@/lib/constants"
import type { LoadFilters } from "@/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LoadFiltersPanelProps {
  filters: LoadFilters
  onChange: (filters: LoadFilters) => void
}

const cities = IRAQ_LOCATIONS.map((l) => l.city)

export function LoadFiltersPanel({ filters, onChange }: LoadFiltersPanelProps) {
  const update = (partial: Partial<LoadFilters>) => {
    onChange({ ...filters, ...partial })
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <div className="space-y-2">
        <Label>Pickup City</Label>
        <Select
          value={filters.pickupCity ?? "all"}
          onValueChange={(v) => update({ pickupCity: v === "all" ? undefined : v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Delivery City</Label>
        <Select
          value={filters.deliveryCity ?? "all"}
          onValueChange={(v) => update({ deliveryCity: v === "all" ? undefined : v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Truck Type</Label>
        <Select
          value={filters.truckType ?? "all"}
          onValueChange={(v) => update({ truckType: v === "all" ? undefined : v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {TRUCK_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Cargo Type</Label>
        <Select
          value={filters.cargoType ?? "all"}
          onValueChange={(v) => update({ cargoType: v === "all" ? undefined : v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All cargo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cargo</SelectItem>
            {CARGO_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Pickup From</Label>
        <Input
          type="date"
          value={filters.pickupDateFrom ?? ""}
          onChange={(e) => update({ pickupDateFrom: e.target.value || undefined })}
        />
      </div>

      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select
          value={filters.sortBy ?? "date_desc"}
          onValueChange={(v) =>
            update({ sortBy: v as LoadFilters["sortBy"] })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date_desc">Newest first</SelectItem>
            <SelectItem value="date_asc">Pickup date (earliest)</SelectItem>
            <SelectItem value="price_asc">Price (low to high)</SelectItem>
            <SelectItem value="price_desc">Price (high to low)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
