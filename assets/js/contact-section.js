document.addEventListener("DOMContentLoaded", () => {
    // Init EmailJS
    emailjs.init("qcCnkIvWP86AqPk3K");

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("nameInput").value.trim();
        const email = document.getElementById("emailInput").value.trim();
        const message = document.getElementById("messageInput").value.trim();
        const time = new Date().toLocaleString();

        if (!name || !email || !message) {
            customAlert("Please fill all required fields.");
            return;
        }

        customAlert("sending message...");

        emailjs.send("service_rur6fir", "template_ekcx3ii", {
            name: name,
            email: email,
            message: message,
            time: time
        })
            .then(() => {
                customAlert("message sent successfully!");
                form.reset();
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                customAlert("Failed to send the message. please try again.");
            });
    });
});
