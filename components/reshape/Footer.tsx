"use client"

import { LuPhone, LuClock, LuArrowRight, LuMail, LuMapPin } from "react-icons/lu"
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa"
import { track } from "./track"

const EXPLORE = [
  { label: "Results", href: "#results" },
  { label: "Specialist", href: "#doctor" },
  { label: "Conditions", href: "#conditions" },
  { label: "FAQ", href: "#faq" },
]

const TREATMENTS = [
  "Hair Regrowth",
  "Hair Loss Treatment",
  "Baldness Treatment",
  "Hair Thinning",
  "Scalp Rejuvenation",
]

const SOCIALS = [
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
  { Icon: FaWhatsapp, href: "https://wa.me/918608551555", label: "WhatsApp" },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#16263f] text-white/70">


      {/* main columns */}
      <div className="relative mx-auto grid w-full max-w-[1180px] gap-10 px-5 py-14 max-[470px]:py-6 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        {/* brand */}
        <div className="max-w-[34ch]">
          <img src="/reshape-trans.png" alt="thereshape" className="h-10 w-auto" />
          <p className="mt-4 text-[0.92rem] leading-relaxed text-white/60">
            Advanced hair restoration and aesthetic care — combining medical science, modern technology and
            personalized protocols for healthier, stronger hair.
          </p>
          <div className="mt-6 flex gap-2.5">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-[#fccbb6] hover:bg-[#fccbb6] hover:text-[#22395f]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* explore */}
        <div>
          <h4 className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#fccbb6]">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-[0.9rem]">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* treatments */}
        <div>
          <h4 className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#fccbb6]">Treatments</h4>
          <ul className="mt-4 space-y-2.5 text-[0.9rem]">
            {TREATMENTS.map((t) => (
              <li key={t}>
                <a href="#conditions" className="transition-colors hover:text-white">
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div>
          <h4 className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#fccbb6]">Contact</h4>
          <ul className="mt-4 space-y-3.5 text-[0.9rem]">
            <li>
              <a
                href="tel:+918608551555"
                onClick={() => track("call_click", { branch: "Reshape Clinic" })}
                className="flex items-center gap-3 font-semibold text-white transition-colors hover:text-[#fccbb6]"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/10 text-[#fccbb6]">
                  <LuPhone className="h-4 w-4" />
                </span>
                +91 86085 51555
              </a>
            </li>
            <li>
              <a
                href="mailto:reshapeclinic01@gmail.com"
                className="flex items-center gap-3 text-white/70 transition-colors hover:text-[#fccbb6]"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/10 text-[#fccbb6]">
                  <LuMail className="h-4 w-4" />
                </span>
                reshapeclinic01@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/60">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/10 text-[#fccbb6]">
                <LuMapPin className="h-4 w-4" />
              </span>
              No: 149, No: 1 Luz Church Road, Bhaskarapuram, Mylapore, Chennai - 600004
            </li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 py-6 text-[0.78rem] text-white/50 sm:px-8">
          <span>© 2026 thereshape. All rights reserved.</span>
          <a href="/privacy-policy" className="font-semibold text-white/80 transition-colors hover:text-white">
            Privacy policy
          </a>
        </div>
      </div>
    </footer>
  )
}
