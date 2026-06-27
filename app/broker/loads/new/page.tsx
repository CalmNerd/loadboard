"use client"

import { useRouter } from "next/navigation"
import { RoleGuard } from "@/components/layout/RoleGuard"
import { PageHeader } from "@/components/shared/PageHeader"
import { LoadForm } from "@/components/loads/LoadForm"
import { useAuth } from "@/hooks/use-auth"
import { useStore } from "@/hooks/use-store"
import { createLoad } from "@/lib/services/loads"
import { getUsersByRole } from "@/lib/services/auth"
import { toast } from "sonner"

export default function BrokerNewLoadPage() {
  return (
    <RoleGuard role="broker">
      <BrokerNewLoad />
    </RoleGuard>
  )
}

function BrokerNewLoad() {
  const { user } = useAuth()
  useStore()
  const router = useRouter()

  if (!user) return null

  const shippers = getUsersByRole("shipper").map((s) => ({
    id: s.id,
    name: s.name,
    companyName: s.companyName,
  }))

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Post Load for Client"
        description="Create and publish a shipment on behalf of a shipper"
      />
      <div className="corporate-card p-6">
      <LoadForm
        shipperId={shippers[0]?.id ?? ""}
        brokerId={user.id}
        clientOptions={shippers}
        onSubmit={(input) => {
          const load = createLoad({ ...input, brokerId: user.id })
          toast.success("Load published for client")
          router.push(`/broker/loads/${load.id}`)
        }}
      />
      </div>
    </div>
  )
}
