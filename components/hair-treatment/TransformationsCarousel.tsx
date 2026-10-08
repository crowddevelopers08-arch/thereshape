"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { LuArrowRight, LuChevronLeft, LuChevronRight } from "react-icons/lu"

const RESULTS = [
  { src: "/re-bfaf-1.png", label: "Hair restoration before and after comparison", type: "image" },
  { src: "/re-bfaf-3.mp4", label: "Hair restoration results video", type: "video" },
  { src: "/consult-1.jpeg", label: "Hair transplant before and after result", type: "image" },
  { src: "/consult-3.png", label: "Hair transplant before and after result", type: "image" },
  { src: "/consult-2.jpeg", label: "Hair restoration before and after result", type: "image" },
  { src: "/consult-4.png", label: "Hair restoration before and after result", type: "image" },
] as const

export default function TransformationsCarousel() {
  const [carouselRef, api] = useEmblaCarousel({ loop: true, align: "start" })
  const [active, setActive] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!api) return
    const onSelect = () => {
      setActive(api.selectedScrollSnap())
      // Stop playback whenever navigation changes the visible cards.
      videoRef.current?.pause()
    }
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  const arrowClass = "flex h-11 w-11 items-center justify-center rounded-full border border-[#e3e8ee] bg-white text-[#22395f] transition-colors hover:border-[#fccbb6] hover:bg-[#fff1e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22395f]"

  return (
    <section id="results" aria-labelledby="transformations-heading" className="scroll-mt-[100px] bg-[#fbf8f5] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6b58]">Our transformations</p>
          <h2 id="transformations-heading" className="mt-3 flex items-center justify-center gap-3 text-[1.8rem] font-bold tracking-tight text-[#5f6f88] sm:gap-4 sm:text-[2.5rem]">
            <span>Before</span>
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fccbb6] text-[#22395f] sm:h-11 sm:w-11"><LuArrowRight className="h-5 w-5" /></span>
            <span className="text-[#22395f]">After</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#65748a] sm:text-base">Explore our before-and-after gallery and watch the results up close.</p>
        </div>

        <div role="region" aria-roledescription="carousel" aria-label="Hair treatment transformations" className="mt-8 sm:mt-10">
          <div ref={carouselRef} className="overflow-hidden rounded-[24px]">
            <div className="-ml-5 flex touch-pan-y">
              {RESULTS.map((result, i) => (
                <article key={result.src} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${RESULTS.length}: ${result.label}`} className="min-w-0 flex-[0_0_100%] pl-5 sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%]">
                  <div className="overflow-hidden rounded-[24px] border border-[#e7ecf3] bg-white">
                    <div className="relative aspect-square overflow-hidden bg-[#f4f1ed]">
                      {result.type === "video" ? (
                        <video ref={videoRef} controls playsInline preload="metadata" aria-label={result.label} className="h-full w-full bg-[#14233b] object-contain">
                          <source src={result.src} type="video/mp4" />
                          Your browser does not support video playback. <a href={result.src}>Download the video</a>.
                        </video>
                      ) : (
                        <Image src={result.src} alt={result.label} fill sizes="(min-width: 1100px) 350px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-contain" />
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
            <button type="button" onClick={() => api?.scrollPrev()} aria-label="Previous transformation" className={arrowClass}><LuChevronLeft className="h-5 w-5" /></button>
            <div className="flex items-center">
              {RESULTS.map((result, i) => (
                <button key={result.src} type="button" onClick={() => api?.scrollTo(i)} aria-label={`Go to transformation ${i + 1}`} aria-current={active === i ? "true" : undefined} className="flex h-11 w-7 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-[#22395f]">
                  <span className={`h-2 rounded-full transition-all motion-reduce:transition-none ${active === i ? "w-6 bg-[#22395f]" : "w-2 bg-[#22395f]/20"}`} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => api?.scrollNext()} aria-label="Next transformation" className={arrowClass}><LuChevronRight className="h-5 w-5" /></button>
          </div>
          <p role="status" aria-live="polite" className="sr-only">Transformation {active + 1} of {RESULTS.length}</p>
        </div>
        <p className="mt-4 text-center text-xs text-[#7b8491]">Individual results may vary.</p>
      </div>
    </section>
  )
}
