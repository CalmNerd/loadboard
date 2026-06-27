"use client"

import { useState } from "react"
import { toast } from "sonner"
import { BrandCta } from "@/components/shared/BrandCta"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoadsConvenienceSection() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    toast.success("Subscribed! You'll receive daily load updates.")
    setEmail("")
  }

  return (
    <section className="bg-muted/30 py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/loadboard-convenience.png"
            alt="Truck hauling freight"
            className="aspect-4/3 w-full object-cover"
          />
        </div>
        <div>
          <h2 className="section-heading">
            Loads Of <strong>Convenience</strong>
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            With thousands of loads posted across Iraq, carriers can maximize truck
            utilization and shippers can find reliable transport faster. Sign up for
            daily load updates delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="mt-8 flex gap-0">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 rounded-none border-r-0"
              required
            />
            <Button type="submit" className="h-12 rounded-none px-8 font-semibold uppercase">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 lg:grid-cols-2">
        <div>
          <h2 className="section-heading">
            Ready to Elevate Your{" "}
            <strong>Transportation and Logistics Operations?</strong>
          </h2>
          <BrandCta href="/register" size="lg" className="mt-8">
            Take the Next Step With Us Today
          </BrandCta>
        </div>
        <div className="relative hidden lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cta.png"
            alt="Logistics operations"
            className="ml-auto  max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  )
}
