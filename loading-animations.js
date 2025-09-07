/**
 * Advanced Loading Animations
 * Provides sophisticated loading states and transitions
 */

class LoadingAnimations {
    constructor() {
        this.isLoading = false;
        this.loadingOverlay = null;
        this.skeletonElements = new Map();
    }

    init() {
        this.createLoadingOverlay();
        this.setupPageLoadAnimation();
        this.setupSkeletonScreens();
        this.setupImageLazyLoading();
    }

    /**
     * Create main loading overlay
     */
    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">
                    <div class="circuit-loader">
                        <div class="circuit-path"></div>
                        <div class="circuit-path"></div>
                        <div class="circuit-path"></div>
                    </div>
                    <div class="loading-text">Jay<span class="accent">.</span></div>
                </div>
                <div class="loading-progress">
                    <div class="progress-line"></div>
                    <div class="progress-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
                <div class="loading-status">Initializing portfolio...</div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.loadingOverlay = overlay;
    }

    /**
     * Setup page load animation sequence
     */
    setupPageLoadAnimation() {
        const loadingSteps = [
            { text: 'Loading assets...', duration: 800 },
            { text: 'Initializing components...', duration: 600 },
            { text: 'Preparing experience...', duration: 400 },
            { text: 'Ready!', duration: 200 }
        ];

        let currentStep = 0;
        const statusElement = document.querySelector('.loading-status');
        
        const updateStep = () => {
            if (currentStep < loadingSteps.length) {
                const step = loadingSteps[currentStep];
                statusElement.textContent = step.text;
                
                setTimeout(() => {
                    currentStep++;
                    updateStep();
                }, step.duration);
            } else {
                this.hideLoadingOverlay();
            }
        };

        // Start animation after a brief delay
        setTimeout(updateStep, 500);
    }

    /**
     * Hide loading overlay with animation
     */
    hideLoadingOverlay() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.add('fade-out');
            
            setTimeout(() => {
                this.loadingOverlay.remove();
                this.isLoading = false;
                this.triggerPageReveal();
            }, 800);
        }
    }

    /**
     * Trigger page reveal animation
     */
    triggerPageReveal() {
        document.body.classList.add('loaded');
        
        // Animate sections in sequence
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('reveal');
            }, index * 150);
        });
    }

    /**
     * Setup skeleton screens for content loading
     */
    setupSkeletonScreens() {
        const skeletonTargets = [
            { selector: '.project-card', type: 'card' },
            { selector: '.skill-pill', type: 'pill' },
            { selector: '.experience-item', type: 'timeline' }
        ];

        skeletonTargets.forEach(target => {
            const elements = document.querySelectorAll(target.selector);
            elements.forEach(element => {
                this.createSkeletonFor(element, target.type);
            });
        });
    }

    /**
     * Create skeleton loader for specific element
     */
    createSkeletonFor(element, type) {
        const skeleton = document.createElement('div');
        skeleton.className = `skeleton skeleton-${type}`;
        
        switch (type) {
            case 'card':
                skeleton.innerHTML = `
                    <div class="skeleton-image"></div>
                    <div class="skeleton-content">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text short"></div>
                    </div>
                `;
                break;
            case 'pill':
                skeleton.innerHTML = `
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-text"></div>
                `;
                break;
            case 'timeline':
                skeleton.innerHTML = `
                    <div class="skeleton-dot"></div>
                    <div class="skeleton-content">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-text"></div>
                    </div>
                `;
                break;
        }

        element.style.position = 'relative';
        element.appendChild(skeleton);
        this.skeletonElements.set(element, skeleton);

        // Remove skeleton after content loads
        setTimeout(() => {
            this.removeSkeleton(element);
        }, 1000 + Math.random() * 1000);
    }

    /**
     * Remove skeleton loader
     */
    removeSkeleton(element) {
        const skeleton = this.skeletonElements.get(element);
        if (skeleton) {
            skeleton.classList.add('fade-out');
            setTimeout(() => {
                skeleton.remove();
                this.skeletonElements.delete(element);
            }, 300);
        }
    }

    /**
     * Setup enhanced image lazy loading with blur effect
     */
    setupImageLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    /**
     * Load image with smooth transition
     */
    loadImage(img) {
        const placeholder = img.cloneNode();
        placeholder.classList.add('image-placeholder');
        img.parentNode.insertBefore(placeholder, img);

        img.onload = () => {
            img.classList.add('loaded');
            setTimeout(() => {
                placeholder.remove();
            }, 300);
        };

        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    }

    /**
     * Show loading state for async operations
     */
    showLoadingState(element, message = 'Loading...') {
        const loader = document.createElement('div');
        loader.className = 'inline-loader';
        loader.innerHTML = `
            <div class="loader-spinner"></div>
            <span>${message}</span>
        `;
        
        element.style.position = 'relative';
        element.appendChild(loader);
        
        return loader;
    }

    /**
     * Hide loading state
     */
    hideLoadingState(loader) {
        if (loader && loader.parentNode) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
            }, 300);
        }
    }
}

// Initialize loading animations
document.addEventListener('DOMContentLoaded', () => {
    const loadingAnimations = new LoadingAnimations();
    loadingAnimations.init();
    
    // Make globally available
    window.loadingAnimations = loadingAnimations;
});
