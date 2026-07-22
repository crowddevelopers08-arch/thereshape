"use client"

import { useEffect, useState } from "react"
import { track } from "./track"

const NAV = [
  { label: "Results", href: "#results", id: "results" },
  { label: "Specialist", href: "#doctor", id: "doctor" },
  { label: "Conditions", href: "#conditions", id: "conditions" },
  { label: "Why Us", href: "#why", id: "why" },
  { label: "Journey", href: "#process", id: "process" },
  { label: "FAQ", href: "#faq", id: "faq" },
]

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
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between gap-4 rounded-full pl-4 pr-2 transition-all duration-300 sm:h-16 sm:pl-5 sm:pr-2.5 ${
          scrolled
            ? "border border-[#e7ecf3] bg-white/90 shadow-[0_12px_34px_-16px_rgba(34,57,95,0.4)] backdrop-blur-[12px]"
            : "border border-transparent bg-white/70 backdrop-blur-[8px]"
        }`}
      >
        {/* left — logo */}
        <a href="#top" className="flex flex-none items-center">
          <img src="/logo.png" alt="thereshape" className="h-8 w-auto sm:h-9" />
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
            className="inline-flex items-center justify-center rounded-full bg-[#22395f] px-4 py-2.5 text-[0.82rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#16263f] sm:px-6 sm:text-[0.88rem]"
          >
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book Consultation</span>
          </a>
        </div>
      </div>
    </header>
  )
}
