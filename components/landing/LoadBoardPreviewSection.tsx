import Link from "next/link"
import { BrandCta } from "@/components/shared/BrandCta"
import { LoadCard } from "@/components/loads/LoadCard"
import { filterLoads } from "@/lib/services/loads"
import { PUBLIC_LOAD_STATUSES } from "@/lib/constants"

export function LoadBoardPreviewSection() {
  const loads = filterLoads({
    sortBy: "date_desc",
    status: [...PUBLIC_LOAD_STATUSES],
  }).slice(0, 3)

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="section-heading">
            Browse <strong>Available Loads</strong>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Search Iraq&apos;s freight marketplace. Filter by route, truck type, cargo,
            and pickup date — then submit offers as a registered carrier.
          </p>
        </div>

        {loads.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loads.map((load) => (
              <LoadCard key={load.id} load={load} href={`/loads/${load.id}`} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No loads available right now.</p>
        )}

        <div className="mt-10 flex justify-center">
          <BrandCta href="/loads" size="lg">
            View Full Load Board
          </BrandCta>
        </div>
      </div>
    </section>
  )
}

export function LoadBoardSection() {
  return <LoadBoardPreviewSection />
}
