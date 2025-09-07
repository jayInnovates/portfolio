class OrbitingIcons {
    constructor() {
        this.container = null;
        this.icons = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.centerX = 0;
        this.centerY = 0;
        this.orbitRadius = 180;
        this.time = 0;
        
        this.iconData = [
            { icon: 'fas fa-robot', angle: 0, speed: 0.008, distance: 160 },
            { icon: 'fas fa-microchip', angle: Math.PI * 2/3, speed: 0.006, distance: 200 },
            { icon: 'fas fa-drone', angle: Math.PI * 4/3, speed: 0.01, distance: 140 },
            { icon: 'fas fa-cog', angle: Math.PI, speed: 0.005, distance: 220 },
            { icon: 'fas fa-satellite', angle: Math.PI/2, speed: 0.009, distance: 180 }
        ];
        
        this.init();
    }
    
    init() {
        this.findContainer();
        if (this.container) {
            this.createIcons();
            this.bindEvents();
            this.animate();
        }
    }
    
    findContainer() {
        this.container = document.querySelector('.floating-elements');
        if (this.container) {
            // Clear existing static icons
            this.container.innerHTML = '';
            
            // Get center position relative to container
            const rect = this.container.getBoundingClientRect();
            this.centerX = rect.width / 2;
            this.centerY = rect.height / 2;
        }
    }
    
    createIcons() {
        this.iconData.forEach((data, index) => {
            const iconElement = document.createElement('div');
            iconElement.className = 'orbiting-icon';
            iconElement.innerHTML = `<i class="${data.icon}"></i>`;
            iconElement.style.cssText = `
                position: absolute;
                width: 50px;
                height: 50px;
                background: rgba(15, 15, 15, 0.9);
                border: 2px solid rgba(0, 255, 234, 0.6);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                color: #00ffea;
                box-shadow: 0 0 15px rgba(0, 255, 234, 0.3);
                transition: all 0.3s ease;
                z-index: 5;
                backdrop-filter: blur(5px);
            `;
            
            this.container.appendChild(iconElement);
            
            this.icons.push({
                element: iconElement,
                angle: data.angle,
                speed: data.speed,
                distance: data.distance,
                baseDistance: data.distance,
                parallaxFactor: 0.1 + index * 0.05
            });
        });
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        window.addEventListener('resize', () => {
            this.updateCenter();
        });
    }
    
    updateCenter() {
        if (this.container) {
            const rect = this.container.getBoundingClientRect();
            this.centerX = rect.width / 2;
            this.centerY = rect.height / 2;
        }
    }
    
    animate() {
        this.time += 0.016; // ~60fps
        
        this.icons.forEach((icon, index) => {
            // Update orbit angle
            icon.angle += icon.speed;
            
            // Mouse parallax effect
            const containerRect = this.container.getBoundingClientRect();
            const containerCenterX = containerRect.left + containerRect.width / 2;
            const containerCenterY = containerRect.top + containerRect.height / 2;
            
            const mouseDistanceX = (this.mouse.x - containerCenterX) * icon.parallaxFactor;
            const mouseDistanceY = (this.mouse.y - containerCenterY) * icon.parallaxFactor;
            
            // Calculate position with parallax
            const x = this.centerX + Math.cos(icon.angle) * icon.distance + mouseDistanceX;
            const y = this.centerY + Math.sin(icon.angle) * icon.distance + mouseDistanceY;
            
            // Apply position
            icon.element.style.left = (x - 25) + 'px';
            icon.element.style.top = (y - 25) + 'px';
            
            // Pulsing glow effect
            const pulseIntensity = (Math.sin(this.time * 2 + index) + 1) / 2;
            const glowIntensity = 0.3 + pulseIntensity * 0.4;
            icon.element.style.boxShadow = `0 0 ${15 + pulseIntensity * 10}px rgba(0, 255, 234, ${glowIntensity})`;
            
            // Hover effect detection
            const rect = icon.element.getBoundingClientRect();
            const isHovered = this.mouse.x >= rect.left && this.mouse.x <= rect.right &&
                            this.mouse.y >= rect.top && this.mouse.y <= rect.bottom;
            
            if (isHovered) {
                icon.element.style.transform = 'scale(1.2)';
                icon.element.style.borderColor = 'rgba(0, 255, 234, 1)';
            } else {
                icon.element.style.transform = 'scale(1)';
                icon.element.style.borderColor = 'rgba(0, 255, 234, 0.6)';
            }
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Initialize orbiting icons
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.orbitingIcons = new OrbitingIcons();
    }, 200);
});
