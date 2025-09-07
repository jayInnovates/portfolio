/**
 * Skills Progress Animation
 * Animates skill progress bars when they come into view
 */

class SkillsAnimation {
    constructor() {
        this.observer = null;
        this.animatedSkills = new Set();
    }

    init() {
        this.setupIntersectionObserver();
        this.observeSkills();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedSkills.has(entry.target)) {
                    this.animateSkill(entry.target);
                    this.animatedSkills.add(entry.target);
                }
            });
        }, options);
    }

    observeSkills() {
        const skillPills = document.querySelectorAll('.skill-pill');
        skillPills.forEach(skill => {
            this.observer.observe(skill);
        });
    }

    animateSkill(skillElement) {
        const progressBar = skillElement.querySelector('.progress-bar');
        const proficiency = skillElement.getAttribute('data-proficiency');
        
        if (progressBar && proficiency) {
            // Add a small delay for staggered animation
            const delay = Math.random() * 500;
            
            setTimeout(() => {
                progressBar.style.width = proficiency + '%';
                
                // Add pulse effect on completion
                setTimeout(() => {
                    progressBar.style.boxShadow = '0 0 10px var(--accent-primary)';
                    setTimeout(() => {
                        progressBar.style.boxShadow = 'none';
                    }, 300);
                }, 1500);
            }, delay);
        }
    }

    // Method to reset animations (useful for testing)
    resetAnimations() {
        this.animatedSkills.clear();
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            bar.style.width = '0%';
            bar.style.boxShadow = 'none';
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const skillsAnimation = new SkillsAnimation();
    skillsAnimation.init();
    
    // Make globally available for debugging
    window.skillsAnimation = skillsAnimation;
});
