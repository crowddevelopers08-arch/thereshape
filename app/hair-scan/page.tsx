import ChatBooking from "@/components/hair-scan-component/ChatBooking"
import CinematicScroll from "@/components/hair-scan-component/CinematicScroll"
import Conditions from "@/components/hair-scan-component/Conditions"
import Doctor from "@/components/hair-scan-component/Doctor"
import ExpertInsight from "@/components/hair-scan-component/ExpertInsight"
import Faq from "@/components/hair-scan-component/Faq"
import Footer from "@/components/hair-scan-component/Footer"
import Header from "@/components/hair-scan-component/Header"
import Hero from "@/components/hair-scan-component/Hero"
import Process from "@/components/hair-scan-component/Process"
import Program from "@/components/hair-scan-component/Program"
import StickyCta from "@/components/hair-scan-component/StickyCta"
import WhyReshape from "@/components/hair-scan-component/WhyReshape"
import type { Metadata } from "next"



export const metadata: Metadata = {
  title: "thereshape — Advanced Hair Trinity Program | Personalized Hair Restoration",
  description:
    "thereshape combines advanced medical science, modern hair restoration technology and personalized care to reduce hair fall, improve density and restore healthier, stronger hair. Book your consultation.",
}

export default function ReshapePage() {
  return (
    <div className="reshape scroll-smooth pb-[72px] lg:pb-0">
      <CinematicScroll />
      <Header />
      <main>
        {/* 1 · Hook + primary CTA */}
        <Hero />
        {/* <Results /> */}
        <Program />
        <ChatBooking />
        {/* 2 · Problem — visitor self-identifies their hair concern */}
        <Conditions />
        {/* 3 · Early conversion nudge */}
        {/* <CtaBand /> */}
        {/* 4 · How it works — the journey, lowers friction */}
        <Process />
        {/* 5 · Authority — meet the specialist */}
        <Doctor />
        {/* 6 · Deeper trust — the specialist's video */}
        <ExpertInsight />
        {/* 7 · Differentiation — why choose the clinic */}
        <WhyReshape />
        {/* 8 · Proof — before/after results at the decision point */}
        
        {/* 9 · Objection handling */}
        <Faq />
        {/* 10 · Final push — opens the booking popup */}
        {/* <CtaBand /> */}
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}
