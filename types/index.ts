export type UserRole = "shipper" | "carrier" | "broker"

export type LoadStatus =
  | "draft"
  | "published"
  | "pending_offers"
  | "assigned"
  | "in_transit"
  | "delivered"
  | "cancelled"

export type OfferStatus = "pending" | "accepted" | "rejected" | "withdrawn"

export type NotificationType =
  | "offer_received"
  | "offer_accepted"
  | "offer_rejected"
  | "status_changed"

export interface User {
  id: string
  email: string
  password: string
  name: string
  companyName?: string
  role: UserRole
  verified: boolean
  createdAt: string
}

export interface Session {
  userId: string
}

export interface Load {
  id: string
  title: string
  cargoType: string
  pickupCity: string
  pickupGovernorate: string
  deliveryCity: string
  deliveryGovernorate: string
  weightKg: number
  volumeM3?: number
  truckType: string
  pickupDate: string
  deliveryDeadline?: string
  priceRangeMin?: number
  priceRangeMax?: number
  description?: string
  status: LoadStatus
  shipperId: string
  brokerId?: string
  assignedCarrierId?: string
  createdAt: string
}

export interface Offer {
  id: string
  loadId: string
  carrierId: string
  truckId?: string
  price: number
  message?: string
  status: OfferStatus
  createdAt: string
}

export interface Truck {
  id: string
  carrierId: string
  plateNumber: string
  truckType: string
  capacityKg: number
  available: boolean
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  message: string
  loadId?: string
  offerId?: string
  read: boolean
  createdAt: string
}

export interface Database {
  users: User[]
  loads: Load[]
  offers: Offer[]
  trucks: Truck[]
  notifications: Notification[]
  session: Session | null
}

export interface LoadFilters {
  pickupCity?: string
  deliveryCity?: string
  truckType?: string
  cargoType?: string
  pickupDateFrom?: string
  sortBy?: "price_asc" | "price_desc" | "date_desc" | "date_asc"
  status?: LoadStatus[]
  shipperId?: string
  brokerId?: string
  assignedCarrierId?: string
}

export interface CreateLoadInput {
  title: string
  cargoType: string
  pickupCity: string
  pickupGovernorate: string
  deliveryCity: string
  deliveryGovernorate: string
  weightKg: number
  volumeM3?: number
  truckType: string
  pickupDate: string
  deliveryDeadline?: string
  priceRangeMin?: number
  priceRangeMax?: number
  description?: string
  shipperId: string
  brokerId?: string
}

export interface CreateOfferInput {
  loadId: string
  carrierId: string
  truckId?: string
  price: number
  message?: string
}

export interface CreateTruckInput {
  carrierId: string
  plateNumber: string
  truckType: string
  capacityKg: number
  available: boolean
}

export interface RegisterInput {
  email: string
  password: string
  name: string
  companyName?: string
  role: UserRole
}
