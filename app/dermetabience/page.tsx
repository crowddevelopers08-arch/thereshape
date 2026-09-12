
import AchievementSection from "@/components/dermet/AchievementSection"
import AssessmentForm from "@/components/dermet/AssessmentForm"
import Header from "@/components/dermet/dermetheader"
import Footer from "@/components/dermet/Footer"
import Hero from "@/components/dermet/hero"
import TransformationsCarousel from "@/components/dermet/TransformationsCarousel"

export default function DermetabiencePage() {
  return (
    <div className="reshape scroll-smooth">
      <Header />
      <main className="min-h-screen bg-white">
        <Hero />
        <AssessmentForm />
        <AchievementSection />
        <TransformationsCarousel />
        <Footer />
      </main>
    </div>
  )
}
