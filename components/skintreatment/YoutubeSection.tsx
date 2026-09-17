"use client"

/* placeholder thumbnails — swap `thumbnail` for the real YouTube thumbnail
   (https://img.youtube.com/vi/<VIDEO_ID>/maxresdefault.jpg) and `href` for
   the real https://www.youtube.com/watch?v=<VIDEO_ID> link once supplied. */
const VIDEOS = [
  { id: 1, title: "Hair Transplant — Patient Story", thumbnail: "", href: "#" },
  { id: 2, title: "Life-Changing Hair Transplant Procedure", thumbnail: "", href: "#" },
]

function YoutubeLogo() {
  return (
    <svg viewBox="0 0 28 20" className="h-3.5 w-5 flex-none" aria-hidden="true">
      <path
        d="M27.4 3.1a3.5 3.5 0 0 0-2.46-2.48C22.7 0 14 0 14 0S5.3 0 3.06.62A3.5 3.5 0 0 0 .6 3.1 36.6 36.6 0 0 0 0 10a36.6 36.6 0 0 0 .6 6.9 3.5 3.5 0 0 0 2.46 2.48C5.3 20 14 20 14 20s8.7 0 10.94-.62a3.5 3.5 0 0 0 2.46-2.48A36.6 36.6 0 0 0 28 10a36.6 36.6 0 0 0-.6-6.9Z"
        fill="#FF0000"
      />
      <path d="M11 14.3 18.5 10 11 5.7v8.6Z" fill="#fff" />
    </svg>
  )
}

export default function YoutubeSection() {
  return (
    <section className="bg-white px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1180px]">
        <h2 className="m-0 text-center text-[1.6rem] font-bold leading-[1.35] tracking-[-0.01em] text-[#22395f] sm:text-[2.1rem]">
          Youtube
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

        <div className="mx-auto mt-6 grid max-w-[900px] grid-cols-1 gap-5 sm:grid-cols-2">
          {VIDEOS.map((v) => (
            <a
              key={v.id}
              href={v.href}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-[#12274a] to-[#0A1B3D] shadow-[0_10px_28px_-14px_rgba(10,27,61,0.4)]"
            >
              {v.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail
                <img src={v.thumbnail} alt={v.title} className="absolute inset-0 h-full w-full object-cover" />
              )}
              <span className="sr-only">{v.title}</span>

              {/* play button */}
              <span className="absolute left-1/2 top-1/2 flex h-12 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#FF0000] shadow-[0_6px_16px_rgba(0,0,0,0.4)] transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-16">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 sm:h-7 sm:w-7" fill="white" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>

              {/* watch on youtube badge */}
              <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-black/80 px-2.5 py-1.5 text-[11px] font-semibold text-white">
                <YoutubeLogo />
                Watch on YouTube
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
