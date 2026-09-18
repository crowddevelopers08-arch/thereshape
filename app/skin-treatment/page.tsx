import AchievementSection from "@/components/skintreatment/AchievementSection"
import AssessmentForm from "@/components/skintreatment/AssessmentForm"
import ClinicBanner from "@/components/skintreatment/clinicbanner"
import Header from "@/components/skintreatment/dermetheader"
import Footer from "@/components/skintreatment/Footer"
import TransformationsCarousel from "@/components/skintreatment/TransformationsCarousel"
import YoutubeSection from "@/components/skintreatment/YoutubeSection"



export const dynamic = "force-dynamic"

export default async function DermetabiencePage() {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  return (
    <div className="reshape scroll-smooth">
      <Header />
      <main className="min-h-screen bg-white">
        <ClinicBanner />
        {/* <AchievementSection /> */}
        <AssessmentForm />
        <TransformationsCarousel />
        <YoutubeSection />
        <Footer />
      </main>
    </div>
  )
}
