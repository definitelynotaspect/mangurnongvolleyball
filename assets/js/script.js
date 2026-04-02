// ============================================
// VOLLEYBALL PORTFOLIO - MAIN JAVASCRIPT
// ============================================

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupSmoothScrolling();
    setupGalleryLightbox();
    setupAchievementHighlights();
    setupContactForm();
    setupAnimatedStats();
    setupProgressBars();
    setupScrollAnimations();
    setupMobileMenu();
}

// ============================================
// NAVIGATION
// ============================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function setupSmoothScrolling() {
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
}

// ============================================
// GALLERY LIGHTBOX
// ============================================

function setupGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            const img = this.querySelector('img');
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPreviousImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // Navigation buttons
    lightboxPrev.addEventListener('click', showPreviousImage);
    lightboxNext.addEventListener('click', showNextImage);

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxImage();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        updateLightboxImage();
    }

    function updateLightboxImage() {
        const img = galleryItems[currentImageIndex].querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
    }
}

// ============================================
// ACHIEVEMENTS TO HIGHLIGHTS SYNC
// ============================================

function setupAchievementHighlights() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const highlightsContainer = document.getElementById('highlightsContainer');

    if (!timelineItems.length || !highlightsContainer) {
        return;
    }

    const cards = Array.from(timelineItems).map(item => {
        const title = item.querySelector('h3')?.textContent?.trim() || 'Career Highlight';
        const description = item.querySelector('p')?.textContent?.trim() || '';
        const badge = item.querySelector('.achievement-badge')?.textContent?.trim() || 'Performance';
        const video = {
            src: item.dataset.video || '',
            poster: item.dataset.poster || ''
        };

        return createHighlightCard(title, description, badge, video);
    });

    cards.slice(0, 3).forEach(card => highlightsContainer.appendChild(card));
}

function createHighlightCard(title, description, badge, video) {
    const card = document.createElement('div');
    card.className = 'highlight-card';
    card.innerHTML = `
        <div class="highlight-thumbnail">
            <video class="highlight-video" controls preload="metadata" playsinline poster="${video.poster || ''}">
                <source src="${video.src || ''}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="highlight-video-fallback" hidden>
                <span class="highlight-video-icon">VIDEO</span>
                <p>Add your MP4 file to this card's video path to play the highlight here.</p>
            </div>
        </div>
        <div class="highlight-copy">
            <span class="highlight-badge">${badge}</span>
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;

    const videoElement = card.querySelector('.highlight-video');
    const fallback = card.querySelector('.highlight-video-fallback');

    if (!video?.src) {
        videoElement.hidden = true;
        fallback.hidden = false;
    } else {
        videoElement.addEventListener('error', function() {
            videoElement.hidden = true;
            fallback.hidden = false;
        });
    }

    return card;
}

// ============================================
// CONTACT FORM
// ============================================

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        showFormMessage('Message sent successfully! Thank you for reaching out.', 'success');
        contactForm.reset();

        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('success', 'error');
            formMessage.style.display = 'none';
        }, 5000);
    });

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// ============================================
// ANIMATED STATISTICS
// ============================================

function setupAnimatedStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateStats() {
        if (hasAnimated) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target;
                }
            };

            updateNumber();
        });

        hasAnimated = true;
    }

    // Trigger animation when stats section is in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// ============================================
// PROGRESS BARS
// ============================================

function setupProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentage = entry.target.getAttribute('data-percentage');
                entry.target.style.setProperty('--percentage', percentage + '%');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressFills.forEach(fill => {
        observer.observe(fill);
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.about-text p, .stat-card, .skill-item, .timeline-item, .gallery-item, .highlight-card, .position-card'
    );

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// ============================================
// STICKY NAVBAR
// ============================================

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// LOADING SCREEN
// ============================================

window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // Loading screen fades out automatically after 2 seconds
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2500);
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Optimize scroll events with throttling
window.addEventListener('scroll', throttle(function() {
    // Any scroll-dependent code here
}, 100));

// Add print styles
const style = document.createElement('style');
style.textContent = `
    @media print {
        .navbar, .footer, .contact-form {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Skip to main content with Alt+M
    if (e.altKey && e.key === 'm') {
        document.querySelector('section').focus();
    }
});

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = message;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// ============================================
// ADDITIONAL FEATURES
// ============================================

// Add ripple effect to buttons
function setupRippleEffect() {
    const buttons = document.querySelectorAll('button, .cta-button, .social-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Initialize ripple effect when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupRippleEffect);
} else {
    setupRippleEffect();
}

// ============================================
// PRELOAD IMAGES
// ============================================

function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.src = img.src;
    });
}

window.addEventListener('load', preloadImages);

// ============================================
// SERVICE WORKER (Optional - for PWA support)
// ============================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('sw.js').catch(err => console.log('SW registration failed'));
}

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log('%cðŸ Welcome to Alex Rivera\'s Volleyball Portfolio! ðŸ', 'font-size: 20px; color: #fbbf24; font-weight: bold;');
console.log('%cPowered by Pure HTML, CSS, and JavaScript', 'font-size: 14px; color: #3b82f6;');
