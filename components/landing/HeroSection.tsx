import { BrandCta } from "@/components/shared/BrandCta"
import { siteConfig } from "@/lib/site-config"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white map-pattern">
      <div className="absolute inset-0 bg-linear-to-r from-white via-white/95 to-white/70" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div className="space-y-6">
          <h1 className="text-4xl leading-tight font-light tracking-tight md:text-5xl lg:text-6xl">
            <span className="font-bold">Transportation</span>{" "}
            <span className="text-muted-foreground">and</span>{" "}
            <span className="font-bold">Logistics</span>
          </h1>
          <p className="text-xl font-semibold text-foreground/90 md:text-2xl">
            Drive Visibility, Empower Productivity, Deliver Flawlessly.
          </p>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            {siteConfig.description} Digitize shipment discovery, carrier matching,
            and subscription-based operational workflows across Iraq.
          </p>
          <BrandCta href="/loads" size="lg">
            Browse Available Loads
          </BrandCta>
        </div>

        <div className="relative">
          <div className="absolute -top-3 -right-3 h-full w-full border-4 border-brand" />
          <div className="relative overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero.png"
              alt="Freight trucks on the road"
              className="aspect-4/3 w-full object-cover"
            />
            {/* <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" /> */}
            {/* <div className="absolute bottom-4 left-4 rounded-sm bg-brand px-4 py-2 text-sm font-bold text-white uppercase">
              {siteConfig.name}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
