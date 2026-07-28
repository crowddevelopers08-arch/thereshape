"use client"

import Reveal from "./Reveal"
import { track } from "./track"

export default function CtaBand() {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-[22px] bg-gradient-to-r from-[#fccbb6] to-[#fef1ea] shadow-[0_30px_70px_-40px_rgba(34,57,95,0.4)]">
          <div className="grid grid-cols-1 md:grid-cols-[1.55fr_1fr]">
            {/* LEFT — copy + button */}
            <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
              <h2 className="text-[clamp(1.5rem,3.4vw,2.5rem)] font-bold leading-[1.1] text-[#22395f]">
                Start With the Right Assessment
              </h2>
              <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-[#22395f]/80">
                Hair fall, thinning, changes in density and scalp concerns can differ from person to person.
              </p>
              <p className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-[#22395f]/80">
                At Reshape, your journey begins with a professional hair and scalp consultation. Based on the
                assessment, the clinical team discusses suitable options and develops an individual care plan.
              </p>
              <a
                href="#book"
                onClick={() => track("book_click", { branch: "Reshape Clinic" })}
                className="btn-wave group/btn mt-7 inline-flex items-center gap-2 rounded-full bg-[#22395f] px-7 py-3.5 text-[0.9rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#16263f]"
              >
                <span className="relative z-10">Schedule Your Consultation</span>
                <span
                  aria-hidden
                  className="relative z-10 inline-block transition-transform duration-200 group-hover/btn:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>

            {/* RIGHT — video (full height, no gaps) */}
            <div className="relative h-full w-full min-h-[200px] md:min-h-full">
              <video
                src="https://res.cloudinary.com/n0ccg2u6/video/upload/video_v1jsnd.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                poster="https://your-poster-image-url.jpg"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}