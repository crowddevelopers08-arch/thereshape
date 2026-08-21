"use client"

import Image from "next/image"
import { useRef, useState } from "react"

const cards = [
  { title: "Hair Fall", description: "Ongoing or increased hair shedding concerns.", color: "#e8823f", image: "https://res.cloudinary.com/n0ccg2u6/image/upload/images-2_fyq5wv.jpg", position: "center" },
  { title: "Hair Thinning", description: "Hair appearing thinner than before.", color: "#0f1e3d", image: "https://res.cloudinary.com/n0ccg2u6/image/upload/images-3_r0rvih.jpg", position: "center" },
  { title: "Reduced Density", description: "Concerns about visible scalp or reduced hair volume.", color: "#e8823f", image: "https://res.cloudinary.com/n0ccg2u6/image/upload/images-1_hfm1wi.jpg", position: "center" },
  { title: "Scalp Concerns", description: "Scalp-related concerns that may need evaluation.", color: "#0f1e3d", image: "https://res.cloudinary.com/n0ccg2u6/image/upload/images-2_fyq5wv.jpg", position: "top" },
  { title: "Unsure Which Treatment to Choose", description: "Confused between PRP, GFC or other available options.", color: "#e8823f", image: "https://res.cloudinary.com/n0ccg2u6/image/upload/images-3_r0rvih.jpg", position: "top" },
  { title: "Previous Treatment Experience", description: "If you've previously tried hair treatments and want to discuss your current concerns with a doctor.", color: "#0f1e3d", image: "https://res.cloudinary.com/n0ccg2u6/image/upload/docaneesha_rik4bt.png", position: "top" },
]

function Gear({ color, image, position }: { color: string; image: string; position: string }) {
  return (
    <div className="relative grid size-[116px] place-items-center sm:size-[126px]">
      <div className="absolute size-[92px] rounded-[25%]" style={{ backgroundColor: color }} />
      <div className="absolute size-[92px] rotate-45 rounded-[25%]" style={{ backgroundColor: color }} />
      <div className="relative size-[76px] overflow-hidden rounded-full border-[5px] border-white bg-white shadow-[0_5px_14px_rgba(15,30,61,.22)] sm:size-[82px]">
        <Image src={image} alt="" fill sizes="82px" className="object-cover" style={{ objectPosition: position }} />
      </div>
    </div>
  )
}

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
    <article className="relative flex min-h-[255px] flex-col items-center rounded-b-[10px] rounded-t-[52px] border border-[#0f1e3d]/5 bg-white px-5 pb-8 pt-[70px] text-center shadow-[0_14px_0_rgba(15,30,61,0.12)]">
      <div className="absolute -top-[58px]"><Gear color={card.color} image={card.image} position={card.position} /></div>
      <div className="h-[5px] w-16 rounded-full" style={{ backgroundColor: card.color }} />
      <h3 className="mt-5 text-[17px] font-extrabold leading-snug text-[#0f1e3d]">{card.title}</h3>
      <p className="mt-3 text-[13px] leading-5 text-[#6b7280]">{card.description}</p>
      <div className="absolute -bottom-[14px] h-[14px] w-[72%] rounded-b-[10px]" style={{ backgroundColor: card.color }} />
    </article>
  )

  return (
    <section id="assessment" className="relative isolate scroll-mt-28 overflow-hidden bg-[#f8f5f2] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-10">
      <div className="pointer-events-none absolute left-[5%] top-[17%] size-12 rotate-45 bg-[#e8823f]/10" />
      <div className="pointer-events-none absolute right-[9%] top-[8%] size-10 rotate-45 bg-[#0f1e3d]/5" />
      <div className="pointer-events-none absolute bottom-[8%] left-[20%] size-16 rotate-45 bg-[#e8823f]/5" />

      <div className="relative mx-auto max-w-[1440px]">
        <header className="mx-auto max-w-4xl text-center text-[#0f1e3d]">
          <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#e8823f] sm:text-[14px]">Who May Consider an Assessment?</p>
          <h2 className="mt-4 text-[30px] font-extrabold leading-tight sm:text-[42px] lg:text-[52px]">Is a Personalised Hair Assessment Right for You?</h2>
          <p className="mt-4 text-[15px] font-medium tracking-wide sm:text-[18px]">This may be relevant if you&apos;re concerned about:</p>
        </header>

        <div
          ref={carouselRef}
          onScroll={updateActiveCard}
          className="mt-8 flex snap-x snap-mandatory overflow-x-auto px-1 pb-5 pt-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
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

        <div className="mt-20 hidden gap-x-4 gap-y-16 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {cards.map((card) => <Card key={card.title} card={card} />)}
        </div>
      </div>
    </section>
  )
}
