"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useInView } from "framer-motion"
import type { IconType } from "react-icons"
import {
  LuSprout,
  LuShieldCheck,
  LuUserCheck,
  LuLayers,
  LuLeaf,
  LuSparkles,
  LuCheck,
  LuArrowRight,
} from "react-icons/lu"

/**
 * Treatment / Hair Conditions — an editorial "sticky scroll reveal". The left
 * rail narrates each hair condition in tall scroll steps; a pinned cinematic
 * frame on the right wipes between visuals as each step reaches the middle of
 * the viewport. The active step is bright, the rest recede.
 *
 * IMPORTANT: the section must NOT be an `overflow` scroll container (that breaks
 * `position: sticky`). We use `overflow-clip`, which hides the decorative blooms
 * without establishing a scroll container, so the sticky frame still pins.
 *
 * On mobile the sticky frame is dropped; each step carries its own inline visual.
 */

type Condition = {
  name: string
  icon: IconType
  description: string
  listLabel?: string
  list: string[]
  image: string
  featured?: boolean
}

/* Placeholder images — replace each `image` with a real treatment photo. */
const conditions: Condition[] = [
  {
    name: "Hair Regrowth",
    icon: LuSprout,
    description:
      "Stimulate natural hair growth with advanced regenerative therapies that nourish hair follicles and improve hair density.",
    listLabel: "Best For",
    list: ["Slow Hair Growth", "Thin Hair", "Weak Hair Follicles"],
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/regrow_tw5oqs.png",
  },
  {
    name: "Hair Loss Treatment",
    icon: LuShieldCheck,
    description:
      "Reduce excessive hair fall with personalized treatments that strengthen the scalp and promote healthier, stronger hair.",
    listLabel: "Common Causes We Treat",
    list: ["Stress-Induced Hair Loss", "Hormonal Hair Loss", "Nutritional Hair Loss", "Seasonal Hair Fall"],
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/loss_klayc9.png",
  },
  {
    name: "Baldness Treatment",
    icon: LuUserCheck,
    description:
      "Advanced non-surgical solutions for early-stage baldness and receding hairlines, designed to improve hair density and support natural-looking regrowth.",
    listLabel: "Suitable For",
    list: ["Male Pattern Baldness", "Female Pattern Hair Loss", "Receding Hairline", "Crown Hair Thinning"],
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/bald_nlcko6.png",
  },
  {
    name: "Hair Thinning",
    icon: LuLayers,
    description:
      "Restore volume and thickness by revitalizing weakened hair follicles with customized hair restoration treatments.",
    listLabel: "Ideal For",
    list: ["Reduced Hair Density", "Fine Hair", "Diffuse Hair Thinning"],
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/hairthinning_bhpjh7.png",
  },
  {
    name: "Scalp Rejuvenation",
    icon: LuLeaf,
    description:
      "A healthy scalp is the foundation of healthy hair. Our treatments help improve scalp health, nourish follicles, and create the ideal environment for hair growth.",
    listLabel: "Benefits",
    list: ["Improved Scalp Health", "Stronger Hair Roots", "Better Follicle Nutrition"],
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/scalp_fmttgn.png",
  },
  {
    name: "Personalized Hair Trinity Program",
    icon: LuSparkles,
    description:
      "Every patient receives a customized treatment plan based on a detailed hair and scalp analysis, ensuring the most suitable approach for long-lasting results.",
    list: [
      "Advanced Hair Analysis",
      "Personalized Treatment Plan",
      "Evidence-Based Hair Restoration",
      "Safe & Minimally Invasive Procedures",
      "Natural-Looking Results",
    ],
    image: "/hair-trinity.jpeg",
    featured: true,
  },
]

const viewportOnce = { once: true, margin: "-80px" } as const

export default function Conditions() {
  const [active, setActive] = useState(0)
  const handleActive = useCallback((i: number) => setActive(i), [])
  const current = conditions[active]

  return (
    <section id="conditions" data-no-cine className="relative overflow-clip bg-white py-14 sm:py-16 lg:py-24 max-[470px]:py-6">
      {/* Soft light blooms for depth. */}
      <div
        className="pointer-events-none absolute -left-24 top-40 h-96 w-96 rounded-full bg-[#22395f]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-40 h-[28rem] w-[28rem] rounded-full bg-[#fccbb6]/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        {/* Section heading. */}
        <div className="mx-auto max-w-[82ch] text-center">
          <p className="kicker justify-center">Hair Conditions</p>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)]">Personalized Solutions for Every Stage of Hair Loss</h2>
          <p className="mx-auto mt-4 text-[1.02rem] leading-relaxed text-[#5f6f88]">
            Whether you&apos;re experiencing early hair thinning or advanced hair loss, our Hair Trinity Program is
            designed to address the root cause and help restore stronger, healthier hair.
          </p>
        </div>

        <div className="mt-8 grid gap-x-16 lg:mt-14 lg:grid-cols-[1fr_1.05fr]">
          {/* LEFT — the scrolling narrative. */}
          <div className="relative">
            {conditions.map((c, i) => (
              <TextBlock
                key={c.name}
                condition={c}
                index={i}
                isActive={i === active}
                onActive={handleActive}
              />
            ))}
          </div>

          {/* RIGHT — the pinned, wiping frame (desktop only): image + heading. */}
          <div className="hidden lg:block">
            <div className="sticky top-[12vh] h-[76vh]">
              <div className="relative h-full w-full overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(34,57,95,0.28)] ring-1 ring-inset ring-white/30">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    animate={{ clipPath: "inset(0 0 0% 0)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute inset-0"
                  >
                    {/* Slow ken-burns drift keeps the frame alive while pinned. */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 1.12 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 6, ease: "easeOut" }}
                    >
                      <Visual condition={current} priority />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Framing washes for legibility + depth. */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#16263f]/85 via-[#16263f]/10 to-[#16263f]/30"
                  aria-hidden="true"
                />

                {/* Bottom caption — heading only. */}
                {/* <div className="absolute inset-x-7 bottom-7">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={active}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl"
                    >
                      {current.name}
                    </motion.h3>
                  </AnimatePresence>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Left narrative step — reports itself active when it crosses centre.        */
/* -------------------------------------------------------------------------- */
function TextBlock({
  condition,
  index,
  isActive,
  onActive,
}: {
  condition: Condition
  index: number
  isActive: boolean
  onActive: (i: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  // Active while the step's centre sits within the middle band of the viewport.
  const inView = useInView(ref, { margin: "-48% 0px -48% 0px" })
  const Icon = condition.icon

  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <div
      ref={ref}
      className={`relative flex min-h-0 flex-col justify-center border-l py-9 pl-6 transition-colors duration-500 lg:min-h-[76vh] lg:py-12 lg:pl-8 ${
        isActive ? "border-[#fccbb6]" : "border-[#22395f]/10"
      }`}
    >
      {/* Active marker dot on the rail. */}
      <span
        className={`absolute -left-[7px] top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full ring-4 ring-white transition-all duration-500 lg:block ${
          isActive ? "scale-100 bg-[#fccbb6]" : "scale-75 bg-[#22395f]/15"
        }`}
        aria-hidden="true"
      />

      {/* Oversized ghost numeral — an editorial accent above the title. */}
      <span
        className="pointer-events-none absolute right-1 -top-2 select-none display text-[5.5rem] font-bold leading-none tracking-tighter text-[#22395f]/[0.045] lg:text-[7.5rem]"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        animate={{ opacity: isActive ? 1 : 0.5 }}
      >
        {/* Eyebrow — icon badge + program label. */}
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 flex-none items-center justify-center rounded-2xl border transition-colors duration-500 ${
              isActive
                ? "border-[#fccbb6] bg-[#fef5ef] text-[#22395f]"
                : "border-[#e7ecf3] bg-white text-[#3a537f]"
            }`}
          >
            <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5f6f88]">
            Hair Trinity Program
          </span>
        </div>

        <h3 className="mt-5 display text-4xl font-bold leading-[1.02] tracking-tight text-[#22395f] md:text-[2.9rem]">
          {condition.name}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-[#5f6f88]">{condition.description}</p>

        {condition.list.length > 0 && <MetaList label={condition.listLabel} items={condition.list} />}

        <a href="#book" className="btn btn-primary btn-wave group/btn mt-8">
          <span className="relative z-10 inline-flex items-center gap-2">
            Book Your Consultation
            <LuArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </span>
        </a>

        {/* Mobile visual — the sticky frame is desktop-only. */}
        <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_16px_50px_rgba(34,57,95,0.15)] lg:hidden">
          <Visual condition={condition} priority={index === 0} />
        </div>
      </motion.div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Meta list — the "Best For" label + items as readable check-chips.          */
/* -------------------------------------------------------------------------- */
function MetaList({ label, items }: { label?: string; items: string[] }) {
  return (
    <div className="mt-6">
      {label && (
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#22395f]">{label}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e7ecf3] bg-white px-3 py-1.5 text-[0.82rem] font-medium text-[#3a537f]"
          >
            <LuCheck className="h-3.5 w-3.5 flex-none text-[#22395f]" strokeWidth={2.5} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Visual — a real photo, or a branded navy panel as a fallback.              */
/* -------------------------------------------------------------------------- */
function Visual({ condition, priority }: { condition: Condition; priority?: boolean }) {
  if (!condition.image) return <BrandPanel />
  return (
    <Image
      src={condition.image}
      alt={condition.name}
      fill
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="object-cover"
    />
  )
}

/** Branded deep-navy panel with a soft peach bloom, used only as a fallback. */
function BrandPanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#22395f]">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#fccbb6]/30 blur-3xl"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.1]" aria-hidden="true">
        <div className="absolute inset-12 rounded-2xl border border-white" />
        <div className="absolute inset-x-12 top-1/2 h-px bg-white" />
        <div className="absolute inset-y-12 left-1/2 w-px bg-white" />
      </div>
    </div>
  )
}
