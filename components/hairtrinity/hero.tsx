"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" stroke="none" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" stroke="none" />
      <path d="M15 9l5 6M20 9l-5 6" />
    </svg>
  );
}

function PauseIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function FullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}

function AsSeenOnLogo({ variant }: { variant: "timesnow" | "ndtv" | "indiatoday" | "news18" }) {
  if (variant === "timesnow") {
    return (
      <div className="text-center leading-[0.85] text-[#3a4250]">
        <span className="block text-[15px] font-extrabold tracking-tight">TIMES</span>
        <span className="block text-[15px] font-extrabold tracking-tight">NOW</span>
      </div>
    );
  }
  if (variant === "ndtv") {
    return (
      <span className="text-[19px] font-extrabold tracking-tight text-[#2c333f]">
        N<span className="text-[#e8352e]">D</span>TV
      </span>
    );
  }
  if (variant === "indiatoday") {
    return (
      <div className="text-center leading-[0.9] text-[#2c333f]">
        <span className="block text-[13px] font-bold tracking-wide">INDIA</span>
        <span className="block text-[15px] font-extrabold tracking-tight">TODAY</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 rounded-[3px] bg-[#2c333f] px-2 py-[3px]">
      <span className="text-[15px] font-extrabold tracking-tight text-white">NEWS</span>
      <span className="rounded-[2px] bg-[#e8352e] px-[5px] text-[13px] font-extrabold text-white">18</span>
    </div>
  );
}

export default function HairTreatmentHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    video.play().catch(() => {});

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
  };

  const handleSeek: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const time = (Number(e.target.value) / 100) * duration;
    video.currentTime = time;
    setCurrentTime(time);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section className="bg-white px-4 py-10 font-sans sm:px-8 lg:px-16 lg:py-16">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-10 lg:grid-cols-[0.72fr_1fr] lg:gap-14">
        {/* Left column */}
        <div className="max-w-[520px]">
          <span className="inline-block rounded-[3px] bg-[#fdeee3] px-3 py-[6px] text-[10.5px] font-bold tracking-[1px] text-[#e8823f]">
            BEFORE YOU CHOOSE YOUR NEXT HAIR TREATMENT
          </span>

          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.5px] text-[#0f1e3d] sm:text-[38px] lg:text-[40px]">
            Before You Take Any Hair Treatment{" "}
            <span className="text-[#e8823f]">Watch This First.</span>
          </h1>

          <p className="mt-5 text-[15px] leading-[1.7] text-[#6b7280]">
            PRP, GFC or other hair treatment may work differently for different people, understand{" "}
            <span className="font-semibold text-[#3a4250]">your hair &amp; scalp</span> before choosing a treatment.
          </p>

          <div className="mt-7 flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#e6e8ec]">
              <Image src="/dr-aneesha.jpg" alt="Dr. Aneesha" fill sizes="56px" className="object-cover" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#0f1e3d]">Dr. Aneesha</p>
              <p className="text-[13px] leading-[1.4] text-[#6b7280]">
                Aesthetic Physician <span className="text-[#c7cbd3]">•</span> B.D.S., F.D.S., F.M.C.
              </p>
              <p className="text-[12.5px] text-[#8a8f99]">8+ years of experience</p>
            </div>
          </div>

          <button
            type="button"
            className="mt-8 flex w-full max-w-[420px] items-center justify-between rounded-[6px] bg-[#0f1e3d] px-6 py-4 text-[13px] font-bold tracking-[0.5px] text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            <span>BOOK YOUR HAIR ASSESSMENT NOW</span>
            <ArrowRightIcon />
          </button>

          <p className="mt-3 text-[12.5px] text-[#9aa0ab]">
            Understand your concerns before deciding your next treatment approach.
          </p>
        </div>

        {/* Right column — video */}
        <div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-[#0f1e3d] shadow-[0_20px_50px_rgba(15,30,61,.15)] sm:aspect-[16/9]">
            <video
              ref={videoRef}
              src="/0819.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
              onClick={togglePlay}
            />

            {!isPlaying && (
              <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f1e3d] via-[#0f1e3d]/70 to-transparent" />

                {/* <div className="pointer-events-none absolute inset-0 flex items-center px-6 pb-10 sm:px-10">
                  <h2 className="max-w-[360px] text-[24px] font-extrabold leading-[1.25] text-white sm:text-[28px] lg:text-[30px]">
                    Why Doesn&rsquo;t the Same Hair Treatment Work{" "}
                    <span className="text-[#e8823f]">for Everyone?</span>
                  </h2>
                </div> */}
              </>
            )}

            <button
              type="button"
              aria-label={isPlaying ? "Pause video" : "Play video"}
              onClick={togglePlay}
              className={`group absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#e8b088]/90 shadow-lg transition-all hover:scale-105 sm:h-[70px] sm:w-[70px] ${
                isPlaying ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 text-white sm:h-7 sm:w-7" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7L8 5Z" />
              </svg>
            </button>

            {/* custom control bar */}
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/40 to-transparent px-4 pb-3 pt-8 text-white sm:px-6">
              <button type="button" aria-label={isPlaying ? "Pause" : "Play"} onClick={togglePlay} className="opacity-95 hover:opacity-100">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <div className="mx-1 flex-1">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress}
                  onChange={handleSeek}
                  aria-label="Seek"
                  className="h-[3px] w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-[#e8823f]"
                />
              </div>

              <span className="whitespace-nowrap text-[12px] font-medium text-white/85">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <button type="button" aria-label={isMuted ? "Unmute" : "Mute"} onClick={toggleMute} className="opacity-95 hover:opacity-100">
                {isMuted ? <MuteIcon /> : <VolumeIcon />}
              </button>
              <button type="button" aria-label="Fullscreen" onClick={toggleFullscreen} className="opacity-95 hover:opacity-100">
                <FullscreenIcon />
              </button>
            </div>
          </div>

          {/* As seen on bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[10px] border border-[#eceef1] bg-white px-5 py-4 shadow-[0_4px_16px_rgba(15,30,61,.04)] sm:gap-6">
            <span className="text-[13px] font-semibold text-[#8a8f99]">As Seen On</span>
            <div className="flex flex-1 flex-wrap items-center justify-between gap-5 sm:gap-8">
              <AsSeenOnLogo variant="timesnow" />
              <AsSeenOnLogo variant="ndtv" />
              <AsSeenOnLogo variant="indiatoday" />
              <AsSeenOnLogo variant="news18" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}