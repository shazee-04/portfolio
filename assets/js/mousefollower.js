gsap.set(".mouse-follower, .mouse-follower-2, .mouse-follower-3, .mouse-follower-4", { xPercent: -50, yPercent: -50 });

let xTo = gsap.quickTo(".mouse-follower, .mouse-follower-2, .mouse-follower-4", "x", { duration: 0.6, ease: "power3" }),
  yTo = gsap.quickTo(".mouse-follower, .mouse-follower-2, .mouse-follower-4", "y", { duration: 0.6, ease: "power3" });

let xTo2 = gsap.quickTo(".mouse-follower-3", "x", { duration: 0.2, ease: "power3" }),
  yTo2 = gsap.quickTo(".mouse-follower-3", "y", { duration: 0.2, ease: "power3" });

window.addEventListener("mousemove", e => {
  xTo(e.clientX);
  yTo(e.clientY);

  xTo2(e.clientX);
  yTo2(e.clientY);
});

// mouse click ------------------------------------------------------------------------------------------------------
let defaultScale = 1;

window.addEventListener("mousedown", () => {
  const currentScale = gsap.getProperty(".mouse-follower-3", "scale");
  gsap.to(".mouse-follower-3", { duration: 0.6, scale: currentScale - 0.3 });
  gsap.to(".mouse-follower-3", { duration: 0.6, delay: 0.2, scale: defaultScale });
});


// mouse hover - scrolling text 1 ----------------------------------------------------------------------------------
document.getElementById("scrolling-text-1").addEventListener("mouseenter", () => {
  gsap.to(".mouse-follower", { duration: 0.6, alpha: 1, scale: 1.2 });
  gsap.to(".mouse-follower-3", { duration: 0.6, zIndex: -1, backgroundColor: "#111", scale: 0.1 });
  // document.getElementById("demo-wrapper").style.cursor = "none";
});

document.getElementById("scrolling-text-1").addEventListener("mouseleave", () => {
  gsap.to(".mouse-follower", { duration: 0.6, alpha: 0, scale: 0.5 });
  gsap.to(".mouse-follower-3", { duration: 0.6, zIndex: 2, backgroundColor: "#ffffff4e", scale: 1 });
  // document.getElementById("demo-wrapper").style.cursor = "default";
});


// document.getElementById("scrolling-text-2").addEventListener("mouseenter", () => {
//   gsap.to(".mouse-follower-4", { duration: 0.6, alpha: 1, scale: 1.2 });
//   gsap.to(".mouse-follower-3", { duration: 0.6, zIndex: -1, backgroundColor: "#111", scale: 0.1 });
//   // document.getElementById("demo-wrapper").style.cursor = "none";
// });

// document.getElementById("scrolling-text-2").addEventListener("mouseleave", () => {
//   gsap.to(".mouse-follower-4", { duration: 0.6, alpha: 0, scale: 0.5 });
//   gsap.to(".mouse-follower-3", { duration: 0.6, zIndex: 2, backgroundColor: "#ffffff4e", scale: 1 });
//   // document.getElementById("demo-wrapper").style.cursor = "default";
// });


// mouse hover - logo --------------------------------------------------------------------------------------------------
document.getElementById("navbar-brand").addEventListener("mouseenter", () => {
  gsap.to(".mouse-follower-4", { duration: 0.6, alpha: 1, zIndex: -1, scale: 1 });
  gsap.to(".mouse-follower-3", { duration: 0.6, zIndex: -1, backgroundColor: "#111", scale: 0.1 });
  // document.getElementById("demo-wrapper").style.cursor = "none";
});

document.getElementById("navbar-brand").addEventListener("mouseleave", () => {
  gsap.to(".mouse-follower-4", { duration: 0.6, alpha: 0, zIndex: 1, scale: 0.5 });
  gsap.to(".mouse-follower-3", { duration: 0.6, zIndex: 2, backgroundColor: "#ffffff4e", scale: 1 });
  // document.getElementById("demo-wrapper").style.cursor = "default";
});


// mouse hover - scrolling gallery ---------------------------------------------------------------------------------------
document.getElementById("scrolling-gallery-1").addEventListener("mouseenter", () => {
  gsap.to(".mouse-follower-2", { duration: 0.6, alpha: 1, scale: 0.7 });
  gsap.to(".mouse-follower-3", { duration: 0.6, zIndex: -1, backgroundColor: "#111", scale: 0.1 });
  // document.getElementById("demo-wrapper").style.cursor = "none";
});

document.getElementById("scrolling-gallery-1").addEventListener("mouseleave", () => {
  gsap.to(".mouse-follower-2", { duration: 0.6, alpha: 0, scale: 0.5 });
  gsap.to(".mouse-follower-3", { duration: 0.6, zIndex: 2, backgroundColor: "#ffffff4e", scale: 1 });
  // document.getElementById("demo-wrapper").style.cursor = "default";
});


// mouse hover - scrolling gallery --------------------------------------------------------------------------------------
document.getElementById("scrolling-gallery-2").addEventListener("mouseenter", () => {
  gsap.to(".mouse-follower-2", { duration: 0.6, alpha: 1, scale: 0.7 });
  gsap.to(".mouse-follower-3", { duration: 0.6, zIndex: -1, backgroundColor: "#111", scale: 0.1 });
  // document.getElementById("demo-wrapper").style.cursor = "none";
});

document.getElementById("scrolling-gallery-2").addEventListener("mouseleave", () => {
  gsap.to(".mouse-follower-2", { duration: 0.6, alpha: 0, scale: 0.5 });
  gsap.to(".mouse-follower-3", { duration: 0.6, zIndex: 2, backgroundColor: "#ffffff4e", scale: 1 });
  // document.getElementById("demo-wrapper").style.cursor = "default";
});


// mouse hover - navigation ---------------------------------------------------------------------------------------------
document.querySelectorAll(".nav-item").forEach((navItem) => {
  navItem.addEventListener("mouseenter", () => {
    defaultScale = 1.6;
    gsap.to(".mouse-follower-3", { duration: 0.6, scale: 1.6 });
  });

  navItem.addEventListener("mouseleave", () => {
    defaultScale = 1;
    gsap.to(".mouse-follower-3", { duration: 0.6, scale: 1 });
  });
});


// mouse hover - navigation ---------------------------------------------------------------------------------------------
document.querySelectorAll(".navbar-brand, .dp-div, .hero-text-2").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    if (element.classList.contains("navbar-brand")) {
      // gsap.to(".mouse-follower-3", { duration: 0.6, scale: 3 });
    } else if (element.classList.contains("dp-div")) {
      defaultScale = 2.5;
      gsap.to(".mouse-follower-3", { duration: 0.6, scale: 2.5 });
    }
  });

  element.addEventListener("mouseleave", () => {
    defaultScale = 1;
    gsap.to(".mouse-follower-3", { duration: 0.6, scale: 1 });
  });
});
