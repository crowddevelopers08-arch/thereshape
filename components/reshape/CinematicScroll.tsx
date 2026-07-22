"use client"

import { useEffect } from "react"

/**
 * Global cinematic scroll director.
 *
 * Mounted once on the page. It walks every top-level section under `.reshape`
 * and tags that section's meaningful content blocks with a `cine*` reveal class
 * plus a staggered transition-delay, then reveals each block (adds `.in`) as it
 * scrolls into view. Sections that hand-animate their own content (anything that
 * already contains a `.rise` element, e.g. the Hero) are left untouched so the
 * two systems never fight. Purely additive — no markup changes in components.
 */
export default function CinematicScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const scope = document.querySelector(".reshape")
    if (!scope) return

    const SKIP = new Set(["aurora", "grid-tex", "marquee"])
    const isDecor = (el: Element) =>
      el.hasAttribute("aria-hidden") || [...el.classList].some((c) => SKIP.has(c))

    const alreadyAnimated = (el: Element) =>
      el.classList.contains("rise") ||
      el.classList.contains("reveal") ||
      el.classList.contains("cine") ||
      !!el.querySelector(".rise")

    // top-level blocks: each rendered component root + the footer
    const roots = Array.from(scope.querySelectorAll<HTMLElement>("main > *, footer"))

    const targets: HTMLElement[] = []

    roots.forEach((root, rootIndex) => {
      if (isDecor(root) || alreadyAnimated(root)) return

      // the primary content wrapper (skip decorative aurora/grid wrappers)
      const container =
        Array.from(root.children).find(
          (c) => !isDecor(c) && (c as HTMLElement).children.length > 0,
        ) || root

      const blocks = Array.from(container.children).filter(
        (c) => !isDecor(c) && !alreadyAnimated(c),
      ) as HTMLElement[]

      const list = blocks.length ? blocks : [root]

      list.forEach((el, i) => {
        // alternate a gentle directional flavour for cinematic variety
        const variant =
          list.length > 2 && i % 3 === 1 ? "cine-left" : list.length > 2 && i % 3 === 2 ? "cine-right" : "cine"
        el.classList.add(variant)
        el.style.transitionDelay = `${(i % 6) * 90}ms`
        // ensure the very first fold still animates promptly
        if (rootIndex === 0) el.style.transitionDelay = `${i * 70}ms`
        targets.push(el)
      })
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in")
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )

    targets.forEach((t) => io.observe(t))

    // safety: anything already in view on load reveals on next frame
    const raf = requestAnimationFrame(() => {
      targets.forEach((t) => {
        const r = t.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) {
          t.classList.add("in")
          io.unobserve(t)
        }
      })
    })

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  return null
}
