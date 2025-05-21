  const form = document.getElementById('contact-form');
        const successMessage = document.getElementById('success-message');
        
        form.addEventListener('submit', function(e) {
            // The form will submit to Formspree
            
            // This listens for the success event from Formspree
            window.addEventListener('formspree:success', function() {
                form.reset();
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            });
        });