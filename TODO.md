# TODO - Scroll-driven cinematic hero (remove Spline)

- [ ] Create plan confirmation (done in chat step before edits)
- [ ] Remove SplineScene usage from `app/page.tsx`
- [ ] Delete/disable `app/SplineScene.tsx` import and all Spline-related code paths
- [ ] Implement new `ScrollVideoHero` component using:
  - HTML5 video (no autoplay)
  - sticky/pinned hero during scroll
  - scroll up/down to scrub forward/backward
  - requestAnimationFrame + smooth interpolation
  - pure white background behind video
  - Persian title "ماشین خوب" appears at top center, RTL, bold/large, synced to scroll
- [ ] Add responsive styling and ensure page continues normally after 7s mapped animation
- [ ] Ensure proper cleanup of event listeners and video state
- [ ] Verify build/lint (`npm run lint` and `npm run build`)

