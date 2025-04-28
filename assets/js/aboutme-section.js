function initFlowingMenu(items, containerId) {
  const container = document.getElementById(containerId);
  const animationDefaults = { duration: 0.6, ease: 'expo' };

  function distMetric(x, y, x2, y2) {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  }

  function findClosestEdge(mouseX, mouseY, width, height) {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  }

  function createMenuItem(item) {
    const wrapper = document.createElement('div');
    wrapper.className = 'flowing-menu__item';

    const link = document.createElement('a');
    link.className = 'flowing-menu__item-link';
    link.href = item.link;
    link.textContent = item.text;

    const marquee = document.createElement('div');
    marquee.className = 'flowing-menu__marquee';

    const marqueeInnerWrap = document.createElement('div');
    marqueeInnerWrap.className = 'flowing-menu__marquee-inner-wrap';

    const marqueeInner = document.createElement('div');
    marqueeInner.className = 'flowing-menu__marquee-inner';
    marqueeInner.setAttribute('aria-hidden', 'true');

    // Create 2 spans for seamless scrolling
    for (let i = 0; i < 2; i++) {
      const span = document.createElement('span');
      span.textContent = item.text_hovered;
      marqueeInner.appendChild(span);
    }

    marqueeInnerWrap.appendChild(marqueeInner);
    marquee.appendChild(marqueeInnerWrap);
    wrapper.appendChild(link);
    wrapper.appendChild(marquee);

    let marqueeTween; // To control the scrolling animation

    link.addEventListener('mouseenter', (ev) => {
      const rect = wrapper.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      const edge = findClosestEdge(x, y, rect.width, rect.height);

      // Vertical enter animation
      gsap.timeline({ defaults: animationDefaults })
        .set(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .set(marqueeInnerWrap, { y: edge === 'top' ? '101%' : '-101%' }, 0)
        .to([marquee, marqueeInnerWrap], { y: '0%' }, 0);

      // Horizontal scrolling
      marqueeTween = gsap.to(marqueeInner, {
        xPercent: -50,
        ease: "linear",
        repeat: -1,
        duration: 15
      });
    });

    link.addEventListener('mouseleave', (ev) => {
      const rect = wrapper.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      const edge = findClosestEdge(x, y, rect.width, rect.height);

      // Vertical exit animation
      gsap.timeline({ defaults: animationDefaults })
        .to(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .to(marqueeInnerWrap, { y: edge === 'top' ? '101%' : '-101%' }, 0);

      // Smoothly stop scrolling
      if (marqueeTween) {
        marqueeTween.kill();
        gsap.to(marqueeInner, { xPercent: 0, duration: 1, ease: 'power2.out' });
      }
    });

    return wrapper;
  }

  items.forEach(item => {
    container.appendChild(createMenuItem(item));
  });
}

// Example usage:
const demoItems = [
  { link: '#', text: '→', text_hovered: "Hi, I'm Shazee Sandaruwan. Engineer by passion, designer by heart, creator by soul ●" },
  { link: '#', text: '→', text_hovered: "Turning concepts into experiences, one project at a time ●" },
  { link: '#', text: '→', text_hovered: "Always learning, always creating, always dreaming bigger ●" },
];
initFlowingMenu(demoItems, 'flowing-menu');
