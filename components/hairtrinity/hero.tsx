"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function AsSeenOnLogo({ variant }: { variant: "timesnow" | "ndtv" | "indiatoday" | "news18" }) {
  if (variant === "timesnow") {
    return (
      <div className="text-center leading-[0.85] text-[#3a4250]">
        <span className="block text-[15px] font-extrabold tracking-tight">TIMES NOW</span>
        {/* <span className="block text-[15px] font-extrabold tracking-tight"></span> */}
      </div>
    );
  }
  if (variant === "ndtv") {
    return (
      <span className="text-[19px] font-extrabold tracking-tight text-[#2c333f]">
        N<span className="text-[#e8352e]">D</span>TV
      </span>
    );
  }
  if (variant === "indiatoday") {
    return (
      <div className="text-center leading-[0.9] text-[#2c333f]">
        <span className="block text-[13px] font-bold tracking-wide">INDIA TODAY</span>
        {/* <span className="block text-[15px] font-extrabold tracking-tight"></span> */}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 rounded-[3px] bg-[#2c333f] px-2 py-[3px]">
      <span className="text-[15px] font-extrabold tracking-tight text-white">NEWS</span>
      <span className="rounded-[2px] bg-[#e8352e] px-[5px] text-[13px] font-extrabold text-white">18</span>
    </div>
  );
}

const asSeenOnVariants = ["timesnow", "ndtv", "indiatoday", "news18"] as const;

export default function HairTreatmentHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isVideoFloating, setIsVideoFloating] = useState(false);
  const [isFloatingDismissed, setIsFloatingDismissed] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVideoFloating(false);
        setIsFloatingDismissed(false);
        return;
      }

      setIsVideoFloating(entry.boundingClientRect.bottom < 0);
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigationEntry?.type !== "reload") return;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const scrollToHero = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    scrollToHero();
    const frameId = window.requestAnimationFrame(scrollToHero);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return (
    <section ref={heroRef} id="top" className="scroll-mt-28 bg-white px-4 py-6 font-sans sm:px-8 lg:px-16 lg:py-12">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-0 sm:gap-20 lg:grid-cols-[minmax(0,48fr)_minmax(0,56fr)] lg:gap-12">
        {/* Left column */}
        <div className="w-full min-w-0 max-sm:contents">
          <span className="inline-block uppercase rounded-[3px] bg-[#fdeee3] px-3 py-[6px] text-[10.5px] font-bold tracking-[1px] text-[#e8823f] max-sm:order-1 max-sm:w-fit">
            Your Hair Regrowth Guide
          </span>

          <h1 className="mt-4 text-[34px] font-extrabold !leading-[1.16] tracking-[-0.5px] text-[#0f1e3d] max-sm:order-2 sm:text-[38px] lg:text-[40px]">
            <span className="sm:block">Before You Take Any </span>
            <span className="sm:flex sm:items-baseline sm:gap-[0.18em]">
              <span>Hair Treatment</span>{" "}
              <span className="inline-block animate-[hairtrinity-word-glow_4.2s_ease-in-out_infinite] text-[#e8823f] max-sm:mr-2">Watch</span>
            </span>
            <span className="text-[#e8823f] sm:block">
              <span className="inline-block animate-[hairtrinity-word-glow_4.2s_ease-in-out_0.45s_infinite]">This</span>{" "}
              <span className="inline-block animate-[hairtrinity-word-glow_4.2s_ease-in-out_0.9s_infinite]">First.</span>
            </span>
          </h1>

          <p className="mt-5 text-[15px] leading-[1.7] text-[#6b7280] max-sm:order-3">
            <span className="sm:block">PRP, GFC or other hair treatment may work differently for different people, </span>
            <span>
              understand <strong className="font-bold text-[#0f1e3d]">your hair &amp; scalp</strong> before choosing a treatment.
            </span>
          </p>

          <div className="mt-7 flex items-start gap-4 max-sm:order-5">
            <div className="relative mt-0.5 h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#fde0d0] bg-white shadow-sm">
              <Image src="https://res.cloudinary.com/n0ccg2u6/image/upload/docaneesha_rik4bt.png" alt="Dr. Aneesha" fill sizes="64px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-[16px] font-bold leading-tight text-[#0f1e3d]">Dr. Aneesha</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[14px] font-medium leading-[1.4] text-[#6b7280]">
                <span>Aesthetic Physician</span>
                {/* <span className="text-[#e8823f]" aria-hidden="true">•</span> */}
              </p>
              <p className="mt-1.5 max-w-[430px] font-bold text-[14.5px] leading-[1.55] text-[#8a8f99]">
                B.D.S., F.D.S., F.M.C. <span className="text-[#8a8f99]">•</span> PG Dip. Dermatology (RCPI), Ireland .
              </p>
              <p className="mt-1.5 max-w-[430px] font-bold text-[14.5px] leading-[1.55] text-[#8a8f99]">
                8+ years of experience .
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="btn-wave mt-8 flex w-full max-w-[420px] items-center justify-between rounded-full bg-[#22395f] px-6 py-4 text-[13px] font-semibold tracking-[0.5px] text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#16263f] max-sm:order-6 sm:w-auto"
          >
            <span className="relative z-10">BOOK YOUR HAIR ASSESSMENT NOW</span>
            <span className="relative z-10 flex items-center">
              <ArrowRightIcon />
            </span>
          </button>
        </div>

        {/* Right column — video */}
        <div className="w-full min-w-0 max-sm:order-4 max-sm:mt-7">
          {isVideoFloating && !isFloatingDismissed && <div className="aspect-[16/10] w-full sm:aspect-[16/9]" aria-hidden="true" />}
          <div
            role="group"
            aria-label="Hair treatment video"
            className={`overflow-hidden rounded-[14px] bg-[#0f1e3d] outline-none ring-[#e8823f] transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isVideoFloating && !isFloatingDismissed
                ? "hairtrinity-floating-video fixed bottom-20 right-4 z-[70] aspect-video w-[min(390px,calc(100vw-2rem))] shadow-[0_18px_50px_rgba(15,30,61,.35)] sm:bottom-5 sm:right-5"
                : "relative aspect-[16/10] w-full sm:aspect-[16/9]"
            }`}
          >
            <iframe
              src="https://www.youtube.com/embed/G7yXPQPkYm0?autoplay=1&mute=0&playsinline=1&rel=0"
              title="Hair treatment guide"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />

            {isVideoFloating && !isFloatingDismissed && (
              <button
                type="button"
                aria-label="Close floating video"
                onClick={() => setIsFloatingDismissed(true)}
                className="absolute left-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full text-lg leading-none text-white backdrop-blur-sm transition hover:bg-black/80"
              >
                &times;
              </button>
            )}

          </div>

          {/* As seen on bar */}
          <div className="mt-4 max-sm:hidden flex h-[68px] items-center gap-5 overflow-hidden rounded-[10px] border border-[#eceef1] bg-white px-5 shadow-[0_4px_16px_rgba(15,30,61,.04)]">
            <span className="shrink-0 whitespace-nowrap text-[13px] font-semibold text-[#8a8f99]">As Seen On</span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <div className="flex w-[200%] animate-[as-seen-on-scroll_16s_linear_infinite] will-change-transform hover:[animation-play-state:paused]">
                {[...asSeenOnVariants, ...asSeenOnVariants].map((variant, index) => (
                  <div
                    key={`${variant}-${index}`}
                    className="mx-1.5 flex h-11 w-[calc(12.5%_-_12px)] shrink-0 items-center justify-center rounded-lg border border-[#eceef1] bg-[#fafbfc] px-2"
                  >
                    <AsSeenOnLogo variant={variant} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
