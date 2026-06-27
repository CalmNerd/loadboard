import { getUserById } from "@/lib/services/auth"
import type { Offer } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface OfferCardProps {
  offer: Offer
  showActions?: boolean
  onAccept?: (offerId: string) => void
  onReject?: (offerId: string) => void
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  withdrawn: "bg-muted text-muted-foreground",
}

export function OfferCard({ offer, showActions, onAccept, onReject }: OfferCardProps) {
  const carrier = getUserById(offer.carrierId)

  return (
    <div className="corporate-card p-5">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-semibold">
          {carrier?.companyName ?? carrier?.name ?? "Unknown Carrier"}
        </h4>
        <Badge variant="outline" className={`border-0 capitalize ${statusColors[offer.status]}`}>
          {offer.status}
        </Badge>
      </div>
      <p className="mt-3 text-2xl font-bold text-brand">${offer.price.toLocaleString()}</p>
      {offer.message && (
        <p className="mt-2 text-sm text-muted-foreground">{offer.message}</p>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        Submitted {new Date(offer.createdAt).toLocaleDateString()}
      </p>
      {showActions && offer.status === "pending" && (
        <div className="mt-4 flex gap-2">
          <Button size="sm" onClick={() => onAccept?.(offer.id)}>
            Accept
          </Button>
          <Button size="sm" variant="outline" onClick={() => onReject?.(offer.id)}>
            Reject
          </Button>
        </div>
      )}
    </div>
  )
}
