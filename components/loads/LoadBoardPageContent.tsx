"use client"

import { PublicLoadBoard } from "@/components/loads/PublicLoadBoard"
import { filterLoads } from "@/lib/services/loads"
import { PUBLIC_LOAD_STATUSES } from "@/lib/constants"
import { useStore } from "@/hooks/use-store"

export function LoadBoardPageContent() {
  useStore()

  const loads = filterLoads({
    sortBy: "date_desc",
    status: [...PUBLIC_LOAD_STATUSES],
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-brand/20 bg-brand-light/40 px-5 py-4">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">{loads.length}</span>{" "}
          available {loads.length === 1 ? "load" : "loads"} across Iraq
        </p>
        <p className="text-xs text-muted-foreground">
          Register as a carrier to submit offers on any load
        </p>
      </div>
      <PublicLoadBoard />
    </div>
  )
}
