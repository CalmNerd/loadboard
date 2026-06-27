"use client"

import { useState } from "react"
import { PUBLIC_LOAD_STATUSES } from "@/lib/constants"
import { filterLoads } from "@/lib/services/loads"
import { useStore } from "@/hooks/use-store"
import type { LoadFilters } from "@/types"
import { LoadCard } from "@/components/loads/LoadCard"
import { LoadFiltersPanel } from "@/components/loads/LoadFilters"
import { EmptyState } from "@/components/shared/EmptyState"

export function PublicLoadBoard() {
  useStore()
  const [filters, setFilters] = useState<LoadFilters>({
    sortBy: "date_desc",
    status: [...PUBLIC_LOAD_STATUSES],
  })

  const loads = filterLoads(filters)

  return (
    <div className="space-y-6">
      <div className="corporate-card p-5">
        <LoadFiltersPanel filters={filters} onChange={setFilters} />
      </div>
      {loads.length === 0 ? (
        <EmptyState
          title="No loads found"
          description="Try adjusting your filters or check back later."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loads.map((load) => (
            <LoadCard key={load.id} load={load} href={`/loads/${load.id}`} />
          ))}
        </div>
      )}
    </div>
  )
}
