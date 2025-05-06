//make card
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch perfume data
    const response = await fetch('parfume.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const perfumes = await response.json();

    // Get the product highlights container
    const highlightsSection = document.querySelector('.perfumes-main-container');
    if (!highlightsSection) return;

    // Clear existing content (if any)
    highlightsSection.innerHTML = '';

    // Create cards for each perfume
    perfumes.forEach(perfume => {
      const cardCol = document.createElement('div');
      cardCol.className = 'col-md-6 col-lg-3';
      cardCol.setAttribute('data-animate', '');

      cardCol.innerHTML = `
                    <div class="product-card h-100">
                        <div class="product-image">
                            <img src="${perfume.imageSrc}" alt="${perfume.parfumeName}">
                            <div class="product-overlay"></div>
                            <div class="product-hover">
                                <span>Discover</span>
                            </div>
                            <h3 class="product-name">${perfume.parfumeName}</h3>
                        </div>
                        <div class="p-3">
                            <p class="product-description">${perfume.parfumeDesc}</p>
                            <div class="mb-3">
                                <h4 class="small text-uppercase text-primary mb-2">Notes</h4>
                                <div class="note-tags">
                                    ${perfume.notes.top.slice(0, 2).map(note =>
        `<span class="note-tag">${note}</span>`
      ).join('')}
                                    ${perfume.notes.middle.slice(0, 2).map(note =>
        `<span class="note-tag">${note}</span>`
      ).join('')}
                                </div>
                            </div>
                            <a href="detailperfume.html?id=${perfume.parfumeId}" class="btn btn-outline-custom">Explore</a>
                        </div>
                    </div>
                `;

      highlightsSection.appendChild(cardCol);
    });

  } catch (error) {
    console.error("Error loading perfumes:", error);
    // Optionally show an error message to users
    const errorElement = document.createElement('div');
    errorElement.className = 'alert alert-danger text-center';
    errorElement.textContent = 'Failed to load products. Please try again later.';
    document.querySelector('.container').prepend(errorElement);
  }
});








// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", function () {
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
  waitlistForm.addEventListener("submit", function (e) {
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

