"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { successStories } from "@/lib/site-config"
import { BrandCta } from "@/components/shared/BrandCta"
import { Button } from "@/components/ui/button"

export function SuccessStoriesSection() {
  const [index, setIndex] = useState(0)
  const story = successStories[index]

  const prev = () => setIndex((i) => (i === 0 ? successStories.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === successStories.length - 1 ? 0 : i + 1))

  return (
    <section className="bg-muted/20 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="section-heading">
            Featured Customer <strong>Success Stories</strong>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            See how shippers, carriers, and brokers across Iraq are transforming
            their logistics operations with LoadBoard Iraq.
          </p>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="hidden shrink-0 rounded-full sm:flex"
            onClick={prev}
          >
            <ChevronLeft className="size-5" />
          </Button>

          <div className="corporate-card flex-1 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-4/3 md:aspect-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.image}
                  alt={story.title}
                  className="size-full object-cover aspect-18/9"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent md:hidden" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="text-xs font-bold tracking-widest text-brand uppercase">
                  {story.tag}
                </p>
                <h3 className="mt-3 text-xl font-bold leading-snug md:text-2xl">
                  {story.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {story.description}
                </p>
                <BrandCta href="/register" className="mt-6 self-start">
                  Learn More
                </BrandCta>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="hidden shrink-0 rounded-full sm:flex"
            onClick={next}
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {successStories.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all ${
                i === index ? "w-8 bg-brand" : "w-4 bg-border"
              }`}
              aria-label={`Go to story ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}