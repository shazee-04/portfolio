// "qcCnkIvWP86AqPk3K"
// "service_rur6fir" "template_ekcx3ii"

document.addEventListener("DOMContentLoaded", () => {
    // Init EmailJS
    emailjs.init("qcCnkIvWP86AqPk3K"); // 🔁 Replace this

    // GSAP animation
    // gsap.from(".contact-container", {
    //     opacity: 0,
    //     y: 50,
    //     duration: 1,
    //     ease: "power3.out"
    // });

    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("nameInput").value.trim();
        const email = document.getElementById("emailInput").value.trim();
        const message = document.getElementById("messageInput").value.trim();
        const time = new Date().toLocaleString();

        if (!name || !email || !message) {
            status.textContent = "Please fill in all fields.";
            status.style.color = "#ff5e5e";
            return;
        }

        status.textContent = "Sending...";
        status.style.color = "#00ffff";

        emailjs.send("service_rur6fir", "template_ekcx3ii", {
            name: name,
            email: email,
            message: message,
            time: time
        })
            .then(() => {
                status.textContent = "Message sent successfully!";
                status.style.color = "#00ff99";
                form.reset();
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                status.textContent = "Failed to send message. Try again.";
                status.style.color = "#ff5e5e";
            });
    });
});
