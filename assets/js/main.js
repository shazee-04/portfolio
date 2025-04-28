gsap.registerPlugin(ScrollTrigger);

// scroll progress bar animations
gsap.to('progress', {
  value: 100,
  ease: 'none',
  scrollTrigger: { scrub: 0.5 }
});

const dock = document.querySelector('.socials-bar');
const icons = document.querySelectorAll('.socials-icon');

// --- Configuration ---
const config = {
  defaultSize: 32,        // base icon size (px)
  magnifiedSize: 35,     // max icon size (px)
  defaultMargin: 0.5,       // base margin (px)
  maxMargin: 6,          // max margin when magnified (px)
  influenceRange: 180,    // range of influence from cursor (px)
  enableMagnify: true,    // enable/disable magnifying animation
  enableMargin: true,     // enable/disable margin growing
  animationDuration: 0.2, // gsap animation duration (seconds)
  animationEase: "power3.out" // gsap ease type
};
// -----------------------

dock.addEventListener('mousemove', (e) => {
  const rect = dock.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;

  icons.forEach((icon) => {
    const iconRect = icon.getBoundingClientRect();
    const iconX = iconRect.left + iconRect.width / 2 - rect.left;
    const dist = Math.abs(mouseX - iconX);

    let influence = 0;
    if (dist < config.influenceRange) {
      influence = 1 - dist / config.influenceRange;
    }

    // Calculate target size and margin
    const targetSize = config.defaultSize + influence * (config.magnifiedSize - config.defaultSize);
    const targetMargin = config.defaultMargin + influence * (config.maxMargin - config.defaultMargin);

    // Animate size
    if (config.enableMagnify) {
      gsap.to(icon, {
        width: targetSize,
        height: targetSize,
        duration: config.animationDuration,
        ease: config.animationEase
      });
    }

    // Animate margin
    if (config.enableMargin) {
      gsap.to(icon, {
        marginLeft: `${targetMargin}px`,
        marginRight: `${targetMargin}px`,
        duration: config.animationDuration,
        ease: config.animationEase
      });
    }
  });
});

dock.addEventListener('mouseleave', () => {
  icons.forEach((icon) => {
    const animations = {};

    if (config.enableMagnify) {
      animations.width = config.defaultSize;
      animations.height = config.defaultSize;
    }
    if (config.enableMargin) {
      animations.marginLeft = `${config.defaultMargin}px`;
      animations.marginRight = `${config.defaultMargin}px`;
    }

    gsap.to(icon, {
      ...animations,
      duration: config.animationDuration,
      ease: config.animationEase
    });
  });
});
