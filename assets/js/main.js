gsap.registerPlugin(ScrollTrigger);

// scroll progress bar animations --------------------------------------------------------------------------------
gsap.to('progress', {
  value: 100,
  ease: 'none',
  scrollTrigger: { scrub: 0.5 }
});

const contactSection = document.querySelector('.contact-section');
const socialsBar = document.getElementById('socials-bar');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // action when section enters the viewport
      customAlert("Send me a message!");
      socialsBar.classList.add("socials-bar-hidden");

      // stop observing after first trigger
      // observer.unobserve(entry.target);
    } else {
      // Action when section leaves the viewport
      socialsBar.classList.remove("socials-bar-hidden");
    }
  });
}, {
  threshold: 0.8 // Trigger when 50% of the section is visible
});

observer.observe(contactSection);


// social links bar animations -----------------------------------------------------------------------------------
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

    // Calculate contactSection size and margin
    const contactSectionSize = config.defaultSize + influence * (config.magnifiedSize - config.defaultSize);
    const contactSectionMargin = config.defaultMargin + influence * (config.maxMargin - config.defaultMargin);

    // Animate size
    if (config.enableMagnify) {
      gsap.to(icon, {
        width: contactSectionSize,
        height: contactSectionSize,
        duration: config.animationDuration,
        ease: config.animationEase
      });
    }

    // Animate margin
    if (config.enableMargin) {
      gsap.to(icon, {
        marginLeft: `${contactSectionMargin}px`,
        marginRight: `${contactSectionMargin}px`,
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

// section title animations -----------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // CONFIGURATION SECTION
  const config = {
    // fromSettings: { wght: 200, opsz: 9 },
    // toSettings: { wght: 1000, opsz: 40 },
    fromSettings: { wght: 1000, opsz: 40 },
    toSettings: { wght: 200, opsz: 9 },
    radius: 100,
    falloff: "linear", // "linear", "exponential", "gaussian"
    affectX: true,     // true = consider X axis
    affectY: true,     // true = consider Y axis
    trackMouseInside: "body", // selector for where the mouse should be tracked
    letterClass: ".animate-letters",     // selector for animating letters
  };

  // PREPARE TEXT ELEMENTS
  const textElements = document.querySelectorAll(config.letterClass);
  const animatedLetters = [];

  textElements.forEach(textEl => {
    const container = textEl.closest(".title-container") || textEl;
    const originalText = textEl.textContent;
    textEl.textContent = "";

    [...originalText].forEach(char => {
      const span = document.createElement("span");

      if (char === ' ') {
        span.innerHTML = '&nbsp;'; // non-breaking space
        span.classList.add("letter-space"); // 👈 Add class for styling
      } else {
        span.textContent = char;
      }

      span.style.display = "inline-block";
      textEl.appendChild(span);
      animatedLetters.push({ span, container });
    });

  });

  // MOUSE TRACKING WITHIN CUSTOM AREA
  let mouseTX = 0, mouseTY = 0;
  document.querySelectorAll(config.trackMouseInside).forEach(el => {
    el.addEventListener("mousemove", e => {
      mouseTX = e.clientX;
      mouseTY = e.clientY;
    }, { passive: true });
  });

  // FALLOFF FUNCTION
  function getFalloffValue(distance) {
    const norm = Math.min(Math.max(1 - distance / config.radius, 0), 1);
    switch (config.falloff) {
      case "exponential": return norm ** 2;
      case "gaussian": return Math.exp(-((distance / (config.radius / 2)) ** 2) / 2);
      case "linear":
      default: return norm;
    }
  }

  // UPDATE ANIMATION LOOP
  function updateLetters() {
    animatedLetters.forEach(({ span }) => {
      const spanRect = span.getBoundingClientRect();
      const letterX = spanRect.left + spanRect.width / 2;
      const letterY = spanRect.top + spanRect.height / 2;

      let dx = config.affectX ? letterX - mouseTX : 0;
      let dy = config.affectY ? letterY - mouseTY : 0;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > config.radius) {
        span.style.setProperty('--vfph-wght', config.fromSettings.wght);
        span.style.setProperty('--vfph-opsz', config.fromSettings.opsz);
      } else {
        const factor = getFalloffValue(distance);
        const wght = config.fromSettings.wght + (config.toSettings.wght - config.fromSettings.wght) * factor;
        const opsz = config.fromSettings.opsz + (config.toSettings.opsz - config.fromSettings.opsz) * factor;
        span.style.setProperty('--vfph-wght', wght);
        span.style.setProperty('--vfph-opsz', opsz);
      }
    });

    requestAnimationFrame(updateLetters);
  }

  updateLetters();
});