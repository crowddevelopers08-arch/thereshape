"use client"

import { useEffect } from "react"
import { CheckCircle2, Phone, ArrowLeft } from "lucide-react"
import Header from "@/components/reshape/Header"
import Footer from "@/components/reshape/Footer"
import Headers from "@/components/reshape/thank-header"

export default function ReshapeThankYou() {
  useEffect(() => {
    // conversion signal for GTM / ad platforms
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: "lead_thank_you", branch: "Reshape Clinic" })
  }, [])

  return (
    <div className="reshape flex min-h-screen flex-col">
      <Headers />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-16 sm:py-24">
        <div className="aurora" aria-hidden>
          <span className="a1" />
          <span className="a2" />
          <span className="a3" />
        </div>

        <div className="relative z-10 w-full max-w-[560px] rounded-[22px] border border-[#e7ecf3] bg-white p-6 text-center shadow-[0_30px_60px_-30px_rgba(34,57,95,0.4)] sm:p-10 md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#fef5ef] sm:h-20 sm:w-20">
            <CheckCircle2 className="h-8 w-8 text-[#22395f] sm:h-10 sm:w-10" />
          </div>

          <h1 className="text-[clamp(1.7rem,6vw,2.6rem)] leading-tight">Thank you!</h1>
          <p className="mx-auto mt-4 max-w-[42ch] text-[0.95rem] leading-relaxed text-[#5f6f88] sm:text-[1.05rem]">
            Your consultation request has been received. Our team will call you shortly on the number you shared to
            confirm your slot for the Hair Trinity Program.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/" className="btn btn-primary w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </a>
            <a href="tel:+918608551555" className="btn btn-ghost w-full sm:w-auto">
              <Phone className="h-4 w-4" />
              Call 86085 51555
            </a>
          </div>

          <p className="mt-6 text-[0.85rem] text-[#5f6f88]">Mon – Sun &nbsp;10:00 AM – 8:00 PM</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
