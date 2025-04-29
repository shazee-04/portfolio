gsap.registerPlugin(ScrollTrigger);

const heroImages = gsap.utils.toArray('.hero-section img');
const loader = document.querySelector('.hero-section .loader-progress');
const updateProgress = (instance) =>
  loader.textContent = `${Math.round(instance.progressedCount * 100 / heroImages.length)}%`;

const main = () => {
  document.body.style.overflow = 'auto';
  // document.scrollingElement.scrollTo(0, 0);
  // setTimeout(() => {
  //   window.scrollTo(0, 0);
  // }, 500);

  gsap.to(document.querySelector('.hero-section .loader'), { autoAlpha: 0, duration: 0.5 });

  gsap.utils.toArray('.hero-section section').forEach((section, index) => {
    const w = section.querySelector('.hero-section .wrapper');
    const [x, xEnd] = index % 2 ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
    gsap.fromTo(w, { x }, {
      x: xEnd,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        markers: false
      }
    });
  });
};

imagesLoaded(heroImages).on('progress', updateProgress).on('always', main);