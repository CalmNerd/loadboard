"use client"

import { RoleGuard } from "@/components/layout/RoleGuard"
import { PageHeader } from "@/components/shared/PageHeader"
import { useAuth } from "@/hooks/use-auth"
import { useStore } from "@/hooks/use-store"
import { getBrokerClients } from "@/lib/services/loads"
import { EmptyState } from "@/components/shared/EmptyState"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

export default function BrokerClientsPage() {
  return (
    <RoleGuard role="broker">
      <BrokerClients />
    </RoleGuard>
  )
}

function BrokerClients() {
  const { user } = useAuth()
  useStore()

  if (!user) return null

  const clients = getBrokerClients(user.id)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="Shippers you manage shipments for"
      />

      {clients.length === 0 ? (
        <EmptyState
          title="No clients yet"
          description="Clients appear when you post loads on their behalf."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map(({ shipper, loadCount, activeCount }) => (
            <Card key={shipper.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">
                    {shipper.companyName ?? shipper.name}
                  </CardTitle>
                  {shipper.verified && (
                    <Badge variant="outline" className="gap-1 shrink-0">
                      <CheckCircle className="size-3" />
                      Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p className="text-muted-foreground">{shipper.email}</p>
                <p>Total shipments: {loadCount}</p>
                <p>Active shipments: {activeCount}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
