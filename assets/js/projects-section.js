const rotateAmplitude = 2; // How much the card tilts
const scaleOnHover = 1.01;   // How much the card scales on hover

// Loop through all card containers
document.querySelectorAll('.gx-tilted-card-container').forEach(container => {
    const inner = container.querySelector('.gx-tilted-card-inner');
    const caption = container.querySelector('.gx-tilted-card-caption');
    let lastY = 0;

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotateX = -(offsetY / (rect.height / 2)) * rotateAmplitude;
        const rotateY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        gsap.to(inner, {
            duration: 0.5,
            rotateX: rotateX,
            rotateY: rotateY,
            scale: scaleOnHover,
            ease: "power3.out",
            transformPerspective: 800,
            transformOrigin: "center",
        });

        const velocityY = offsetY - lastY;
        lastY = offsetY;

        // gsap.to(caption, {
        //     x: e.clientX - rect.left,
        //     y: e.clientY - rect.top,
        //     opacity: 1,
        //     rotate: -velocityY * 0.6,
        //     duration: 0.2,
        //     ease: "power1.out"
        // });
    });

    container.addEventListener('mouseleave', () => {
        gsap.to(inner, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out"
        });

        gsap.to(caption, {
            opacity: 0,
            rotate: 0,
            duration: 0.3,
            ease: "power1.out"
        });
    });

    container.addEventListener('mouseenter', () => {
        // Reset lastY when mouse enters so caption animation doesn't glitch
        lastY = 0;
    });
});
