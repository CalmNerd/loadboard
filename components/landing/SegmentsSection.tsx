import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { segments } from "@/lib/site-config"

export function SegmentsSection() {
  return (
    <section id="segments" className="bg-muted/30 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="section-heading text-center">
          Learn More About the <strong>Segments We Serve</strong>
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {segments.map((segment) => (
            <article key={segment.title} className="corporate-card overflow-hidden">
              <div className="aspect-4/3 overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={segment.image}
                  alt={segment.title}
                  className="size-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-sm font-bold tracking-wider uppercase">
                  {segment.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {segment.description}
                </p>
                <Link
                  href={segment.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand uppercase hover:underline"
                >
                  Explore
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
