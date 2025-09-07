class WavyBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.waves = [];
        this.time = 0;
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createWaves();
        this.bindEvents();
        this.animate();
    }
    
    createCanvas() {
        const contactSection = document.querySelector('#contact');
        if (!contactSection) return;
        
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'wavy-background';
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
        `;
        
        contactSection.style.position = 'relative';
        contactSection.insertBefore(this.canvas, contactSection.firstChild);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }
    
    createWaves() {
        const waveCount = 8;
        
        for (let i = 0; i < waveCount; i++) {
            this.waves.push({
                amplitude: 30 + Math.random() * 50,
                frequency: 0.01 + Math.random() * 0.02,
                phase: Math.random() * Math.PI * 2,
                speed: 0.02 + Math.random() * 0.03,
                offset: i * 80,
                opacity: 0.1 + Math.random() * 0.3,
                mouseInfluence: 0.5 + Math.random() * 1.5
            });
        }
    }
    
    bindEvents() {
        const contactSection = document.querySelector('#contact');
        
        contactSection.addEventListener('mousemove', (e) => {
            const rect = contactSection.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        contactSection.addEventListener('mouseleave', () => {
            this.mouse.x = this.canvas.width / 2;
            this.mouse.y = this.canvas.height / 2;
        });
        
        window.addEventListener('resize', () => {
            this.resize();
        });
    }
    
    resize() {
        const contactSection = document.querySelector('#contact');
        if (!contactSection) return;
        
        const rect = contactSection.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Set default mouse position to center
        this.mouse.x = this.canvas.width / 2;
        this.mouse.y = this.canvas.height / 2;
    }
    
    drawWave(wave, index) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${wave.opacity})`;
        this.ctx.lineWidth = 1.5;
        
        const points = [];
        const resolution = 3;
        
        for (let x = 0; x <= this.canvas.width; x += resolution) {
            // Base wave calculation
            let y = Math.sin(x * wave.frequency + wave.phase + this.time * wave.speed) * wave.amplitude;
            
            // Add secondary wave for complexity
            y += Math.sin(x * wave.frequency * 1.5 + wave.phase * 0.7 + this.time * wave.speed * 1.3) * wave.amplitude * 0.3;
            
            // Mouse influence
            const mouseDistance = Math.sqrt(Math.pow(x - this.mouse.x, 2) + Math.pow(y + wave.offset + this.canvas.height / 2 - this.mouse.y, 2));
            const maxDistance = 200;
            
            if (mouseDistance < maxDistance) {
                const influence = (maxDistance - mouseDistance) / maxDistance;
                const mouseEffect = Math.sin(influence * Math.PI) * wave.mouseInfluence * 30;
                y += mouseEffect;
            }
            
            // Position the wave
            y += wave.offset + this.canvas.height / 2;
            
            points.push({ x, y });
        }
        
        // Draw smooth curve through points
        this.ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length - 2; i++) {
            const cp1x = (points[i].x + points[i + 1].x) / 2;
            const cp1y = (points[i].y + points[i + 1].y) / 2;
            this.ctx.quadraticCurveTo(points[i].x, points[i].y, cp1x, cp1y);
        }
        
        this.ctx.stroke();
        
        // Add glow effect for some waves
        if (index % 2 === 0) {
            this.ctx.shadowColor = 'rgba(0, 255, 255, 0.3)';
            this.ctx.shadowBlur = 10;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Create gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, 'rgba(15, 15, 15, 0.8)');
        gradient.addColorStop(0.5, 'rgba(25, 25, 35, 0.6)');
        gradient.addColorStop(1, 'rgba(15, 15, 15, 0.8)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw waves
        this.waves.forEach((wave, index) => {
            this.drawWave(wave, index);
        });
        
        this.time += 0.016; // ~60fps
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new WavyBackground();
    }, 1000);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.wavyBackground) {
        if (window.wavyBackground.animationId) {
            cancelAnimationFrame(window.wavyBackground.animationId);
        }
    }
});
