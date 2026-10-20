"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const comparisons = [
  { before: "/re-images-7.jpeg", after: "/re-images-3.jpeg", alt: "Treatment result 1" },
  { before: "/re-images-5.jpeg", after: "/re-images-4.jpeg", alt: "Treatment result 2" },
  { before: "/re-images-1.jpeg", after: "/re-images-9.jpeg", alt: "Treatment result 3" },
  { before: "/re-images-8.jpeg", after: "/re-images-2.jpeg", alt: "Treatment result 4" },
];

function BeforeAfterCard({ before, after, alt }: { before: string; after: string; alt: string }) {
  return (
    <figure className="overflow-hidden rounded-3xl border border-[#fccbb6]/70 bg-white p-2.5 shadow-[0_8px_30px_-18px_rgba(34,57,95,0.25)] sm:p-3">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {[
          { src: before, label: "Before" },
          { src: after, label: "After" },
        ].map(({ src, label }) => (
          <div key={label} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#fef5ef]">
            <Image
              src={src}
              alt={`${alt}: ${label.toLowerCase()} treatment`}
              fill
              quality={75}
              sizes="(max-width: 767px) 45vw, 23vw"
              className="pointer-events-none select-none object-cover object-center"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#22395f]/50 to-transparent" />
            <span className={`absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] shadow-sm ${label === "Before" ? "bg-white text-[#22395f]" : "bg-[#fccbb6] text-[#22395f]"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}

export default function BeforeAfter() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const moveCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.firstElementChild as HTMLElement | null;
    if (!carousel || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(carousel).gap) || 0;
    carousel.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="relative w-full scroll-mt-28 overflow-hidden bg-[#fbf8f5] px-4 py-8 [font-family:'Inter',sans-serif] sm:px-6 sm:py-12 lg:px-8" id="results">
      <div className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-[#f78954]/[0.10] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-[360px] w-[360px] rounded-full bg-[#fccbb6]/[0.08] blur-3xl" />

      {/* Faint strand linework echoing the CTA section texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <path
            key={i}
            d={`M ${1300 - i * 70} -50 C ${1050 - i * 70} 250, ${1150 - i * 70} 540, ${900 - i * 90} 850`}
            stroke={i % 2 === 0 ? "#f78954" : "#fccbb6"}
            strokeWidth="1.5"
            fill="none"
          />
        ))}
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-sm:mb-4 max-w-3xl text-center sm:mb-5">
        <div className="text-center">
          <h2 id="transformations-heading" className="mt-3 flex items-center justify-center gap-3 text-[1.8rem] font-bold tracking-tight text-[#5f6f88] sm:gap-4 sm:text-[2.5rem]">
            <span>Before</span>
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fccbb6] text-[#22395f] sm:h-11 sm:w-11"><ArrowRight className="h-5 w-5" /></span>
            <span className="text-[#22395f]">After</span>
          </h2>
        </div>
        </div>

        <div
          className="animate-pop animation-delay-300 relative"
          role="region"
          aria-label="Before and after treatment results gallery"
        >
          <p className="mb-4 max-sm:mb-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-[#f78954]">Skin Treatment Before and After Results</p>
          <div className="relative left-1/2 w-screen -translate-x-1/2 px-5 py-2 sm:px-14 lg:px-20 lg:py-2">
            <button
              type="button"
              onClick={() => moveCarousel(-1)}
              aria-label="Previous results"
              className="absolute left-2 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-[#22395f] shadow-lg transition hover:bg-[#fccbb6] hover:text-[#22395f] sm:left-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div ref={carouselRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6">
              {comparisons.map((comparison) => (
                <div key={comparison.before} className="w-full shrink-0 snap-start [content-visibility:auto] [contain-intrinsic-size:auto_420px] md:w-[calc(50%-0.625rem)] lg:w-[calc(50%-0.75rem)]">
                  <BeforeAfterCard before={comparison.before} after={comparison.after} alt={comparison.alt} />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => moveCarousel(1)}
              aria-label="Next results"
              className="absolute right-2 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-[#22395f] shadow-lg transition hover:bg-[#fccbb6] hover:text-[#22395f] sm:right-4"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
