import { PublicPageLayout } from "@/components/layout/PublicHeader"
import { LoadBoardPageContent } from "@/components/loads/LoadBoardPageContent"

export default function LoadsPage() {
  return (
    <PublicPageLayout
      title="Available Loads"
      subtitle="Search Iraq's freight marketplace. Filter by route, truck type, cargo, and pickup date — then submit offers as a registered carrier."
    >
      <div className="mx-auto max-w-7xl px-4 py-10">
        <LoadBoardPageContent />
      </div>
    </PublicPageLayout>
  )
}
