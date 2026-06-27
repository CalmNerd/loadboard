import Link from "next/link"
import { ArrowRight, MapPin, Package, Truck } from "lucide-react"
import type { Load } from "@/types"
import { LoadStatusBadge } from "@/components/loads/LoadStatusBadge"

interface LoadCardProps {
  load: Load
  href: string
  showStatus?: boolean
}

export function LoadCard({ load, href, showStatus = true }: LoadCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="corporate-card h-full overflow-hidden">
        <div className="border-b border-border/60 bg-brand-light/40 px-5 py-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold leading-snug group-hover:text-brand transition-colors">
              {load.title}
            </h3>
            {showStatus && <LoadStatusBadge status={load.status} />}
          </div>
        </div>
        <div className="space-y-3 p-5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4 shrink-0 text-brand" />
            <span className="font-medium text-foreground">
              {load.pickupCity} → {load.deliveryCity}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Truck className="size-3.5" />
              {load.truckType}
            </span>
            <span className="flex items-center gap-1">
              <Package className="size-3.5" />
              {load.cargoType}
            </span>
            <span>{load.weightKg.toLocaleString()} kg</span>
          </div>
          <div className="flex items-center justify-between border-t border-border/60 pt-3">
            <span className="text-xs text-muted-foreground">Pickup: {load.pickupDate}</span>
            <div className="flex items-center gap-2">
              {(load.priceRangeMin || load.priceRangeMax) && (
                <span className="font-bold text-brand">
                  ${load.priceRangeMin ?? "?"} – ${load.priceRangeMax ?? "?"}
                </span>
              )}
              <ArrowRight className="size-4 text-brand opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
