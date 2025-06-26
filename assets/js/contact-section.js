document.addEventListener("DOMContentLoaded", () => {
    // Init EmailJS
    emailjs.init("qcCnkIvWP86AqPk3K");

    const form = document.getElementById("contactForm");

    async function validateEmailWithMailboxlayer(email) {
        const apiKey = "5d8c0792564c4267aea350a9e403fc5f";
        const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error("HTTP error:", response.status);
                return null;
            }
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
        const result = await validateEmailWithMailboxlayer(email);
        if (
            !result ||
            !result.is_valid_format.value === true ||
            !result.is_smtp_valid.value === true ||
            !result.is_disposable_email.value === false
        ) {
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
