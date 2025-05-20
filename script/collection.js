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



//parfume local storage
let perfumes = [];

//extracting json
fetch('/parfume.json')
  .then(response => response.json())
  .then(data => {
    perfumes = data;
    console.log(perfumes);

    initPage()
  })
  .catch(error => console.error('Error loading JSON:', error));


  function initPage(){

    const container = document.querySelector('.row.g-4');
    container.innerHTML = ''; // optional: clear existing content first
  
    perfumes.forEach(item => {
      container.appendChild(generateCard(item));
    });

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
      handleScroll();

  }

  
  function generateCard(item) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-3';
    col.setAttribute('data-animate', '');
  
    const card = document.createElement('div');
    card.className = 'product-card h-100';
  
    const imgWrap = document.createElement('div');
    imgWrap.className = 'product-image';
    imgWrap.innerHTML = `
      <img src="${item.imageSrc}" alt="${item.parfumeName}">
      <div class="product-overlay"></div>
      <div class="product-hover"><span>Discover</span></div>
      <h3 class="product-name">${item.parfumeName}</h3>
    `;
  
    const body = document.createElement('div');
    body.className = 'p-3';
    body.innerHTML = `
      <p class="product-description">${item.parfumeDesc}</p>
      <div class="mb-3">
        <h4 class="small text-uppercase text-primary mb-2">Notes</h4>
        <div class="note-tags">
          ${[...item.notes.top, ...item.notes.middle, ...item.notes.bottom]
            .map(note => `<span class="note-tag">${note}</span>`)
            .join('')}
        </div>
      </div>
      <a href="detailperfume.html" class="btn btn-outline-custom">Explore</a>
    `;
  
    card.appendChild(imgWrap);
    card.appendChild(body);
    col.appendChild(card);
    return col;
  }