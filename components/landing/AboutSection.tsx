import { stats } from "@/lib/site-config"

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="section-heading">
          Keep Goods Moving with <strong>LoadBoard Iraq</strong> Logistics Solutions
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Our platform gives shippers, carriers, and brokers a single place to publish
          loads, submit offers, assign carriers, and track every shipment from pickup
          to delivery — reducing manual coordination and empty return trips.
        </p>
      </div>
    </section>
  )
}

export function StatsSection() {
  return (
    <section className="bg-brand py-14 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.value} className="text-center text-white md:text-left">
            <p className="text-5xl font-bold tracking-tight md:text-6xl">{stat.value}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/85 md:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
