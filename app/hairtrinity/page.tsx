import type { Metadata } from "next"

import Header from "@/components/reshape/Header"
import Results from "@/components/reshape/Results"
import CtaBand from "@/components/reshape/CtaBand"
import Doctor from "@/components/reshape/Doctor"
import ExpertInsight from "@/components/reshape/ExpertInsight"
import Program from "@/components/reshape/Program"
import WhyReshape from "@/components/reshape/WhyReshape"
import Process from "@/components/reshape/Process"
import Conditions from "@/components/reshape/Conditions"
import Faq from "@/components/reshape/Faq"
import Footer from "@/components/reshape/Footer"
import StickyCta from "@/components/reshape/StickyCta"
import CinematicScroll from "@/components/reshape/CinematicScroll"
import HairTreatmentHero from "@/components/hairtrinity/hero"
import WhyResultsDiffer from "@/components/hairtrinity/WhyResultsDiffer"
import PrpGfcLimitations from "@/components/hairtrinity/PrpGfcLimitations"
import Journey from "@/components/hairtrinity/Journey"

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
        <HairTreatmentHero />
        <WhyResultsDiffer />
        <PrpGfcLimitations />
        {/* <Results /> */}
        {/* 2 · Why Reshape */}
        {/* <Program /> */}
        <Journey />
        {/* 3 · Process */}
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}
