import Image from "next/image"

// Google artwork: https://evergloaesthetic.com/wp-content/uploads/2026/07/google-2.jpg
// Award SVGs are reference-based recreations; replace with originals when supplied.
const achievements = [
  { src: "/images/dermet/achievements.jpg", alt: "4.9 Google Reviews, five stars", width: 170, height: 64 },
  { src: "/images/dermet/coscon-award.svg", alt: "COSCON Dubai 2025 — Best Clinic of the Year, Everglo Aesthetic Clinic", width: 130, height: 76 },
  { src: "/images/dermet/isam-award.svg", alt: "ISAM — Best Clinic, South India, 2025, Everglo Aesthetic Clinic", width: 184, height: 76 },
  { src: "/images/dermet/best-aesthetic-clinic.svg", alt: "Best Aesthetic Clinic — Everglo, 2025", width: 112, height: 74 },
]

export default function AchievementSection() {
  const trackItems = [...achievements, ...achievements]

  return (
    <section
      className="bg-white px-[50px] pt-[28px] pb-[27px] text-[#080808] [@media(max-width:600px)]:px-[24px] [@media(max-width:600px)]:pb-[28px]"
      aria-labelledby="achievement-heading"
    >
      <style>{`
        @keyframes achievement-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div className="mx-auto max-w-[1200px] text-center">
        <h2 id="achievement-heading" className="m-0 [font-family:Arial,Helvetica,sans-serif] text-[21px] leading-[26px] font-bold tracking-[0.25px]">Achievements</h2>
        <div className="mx-auto mt-[20px] max-w-[1400px] overflow-hidden border-b border-solid border-[#fafafa] pb-[7px] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <ul
            className="flex w-max list-none items-center gap-[42px] p-0 [animation:achievement-marquee_18s_linear_infinite] hover:[animation-play-state:paused] [@media(max-width:600px)]:gap-[24px]"
          >
            {trackItems.map((achievement, index) => (
              <li key={`${achievement.src}-${index}`} className="flex h-[160px] w-[240px] shrink-0 items-center justify-center [@media(max-width:600px)]:w-[170px]">
                <Image {...achievement} className="block h-auto max-h-[160px] w-auto max-w-full object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
