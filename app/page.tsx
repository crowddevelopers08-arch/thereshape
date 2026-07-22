import type { Metadata } from "next"

import Header from "@/components/reshape/Header"
import Hero from "@/components/reshape/Hero"
import Results from "@/components/reshape/Results"
import CtaBand from "@/components/reshape/CtaBand"
import Doctor from "@/components/reshape/Doctor"
import ExpertInsight from "@/components/reshape/ExpertInsight"
import WhyReshape from "@/components/reshape/WhyReshape"
import Process from "@/components/reshape/Process"
import Conditions from "@/components/reshape/Conditions"
import Faq from "@/components/reshape/Faq"
import BookingModal from "@/components/reshape/BookingModal"
import Footer from "@/components/reshape/Footer"
import StickyCta from "@/components/reshape/StickyCta"
import CinematicScroll from "@/components/reshape/CinematicScroll"
import CtaPopup from "@/components/reshape/CtaPopup"

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
        <Results />
        {/* 2 · Problem — visitor self-identifies their hair concern */}
        <Conditions />
        {/* 3 · Early conversion nudge */}
        <CtaBand />
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
        <CtaBand />
      </main>
      <Footer />
      <StickyCta />
      {/* Booking form as a popup — opened by any "Book" CTA */}
      <BookingModal />
      {/* Promo popup with video — auto-opens every 30s */}
      <CtaPopup />
    </div>
  )
}
