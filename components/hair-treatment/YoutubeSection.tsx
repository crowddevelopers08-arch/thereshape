"use client"

import { ChevronLeft, ChevronRight, Maximize2, Share2, Volume2, VolumeX } from "lucide-react"
import { useRef, useState } from "react"

/* placeholder thumbnails — swap `thumbnail` for the real YouTube thumbnail
   (https://img.youtube.com/vi/<VIDEO_ID>/maxresdefault.jpg) and `href` for
   the real https://www.youtube.com/watch?v=<VIDEO_ID> link once supplied. */
const VIDEOS = [
  { id: 1, title: "Hair Treatment Video 1", thumbnail: "https://img.youtube.com/vi/T8IbSjYbgYQ/maxresdefault.jpg", href: "https://youtu.be/T8IbSjYbgYQ" },
  { id: 2, title: "Hair Treatment Video 2", thumbnail: "https://img.youtube.com/vi/eiCZXOmuzSg/maxresdefault.jpg", href: "https://youtu.be/eiCZXOmuzSg" },
  { id: 3, title: "Hair Treatment Video 3", thumbnail: "https://img.youtube.com/vi/k1HVd-Jy8YI/maxresdefault.jpg", href: "https://youtu.be/k1HVd-Jy8YI" },
  { id: 4, title: "Hair Treatment Video 4", thumbnail: "https://img.youtube.com/vi/G7yXPQPkYm0/maxresdefault.jpg", href: "https://youtu.be/G7yXPQPkYm0" },
]

export default function YoutubeSection() {
  const [mutedVideos, setMutedVideos] = useState<Record<number, boolean>>({ 1: true, 2: true, 3: true, 4: true })
  const playerRefs = useRef<Record<number, HTMLIFrameElement | null>>({})
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselTrackRef = useRef<HTMLDivElement>(null)
  const carouselPositionRef = useRef(0)

  const toggleSound = (id: number) => {
    const isMuted = mutedVideos[id]
    playerRefs.current[id]?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: isMuted ? "unMute" : "mute", args: [] }),
      "*"
    )
    setMutedVideos((current) => ({ ...current, [id]: !isMuted }))
  }

  const shareVideo = async (title: string, url: string) => {
    if (navigator.share) {
      await navigator.share({ title, url })
      return
    }
    await navigator.clipboard?.writeText(url)
  }

  const openFullscreen = (id: number) => {
    cardRefs.current[id]?.requestFullscreen?.()
  }

  const moveCarouselBy = (direction: -1 | 1) => {
    const carousel = carouselRef.current
    const track = carouselTrackRef.current
    if (!carousel || !track) return

    const maxScroll = track.scrollWidth - carousel.clientWidth
    const step = carousel.clientWidth + 16
    carouselPositionRef.current = Math.max(0, Math.min(maxScroll, carouselPositionRef.current + step * direction))
    track.style.transform = `translate3d(${-carouselPositionRef.current}px, 0, 0)`
  }

  return (
    <section className="bg-white px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1800px]">
        <h2 className="m-0 text-center text-[1.6rem] font-bold leading-[1.35] tracking-[-0.01em] text-[#22395f] sm:text-[2.1rem]">
          What Doctor Say's
        </h2>

        <div className="mx-auto mt-3 flex items-center justify-center gap-2" aria-hidden="true">
          <span
            className="h-[6px] w-[6px] rounded-full bg-[#fccbb6]"
            style={{ animation: "yt-dot-pulse 1.6s ease-in-out infinite" }}
          />
          <span className="relative h-[3px] w-[56px] overflow-hidden rounded-full bg-[#fccbb6]/25">
            <span
              className="absolute inset-y-0 w-1/3 rounded-full bg-[#fccbb6]"
              style={{ animation: "yt-line-sweep 2.2s ease-in-out infinite" }}
            />
          </span>
          <span
            className="h-[6px] w-[6px] rounded-full bg-[#fccbb6]"
            style={{ animation: "yt-dot-pulse 1.6s ease-in-out infinite", animationDelay: "0.7s" }}
          />
        </div>
        <style>{`
          @keyframes yt-dot-pulse {
            0%, 100% { opacity: 0.35; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1); }
          }
          @keyframes yt-line-sweep {
            0% { left: -35%; }
            100% { left: 100%; }
          }
        `}</style>

        <div
          ref={carouselRef}
          className="relative mx-auto mt-6 max-w-[1800px] overflow-hidden sm:overflow-x-auto sm:[-ms-overflow-style:none] sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden"
        >
          <div ref={carouselTrackRef} className="flex gap-4 transition-transform duration-500 ease-out sm:gap-5 sm:transition-none">
            {VIDEOS.slice(0, 4).map((v) => {
            const videoId = v.href.split("/").pop()

            return (
              <div
                key={v.id}
                ref={(element) => { cardRefs.current[v.id] = element }}
                className="group relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#12274a] to-[#0A1B3D] shadow-[0_10px_28px_-14px_rgba(10,27,61,0.4)] sm:w-[480px]"
              >
                <iframe
                  ref={(element) => { playerRefs.current[v.id] = element }}
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&enablejsapi=1&playsinline=1&rel=0`}
                  title={v.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-3 text-white">
                  <div className="pointer-events-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void shareVideo(v.title, v.href)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-transparent transition hover:bg-white/15"
                      aria-label={`Share ${v.title}`}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openFullscreen(v.id)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-transparent transition hover:bg-white/15"
                      aria-label={`View ${v.title} fullscreen`}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSound(v.id)}
                    className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-transparent transition hover:bg-white/15"
                    aria-label={mutedVideos[v.id] ? `Turn on sound for ${v.title}` : `Mute ${v.title}`}
                  >
                    {mutedVideos[v.id] ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )
            })}
          </div>
          <button
            type="button"
            onClick={() => moveCarouselBy(-1)}
            className="absolute left-2 top-1/2 z-30 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-[#0A1B3D]/75 text-white shadow-lg backdrop-blur sm:hidden"
            aria-label="Previous videos"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => moveCarouselBy(1)}
            className="absolute right-2 top-1/2 z-30 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-[#0A1B3D]/75 text-white shadow-lg backdrop-blur sm:hidden"
            aria-label="Next videos"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
