import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: number | string
  icon?: LucideIcon
  description?: string
}

export function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <div className="corporate-card p-5">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {title}
        </p>
        {Icon && (
          <div className="flex size-9 items-center justify-center rounded-sm bg-brand-light">
            <Icon className="size-4 text-brand" />
          </div>
        )}
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{value}</p>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
