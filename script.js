// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20; // Adjusted for padding/offset

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link (if open)
                if (window.innerWidth <= 768) {
                    const navLinksContainer = document.querySelector('.nav-links');
                    if (navLinksContainer.style.display === 'flex') {
                        navLinksContainer.style.display = 'none';
                    }
                }
            }
        });
    });

    // Add scroll effect to navigation
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            nav.style.background = 'rgba(26, 26, 46, 0.98)';
        } else {
            nav.style.background = 'rgba(26, 26, 46, 0.95)';
        }
    });

    // Animate elements on scroll using Intersection Observer
    const observerOptions = {
        threshold: 0.1, // Element is 10% visible
        rootMargin: '0px 0px -50px 0px' // Start animation 50px before element is fully in view
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe feature cards, contact cards, and stats for animation
    const animatedElements = document.querySelectorAll('.feature-card, .contact-card, .stat, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn) { // Ensure button exists before adding listener
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active'); // Use a class for better styling control
        });
    }

    // Function to handle mobile menu display on resize and load
    const handleMobileMenuDisplay = () => {
        if (window.innerWidth > 768) {
            navLinksContainer.classList.remove('active'); // Ensure menu is hidden on desktop
            navLinksContainer.style.display = 'flex'; // Ensure menu is visible on desktop
        } else {
            navLinksContainer.style.display = 'none'; // Hide menu by default on mobile
        }
    };

    // Initial check and on resize
    window.addEventListener('resize', handleMobileMenuDisplay);
    handleMobileMenuDisplay(); // Call on load

    // Add click handlers for download buttons
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Great news! Clique is coming soon to your app store. Follow us on social media for launch updates!');
            // In a real scenario, you'd redirect to app store links here
            // window.location.href = "YOUR_APP_STORE_LINK";
        });
    });

    // Add loading animation (fades in the body on load)
    const addLoadingAnimation = () => {
        const body = document.body;
        body.style.opacity = '0';
        body.style.transition = 'opacity 0.5s ease';

        window.addEventListener('load', () => {
            body.style.opacity = '1';
        });
    };

    addLoadingAnimation();

    // Utility functions (already present, good to keep for potential future use)
    const utils = {
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        isInViewport: (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = utils;
    }
});