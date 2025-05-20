document.addEventListener('DOMContentLoaded', function() {
    // Animation for phases when they come into view
    const phases = document.querySelectorAll('.phase');
    const journeyImage = document.querySelector('.journey-image img');
    
    // Intersection Observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    phases.forEach(phase => {
        observer.observe(phase);
        
        // Interactive hover effect
        phase.addEventListener('mouseenter', function() {
            const phaseNumber = this.getAttribute('data-phase');
            
            // Scale and change filter of the journey image
            if (journeyImage) {
                journeyImage.style.transform = 'scale(1.05)';
                
                switch(phaseNumber) {
                    case "1":
                        journeyImage.style.filter = 'hue-rotate(0deg) brightness(1.1)';
                        break;
                    case "2":
                        journeyImage.style.filter = 'hue-rotate(30deg) brightness(1.1)';
                        break;
                    case "3":
                        journeyImage.style.filter = 'hue-rotate(60deg) brightness(1.1)';
                        break;
                    case "4":
                        journeyImage.style.filter = 'hue-rotate(90deg) brightness(1.1)';
                        break;
                }
            }
        });
        
        phase.addEventListener('mouseleave', function() {
            if (journeyImage) {
                journeyImage.style.transform = 'scale(1)';
                journeyImage.style.filter = 'none';
            }
        });
    });
});