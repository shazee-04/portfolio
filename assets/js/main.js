gsap.registerPlugin(ScrollTrigger, Draggable);

// scroll progress bar animations
gsap.to('progress', {
  value: 100,
  ease: 'none',
  scrollTrigger: { scrub: 0.5 }
});

//test
window.addEventListener('scroll', () => {
  document.getElementById('test').innerHTML = Math.floor(window.scrollY);
});