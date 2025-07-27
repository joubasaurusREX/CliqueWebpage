// script.js

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navigation
    const nav = document.querySelector('.nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(26, 26, 46, 0.98)';
        } else {
            nav.style.background = 'rgba(26, 26, 46, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and other elements
    const animatedElements = document.querySelectorAll('.feature-card, .contact-card, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Mobile menu toggle (if needed)
    const createMobileMenu = () => {
        const navContent = document.querySelector('.nav-content');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768) {
            // Add mobile menu button if not exists
            if (!document.querySelector('.mobile-menu-btn')) {
                const mobileMenuBtn = document.createElement('button');
                mobileMenuBtn.className = 'mobile-menu-btn';
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.style.cssText = `
                    background: none;
                    border: none;
                    color: #ffffff;
                    font-size: 24px;
                    cursor: pointer;
                    display: block;
                `;
                
                navContent.appendChild(mobileMenuBtn);
                
                mobileMenuBtn.addEventListener('click', () => {
                    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.background = 'rgba(26, 26, 46, 0.98)';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.padding = '20px';
                    navLinks.style.borderTop = '1px solid #4a4a6a';
                });
            }
        }
    };

    // Handle window resize
    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();

    // Add click handlers for download buttons
    const downloadButtons = document.querySelectorAll('.button-primary, .button-secondary');
    downloadButtons.forEach(button => {
        if (button.textContent.includes('Download')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // You can add actual download links or app store redirects here
                alert('App download coming soon! Follow us for updates.');
            });
        }
    });

    // Contact form handling (if you add a contact form later)
    const handleContactForm = (formData) => {
        // Handle contact form submission
        console.log('Contact form submitted:', formData);
        // You can integrate with a backend service here
    };

    // Add loading animation
    const addLoadingAnimation = () => {
        const body = document.body;
        body.style.opacity = '0';
        body.style.transition = 'opacity 0.5s ease';
        
        window.addEventListener('load', () => {
            body.style.opacity = '1';
        });
    };

    addLoadingAnimation();
});

// Utility functions
const utils = {
    // Debounce function for performance
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

    // Check if element is in viewport
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

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
}