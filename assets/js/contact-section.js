document.addEventListener("DOMContentLoaded", () => {
    // Init EmailJS
    emailjs.init("qcCnkIvWP86AqPk3K");

    const form = document.getElementById("contactForm");

    async function validateEmailWithMailboxlayer(email) {
        const accessKey = "6b18c820025f93028f5440f01a7fd424"; // Replace with your actual key
        const url = `https://apilayer.net/api/check?access_key=${accessKey}&email=${encodeURIComponent(email)}&smtp=1&format=1`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Mailboxlayer error:", error);
            return null;
        }
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("nameInput").value.trim();
        const email = document.getElementById("emailInput").value.trim();
        const message = document.getElementById("messageInput").value.trim();
        const time = new Date().toLocaleString();

        if (!name || !email || !message) {
            customAlert("Please fill all required fields.");
            return;
        }

        // Step 1: Validate Email
        const emailValidation = await validateEmailWithMailboxlayer(email);
        if (!emailValidation || !emailValidation.format_valid || !emailValidation.smtp_check) {
            customAlert("Email does not appear to be valid.");
            return;
        }

        // Step 2: reCAPTCHA + EmailJS
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
