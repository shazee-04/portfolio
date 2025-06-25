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

        // Execute reCAPTCHA v3 and get token
        grecaptcha.ready(function () {
            grecaptcha.execute('6Ld5wmwrAAAAAD26ke_XsZJnubxDNd3PCIfHQoW8', { action: 'submit' }).then(function (token) {
                document.getElementById('recaptcha-token').value = token;

                customAlert("Sending message...");

                emailjs.send("service_rur6fir", "template_glvvxw4", {
                    name: name,
                    email: email,
                    message: message,
                    time: time,
                    token: token
                })
                    .then(() => {
                        customAlert("Message sent successfully!");
                        form.reset();
                    })
                    .catch((error) => {
                        console.error("EmailJS error:", error);
                        customAlert("Failed to send the message. Please try again.");
                    });
            });
        });
    });
});
