import type { Metadata } from "next"
import RatingPrompt from "@/components/reshape/RatingPrompt"
import { BRAND, IMAGES } from "@/components/reshape/config"

export const metadata: Metadata = {
  title: "Share Your Review | thereshape",
  description: "Tell us about your experience at thereshape — Advanced Hair Trinity Program.",
  robots: { index: false, follow: false },
}

export default function ReviewPage() {
  return (
    // inline background: `.reshape` sets `background: var(--paper)` as unlayered
    // CSS, which outranks a Tailwind bg-* utility no matter the specificity
    <div
      className="reshape flex min-h-screen flex-col items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: "#16263f" }}
    >
      <div className="mx-auto w-full max-w-[460px] rounded-[28px] bg-white px-5 py-8 shadow-[0_40px_80px_-40px_rgba(34,57,95,0.65)] sm:px-9 sm:py-10">
        <div className="flex flex-col items-center">
          {/* logoDark — the white lockup is invisible against this white card */}
          <img src={IMAGES.logoDark} alt={BRAND} className="h-16 w-auto sm:h-20" />
          {/* <span className="mt-5 block h-px w-12 bg-[#e7ecf3]" aria-hidden /> */}
        </div>

        <div className="mt-7">
          <RatingPrompt />
        </div>
      </div>
    </div>
  )
}
