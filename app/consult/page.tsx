
import AchievementSection from "@/components/dermet/AchievementSection"
import AssessmentForm from "@/components/dermet/AssessmentForm"
import Header from "@/components/dermet/dermetheader"
import Footer from "@/components/dermet/Footer"
import Hero from "@/components/dermet/hero"
import TransformationsCarousel from "@/components/dermet/TransformationsCarousel"

export const dynamic = "force-dynamic"

export default async function DermetabiencePage() {
  await new Promise((resolve) => setTimeout(resolve, 7000))

  return (
    <div className="reshape scroll-smooth">
      <Header />
      <main className="min-h-screen bg-white">
        <Hero />
        <AchievementSection />
        <AssessmentForm />
        <TransformationsCarousel />
        <Footer />
      </main>
    </div>
  )
}
