"use client"

import { useState } from "react"
import { TRUCK_TYPES } from "@/lib/constants"
import type { CreateTruckInput } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TruckFormProps {
  carrierId: string
  onSubmit: (input: CreateTruckInput) => void
  trigger?: React.ReactNode
}

export function TruckForm({ carrierId, onSubmit, trigger }: TruckFormProps) {
  const [open, setOpen] = useState(false)
  const [plateNumber, setPlateNumber] = useState("")
  const [truckType, setTruckType] = useState<string>(TRUCK_TYPES[0])
  const [capacityKg, setCapacityKg] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      carrierId,
      plateNumber,
      truckType,
      capacityKg: Number(capacityKg),
      available: true,
    })
    setPlateNumber("")
    setCapacityKg("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Add Truck</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Truck</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plate">Plate Number</Label>
            <Input
              id="plate"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="BGD-1234"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Truck Type</Label>
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
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity (kg)</Label>
            <Input
              id="capacity"
              type="number"
              value={capacityKg}
              onChange={(e) => setCapacityKg(e.target.value)}
              required
              min={1}
            />
          </div>
          <Button type="submit" className="w-full">
            Save Truck
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
