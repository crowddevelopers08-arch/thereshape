import type { Metadata } from "next"

import BookingModal from "@/components/scan/BookingModal"
import CinematicScroll from "@/components/scan/CinematicScroll"
import Doctor from "@/components/scan/Doctor"
import ExpertInsight from "@/components/scan/ExpertInsight"
import Footer from "@/components/scan/Footer"
import Header from "@/components/scan/Header"
import Hero from "@/components/scan/Hero"
import Process from "@/components/scan/Process"
import StickyCta from "@/components/scan/StickyCta"
import WhyReshape from "@/components/scan/WhyReshape"

export const metadata: Metadata = {
  title: "thereshape — Hair & Scalp Assessment | Specialist-Reviewed",
  description:
    "Take a guided hair and scalp assessment in under three minutes. Share your concern and one photo, and a thereshape specialist reviews your case before your consultation.",
}

export default function ScanPage() {
  return (
    <div className="reshape scroll-smooth pb-[72px] lg:pb-0">
      <CinematicScroll />
      <Header />
      <main>
        {/* 1 · Hook — copy + "Let's Talk" on the left, before/after proof on the right */}
        <Hero />
        {/* 2 · How it works — the journey, lowers friction */}
        <Process />
        {/* 3 · Authority — meet the specialist */}
        {/* <Doctor /> */}
        {/* 4 · Deeper trust — the specialist's video */}
        {/* <ExpertInsight /> */}
        {/* 5 · Differentiation — why choose the clinic */}
        {/* <WhyReshape /> */}
      </main>
      {/* single-line legal / contact bar */}
      <Footer />
      <StickyCta />
      {/* The hair-scan assessment as a popup — opened by "Let's Talk" and any "Book" CTA */}
      <BookingModal />
    </div>
  )
}
