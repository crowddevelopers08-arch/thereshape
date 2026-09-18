import AssessmentForm from "@/components/hair-treatment/AssessmentForm";
import Header from "@/components/hair-treatment/dermetheader";
import Footer from "@/components/hair-treatment/Footer";
import HairTreatmentHeroSection from "@/components/hair-treatment/herosection";
import TransformationsCarousel from "@/components/hair-treatment/TransformationsCarousel";
import YoutubeSection from "@/components/hair-treatment/YoutubeSection";

export default function HairTreatmentPage() {
  return (
    <div className="reshape scroll-smooth">
      <Header />
      <main className="min-h-screen bg-white">
        <HairTreatmentHeroSection />
        {/* <AchievementSection /> */}
        <AssessmentForm />
        <TransformationsCarousel />
        <YoutubeSection />
        <Footer />
      </main>
    </div>
  );
}
