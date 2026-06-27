import { cn } from "@/lib/utils"
import type { LoadStatus } from "@/types"
import { formatLoadStatus } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"

const statusVariants: Record<LoadStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  pending_offers: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  assigned: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  in_transit: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
}

interface LoadStatusBadgeProps {
  status: LoadStatus
  className?: string
}

export function LoadStatusBadge({ status, className }: LoadStatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("border-0", statusVariants[status], className)}>
      {formatLoadStatus(status)}
    </Badge>
  )
}
