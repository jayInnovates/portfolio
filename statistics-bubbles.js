class StatisticsBubbles {
    constructor() {
        this.container = document.getElementById('bubblesContainer');
        this.bubbles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.isAnimating = false;
        
        this.colors = ['blue', 'purple', 'pink', 'cyan', 'green', 'orange'];
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        this.createBubbles();
        this.bindEvents();
        this.startAnimation();
        this.animateCounters();
    }
    
    createBubbles() {
        const bubbleCount = 25;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = {
                element: this.createBubbleElement(),
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 60 + 20,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 2
            };
            
            this.setupBubble(bubble);
            this.bubbles.push(bubble);
            this.container.appendChild(bubble.element);
        }
    }
    
    createBubbleElement() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        return bubble;
    }
    
    setupBubble(bubble) {
        bubble.element.className = `bubble ${bubble.color}`;
        bubble.element.style.width = `${bubble.size}px`;
        bubble.element.style.height = `${bubble.size}px`;
        bubble.element.style.left = `${bubble.x}px`;
        bubble.element.style.top = `${bubble.y}px`;
        bubble.element.style.animationDelay = `${Math.random() * 6}s`;
        
        // Add click interaction
        bubble.element.addEventListener('click', () => {
            this.onBubbleClick(bubble);
        });
    }
    
    bindEvents() {
        // Mouse move for interaction
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Intersection observer for animation trigger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating) {
                    this.startAnimation();
                    this.animateCounters();
                }
            });
        });
        
        if (this.container) {
            observer.observe(this.container.parentElement);
        }
    }
    
    startAnimation() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.animate();
    }
    
    animate() {
        this.updateBubbles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    updateBubbles() {
        this.bubbles.forEach(bubble => {
            // Update position
            bubble.x += bubble.vx;
            bubble.y += bubble.vy;
            
            // Bounce off edges
            if (bubble.x <= 0 || bubble.x >= window.innerWidth - bubble.size) {
                bubble.vx *= -1;
                bubble.x = Math.max(0, Math.min(window.innerWidth - bubble.size, bubble.x));
            }
            
            if (bubble.y <= 0 || bubble.y >= window.innerHeight - bubble.size) {
                bubble.vy *= -1;
                bubble.y = Math.max(0, Math.min(window.innerHeight - bubble.size, bubble.y));
            }
            
            // Mouse interaction
            const dx = this.mouse.x - (bubble.x + bubble.size / 2);
            const dy = this.mouse.y - (bubble.y + bubble.size / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance * 0.5;
                const angle = Math.atan2(dy, dx);
                bubble.vx -= Math.cos(angle) * force;
                bubble.vy -= Math.sin(angle) * force;
            }
            
            // Update rotation
            bubble.rotation += bubble.rotationSpeed;
            
            // Apply friction
            bubble.vx *= 0.99;
            bubble.vy *= 0.99;
            
            // Limit velocity
            const maxVelocity = 3;
            bubble.vx = Math.max(-maxVelocity, Math.min(maxVelocity, bubble.vx));
            bubble.vy = Math.max(-maxVelocity, Math.min(maxVelocity, bubble.vy));
            
            // Update DOM element
            bubble.element.style.transform = `translate(${bubble.x}px, ${bubble.y}px) rotate(${bubble.rotation}deg)`;
        });
    }
    
    onBubbleClick(bubble) {
        // Create burst effect
        bubble.element.style.transform += ' scale(1.5)';
        bubble.element.style.filter = 'brightness(2)';
        
        setTimeout(() => {
            bubble.element.style.transform = bubble.element.style.transform.replace(' scale(1.5)', '');
            bubble.element.style.filter = 'brightness(1)';
        }, 300);
        
        // Add some random velocity
        bubble.vx += (Math.random() - 0.5) * 5;
        bubble.vy += (Math.random() - 0.5) * 5;
    }
    
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + '+';
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            // Start animation with delay
            setTimeout(updateCounter, Math.random() * 1000);
        });
    }
    
    handleResize() {
        // Reposition bubbles that are out of bounds
        this.bubbles.forEach(bubble => {
            if (bubble.x > window.innerWidth - bubble.size) {
                bubble.x = window.innerWidth - bubble.size;
            }
            if (bubble.y > window.innerHeight - bubble.size) {
                bubble.y = window.innerHeight - bubble.size;
            }
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.bubbles.forEach(bubble => {
            if (bubble.element && bubble.element.parentNode) {
                bubble.element.parentNode.removeChild(bubble.element);
            }
        });
        
        this.bubbles = [];
        this.isAnimating = false;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are ready
    setTimeout(() => {
        new StatisticsBubbles();
    }, 500);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        if (window.statisticsBubbles) {
            window.statisticsBubbles.isAnimating = false;
        }
    }
});
