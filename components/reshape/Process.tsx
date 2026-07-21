"use client"

import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"

const STEPS = [
  { n: "Step 1", title: "Hair & Scalp Analysis" },
  { n: "Step 2", title: "Personalized Hair Trinity Treatment Plan" },
  { n: "Step 3", title: "Advanced Hair Restoration Sessions" },
  { n: "Step 4", title: "Regular Follow-up & Hair Maintenance" },
]

/* A serpentine path in a 0..100 square. `preserveAspectRatio="none"` stretches
   it to the container, so a point (x, y) here maps to (x%, y%) of the box — which
   lets DOM nodes placed by percentage sit exactly on the curve. It begins at the
   first card's inner edge (x=60, card 1 is on the right), runs into node 1, then
   curves through the centre (x=50) at each node's y (12.5 / 37.5 / 62.5 / 87.5)
   and ends at node 4 — no trailing tail. */
const SERPENTINE =
  "M60 12.5 L50 12.5 C 20 18, 20 31, 50 37.5 C 80 44, 80 56, 50 62.5 C 20 68, 20 81, 50 87.5"

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)

  // 0 as the timeline enters the lower viewport → 1 as its end passes the middle.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 48%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 })

  return (
    <section id="process" className="border-b border-[#e7ecf3] bg-white py-14 sm:py-16 lg:py-20">
      <div ref={ref} className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="kicker justify-center">How It Works</p>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)]">Your Hair Restoration Journey</h2>
        </div>

        {/* DESKTOP — serpentine with alternating cards. */}
        <SerpentineTimeline progress={progress} />
        {/* MOBILE — a clean straight draw, cards stacked to the right. */}
        <StraightTimeline progress={progress} />
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Desktop — the curved, self-drawing serpentine.                             */
/* -------------------------------------------------------------------------- */
function SerpentineTimeline({ progress }: { progress: MotionValue<number> }) {
  const pathRef = useRef<SVGPathElement>(null)
  const headX = useMotionValue(50)
  const headY = useMotionValue(0)

  // Ride the glowing head along the actual curve as the line draws.
  useMotionValueEvent(progress, "change", (v) => {
    const p = pathRef.current
    if (!p) return
    const len = p.getTotalLength()
    const pt = p.getPointAtLength(Math.min(Math.max(v, 0), 1) * len)
    headX.set(pt.x)
    headY.set(pt.y)
  })
  const headLeft = useTransform(headX, (x) => `${x}%`)
  const headTop = useTransform(headY, (y) => `${y}%`)
  const headOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0])

  return (
    <div className="relative hidden h-[640px] lg:block">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="reshape-journey-d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fccbb6" />
            <stop offset="55%" stopColor="#7d8db0" />
            <stop offset="100%" stopColor="#22395f" />
          </linearGradient>
        </defs>
        {/* faint track + the part that draws forward */}
        <path ref={pathRef} d={SERPENTINE} stroke="#e7ecf3" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <motion.path
          d={SERPENTINE}
          stroke="url(#reshape-journey-d)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: progress }}
        />
      </svg>

      {/* traveling head, following the curve */}
      <motion.span
        style={{ left: headLeft, top: headTop, opacity: headOpacity }}
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fccbb6] shadow-[0_0_18px_4px_rgba(252,203,182,0.9)]"
        aria-hidden="true"
      />

      <div className="grid h-full grid-rows-4">
        {STEPS.map((s, i) => (
          <div key={s.n} className="relative">
            {/* node — centred, sits on the curve's centre crossing */}
            <StepNode
              index={i}
              total={STEPS.length}
              progress={progress}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            {/* card — alternating side */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`card absolute top-1/2 w-[40%] -translate-y-1/2 p-6 ${
                i % 2 === 0 ? "right-0 text-left" : "left-0 text-right"
              }`}
            >
              <StepText step={s} />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Mobile — a straight vertical draw with the cards to the right.             */
/* -------------------------------------------------------------------------- */
function StraightTimeline({ progress }: { progress: MotionValue<number> }) {
  const headTop = useTransform(progress, [0, 1], ["0%", "100%"])
  const headOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0])

  return (
    <div className="relative mx-auto max-w-[560px] lg:hidden">
      <div className="absolute bottom-3 left-[21px] top-3 w-[2px]" aria-hidden="true">
        <svg viewBox="0 0 10 100" preserveAspectRatio="none" fill="none" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="reshape-journey-m" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fccbb6" />
              <stop offset="100%" stopColor="#22395f" />
            </linearGradient>
          </defs>
          <path d="M5 0 L5 100" stroke="#e7ecf3" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <motion.path
            d="M5 0 L5 100"
            stroke="url(#reshape-journey-m)"
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: progress }}
          />
        </svg>
        <motion.span
          style={{ top: headTop, opacity: headOpacity }}
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fccbb6] shadow-[0_0_16px_3px_rgba(252,203,182,0.9)]"
        />
      </div>

      <div className="space-y-7">
        {STEPS.map((s, i) => (
          <div key={s.n} className="grid grid-cols-[44px_1fr] items-start gap-5">
            <div className="relative flex justify-center">
              <StepNode index={i} total={STEPS.length} progress={progress} />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="card p-5"
            >
              <StepText step={s} />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  A node that lights up as the drawn line reaches it.                        */
/* -------------------------------------------------------------------------- */
function StepNode({
  index,
  total,
  progress,
  className = "",
}: {
  index: number
  total: number
  progress: MotionValue<number>
  className?: string
}) {
  const threshold = (index + 0.5) / total
  const start = threshold - 0.07

  const backgroundColor = useTransform(progress, [start, threshold], ["#ffffff", "#fccbb6"])
  const borderColor = useTransform(progress, [start, threshold], ["#e7ecf3", "#fccbb6"])
  const scale = useTransform(progress, [start, threshold], [0.9, 1])
  const haloOpacity = useTransform(
    progress,
    [start, threshold, Math.min(threshold + 0.22, 1)],
    [0, 0.55, 0.28],
  )

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.span
        aria-hidden="true"
        className="absolute h-14 w-14 rounded-full bg-[#fccbb6] blur-md sm:h-16 sm:w-16"
        style={{ opacity: haloOpacity }}
      />
      <motion.div
        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-white sm:h-14 sm:w-14"
        style={{ backgroundColor, borderColor, scale }}
      >
        <span className="display text-[1.15rem] text-[#22395f] sm:text-[1.35rem]">{index + 1}</span>
      </motion.div>
    </div>
  )
}

function StepText({ step }: { step: { n: string; title: string } }) {
  return (
    <>
      <span className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#3a537f]">{step.n}</span>
      <h3 className="mt-1.5 text-[1.1rem] leading-snug text-[#22395f] sm:text-[1.25rem]">{step.title}</h3>
    </>
  )
}
