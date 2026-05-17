// ============================================
// VIRA TRAVEL NOTARY - JAVASCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    let lastScroll = 0;
    const navbar = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all feature cards, service items, etc.
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .service-item, .value-card, .step, .service-detail-card, .contact-method, .faq-item'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = `(${value}`;
                    } else if (value.length <= 6) {
                        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                    } else {
                        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                    }
                }
                e.target.value = value;
            });
        }

        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
            
            // Prevent past dates from being typed or pasted
            dateInput.addEventListener('change', function() {
                const selectedDate = new Date(this.value);
                const todayDate = new Date();
                todayDate.setHours(0, 0, 0, 0);
                
                if (selectedDate < todayDate) {
                    this.value = '';
                    showFormMessage('Please select today or a future date.', 'error');
                }
            });
        }

        // Form submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formMessage = document.getElementById('formMessage');
            
            // Basic validation
            const name = formData.get('name');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const contactMethod = formData.get('contact-method');
            
            if (!name || !phone || !service) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Phone validation
            const phoneDigits = phone.replace(/\D/g, '');
            if (phoneDigits.length !== 10) {
                showFormMessage('Please enter a valid 10-digit phone number.', 'error');
                return;
            }

            // Date validation - ensure no past dates
            const preferredDate = formData.get('date');
            if (preferredDate) {
                const selectedDate = new Date(preferredDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    showFormMessage('Please select today or a future date for your appointment.', 'error');
                    return;
                }
            }

            // Submit to Formspree
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                // Submit form to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Create a summary message
                    const summaryMessage = `
Thank you, ${name}! We've received your request for ${service} services.

We'll contact you ${contactMethod === 'phone' ? 'by phone' : contactMethod === 'text' ? 'via text' : 'by email'} at ${contactMethod === 'phone' || contactMethod === 'text' ? phone : formData.get('email') || phone} as soon as possible.

For immediate assistance, please call or text us at (951) 523-9466.
                    `;

                    showFormMessage(summaryMessage, 'success');
                    
                    // Reset form
                    contactForm.reset();

                    // Scroll to message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Create clickable contact options
                    createContactLinks(phone);
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        showFormMessage('There was a problem submitting your form. Please try again or call us at (951) 523-9466.', 'error');
                    } else {
                        showFormMessage('Oops! There was a problem. Please call or text us directly at (951) 523-9466.', 'error');
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showFormMessage('Unable to send message. Please call or text us at (951) 523-9466.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });}
    }

    // ============================================
    // FORM MESSAGE DISPLAY
    // ============================================
    function showFormMessage(message, type) {
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.style.whiteSpace = 'pre-line';
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            if (type === 'error') {
                // Auto-hide error messages after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        }
    }

    // ============================================
    // CREATE CONTACT LINKS AFTER FORM SUBMISSION
    // ============================================
    function createContactLinks(phone) {
        const formMessage = document.getElementById('formMessage');
        if (formMessage && formMessage.classList.contains('success')) {
            // Add quick action buttons after a brief delay
            setTimeout(() => {
                const contactButtons = document.createElement('div');
                contactButtons.style.marginTop = '1rem';
                contactButtons.style.display = 'flex';
                contactButtons.style.gap = '1rem';
                contactButtons.style.flexWrap = 'wrap';
                contactButtons.innerHTML = `
                    <a href="tel:9515239466" class="btn btn-primary" style="flex: 1; min-width: 150px;">
                        📞 Call Now
                    </a>
                    <a href="sms:9515239466" class="btn btn-secondary" style="flex: 1; min-width: 150px;">
                        💬 Text Us
                    </a>
                `;
                formMessage.appendChild(contactButtons);
            }, 500);
        }
    }

    // ============================================
    // CLICK TO CALL/TEXT TRACKING
    // ============================================
    document.querySelectorAll('a[href^="tel:"], a[href^="sms:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const type = this.getAttribute('href').startsWith('tel:') ? 'Call' : 'Text';
            console.log(`${type} initiated: ${this.getAttribute('href')}`);
            // In production, you might send this to analytics
        });
    });

    // ============================================
    // DYNAMIC YEAR IN FOOTER
    // ============================================
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear && footerYear.textContent.includes('2026')) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
    }

    // ============================================
    // ACTIVE PAGE HIGHLIGHTING
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ============================================
    // PERFORMANCE: LAZY LOADING IMAGES
    // ============================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ============================================
    // ACCESSIBILITY: SKIP TO MAIN CONTENT
    // ============================================
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #2563eb;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add id to main if it doesn't exist
    const mainElement = document.querySelector('main');
    if (mainElement && !mainElement.id) {
        mainElement.id = 'main';
    }

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%c🚀 Vira Travel Notary', 'font-size: 20px; font-weight: bold; color: #2563eb;');
    console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #0891b2;');
    console.log('%cFor mobile notary services, call: (951) 523-9466', 'font-size: 12px; color: #6b7280;');
});

// ============================================
// SERVICE WORKER (OPTIONAL - FOR PWA)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA features
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}
