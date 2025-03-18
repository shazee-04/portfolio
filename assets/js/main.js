gsap.registerPlugin(ScrollTrigger, Draggable);

// scroll progress bar animations
gsap.to('progress', {
  value: 100,
  ease: 'none',
  scrollTrigger: { scrub: 0.5 }
});