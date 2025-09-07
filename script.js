// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after clicking
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Navbar background on scroll
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }

    // Enhanced scroll animations
    function animateOnScroll() {
        const windowHeight = window.innerHeight;
        const animationOffset = 150;
        
        // Section headers animation
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            const elementTop = header.getBoundingClientRect().top;
            if (elementTop < windowHeight - animationOffset) {
                header.classList.add('animate');
            }
        });
        
        // Project cards animation
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const elementTop = card.getBoundingClientRect().top;
            if (elementTop < windowHeight - animationOffset) {
                card.classList.add('animate');
            }
        });
        
        // Service cards animation
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            const elementTop = card.getBoundingClientRect().top;
            if (elementTop < windowHeight - animationOffset) {
                card.classList.add('animate');
            }
        });
        
        // Skills categories animation
        const skillsCategories = document.querySelectorAll('.skills-category');
        skillsCategories.forEach(category => {
            const elementTop = category.getBoundingClientRect().top;
            if (elementTop < windowHeight - animationOffset) {
                category.classList.add('animate');
            }
        });
        
        // About content animation
        const aboutText = document.querySelector('.about-text');
        const aboutTimeline = document.querySelector('.about-timeline');
        
        if (aboutText) {
            const elementTop = aboutText.getBoundingClientRect().top;
            if (elementTop < windowHeight - animationOffset) {
                aboutText.classList.add('animate');
            }
        }
        
        if (aboutTimeline) {
            const elementTop = aboutTimeline.getBoundingClientRect().top;
            if (elementTop < windowHeight - animationOffset) {
                aboutTimeline.classList.add('animate');
                
                // Animate timeline items with delay
                const timelineItems = aboutTimeline.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                });
            }
        }
        
        // Contact content animation
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form');
        
        if (contactInfo) {
            const elementTop = contactInfo.getBoundingClientRect().top;
            if (elementTop < windowHeight - animationOffset) {
                contactInfo.classList.add('animate');
            }
        }
        
        if (contactForm) {
            const elementTop = contactForm.getBoundingClientRect().top;
            if (elementTop < windowHeight - animationOffset) {
                contactForm.classList.add('animate');
            }
        }

        // Experience section animation
        const experienceItems = document.querySelectorAll('.experience-item');
        experienceItems.forEach(item => {
            const elementTop = item.getBoundingClientRect().top;
            if (elementTop < windowHeight - animationOffset) {
                item.classList.add('animate');
            }
        });
    }

    // Skill bars animation
    function animateSkillBars() {
        const skillsSection = document.querySelector('.skills');
        const skillBars = document.querySelectorAll('.skill-progress');
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 200 && !skillsSection.classList.contains('animated')) {
            skillsSection.classList.add('animated');
            skillsSection.classList.add('visible');
            
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.setProperty('--width', width);
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbar();
        animateOnScroll();
        animateSkillBars();
    });

    // Initial calls
    updateActiveNavLink();
    animateOnScroll();

    // Add fade-in class to elements
    const elementsToAnimate = document.querySelectorAll('.about-content, .skills-category, .service-card, .project-card, .contact-content');
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
    });

    // Typing animation for hero subtitle
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Start typing animation after a delay
    setTimeout(() => {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 80);
    }, 1000);

    // Initialize EmailJS
    emailjs.init("nXisQFEN8kg5eqtMC");

    // Contact form handling with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data directly from form elements
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show sending state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'jeeaspirant39@gmail.com'
            };
            
            // Send email using EmailJS
            emailjs.send('service_pc7fkb', 'template_85du88r', templateParams)
                .then(function(response) {
                    console.log('EmailJS Response:', response);
                    // Always show success if we reach this point
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                })
                .catch(function(error) {
                    console.error('EmailJS Error:', error);
                    // Only show error if there's actually an error
                    showNotification('Failed to send message. Please try again or contact me directly.', 'error');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4ecdc4' : type === 'error' ? '#ff6b6b' : '#00d4ff'};
            color: #0a0a0a;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            font-weight: 500;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        // Close button styles
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #0a0a0a;
            padding: 0;
            line-height: 1;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close functionality
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Parallax effect for hero section
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-icon');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    window.addEventListener('scroll', parallaxEffect);

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth reveal animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Animate sections on scroll
    const sections = document.querySelectorAll('.about-new, .contact-new, .experience-item, .education-item');
    
    sections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('animate');
        }
    });

    // Initialize hero elements for animation
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-social');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Add cursor trail effect
    let mouseX = 0;
    let mouseY = 0;
    let trail = [];

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Performance optimization: throttle scroll events
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    function updateAnimations() {
        updateActiveNavLink();
        updateNavbar();
        animateOnScroll();
        animateSkillBars();
        ticking = false;
    }

    window.addEventListener('scroll', requestTick);
});

// Add CSS for mobile menu
const mobileMenuCSS = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: rgba(10, 10, 10, 0.98);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(10px);
        border-top: 1px solid var(--border-color);
        padding: 2rem 0;
        gap: 1rem;
    }

    .nav-menu.active {
        left: 0;
        display: flex;
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
    }

    .hamburger.active span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
    }
}
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

// Resume download functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadResumeBtn = document.getElementById('download-resume');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.style.pointerEvents = 'none';
            
            // Open PDF in new tab for preview with save option
            window.open('./myResume.pdf', '_blank');
            
            // Reset button after a short delay
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 2000);
        });
    }
});
