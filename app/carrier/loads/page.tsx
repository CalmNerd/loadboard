"use client"

import { useState } from "react"
import { useStore } from "@/hooks/use-store"
import { RoleGuard } from "@/components/layout/RoleGuard"
import { PageHeader } from "@/components/shared/PageHeader"
import { filterLoads } from "@/lib/services/loads"
import { PUBLIC_LOAD_STATUSES } from "@/lib/constants"
import type { LoadFilters } from "@/types"
import { LoadCard } from "@/components/loads/LoadCard"
import { LoadFiltersPanel } from "@/components/loads/LoadFilters"
import { EmptyState } from "@/components/shared/EmptyState"

export default function CarrierLoadsPage() {
  return (
    <RoleGuard role="carrier">
      <CarrierLoads />
    </RoleGuard>
  )
}

function CarrierLoads() {
  useStore()
  const [filters, setFilters] = useState<LoadFilters>({
    sortBy: "date_desc",
    status: [...PUBLIC_LOAD_STATUSES],
  })

  const loads = filterLoads(filters)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Find Loads"
        description="Search and bid on available shipments across Iraq"
      />
      <div className="corporate-card p-5">
        <LoadFiltersPanel filters={filters} onChange={setFilters} />
      </div>
      {loads.length === 0 ? (
        <EmptyState title="No loads match your filters" />
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
