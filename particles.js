class ParticleBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        // Configuration
        this.config = {
            particleCount: 80,
            particleSpeed: 1,
            linkDistance: 150,
            repulseDistance: 100,
            particleColor: '#00ffea',
            linkColor: '#00ffea',
            backgroundColor: '#0f0f0f',
            particleOpacity: 0.5,
            linkOpacity: 0.3,
            particleSize: { min: 1, max: 4 },
            mouseRepulse: true,
            mouseAttract: false
        };
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    createCanvas() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-background';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
            background: ${this.config.backgroundColor};
        `;
        
        // Insert canvas as first child of body
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.particleSpeed,
                vy: (Math.random() - 0.5) * this.config.particleSpeed,
                size: Math.random() * (this.config.particleSize.max - this.config.particleSize.min) + this.config.particleSize.min,
                opacity: this.config.particleOpacity,
                originalX: 0,
                originalY: 0
            });
        }
        
        // Store original positions for mouse repulsion
        this.particles.forEach(particle => {
            particle.originalX = particle.x;
            particle.originalY = particle.y;
        });
    }
    
    bindEvents() {
        // Mouse move event
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Resize event
        window.addEventListener('resize', () => {
            this.resize();
        });
        
        // Click event for particle burst
        document.addEventListener('click', (e) => {
            this.addParticles(e.clientX, e.clientY, 4);
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Redistribute particles on resize
        if (this.particles.length > 0) {
            this.particles.forEach(particle => {
                if (particle.x > this.canvas.width) particle.x = this.canvas.width;
                if (particle.y > this.canvas.height) particle.y = this.canvas.height;
            });
        }
    }
    
    addParticles(x, y, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * this.config.particleSpeed * 2,
                vy: (Math.random() - 0.5) * this.config.particleSpeed * 2,
                size: Math.random() * (this.config.particleSize.max - this.config.particleSize.min) + this.config.particleSize.min,
                opacity: this.config.particleOpacity,
                life: 100,
                decay: 0.98
            });
        }
        
        // Remove excess particles
        if (this.particles.length > this.config.particleCount + 20) {
            this.particles.splice(this.config.particleCount, this.particles.length - this.config.particleCount);
        }
    }
    
    updateParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.config.repulseDistance && this.config.mouseRepulse) {
                const force = (this.config.repulseDistance - distance) / this.config.repulseDistance;
                const angle = Math.atan2(dy, dx);
                particle.vx -= Math.cos(angle) * force * 0.5;
                particle.vy -= Math.sin(angle) * force * 0.5;
            }
            
            // Particle decay (for click-generated particles)
            if (particle.life !== undefined) {
                particle.life *= particle.decay;
                particle.opacity = (particle.life / 100) * this.config.particleOpacity;
                
                if (particle.life < 1) {
                    this.particles.splice(index, 1);
                }
            }
            
            // Limit velocity
            const maxVelocity = this.config.particleSpeed * 2;
            particle.vx = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vx));
            particle.vy = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vy));
            
            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = this.config.particleColor;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowColor = this.config.particleColor;
            this.ctx.shadowBlur = particle.size * 2;
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    drawLinks() {
        this.ctx.save();
        this.ctx.globalAlpha = this.config.linkOpacity;
        this.ctx.strokeStyle = this.config.linkColor;
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.linkDistance) {
                    const opacity = (this.config.linkDistance - distance) / this.config.linkDistance;
                    this.ctx.globalAlpha = opacity * this.config.linkOpacity;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.restore();
    }
    
    drawMouseConnections() {
        if (this.mouse.x === 0 && this.mouse.y === 0) return;
        
        this.ctx.save();
        this.ctx.strokeStyle = this.config.linkColor;
        this.ctx.lineWidth = 2;
        
        this.particles.forEach(particle => {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.config.linkDistance) {
                const opacity = (this.config.linkDistance - distance) / this.config.linkDistance;
                this.ctx.globalAlpha = opacity * 0.6;
                
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.stroke();
            }
        });
        this.ctx.restore();
    }
    
    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw
        this.updateParticles();
        this.drawLinks();
        this.drawParticles();
        this.drawMouseConnections();
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
    
    // Public methods for customization
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.createParticles();
    }
    
    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    resume() {
        if (!this.animationId) {
            this.animate();
        }
    }
}

// Initialize particle background when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure other scripts are loaded
    setTimeout(() => {
        window.particleBackground = new ParticleBackground();
    }, 100);
});

// Pause animations when page is not visible (performance optimization)
document.addEventListener('visibilitychange', function() {
    if (window.particleBackground) {
        if (document.hidden) {
            window.particleBackground.pause();
        } else {
            window.particleBackground.resume();
        }
    }
});
