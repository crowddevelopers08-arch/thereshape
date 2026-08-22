"use client"

import Image from "next/image"
import { useRef, useState } from "react"

const cards = [
  { title: "Hair Fall", description: "Ongoing or increased hair shedding concerns.", color: "#e8823f", image: "images-3.avif", position: "center" },
  { title: "Hair Thinning", description: "Hair appearing thinner than before.", color: "#0f1e3d", image: "images-4.avif", position: "center" },
  { title: "Reduced Density", description: "Concerns about visible scalp or reduced hair volume.", color: "#e8823f", image: "images-5.avif", position: "center" },
  { title: "Scalp Concerns", description: "Scalp-related concerns that may need evaluation.", color: "#0f1e3d", image: "images-6.webp", position: "top" },
]

export default function AssessmentCandidates() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)

  const goToCard = (index: number) => {
    const nextIndex = Math.max(0, Math.min(cards.length - 1, index))
    const carousel = carouselRef.current
    if (!carousel) return

    carousel.scrollTo({ left: carousel.clientWidth * nextIndex, behavior: "smooth" })
    setActiveCard(nextIndex)
  }

  const updateActiveCard = () => {
    const carousel = carouselRef.current
    if (!carousel || !carousel.clientWidth) return
    setActiveCard(Math.round(carousel.scrollLeft / carousel.clientWidth))
  }

  const Card = ({ card }: { card: (typeof cards)[number] }) => (
    <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#0f1e3d]/8 bg-white shadow-[0_10px_30px_rgba(15,30,61,0.08)] transition-transform duration-300 hover:-translate-y-1">
      {/* Title bar */}
      <div className="px-5 py-4 text-center" style={{ backgroundColor: card.color }}>
        <h3 className="text-[17px] font-extrabold leading-snug" style={{ color: "#ffffff" }}>
          {card.title}
        </h3>
      </div>

      {/* Image */}
      <div className="relative h-[190px] w-full overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: card.position }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 text-center">
        <p className="text-[13.5px] leading-5 text-[#6b7280]">{card.description}</p>
      </div>
    </article>
  )

  return (
    <section id="assessment" className="relative isolate scroll-mt-28 overflow-hidden bg-[#f8f5f2] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-10">
      {/* <div className="pointer-events-none absolute left-[5%] top-[17%] size-12 rotate-45 bg-[#e8823f]/10" />
      <div className="pointer-events-none absolute right-[9%] top-[8%] size-10 rotate-45 bg-[#0f1e3d]/5" />
      <div className="pointer-events-none absolute bottom-[8%] left-[20%] size-16 rotate-45 bg-[#e8823f]/5" /> */}

      <div className="relative mx-auto max-w-[1440px]">
        <header className="mx-auto max-w-4xl text-center text-[#0f1e3d]">
          <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#e8823f] sm:text-[14px]">Who May Consider an Assessment?</p>
          <h2 className="mt-4 text-[30px] font-extrabold leading-tight sm:text-[42px] lg:text-[52px]">Is a Personalised Hair Assessment Right for You?</h2>
          <p className="mt-4 text-[15px] font-medium tracking-wide sm:text-[18px]">This may be relevant if you&apos;re concerned about:</p>
        </header>

        {/* Mobile carousel */}
        <div
          ref={carouselRef}
          onScroll={updateActiveCard}
          className="mt-8 flex snap-x snap-mandatory overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
        >
          {cards.map((card) => (
            <div key={card.title} className="w-full shrink-0 snap-center px-2"><Card card={card} /></div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-4 sm:hidden" aria-label="Assessment carousel navigation">
          <button type="button" onClick={() => goToCard(activeCard - 1)} disabled={activeCard === 0} aria-label="Previous card" className="grid size-10 place-items-center rounded-full bg-[#0f1e3d] text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-30">
            <span aria-hidden="true" className="text-xl leading-none">←</span>
          </button>
          <div className="flex items-center gap-2">
            {cards.map((card, index) => (
              <button key={card.title} type="button" onClick={() => goToCard(index)} aria-label={`Go to card ${index + 1}`} className={`h-2.5 rounded-full transition-all ${activeCard === index ? "w-7 bg-[#e8823f]" : "w-2.5 bg-[#0f1e3d]/25"}`} />
            ))}
          </div>
          <button type="button" onClick={() => goToCard(activeCard + 1)} disabled={activeCard === cards.length - 1} aria-label="Next card" className="grid size-10 place-items-center rounded-full bg-[#0f1e3d] text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-30">
            <span aria-hidden="true" className="text-xl leading-none">→</span>
          </button>
        </div>

        {/* Desktop grid */}
        <div className="mx-auto mt-12 hidden max-w-[1180px] gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => <Card key={card.title} card={card} />)}
        </div>
      </div>
    </section>
  )
}