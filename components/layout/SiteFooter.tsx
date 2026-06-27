import Link from "next/link"
import { Globe, Mail, Rss, Share2 } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { BrandLogo } from "@/components/shared/BrandLogo"
import { BrandCta } from "@/components/shared/BrandCta"

const footerColumns = [
  {
    title: "Company",
    links: [
      "About LoadBoard Iraq",
      "Careers",
      "Newsroom",
      "Investors",
      "Global Locations",
    ],
  },
  {
    title: "Discover",
    links: ["Load Board", "Solutions", "Segments", "Success Stories", "Resource Library"],
  },
  {
    title: "Support",
    links: [
      "Support & Downloads",
      "Contact Support",
      "Request a Repair",
      "Developer Portal",
      "Report a Concern",
    ],
  },
]

export function SiteFooter() {
  return (
    <footer id="support" className="bg-brand text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <BrandLogo light />
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {siteConfig.description}
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-5 lg:col-span-3">
            <div className="flex flex-wrap gap-3">
              <BrandCta
                href="/register"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand"
              >
                Contact Us
              </BrandCta>
              <BrandCta
                href="/register?role=broker"
                variant="outline"
                className="border-white/60 text-white hover:bg-white hover:text-brand"
              >
                Find a Partner
              </BrandCta>
            </div>
            <div>
              <p className="text-sm text-white/80">
                Stay up to date with LoadBoard Iraq. Sign up for our newsletter.
              </p>
              <BrandCta href="/register" className="mt-3 bg-brand-dark hover:bg-black">
                Register Now
              </BrandCta>
            </div>
            <div className="flex gap-4">
              {[Share2, Globe, Mail, Rss].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/20 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4">
            <Link href="#" className="hover:text-white">
              Legal
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Supply Chain Transparency
            </Link>
          </div>
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
