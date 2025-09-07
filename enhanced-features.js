// Enhanced Portfolio Features
class PortfolioEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addResumeDownload();
        this.addLazyLoading();
        this.addScrollAnimations();
        this.addThemeToggle();
        this.enhanceContactForm();
        this.addPerformanceOptimizations();
    }

    // Resume Download Feature
    addResumeDownload() {
        const downloadBtn = document.getElementById('download-resume');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.generateAndDownloadResume();
            });
        }
    }

    generateAndDownloadResume() {
        // Create resume content
        const resumeContent = this.createResumeHTML();
        
        // Create a temporary element for PDF generation
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Jay Vishwakarma - Resume</title>
                <style>
                    body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
                    .resume-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #00d4ff; padding-bottom: 20px; }
                    .resume-header h1 { color: #1a1a2e; margin: 0; font-size: 2.5em; }
                    .resume-header p { color: #666; margin: 5px 0; }
                    .section { margin-bottom: 25px; }
                    .section h2 { color: #1a1a2e; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; }
                    .project-item, .experience-item { margin-bottom: 15px; }
                    .project-title, .experience-title { font-weight: 600; color: #1a1a2e; }
                    .tech-tags { margin-top: 5px; }
                    .tech-tag { background: #00d4ff; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; margin-right: 5px; }
                    .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
                    .contact-info { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                ${resumeContent}
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 1000);
                    }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }

    createResumeHTML() {
        return `
            <div class="resume-header">
                <h1>Jay Vishwakarma</h1>
                <p>Electrical Engineering Student | Robotics & AI Specialist</p>
                <div class="contact-info">
                    <span>📧 jay_ug_24@ee.nits.ac.in</span>
                    <span>📱 +91 7307403938</span>
                    <span>📍 NIT Silchar, Assam, India</span>
                </div>
            </div>

            <div class="section">
                <h2>🎯 Objective</h2>
                <p>Passionate Electrical Engineering student specializing in robotics, AI, and embedded systems. Seeking opportunities to apply innovative solutions in cutting-edge technology projects.</p>
            </div>

            <div class="section">
                <h2>🎓 Education</h2>
                <div class="experience-item">
                    <div class="experience-title">BTech Electrical Engineering</div>
                    <div>NIT Silchar | 2024 - Present</div>
                    <p>Currently in 2nd year, focusing on advanced robotics and AI research</p>
                </div>
            </div>

            <div class="section">
                <h2>🚀 Featured Projects</h2>
                <div class="project-item">
                    <div class="project-title">Self-Balancing Robot</div>
                    <p>MultiWii firmware-based project with advanced PID control and sensor integration</p>
                    <div class="tech-tags">
                        <span class="tech-tag">Arduino</span>
                        <span class="tech-tag">Control Systems</span>
                        <span class="tech-tag">IMU Sensors</span>
                    </div>
                </div>
                <div class="project-item">
                    <div class="project-title">Drone Flag Hosting System</div>
                    <p>Precision locking mechanism for ceremonial flag deployment with GPS navigation</p>
                    <div class="tech-tags">
                        <span class="tech-tag">Drone Technology</span>
                        <span class="tech-tag">GPS Navigation</span>
                        <span class="tech-tag">Flight Control</span>
                    </div>
                </div>
                <div class="project-item">
                    <div class="project-title">Raspberry Pi 5 Cyberdeck</div>
                    <p>Custom cyberdeck with AI integration and advanced hardware interfaces</p>
                    <div class="tech-tags">
                        <span class="tech-tag">Raspberry Pi</span>
                        <span class="tech-tag">AI Integration</span>
                        <span class="tech-tag">Custom Hardware</span>
                    </div>
                </div>
                <div class="project-item">
                    <div class="project-title">IoT Water Pump System</div>
                    <p>NodeMCU-based precision flow control with Firebase monitoring</p>
                    <div class="tech-tags">
                        <span class="tech-tag">IoT</span>
                        <span class="tech-tag">Firebase</span>
                        <span class="tech-tag">NodeMCU</span>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>💼 Experience</h2>
                <div class="experience-item">
                    <div class="experience-title">Technical Team Member - IEI NIT Silchar</div>
                    <div>Aug 2025 – Present</div>
                    <p>Contributing to technical projects, events, and workshops</p>
                </div>
                <div class="experience-item">
                    <div class="experience-title">Project Intern - Nephrocare India</div>
                    <div>June 2025 – August 2025</div>
                    <p>Healthcare technology and system optimization projects</p>
                </div>
            </div>

            <div class="section">
                <h2>🛠️ Technical Skills</h2>
                <div class="skills-grid">
                    <div><strong>Programming:</strong> Python, C/C++, Arduino IDE</div>
                    <div><strong>Hardware:</strong> Arduino, Raspberry Pi, NodeMCU</div>
                    <div><strong>Robotics:</strong> Control Systems, Sensor Integration</div>
                    <div><strong>AI/ML:</strong> Machine Learning, Computer Vision</div>
                    <div><strong>IoT:</strong> Firebase, Cloud Analytics</div>
                    <div><strong>Tools:</strong> PCB Design, 3D Printing, CAD</div>
                </div>
            </div>

            <div class="section">
                <h2>🏆 Achievements</h2>
                <ul>
                    <li>20+ completed technical projects</li>
                    <li>80+ students mentored in robotics and programming</li>
                    <li>Active contributor to open-source projects</li>
                    <li>Technical workshop organizer and speaker</li>
                </ul>
            </div>
        `;
    }

    // Lazy Loading for Images
    addLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Scroll-triggered Animations
    addScrollAnimations() {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(el => animationObserver.observe(el));

        // Add animation classes to existing elements
        document.querySelectorAll('.project-card, .skill-pill, .experience-item').forEach(el => {
            el.classList.add('animate-on-scroll');
        });
    }

    // Theme Toggle
    addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        
        // Add to navigation
        const nav = document.querySelector('.nav-container');
        if (nav) {
            nav.appendChild(themeToggle);
        }

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
        });
    }

    // Enhanced Contact Form
    enhanceContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Enhanced form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'text':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'This field must be at least 2 characters long';
                }
                break;
            default:
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Please provide more details (at least 10 characters)';
                }
        }

        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    showFieldValidation(field, isValid, errorMessage) {
        field.classList.remove('error', 'success');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) existingError.remove();

        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        } else if (field.value.trim()) {
            field.classList.add('success');
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) errorDiv.remove();
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showFormSuccess();
            form.reset();
        } catch (error) {
            this.showFormError('Failed to send message. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showFormSuccess() {
        this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    }

    showFormError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        });
    }

    // Performance Optimizations
    addPerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Add loading states
        this.addLoadingStates();
        
        // Optimize animations
        this.optimizeAnimations();
    }

    preloadCriticalResources() {
        const criticalImages = ['images/profile.jpeg', 'SBT.jpeg', 'drone.jpeg', 'iotpump.png'];
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    addLoadingStates() {
        // Add skeleton loading for project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const img = card.querySelector('img');
            if (img) {
                img.addEventListener('load', () => {
                    card.classList.add('loaded');
                });
            }
        });
    }

    optimizeAnimations() {
        // Use CSS containment for better performance
        const animatedElements = document.querySelectorAll('.hero-image, .floating-elements, .project-card');
        animatedElements.forEach(el => {
            el.style.contain = 'layout style paint';
        });
    }
}

// Initialize enhanced features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioEnhancements();
});

export default PortfolioEnhancements;
