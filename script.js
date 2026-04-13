/* ==========================================
   MODERN PORTFOLIO - JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing portfolio...');
    initializeDarkMode();
    initializeNavbar();
    initializeResumeMenu();
    initializeScrollAnimations();
    initializeContactForm();
    initializeSmoothScroll();
    initializeScrollToTop();
    console.log('All initializations complete!');
});

/* ==========================================
   NAVBAR FUNCTIONALITY
   ========================================== */

function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (!darkModeToggle) {
        console.error('Dark mode toggle button not found!');
        return;
    }

    // Check localStorage for saved preference
    const savedDarkMode = localStorage.getItem('darkMode');
    
    // Apply saved preference on page load
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }

    // Add click listener to toggle button
    darkModeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle the dark-mode class
        document.body.classList.toggle('dark-mode');
        
        // Check current state and save to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
        
        // Update icon
        updateDarkModeIcon(isDarkMode);
        
        console.log('Dark mode toggled! Current state:', isDarkMode);
    });
}

function updateDarkModeIcon(isDarkMode) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    const icon = darkModeToggle.querySelector('i');
    if (!icon) return;
    
    if (isDarkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

/* ==========================================
   NAVBAR FUNCTIONALITY
   ========================================== */

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });

    // Active link indicator
    window.addEventListener('scroll', function() {
        updateActiveLink();
        updateNavbarVisibility();
    });

    updateActiveLink();
    updateNavbarVisibility();

    function updateNavbarVisibility() {
        const homeSection = document.getElementById('home');

        if (!navbar || !homeSection) {
            return;
        }

        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight - 120;
        const isHomeVisible = window.scrollY < homeBottom;

        navbar.classList.toggle('navbar-hidden', !isHomeVisible);

        if (!isHomeVisible) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    }
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

function initializeResumeMenu() {
    const resumeToggle = document.getElementById('resumeToggle');
    const resumeMenu = document.getElementById('resumeMenu');

    if (!resumeToggle || !resumeMenu) {
        return;
    }

    resumeToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = resumeMenu.classList.toggle('show');
        resumeToggle.setAttribute('aria-expanded', String(isOpen));
    });

    resumeMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.addEventListener('click', function() {
        resumeMenu.classList.remove('show');
        resumeToggle.setAttribute('aria-expanded', 'false');
    });
}

/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate progress bars
                if (entry.target.classList.contains('progress')) {
                    animateProgressBar(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.skill-card, .project-card, .info-card, .timeline-item, .stat-card, .viz-card'
    );

    animateElements.forEach(element => {
        observer.observe(element);
    });
}

function animateProgressBar(progressBar) {
    const width = progressBar.style.width;
    progressBar.style.width = '0';
    
    setTimeout(() => {
        progressBar.style.width = width;
    }, 100);
}

/* ==========================================
   SMOOTH SCROLLING
   ========================================== */

function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Navbar height

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================
   CONTACT FORM FUNCTIONALITY
   ========================================== */

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Validate form
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Validate email
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                // Here you would normally send the data to a server
                console.log({
                    name: name,
                    email: email,
                    message: message
                });

                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 80px;
            right: 20px;
            background: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            font-weight: 500;
        }

        .notification-success {
            border-left: 4px solid #43e97b;
        }

        .notification-success .notification-content {
            color: #43e97b;
        }

        .notification-error {
            border-left: 4px solid #f5576c;
        }

        .notification-error .notification-content {
            color: #f5576c;
        }

        .notification-info {
            border-left: 4px solid #667eea;
        }

        .notification-info .notification-content {
            color: #667eea;
        }

        @media (max-width: 768px) {
            .notification {
                top: 80px;
                right: 10px;
                left: 10px;
            }
        }
    `;
    document.head.appendChild(style);

    // Auto remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/* ==========================================
   SCROLL TO TOP BUTTON
   ========================================== */

function initializeScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease-out;
            z-index: 999;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }

        .scroll-to-top.show {
            opacity: 1;
            visibility: visible;
        }

        .scroll-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.6);
        }

        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 18px;
            }
        }
    `;
    document.head.appendChild(style);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================
   DYNAMIC ANIMATIONS ON HOVER
   ========================================== */

document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.animated-shape');
    
    shapes.forEach(shape => {
        const rect = shape.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = 20;
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

/* ==========================================
   MOBILE RESPONSIVE NAVBAR STYLES
   ========================================== */

const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 20px 0;
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-link {
            padding: 1.5rem;
            width: 100%;
            display: block;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
    }
`;
document.head.appendChild(mobileMenuStyles);

/* ==========================================
   PERFORMANCE OPTIMIZATION
   ========================================== */

// Lazy loading for images (if added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ==========================================
   KEYBOARD ACCESSIBILITY
   ========================================== */

document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }

    // Scroll to top with Ctrl/Cmd + Home
    if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

/* ==========================================
   PAGE LOAD ANIMATION
   ========================================== */

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

/* ==========================================
   MODERN SCROLL INDICATOR
   ========================================== */

function initializeScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);

    const style = document.createElement('style');
    style.textContent = `
        .scroll-indicator {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f5576c);
            z-index: 9998;
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        indicator.style.width = scrolled + '%';
    });
}

initializeScrollIndicator();

/* ==========================================
   PARTICLES BACKGROUND (Optional)
   ========================================== */

function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-background';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);

    const particles = 50;
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(102, 126, 234, ${Math.random() * 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
        `;
        particleContainer.appendChild(particle);
    }
}

// Uncomment to enable particles background
// createParticles();

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

// Get all elements by class name
function getElements(className) {
    return document.querySelectorAll(`.${className}`);
}

// Add class to multiple elements
function addClassToElements(elements, className) {
    elements.forEach(element => {
        element.classList.add(className);
    });
}

// Remove class from multiple elements
function removeClassFromElements(elements, className) {
    elements.forEach(element => {
        element.classList.remove(className);
    });
}

// Log for debugging (remove in production)
console.log('Portfolio website loaded successfully!');
console.log('All interactive features are active.');
