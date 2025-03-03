// scroll progress bar animations

gsap.registerPlugin(ScrollTrigger);
gsap.to('progress', {
  value: 100,
  ease: 'none',
  scrollTrigger: { scrub: 0.5 }
});
