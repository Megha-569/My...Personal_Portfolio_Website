


// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");


// Open / close menu
menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }

});


// Close menu when clicking a navigation link
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

    });

});


// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");


contactForm.addEventListener("submit", function (event) {

    // Stop the page from refreshing
    event.preventDefault();


    // Get values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();


    // Check fields
    if (name === "" || email === "" || message === "") {

        formMessage.textContent =
            "Please fill in all the fields.";

        formMessage.style.color = "red";

        return;
    }


    // Success message
    formMessage.textContent =
        "Thank you! Your message has been submitted.";

    formMessage.style.color = "green";


    // Clear form
    contactForm.reset();

});