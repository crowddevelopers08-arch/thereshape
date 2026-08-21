"use client"

import { useEffect, useState } from "react"
import { track } from "./track"

const NAV = [
  { label: "Home", href: "#top", id: "top" },
  { label: "Why Results Differ", href: "#why-results", id: "why-results" },
  { label: "PRP & GFC", href: "#limitations", id: "limitations" },
  { label: "Journey", href: "#journey", id: "journey" },
  { label: "Assessment", href: "#assessment", id: "assessment" },
]

const ANNOUNCEMENTS = ["Doctor-Led Hair Care", "3-in-1 Hair Therapy", "Personalised Treatment Plan"]
// repeated enough times that one set alone is always wider than the bar,
// so the seamless -50% loop never runs out of content on wide screens
const ANNOUNCEMENTS_SET = Array.from({ length: 4 }, () => ANNOUNCEMENTS).flat()

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // scroll-spy — highlight the nav item whose section is in view
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 px-3 pt-0 sm:px-5 sm:pt-0">
      {/* announcement strip — full-bleed normally, becomes the nav pill's exact contained/rounded shape once scrolled */}
      <div
        className={`relative mb-2 overflow-hidden transition-all duration-300 ${
          scrolled
            ? "mx-auto w-full max-w-[1180px] rounded-full border border-[#e7ecf3] bg-white/90 shadow-[0_12px_34px_-16px_rgba(34,57,95,0.4)] backdrop-blur-[12px]"
            : "-mx-3 w-[calc(100%+1.5rem)] border border-transparent bg-[#22395f] backdrop-blur-[8px] sm:-mx-5 sm:w-[calc(100%+2.5rem)]"
        }`}
      >
        <div className="overflow-hidden py-1.5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="marquee gap-8" style={{ animationDuration: "90s" }}>
            {[...ANNOUNCEMENTS_SET, ...ANNOUNCEMENTS_SET].map((a, i) => (
              <span
                key={i}
                aria-hidden={i >= ANNOUNCEMENTS_SET.length}
                className={`flex flex-none items-center gap-8 whitespace-nowrap text-[0.72rem] font-semibold uppercase tracking-wide transition-colors duration-300 ${
                  scrolled ? "text-[#22395f]" : "text-white/90"
                }`}
              >
                {a}
                <span aria-hidden className={scrolled ? "text-[#22395f]/40" : "text-white/40"}>
                  •
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between gap-4 rounded-full pl-4 pr-2 transition-all duration-300 sm:h-16 sm:pl-5 sm:pr-2.5 ${
          scrolled
            ? "border border-[#e7ecf3] bg-white/90 shadow-[0_12px_34px_-16px_rgba(34,57,95,0.4)] backdrop-blur-[12px]"
            : "border border-transparent bg-white/70 backdrop-blur-[8px]"
        }`}
      >
        {/* left — logo */}
        <a href="#top" className="flex flex-none items-center">
          {/* the source asset is a JPEG, which cannot hold alpha — `e_make_transparent`
              knocks its white backing out and `f_png` delivers it with a real alpha channel */}
          <img
            src="https://res.cloudinary.com/n0ccg2u6/image/upload/e_make_transparent:25/w_320/f_png/v1785391578/26696b2b-7228-4b02-afae-af43ef094d7d_fs8cq8.png"
            alt="thereshape"
            className="h-10 w-auto sm:h-14"
          />
        </a>

        {/* center — pill nav group */}
        <nav className="hidden items-center gap-1 rounded-full bg-[#f4f5f7] p-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-all duration-200 ${
                active === n.id
                  ? "bg-white text-[#22395f] shadow-[0_2px_8px_-2px_rgba(34,57,95,0.25)]"
                  : "text-[#5f6f88] hover:text-[#22395f]"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* right — text link + button */}
        <div className="flex flex-none items-center gap-2 sm:gap-3">
          <a
            href="tel:+918608551555"
            onClick={() => track("call_click", { branch: "Reshape Clinic" })}
            className="hidden text-[0.85rem] font-semibold text-[#22395f] sm:inline-block"
          >
            +91 86085 51555
          </a>
          <a
            href="#book"
            className="btn-wave inline-flex items-center justify-center rounded-full bg-[#22395f] px-4 py-2.5 text-[0.82rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#16263f] sm:px-6 sm:text-[0.88rem]"
          >
            <span className="relative z-10 sm:hidden">Book</span>
            <span className="relative z-10 hidden sm:inline">Book Consultation</span>
          </a>
        </div>
      </div>
    </header>
  )
}
