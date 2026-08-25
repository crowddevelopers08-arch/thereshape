"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const cards = [
  { title: "Hair Fall", description: "Ongoing or increased hair shedding concerns.", color: "#e8823f", image: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787656996/images-3.avif", position: "center" },
  { title: "Hair Thinning", description: "Hair appearing thinner than before.", color: "#0f1e3d", image: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787656997/images-4.avif", position: "center" },
  { title: "Reduced Density", description: "Concerns about visible scalp or reduced hair volume.", color: "#e8823f", image: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787656997/images-5.avif", position: "center" },
  { title: "Scalp Concerns", description: "Scalp-related concerns that may need evaluation.", color: "#0f1e3d", image: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787656998/images-6.webp", position: "top" },
]

export default function AssessmentCandidates() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)
  const [isAutoPaused, setIsAutoPaused] = useState(false)

  const goToCard = (index: number) => {
    const nextIndex = (index + cards.length) % cards.length
    const carousel = carouselRef.current
    if (!carousel) return

    carousel.scrollTo({ left: carousel.clientWidth * nextIndex, behavior: "smooth" })
    setActiveCard(nextIndex)
  }

  useEffect(() => {
    if (isAutoPaused) return

    const autoPlay = window.setInterval(() => {
      setActiveCard((currentCard) => {
        const nextCard = (currentCard + 1) % cards.length
        const carousel = carouselRef.current
        carousel?.scrollTo({ left: carousel.clientWidth * nextCard, behavior: "smooth" })
        return nextCard
      })
    }, 4000)

    return () => window.clearInterval(autoPlay)
  }, [isAutoPaused])

  const updateActiveCard = () => {
    const carousel = carouselRef.current
    if (!carousel || !carousel.clientWidth) return
    setActiveCard(Math.round(carousel.scrollLeft / carousel.clientWidth))
  }

  const orderedCards = cards.map((_, index) => cards[(activeCard + index) % cards.length])

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
          <h2 className="mt-4 text-[30px] font-extrabold leading-tight sm:text-[42px] lg:text-[52px]">Who May Consider an Assessment?</h2>
          <p className="mt-4 text-[15px] font-medium tracking-wide sm:text-[18px]">Is a Personalised Hair Assessment Right for You?</p>
        </header>

        {/* Mobile carousel */}
        <div
          ref={carouselRef}
          onScroll={updateActiveCard}
          onMouseEnter={() => setIsAutoPaused(true)}
          onMouseLeave={() => setIsAutoPaused(false)}
          onPointerDown={() => setIsAutoPaused(true)}
          onPointerUp={() => setIsAutoPaused(false)}
          className="mx-auto mt-8 flex max-w-[640px] snap-x snap-mandatory overflow-x-auto px-1 pb-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
        >
          {cards.map((card) => (
            <div key={card.title} className="w-full shrink-0 snap-center px-2"><Card card={card} /></div>
          ))}
        </div>

        <div
          key={activeCard}
          className="mx-auto mt-12 hidden max-w-[1180px] grid-cols-4 gap-6 animate-[as-seen-on-enter_500ms_ease-out] sm:grid"
        >
          {orderedCards.map((card) => <Card key={card.title} card={card} />)}
        </div>

        <div className="relative mt-5 flex items-center justify-end gap-3 max-sm:pr-0 pr-30" aria-label="Assessment carousel navigation">
          <button type="button" onClick={() => goToCard(activeCard - 1)} aria-label="Previous card" className="grid size-10 place-items-center rounded-full bg-[#0f1e3d] text-white shadow-md transition hover:scale-105 hover:bg-[#22395f] sm:size-12">
            <span aria-hidden="true" className="text-2xl leading-none">&larr;</span>
          </button>
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
            {cards.map((card, index) => (
              <button key={card.title} type="button" onClick={() => goToCard(index)} aria-label={`Go to card ${index + 1}`} className={`h-2.5 rounded-full transition-all ${activeCard === index ? "w-7 bg-[#e8823f]" : "w-2.5 bg-[#0f1e3d]/25"}`} />
            ))}
          </div>
          <button type="button" onClick={() => goToCard(activeCard + 1)} aria-label="Next card" className="grid size-10 place-items-center rounded-full bg-[#0f1e3d] text-white shadow-md transition hover:scale-105 hover:bg-[#22395f] sm:size-12">
            <span aria-hidden="true" className="text-2xl leading-none">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  )
}
