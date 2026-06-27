"use client"

import { useState } from "react"
import { CARGO_TYPES, getGovernorateForCity, IRAQ_LOCATIONS, TRUCK_TYPES } from "@/lib/constants"
import type { CreateLoadInput } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LoadFormProps {
  shipperId: string
  brokerId?: string
  clientOptions?: { id: string; name: string; companyName?: string }[]
  onSubmit: (input: CreateLoadInput) => void
  submitLabel?: string
}

const cities = IRAQ_LOCATIONS.map((l) => l.city)

export function LoadForm({
  shipperId,
  brokerId,
  clientOptions,
  onSubmit,
  submitLabel = "Publish Load",
}: LoadFormProps) {
  const [selectedShipperId, setSelectedShipperId] = useState(
    clientOptions?.[0]?.id ?? shipperId
  )
  const [title, setTitle] = useState("")
  const [cargoType, setCargoType] = useState<string>(CARGO_TYPES[0])
  const [pickupCity, setPickupCity] = useState<string>(cities[0])
  const [deliveryCity, setDeliveryCity] = useState<string>(cities[1] ?? cities[0])
  const [weightKg, setWeightKg] = useState("")
  const [volumeM3, setVolumeM3] = useState("")
  const [truckType, setTruckType] = useState<string>(TRUCK_TYPES[0])
  const [pickupDate, setPickupDate] = useState("")
  const [deliveryDeadline, setDeliveryDeadline] = useState("")
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      cargoType,
      pickupCity,
      pickupGovernorate: getGovernorateForCity(pickupCity),
      deliveryCity,
      deliveryGovernorate: getGovernorateForCity(deliveryCity),
      weightKg: Number(weightKg),
      volumeM3: volumeM3 ? Number(volumeM3) : undefined,
      truckType,
      pickupDate,
      deliveryDeadline: deliveryDeadline || undefined,
      priceRangeMin: priceMin ? Number(priceMin) : undefined,
      priceRangeMax: priceMax ? Number(priceMax) : undefined,
      description: description || undefined,
      shipperId: brokerId ? selectedShipperId : shipperId,
      brokerId,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {clientOptions && clientOptions.length > 0 && (
        <div className="space-y-2">
          <Label>Client (Shipper)</Label>
          <Select value={selectedShipperId} onValueChange={setSelectedShipperId}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {clientOptions.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.companyName ?? client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Shipment Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Steel Beams - Baghdad to Basra"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Cargo Type</Label>
          <Select value={cargoType} onValueChange={setCargoType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CARGO_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Truck Type Required</Label>
          <Select value={truckType} onValueChange={setTruckType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TRUCK_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Pickup City</Label>
          <Select value={pickupCity} onValueChange={setPickupCity}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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
          <Select value={deliveryCity} onValueChange={setDeliveryCity}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            required
            min={1}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="volume">Volume (m³)</Label>
          <Input
            id="volume"
            type="number"
            value={volumeM3}
            onChange={(e) => setVolumeM3(e.target.value)}
            min={0}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pickupDate">Pickup Date</Label>
          <Input
            id="pickupDate"
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deadline">Delivery Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={deliveryDeadline}
            onChange={(e) => setDeliveryDeadline(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="priceMin">Price Range Min ($)</Label>
          <Input
            id="priceMin"
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            min={0}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceMax">Price Range Max ($)</Label>
          <Input
            id="priceMax"
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            min={0}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Additional shipment details..."
          rows={3}
        />
      </div>

      <Button type="submit">{submitLabel}</Button>
    </form>
  )
}
