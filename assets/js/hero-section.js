gsap.registerPlugin(ScrollTrigger);

// hero section animations

const heroImages = gsap.utils.toArray('.hero-section img');
const loader = document.querySelector('.loader--text');
const updateProgress = (instance) =>
  loader.textContent = `${Math.round(instance.progressedCount * 100 / heroImages.length)}%`;

const showDemo = () => {
  document.body.style.overflow = 'auto';
  document.scrollingElement.scrollTo(0, 0);
  gsap.to(document.querySelector('.loader'), { autoAlpha: 0 });

  gsap.utils.toArray('.hero-section section').forEach((section, index) => {
    const w = section.querySelector('.wrapper');
    const [x, xEnd] = index % 2 ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
    gsap.fromTo(w, { x }, {
      x: xEnd,
      scrollTrigger: {
        trigger: section,
        scrub: 0.5
      }
    });
  });
};

imagesLoaded(heroImages).on('progress', updateProgress).on('always', showDemo);