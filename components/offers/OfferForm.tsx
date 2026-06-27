"use client"

import { useState } from "react"
import type { Truck } from "@/types"
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

interface OfferFormProps {
  trucks: Truck[]
  onSubmit: (data: { price: number; message?: string; truckId?: string }) => void
}

export function OfferForm({ trucks, onSubmit }: OfferFormProps) {
  const [price, setPrice] = useState("")
  const [message, setMessage] = useState("")
  const [truckId, setTruckId] = useState(trucks[0]?.id ?? "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      price: Number(price),
      message: message || undefined,
      truckId: truckId || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-4">
      <h3 className="font-medium">Submit Your Offer</h3>

      <div className="space-y-2">
        <Label htmlFor="price">Your Price ($)</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min={1}
        />
      </div>

      {trucks.length > 0 && (
        <div className="space-y-2">
          <Label>Truck</Label>
          <Select value={truckId} onValueChange={setTruckId}>
            <SelectTrigger>
              <SelectValue placeholder="Select truck" />
            </SelectTrigger>
            <SelectContent>
              {trucks.map((truck) => (
                <SelectItem key={truck.id} value={truck.id}>
                  {truck.plateNumber} — {truck.truckType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Availability, experience, etc."
          rows={2}
        />
      </div>

      <Button type="submit">Submit Offer</Button>
    </form>
  )
}
