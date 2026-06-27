export const siteConfig = {
  name: "LoadBoard Iraq",
  tagline: "Transportation and Logistics",
  description:
    "Iraq's digital freight marketplace connecting shippers, carriers, and brokers through a centralized logistics ecosystem.",
  contactEmail: "contact@loadboard.iq",
}

export const brandNav = [
  { label: "Load Board", href: "/loads" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Segments", href: "/#segments" },
  { label: "About", href: "/#about" },
  { label: "Support", href: "/#support" },
] as const

export const utilityLinks = [
  { label: "Newsroom", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
] as const

export const stats = [
  { value: "83%", label: "of shippers report faster carrier matching within the first week on the platform." },
  { value: "85%", label: "of carriers increase truck utilization by reducing empty return trips across Iraq routes." },
  { value: "92%", label: "of broker-managed shipments reach delivery on schedule with full lifecycle visibility." },
] as const

export const segments = [
  {
    title: "Carrying the Load",
    image: "/about1.png",
    description:
      "Heavy freight and construction materials moved across governorates with verified carriers and transparent pricing.",
    href: "/register?role=carrier",
  },
  {
    title: "Post & Courier",
    image: "/about2.png",
    description:
      "Fast regional deliveries for general cargo, electronics, and packaged goods with real-time status tracking.",
    href: "/register?role=shipper",
  },
  {
    title: "Fueling Division",
    image: "/about3.png",
    description:
      "Specialized tanker logistics for fuel and liquid cargo with compliance-ready carrier assignment workflows.",
    href: "/register?role=broker",
  },
] as const

export const successStories = [
  {
    title: "Baghdad Trading Co. Cuts Empty Miles by 40%",
    description:
      "By posting loads on LoadBoard Iraq and accepting competitive carrier offers, the shipper reduced coordination overhead and improved on-time deliveries across Baghdad–Basra lanes.",
    image: "/carousel1.png",
    tag: "SUCCESS STORY",
  },
  {
    title: "Euphrates Transport Grows Fleet Utilization",
    description:
      "The carrier team uses advanced load filters and offer tracking to keep trucks moving between Erbil, Mosul, and Kirkuk with fewer deadhead returns.",
    image: "/about1.png",
    tag: "SUCCESS STORY",
  },
  {
    title: "Iraq Freight Brokers Streamline Client Operations",
    description:
      "Brokers manage multiple shipper accounts, compare carrier offers, and assign loads from a single dashboard — improving profitability per shipment.",
    image: "about2.png",
    tag: "SUCCESS STORY",
  },
] as const
