document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    // Load runtime config (gitignored) from config.json
    let APP_CONFIG = null;

    async function loadConfig() {
        try {
            const res = await fetch("config.json", { cache: "no-store" });
            if (!res.ok) throw new Error(`Config HTTP ${res.status}`);
            APP_CONFIG = await res.json();
            return APP_CONFIG;
        } catch (err) {
            console.error("Config load error:", err);
            customAlert("Contact form is not configured. See README to set up config.json.");
            return null;
        }
    }

    async function validateEmailWithAbstract(email) {
        if (!APP_CONFIG?.abstractApiKey) return null;
        const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${APP_CONFIG.abstractApiKey}&email=${encodeURIComponent(email)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error("Email validation HTTP error:", response.status);
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error("Email validation error:", error);
            return null;
        }
    }

    // Initialize after loading config
    (async () => {
        const cfg = await loadConfig();
        if (!cfg) return; // stop if config missing

        if (cfg.emailJsPublicKey) {
            // Init EmailJS with public key from config
            emailjs.init(cfg.emailJsPublicKey);
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

            // Step 1: Validate Email (best-effort)
            let isEmailValid = true;
            const result = await validateEmailWithAbstract(email);
            if (result) {
                isEmailValid =
                    result?.is_valid_format?.value === true &&
                    result?.is_smtp_valid?.value === true &&
                    result?.is_disposable_email?.value === false;
            }
            if (!isEmailValid) {
                customAlert("Email does not appear to be valid.");
                return;
            }

            // Step 2: reCAPTCHA + EmailJS
            if (!cfg.recaptchaSiteKey) {
                customAlert("reCAPTCHA is not configured. See config.json.");
                return;
            }

            grecaptcha.ready(function () {
                grecaptcha.execute(cfg.recaptchaSiteKey, { action: 'submit' }).then(function (token) {
                    document.getElementById('recaptcha-token').value = token;

                    customAlert("Sending message...");

                    emailjs.send(
                        cfg.emailJsServiceId,
                        cfg.emailJsTemplateId,
                        {
                            name: name,
                            email: email,
                            message: message,
                            time: time,
                            token: token
                        }
                    )
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
    })();
});
