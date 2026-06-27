import { PackageOpen } from "lucide-react"

interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border-2 border-dashed border-border bg-white py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-sm bg-brand-light">
        <PackageOpen className="size-7 text-brand" />
      </div>
      <h3 className="mt-4 font-semibold text-lg">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
