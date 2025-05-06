// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", function() {
    this.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("overflow-hidden");
  });
}

// Header scroll effect
const header = document.getElementById("site-header");

function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll("[data-animate]");

  animatedElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      el.classList.add("opacity-100");
      el.style.transform = "translateY(0)";
      el.style.opacity = "1";
    }
  });
}

window.addEventListener("scroll", handleScroll);
handleScroll(); // Call once on load
// Waitlist form handling
const waitlistForm = document.getElementById("waitlist-form");

if (waitlistForm) {
  waitlistForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const submitButton = this.querySelector('button[type="submit"]');

    if (emailInput && submitButton) {
      // Disable form elements
      emailInput.disabled = true;
      submitButton.disabled = true;

      // Change button text
      const originalText = submitButton.textContent;
      submitButton.textContent = "Subscribing...";

      // Simulate form submission
      setTimeout(() => {
        submitButton.textContent = "Subscribed!";

        // Reset form after delay
        setTimeout(() => {
          emailInput.disabled = false;
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          waitlistForm.reset();
        }, 3000);
      }, 1500);
    }
  });
}

