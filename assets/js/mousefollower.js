gsap.set(".mouse-follower-sp", { marginLeft: 11, marginTop: 22, textContent: "loading" });

// gsap.set(".mouse-follower-1, .mouse-follower-2, .mouse-follower-3, .mouse-follower-4", { xPercent: -50, yPercent: -50 });

let xTo = gsap.quickTo(".mouse-follower-sp", "x", { duration: 0.1, ease: "power3" }),
  yTo = gsap.quickTo(".mouse-follower-sp", "y", { duration: 0.1, ease: "power3" });

// xTo = gsap.quickTo(".mouse-follower-2, .mouse-follower-3, .mouse-follower-4", "x", { duration: 0.6, ease: "power3" }),
//   yTo = gsap.quickTo(".mouse-follower-2, .mouse-follower-3, .mouse-follower-4", "y", { duration: 0.6, ease: "power3" });

// xTo = gsap.quickTo(".mouse-follower-1", "x", { duration: 0.2, ease: "power3" }),
//   yTo = gsap.quickTo(".mouse-follower-1", "y", { duration: 0.2, ease: "power3" });

let parallax_xTo = gsap.quickTo(".parallax-1 div, .parallax-2 div", "x", { duration: 0.6, ease: "power3" }),
  parallax_yTo = gsap.quickTo(".parallax-1 div, .parallax-2 div", "y", { duration: 0.6, ease: "power3" });

window.addEventListener("mousemove", (e) => {
  let xChange = window.innerWidth / 2 - e.clientX;
  let yChange = window.innerHeight / 2 - e.clientY;
  let xFactor = -40;
  let yFactor = -20;

  parallax_xTo(xChange / xFactor);
  parallax_yTo(yChange / yFactor);

  xTo(e.clientX);
  yTo(e.clientY);
});

// special mouse follower settings -------------------------------------------------------------------------------------
let h_loading = "loading";
let h_default = "explore";
let h_name = "shazee sandaruwan";
let h_about = "get to know me";
let h_projects = "this is one of them";
let h_profile = "click me";
let h_title_1 = "i'm a developer";
let h_title_2 = "and also a designer";
let h_gallery = "explore";
let h_title_3 = "obviously";
let h_title_4 = "a good one";
let h_delay = 0.1;

// mouse hover - loader -------------------------------------------------------------------------------------
// document.getElementById("loader-div").addEventListener("mouseenter", () => {
//   gsap.to(".mouse-follower-sp", { textContent: h_loading });
// });

// document.getElementById("loader-div").addEventListener("mouseleave", () => {
//   gsap.to(".mouse-follower-sp", { textContent: h_default });
// });

// mouse hover - nvabar brand name -------------------------------------------------------------------------------------
document.getElementById("navbar-brand").addEventListener("mouseenter", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_name });
});

document.getElementById("navbar-brand").addEventListener("mouseleave", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_default });
});

// mouse hover - navbar btn 1 ------------------------------------------------------------------------------------------
document.getElementById("navbar-btn-1").addEventListener("mouseenter", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_about });
});

document.getElementById("navbar-btn-1").addEventListener("mouseleave", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_default });
});

// mouse hover - navbar btn 2 ------------------------------------------------------------------------------------------
document.getElementById("navbar-btn-2").addEventListener("mouseenter", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_projects });
});

document.getElementById("navbar-btn-2").addEventListener("mouseleave", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_default });
});

// mouse hover - navbar dp div ------------------------------------------------------------------------------------------
document.getElementById("dp-div").addEventListener("mouseenter", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_profile });
});

document.getElementById("dp-div").addEventListener("mouseleave", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_default });
});

// mouse hover - navbar dp div ------------------------------------------------------------------------------------------
document.getElementById("scrolling-text-1").addEventListener("mouseenter", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_title_1 });
});

document.getElementById("scrolling-text-1").addEventListener("mouseleave", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_default });
});

// mouse hover - navbar dp div ------------------------------------------------------------------------------------------
document.getElementById("scrolling-text-2").addEventListener("mouseenter", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_title_2 });
});

document.getElementById("scrolling-text-2").addEventListener("mouseleave", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_default });
});

// mouse hover - navbar dp div ------------------------------------------------------------------------------------------
document.getElementById("scrolling-text-3").addEventListener("mouseenter", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_title_3 });
});

document.getElementById("scrolling-text-3").addEventListener("mouseleave", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_default });
});

// mouse hover - navbar dp div ------------------------------------------------------------------------------------------
document.getElementById("scrolling-text-4").addEventListener("mouseenter", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_title_4 });
});

document.getElementById("scrolling-text-4").addEventListener("mouseleave", () => {
  gsap.to(".mouse-follower-sp", { textContent: h_default });
});



// mouse hover - scrolling text container 1 ----------------------------------------------------------------------------
document.getElementById("scrolling-text-container-1").addEventListener("mouseenter", () => {
  gsap.to(".parallax-1 div", { scale: 1.2, filter: "saturate(3)", duration: 1, ease: "power3" });
});

document.getElementById("scrolling-text-container-1").addEventListener("mouseleave", () => {
  gsap.to(".parallax-1 div", { scale: 1, filter: "saturate(2)", duration: 1, ease: "power3" });
});

// mouse hover - scrolling text container 2 ----------------------------------------------------------------------------
document.getElementById("scrolling-text-container-2").addEventListener("mouseenter", () => {
  gsap.to(".parallax-2 div", { scale: 1.2, filter: "saturate(2)", duration: 1, ease: "power3" });
});

document.getElementById("scrolling-text-container-2").addEventListener("mouseleave", () => {
  gsap.to(".parallax-2 div", { scale: 1, filter: "saturate(1.5)", duration: 1, ease: "power3" });
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// default mouse follower settings -------------------------------------------------------------------------------------
// let defaultScale = 1;
// let defaultZIndex = 2;
// let bgColor = "#fffffff";



// mouse click ---------------------------------------------------------------------------------------------------------
// window.addEventListener("mousedown", () => {
//   const currentScale = gsap.getProperty(".mouse-follower-1", "scale");
//   gsap.to(".mouse-follower-1", { duration: 0.6, scale: currentScale - 0.3 });
//   gsap.to(".mouse-follower-1", { duration: 0.6, delay: 0.2, scale: defaultScale });
// });



// mouse hover - scrolling text 1 --------------------------------------------------------------------------------------
// document.getElementById("scrolling-text-1").addEventListener("mouseenter", () => {
//   gsap.to(".mouse-follower-sp", { duration: 0.6, textContent: "developer" });
//   gsap.to(".mouse-follower-3", { duration: 0.6, alpha: 1, scale: 1.2 });
//   gsap.to(".mouse-follower-1", { duration: 0.6, zIndex: -1, backgroundColor: "#111", scale: 0.1 });
// });

// document.getElementById("scrolling-text-1").addEventListener("mouseleave", () => {
//   gsap.to(".mouse-follower-sp", { duration: 0.6, textContent: "explore" });
//   gsap.to(".mouse-follower-3", { duration: 0.6, alpha: 0, scale: 0.5 });
//   gsap.to(".mouse-follower-1", { duration: 0.6, zIndex: 2, backgroundColor: "#ffffff4e", scale: 1 });
// });



// mouse hover - scrolling text 1 --------------------------------------------------------------------------------------
// document.getElementById("scrolling-text-2").addEventListener("mouseenter", () => {
//   gsap.to(".mouse-follower-4", { duration: 0.6, alpha: 1, scale: 1.2 });
//   gsap.to(".mouse-follower-1", { duration: 0.6, zIndex: -1, backgroundColor: "#111", scale: 0.1 });
// });

// document.getElementById("scrolling-text-2").addEventListener("mouseleave", () => {
//   gsap.to(".mouse-follower-4", { duration: 0.6, alpha: 0, scale: 0.5 });
//   gsap.to(".mouse-follower-1", { duration: 0.6, zIndex: 2, backgroundColor: "#ffffff4e", scale: 1 });
// });



// mouse hover - logo --------------------------------------------------------------------------------------------------
// document.getElementById("navbar-brand").addEventListener("mouseenter", () => {
//   gsap.to(".mouse-follower-4", { duration: 0.6, alpha: 1, zIndex: -1, scale: 1 });
//   gsap.to(".mouse-follower-1", { duration: 0.6, zIndex: -1, backgroundColor: "#111", scale: 0.1 });
// });

// document.getElementById("navbar-brand").addEventListener("mouseleave", () => {
//   gsap.to(".mouse-follower-4", { duration: 0.6, alpha: 0, zIndex: 1, scale: 0.5 });
//   gsap.to(".mouse-follower-1", { duration: 0.6, zIndex: 2, backgroundColor: "#ffffff4e", scale: 1 });
// });



// mouse hover - scrolling gallery -------------------------------------------------------------------------------------
// document.getElementById("scrolling-gallery-1").addEventListener("mouseenter", () => {
//   gsap.to(".mouse-follower-2", { duration: 0.6, alpha: 1, scale: 0.7 });
//   gsap.to(".mouse-follower-1", { duration: 0.6, zIndex: -1, backgroundColor: "#111", scale: 0.1 });
// });

// document.getElementById("scrolling-gallery-1").addEventListener("mouseleave", () => {
//   gsap.to(".mouse-follower-2", { duration: 0.6, alpha: 0, scale: 0.5 });
//   gsap.to(".mouse-follower-1", { duration: 0.6, zIndex: 2, backgroundColor: "#ffffff4e", scale: 1 });
// });



// mouse hover - scrolling gallery -------------------------------------------------------------------------------------
// document.getElementById("scrolling-gallery-2").addEventListener("mouseenter", () => {
//   gsap.to(".mouse-follower-2", { duration: 0.6, alpha: 1, scale: 0.7 });
//   gsap.to(".mouse-follower-1", { duration: 0.6, zIndex: -1, backgroundColor: "#111", scale: 0.1 });
// });

// document.getElementById("scrolling-gallery-2").addEventListener("mouseleave", () => {
//   gsap.to(".mouse-follower-2", { duration: 0.6, alpha: 0, scale: 0.5 });
//   gsap.to(".mouse-follower-1", { duration: 0.6, zIndex: 2, backgroundColor: "#ffffff4e", scale: 1 });
// });



// mouse hover - navigation --------------------------------------------------------------------------------------------
// document.querySelectorAll(".nav-item").forEach((navItem) => {
//   navItem.addEventListener("mouseenter", () => {
//     defaultScale = 1.6;
//     gsap.to(".mouse-follower-1", { duration: 0.6, scale: 1.6 });
//   });

//   navItem.addEventListener("mouseleave", () => {
//     defaultScale = 1;
//     gsap.to(".mouse-follower-1", { duration: 0.6, scale: 1 });
//   });
// });



// mouse hover - navigation --------------------------------------------------------------------------------------------
// document.querySelectorAll(".navbar-brand, .dp-div, .hero-text-2").forEach((element) => {
//   element.addEventListener("mouseenter", () => {
//     if (element.classList.contains("navbar-brand")) {
//     } else if (element.classList.contains("dp-div")) {
//       defaultScale = 2.5;
//       gsap.to(".mouse-follower-1", { duration: 0.6, scale: 2.5 });
//     }
//   });

//   element.addEventListener("mouseleave", () => {
//     defaultScale = 1;
//     gsap.to(".mouse-follower-1", { duration: 0.6, scale: 1 });
//   });
// });



// mouse hover - scrolling gallery -------------------------------------------------------------------------------------
// document.getElementById("socials").addEventListener("mouseenter", () => {
//   defaultScale = 1.6;
//   gsap.to(".mouse-follower-1", { duration: 0.6, scale: 1.6 });
// });

// document.getElementById("socials").addEventListener("mouseleave", () => {
//   defaultScale = 1;
//   gsap.to(".mouse-follower-1", { duration: 0.6, scale: 1 });
// });