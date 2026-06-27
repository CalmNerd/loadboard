export const IRAQ_LOCATIONS = [
  { governorate: "Baghdad", city: "Baghdad" },
  { governorate: "Basra", city: "Basra" },
  { governorate: "Erbil", city: "Erbil" },
  { governorate: "Nineveh", city: "Mosul" },
  { governorate: "Najaf", city: "Najaf" },
  { governorate: "Kirkuk", city: "Kirkuk" },
  { governorate: "Dhi Qar", city: "Nasiriyah" },
  { governorate: "Anbar", city: "Ramadi" },
  { governorate: "Diyala", city: "Baqubah" },
  { governorate: "Karbala", city: "Karbala" },
  { governorate: "Sulaymaniyah", city: "Sulaymaniyah" },
  { governorate: "Babil", city: "Hillah" },
] as const

export const TRUCK_TYPES = [
  "flatbed",
  "refrigerated",
  "tanker",
  "lowboy",
  "box truck",
] as const

export const CARGO_TYPES = [
  "general",
  "construction",
  "food",
  "fuel",
  "electronics",
] as const

export const LOAD_STATUSES = [
  "draft",
  "published",
  "pending_offers",
  "assigned",
  "in_transit",
  "delivered",
  "cancelled",
] as const

export const PUBLIC_LOAD_STATUSES = [
  "published",
  "pending_offers",
  "assigned",
  "in_transit",
] as const

export function getGovernorateForCity(city: string): string {
  const location = IRAQ_LOCATIONS.find((l) => l.city === city)
  return location?.governorate ?? city
}

export function formatLoadStatus(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
