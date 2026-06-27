import { Truck, MapPin, BarChart3, Smartphone } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Dashboard",
    description: "Your single portal to manage, track, and optimize your entire freight operation.",
    accent: true,
  },
  {
    icon: MapPin,
    title: "Integrated Load Discovery",
    bullets: [
      "Filter by route, truck type, and cargo",
      "Sort by price and pickup date",
      "Real-time offer and status tracking",
    ],
  },
  {
    icon: Smartphone,
    title: "Role-Based Workflows",
    description: "Shipper, carrier, and broker dashboards tailored to each party's operational needs.",
  },
]

export function SolutionsSection() {
  return (
    <section id="solutions" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-heading">
            What is <strong>LoadBoard Iraq</strong> and what can it do for{" "}
            <strong>my business</strong>?
          </h2>
          <p className="mt-6 text-muted-foreground">
            A centralized marketplace and operations layer that digitizes shipment
            discovery, carrier matching, load management, and lifecycle visibility for
            Iraq&apos;s freight industry.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Fleet preview card */}
          <div className="relative overflow-hidden rounded-sm bg-brand p-8 lg:p-10">
            <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-8 size-32 rounded-full bg-white/10" />
            <div className="relative rounded-sm bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between border-b pb-4">
                <span className="font-semibold">My Fleet</span>
                <span className="text-xs text-brand font-medium">See All</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-sm bg-brand-light">
                  <Truck className="size-7 text-brand" />
                </div>
                <div className="grid flex-1 grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-sm bg-muted p-2">
                    <p className="font-bold text-brand">135</p>
                    <p className="text-muted-foreground">Km/h</p>
                  </div>
                  <div className="rounded-sm bg-muted p-2">
                    <p className="font-bold text-brand">486</p>
                    <p className="text-muted-foreground">Km</p>
                  </div>
                  <div className="rounded-sm bg-muted p-2">
                    <p className="font-bold text-brand">20°C</p>
                    <p className="text-muted-foreground">Temp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature stack */}
          <div className="space-y-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={
                  feature.accent
                    ? "rounded-sm bg-brand p-6 text-white"
                    : "corporate-card p-6"
                }
              >
                <div className="flex items-start gap-4">
                  <feature.icon
                    className={
                      feature.accent ? "size-6 text-white/90" : "size-6 text-brand"
                    }
                  />
                  <div>
                    <h3
                      className={
                        feature.accent
                          ? "text-lg font-bold"
                          : "text-lg font-bold text-foreground"
                      }
                    >
                      {feature.title}
                    </h3>
                    {feature.description && (
                      <p
                        className={
                          feature.accent
                            ? "mt-2 text-sm text-white/85"
                            : "mt-2 text-sm text-muted-foreground"
                        }
                      >
                        {feature.description}
                      </p>
                    )}
                    {feature.bullets && (
                      <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                        {feature.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
