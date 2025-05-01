const techStack = [
    { name: "HTML5", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },

    { name: "Bootstrap CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
    { name: "Tailwind CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "GSAP", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg" },
    { name: "Framer Motion", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg" },

    { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
    { name: "Photshop", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" },
    { name: "Illustrator", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg" },
];

function createTechCard({ name, img }) {
    const card = document.createElement("div");
    card.className = "tech-marquee-card";
    card.innerHTML = `
      <img src="${img}" alt="${name}" class="tech-marquee-icon" />
      <span class="tech-marquee-label">${name}</span>
    `;
    return card;
}

function startTechMarquee() {
    const track = document.getElementById("dark-marquee-track");
    const cards = techStack.map(createTechCard);

    cards.forEach(card => track.appendChild(card));
    cards.forEach(card => track.appendChild(card.cloneNode(true))); // duplicate for seamless loop
    cards.forEach(card => track.appendChild(card.cloneNode(true))); // duplicate for seamless loop
    cards.forEach(card => track.appendChild(card.cloneNode(true))); // duplicate for seamless loop

    const totalWidth = track.scrollWidth / 2 + 10;

    gsap.to(track, {
        x: -totalWidth,
        duration: 25,
        ease: "linear",
        repeat: -1,
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
        }
    });
}

window.addEventListener("DOMContentLoaded", startTechMarquee);