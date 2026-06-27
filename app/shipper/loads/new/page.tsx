"use client"

import { useRouter } from "next/navigation"
import { RoleGuard } from "@/components/layout/RoleGuard"
import { PageHeader } from "@/components/shared/PageHeader"
import { LoadForm } from "@/components/loads/LoadForm"
import { useAuth } from "@/hooks/use-auth"
import { createLoad } from "@/lib/services/loads"
import { toast } from "sonner"

export default function ShipperNewLoadPage() {
  return (
    <RoleGuard role="shipper">
      <ShipperNewLoad />
    </RoleGuard>
  )
}

function ShipperNewLoad() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) return null

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Post a New Load"
        description="Publish your shipment to the marketplace"
      />
      <div className="corporate-card p-6">
      <LoadForm
        shipperId={user.id}
        onSubmit={(input) => {
          const load = createLoad(input)
          toast.success("Load published successfully")
          router.push(`/shipper/loads/${load.id}`)
        }}
      />
      </div>
    </div>
  )
}
