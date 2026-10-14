document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation menu
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Close the menu after selecting a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                menuToggle.textContent = "☰";
            });
        });
    }

    // Reveal sections as they enter the screen
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("show"));
    }

    // Show the current year in the footer
    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Back-to-top button
    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle("visible", window.scrollY > 350);
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Highlight the current navigation section
    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navigationLinks.forEach((link) => {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === `#${entry.target.id}`
                            );
                        });
                    }
                });
            },
            { rootMargin: "-30% 0px -60% 0px" }
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }

    // Contact form: prepare an email in the visitor's email application
    const contactForm = document.getElementById("contact-form");
    const formNote = document.getElementById("form-note");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("visitor-name").value.trim();
            const email = document.getElementById("visitor-email").value.trim();
            const subject = document.getElementById("visitor-subject").value.trim();
            const message = document.getElementById("visitor-message").value.trim();

            if (!name || !email || !subject || !message) {
                if (formNote) {
                    formNote.textContent = "Please fill in all fields.";
                }
                return;
            }

            const recipient = "meghanameghana906@gmail.com";
            const emailSubject = encodeURIComponent(subject);
            const emailBody = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            if (formNote) {
                formNote.textContent =
                    "Opening your email application. Send the prepared email to complete the message.";
            }

            window.location.href =
                `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
        });
    }
});



