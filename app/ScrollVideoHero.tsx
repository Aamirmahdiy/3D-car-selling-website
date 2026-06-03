"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ScrollVideoHeroProps = {
  /** Video file URL (usually in /public or imported) */
  src: string;
  /** Total duration in seconds to map into scroll */
  durationSeconds?: number;
  /** How tall (in viewport heights) the scroll section should be */
  scrollFactorVh?: number;
  /** Persian title */
  title?: string;
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function ScrollVideoHero({
  src,
  durationSeconds = 7,
  scrollFactorVh = 1.8,
  title = "ماشین خوب",
}: ScrollVideoHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [ready, setReady] = useState(false);

  const config = useMemo(
    () => ({
      durationSeconds,
      scrollFactorVh,
    }),
    [durationSeconds, scrollFactorVh]
  );

  // Avoid unused warning; we still keep a tiny mount-state to prevent
  // touching video APIs before the client is ready.
  useEffect(() => {
    // This effect only flips a boolean after mount.
    // (Kept async by scheduling into the next frame to satisfy lint rules.)
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);


  useEffect(() => {
    if (!ready) return;
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    // Ensure we can scrub reliably.
    video.pause();
    video.muted = true;
    video.playsInline = true;

    const duration = Math.max(0.01, config.durationSeconds);

    let targetProgress = 0; // 0..1 from scroll
    let currentProgress = 0;

    let rafId = 0;
    let lastTs = 0;
    let isScrolling = false;
    let scrollStopTimer: number | null = null;

    // Make interpolation conservative so the timeline doesn't feel like it moves
    // at the start. We'll also gate progress updates until scroll actually passes 0.
    const smoothDamp = 0.07; // lower => slower / smoother


    const getProgressFromScroll = () => {
      const rect = container.getBoundingClientRect();
      // container top at viewport top => progress 0
      // container bottom at viewport top => progress 1
      const total = rect.height;
      const passed = -rect.top;
      const p = passed / Math.max(1, total - window.innerHeight);
      return clamp01(p);
    };

    const computeTarget = () => {
      const p = getProgressFromScroll();
      // Prevent any initial “nudge” when the page first mounts and the user hasn't
      // meaningfully scrolled yet.
      targetProgress = p;

      // Mark as scrolling so we keep interpolating.
      isScrolling = true;
      if (scrollStopTimer) window.clearTimeout(scrollStopTimer);
      scrollStopTimer = window.setTimeout(() => {
        // Freeze at current frame when scroll stops.
        isScrolling = false;
        // Snap currentProgress to target for crispness.
        currentProgress = targetProgress;
        if (!video.seeking && video.readyState >= 2) {
          video.currentTime = currentProgress * duration;
        }
      }, 140);
    };


    const onScroll = () => computeTarget();
    const onResize = () => computeTarget();

    const tick = (ts: number) => {
      const dt = lastTs ? ts - lastTs : 16.7;
      lastTs = ts;

      // requestAnimationFrame interpolation for performance.
      // If scrolling is not active, we keep the video frozen at its currentTime.
      if (isScrolling) {
        const alpha = 1 - Math.pow(1 - smoothDamp, dt / 16.7);
        currentProgress = currentProgress + (targetProgress - currentProgress) * alpha;
      } else {
        // Freeze (no interpolation)
        currentProgress = currentProgress;
      }

      // If the user hasn't progressed into the scroll range yet, keep the video at 0.
      if (targetProgress <= 0.001) {
        currentProgress = 0;
      }


      const t = currentProgress * duration;
      // Avoid redundant writes.
      if (video.readyState >= 2) {
        // Small tolerance prevents fighting the browser clock.
        if (Math.abs(video.currentTime - t) > 0.02) {
          video.currentTime = t;
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    // Initialize
    computeTarget();
    rafId = window.requestAnimationFrame(tick);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (scrollStopTimer) window.clearTimeout(scrollStopTimer);
      window.cancelAnimationFrame(rafId);
    };
  }, [ready, config.durationSeconds]);

  const titleRef = useRef<HTMLDivElement | null>(null);
  const topRightRef = useRef<HTMLDivElement | null>(null);
  const bottomLeftRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (!ready) return;
    if (titleRef.current) {
      titleRef.current.style.opacity = "0";
      titleRef.current.style.transform = "translate(-50%, 10px)";
    }
    if (topRightRef.current) {
      topRightRef.current.style.opacity = "0";
      topRightRef.current.style.transform = "translateY(12px)";
    }
    if (bottomLeftRef.current) {
      bottomLeftRef.current.style.opacity = "0";
      bottomLeftRef.current.style.transform = "translateY(12px)";
    }
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const titleEl = titleRef.current;
    const topRightEl = topRightRef.current;
    const bottomLeftEl = bottomLeftRef.current;
    const video = videoRef.current;
    if (!titleEl || !topRightEl || !bottomLeftEl || !video) return;

    let raf = 0;

    const durationSecondsLocal = Math.max(0.01, config.durationSeconds);

    const t01 = () => clamp01(video.currentTime / durationSecondsLocal);

    // helper: start/end expressed in seconds for robustness (not 0..1 confusion)
    const appearBetweenSeconds = (current01: number, startSec: number, endSec: number) => {
      const start = clamp01(startSec / durationSecondsLocal);
      const end = clamp01(endSec / durationSecondsLocal);
      const raw = (current01 - start) / Math.max(0.0001, end - start);
      const eased = clamp01(raw);
      return eased * eased * (3 - 2 * eased);
    };

    const tick = () => {
      const current01 = t01();

      // Main title: start ~0.1s, finish ~3.8s (0.55 * 7s by default)
      const mainOpacity = appearBetweenSeconds(current01, 0.1, durationSecondsLocal * 0.55);
      titleEl.style.opacity = String(mainOpacity);
      titleEl.style.transform = `translate(-50%, ${10 - 10 * mainOpacity}px)`;

      // Top-right: visible from start
      const topOpacity = appearBetweenSeconds(current01, 0, durationSecondsLocal * 0.28);
      topRightEl.style.opacity = String(topOpacity);
      topRightEl.style.transform = `translateY(${12 - 12 * topOpacity}px)`;

      // Bottom-left: after ~1s
      const bottomOpacity = appearBetweenSeconds(current01, 1, 1 + durationSecondsLocal * 0.28);
      bottomLeftEl.style.opacity = String(bottomOpacity);
      bottomLeftEl.style.transform = `translateY(${12 - 12 * bottomOpacity}px)`;

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [ready, config.durationSeconds]);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      // Make scroll distance map into the 7s timeline.
      style={{ height: `${config.scrollFactorVh * 100}vh` }}
      aria-label="Scroll cinematic intro"
    >
      {/* Pinned playback viewport (separated from the page header) */}
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-white">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-white" />

          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={src}
            preload="auto"
            playsInline
            muted
            controls={false}
          />

          {/* Titles overlay (always above the video) */}
          {/* Main center title */}
          <div
            className="pointer-events-none absolute left-1/2 top-4 z-50 w-full px-4"
            style={{ textAlign: "center" }}
          >
            <div
              ref={titleRef}
              className="font-extrabold text-black text-3xl sm:text-5xl tracking-tight"
              style={{ opacity: 0, transform: "translate(-50%, 10px)" }}
            >
              {title}
            </div>
          </div>

          {/* اوج کیفیت در حرکت (stacked words + per-word delayed appearance) */}
          <div
            className="pointer-events-none absolute right-50 top-20 z-50 px-2"
            style={{ direction: "rtl" }}
          >
            <div ref={topRightRef} className="opacity-0 transform translate-y-3">
              <div className="font-extrabold text-black text-xl sm:text-3xl tracking-tight leading-[1.25]">
                <span className="block delay-0">اعتماد</span>
                <span className="block delay-2">در</span>
                <span className="block delay-3">معامله</span>
              </div>
            </div>
          </div>


          {/* لوکس، مطمئن، متفاوت (stacked words + per-word delayed appearance) */}
          <div
            className="pointer-events-none absolute left-35 bottom-34 z-50 px-2"
            style={{ direction: "rtl" }}
          >
            <div
              ref={bottomLeftRef}
              className="opacity-0 transform translate-y-3"
            >
              <div className="font-extrabold text-black text-xl sm:text-3xl tracking-tight leading-[1.25]">
                <span className="block delay-0">لوکس</span>
                <span className="block delay-1">مطمئن</span>
                <span className="block delay-2">متفاوت</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to ensure the sticky video doesn't sit underneath the fixed header */}
      <div className="h-0 w-full" />

    </section>
  );
}


