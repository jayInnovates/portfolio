class BubbleResume {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.bubbles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.selectedBubble = null;
        this.isActive = false;
        
        this.config = {
            bubbleCount: 5,
            minRadius: 60,
            maxRadius: 100,
            colors: ['#00ffff', '#39ff14', '#bf00ff', '#0066ff', '#ff6600'],
            repelForce: 50,
            attractForce: 30,
            friction: 0.98,
            bounce: 0.8
        };
        
        this.bubbleData = [
            { 
                label: 'About', 
                icon: 'fas fa-user',
                content: 'Passionate Electrical Engineering student at NIT Silchar, specializing in robotics, AI, and embedded systems.'
            },
            { 
                label: 'Skills', 
                icon: 'fas fa-cogs',
                content: 'Python, C++, Arduino, Robotics, Machine Learning, IoT, PCB Design, Control Systems'
            },
            { 
                label: 'Projects', 
                icon: 'fas fa-project-diagram',
                content: 'Self-Balancing Robot, AI Drone Swarm, Cyberdeck Systems'
            },
            { 
                label: 'Experience', 
                icon: 'fas fa-briefcase',
                content: 'IEI Student Member, Nephrocare India Intern, Robotics Projects Lead'
            },
            { 
                label: 'Contact', 
                icon: 'fas fa-envelope',
                content: 'jay_ug_24@ee.nits.ac.in | +91 7307403938 | NIT Silchar, Assam'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.createBubbleSection();
        this.createCanvas();
        this.createBubbles();
        this.bindEvents();
        this.animate();
    }
    
    createBubbleSection() {
        const bubbleSection = document.createElement('section');
        bubbleSection.id = 'bubble-resume';
        bubbleSection.className = 'bubble-resume-section';
        bubbleSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Interactive <span class="accent">Resume</span></h2>
                    <p class="section-subtitle">Click and drag the bubbles to explore my profile</p>
                </div>
                <div class="bubble-container">
                    <canvas id="bubble-canvas"></canvas>
                    <div class="bubble-content" id="bubble-content">
                        <div class="content-close" id="content-close">&times;</div>
                        <div class="content-body" id="content-body"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after skills section
        const skillsSection = document.getElementById('skills');
        skillsSection.parentNode.insertBefore(bubbleSection, skillsSection.nextSibling);
    }
    
    createCanvas() {
        this.canvas = document.getElementById('bubble-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const container = document.querySelector('.bubble-container');
        this.canvas.width = container.offsetWidth;
        this.canvas.height = 500; // Fixed height for bubble area
    }
    
    createBubbles() {
        this.bubbles = [];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        this.bubbleData.forEach((data, index) => {
            const angle = (index / this.bubbleData.length) * Math.PI * 2;
            const distance = 120;
            
            this.bubbles.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                vx: 0,
                vy: 0,
                radius: this.config.minRadius + Math.random() * (this.config.maxRadius - this.config.minRadius),
                color: this.config.colors[index],
                label: data.label,
                icon: data.icon,
                content: data.content,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.02,
                isDragging: false,
                isHovered: false
            });
        });
    }
    
    bindEvents() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            
            this.checkHover();
        });
        
        this.canvas.addEventListener('mousedown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            this.bubbles.forEach(bubble => {
                const dx = mouseX - bubble.x;
                const dy = mouseY - bubble.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < bubble.radius) {
                    bubble.isDragging = true;
                    this.canvas.style.cursor = 'grabbing';
                }
            });
        });
        
        this.canvas.addEventListener('mouseup', () => {
            this.bubbles.forEach(bubble => {
                bubble.isDragging = false;
            });
            this.canvas.style.cursor = 'default';
        });
        
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            this.bubbles.forEach(bubble => {
                const dx = mouseX - bubble.x;
                const dy = mouseY - bubble.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < bubble.radius) {
                    this.showBubbleContent(bubble);
                }
            });
        });
        
        // Close content modal
        document.getElementById('content-close').addEventListener('click', () => {
            this.hideBubbleContent();
        });
    }
    
    checkHover() {
        let isHovering = false;
        this.bubbles.forEach(bubble => {
            const dx = this.mouse.x - bubble.x;
            const dy = this.mouse.y - bubble.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            bubble.isHovered = distance < bubble.radius;
            if (bubble.isHovered) isHovering = true;
        });
        
        this.canvas.style.cursor = isHovering ? 'pointer' : 'default';
    }
    
    showBubbleContent(bubble) {
        const contentDiv = document.getElementById('bubble-content');
        const contentBody = document.getElementById('content-body');
        
        contentBody.innerHTML = `
            <div class="bubble-content-header">
                <i class="${bubble.icon}"></i>
                <h3>${bubble.label}</h3>
            </div>
            <div class="bubble-content-text">
                <p>${bubble.content}</p>
            </div>
        `;
        
        contentDiv.classList.add('active');
        this.selectedBubble = bubble;
    }
    
    hideBubbleContent() {
        const contentDiv = document.getElementById('bubble-content');
        contentDiv.classList.remove('active');
        this.selectedBubble = null;
    }
    
    updateBubbles() {
        this.bubbles.forEach(bubble => {
            bubble.pulse += bubble.pulseSpeed;
            
            if (bubble.isDragging) {
                bubble.x = this.mouse.x;
                bubble.y = this.mouse.y;
                bubble.vx = 0;
                bubble.vy = 0;
            } else {
                // Mouse repulsion
                const dx = bubble.x - this.mouse.x;
                const dy = bubble.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.repelForce + bubble.radius) {
                    const force = (this.config.repelForce + bubble.radius - distance) / (this.config.repelForce + bubble.radius);
                    const angle = Math.atan2(dy, dx);
                    bubble.vx += Math.cos(angle) * force * 0.5;
                    bubble.vy += Math.sin(angle) * force * 0.5;
                }
                
                // Bubble-to-bubble collision
                this.bubbles.forEach(otherBubble => {
                    if (bubble !== otherBubble) {
                        const dx = bubble.x - otherBubble.x;
                        const dy = bubble.y - otherBubble.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const minDistance = bubble.radius + otherBubble.radius;
                        
                        if (distance < minDistance) {
                            const force = (minDistance - distance) / minDistance;
                            const angle = Math.atan2(dy, dx);
                            bubble.vx += Math.cos(angle) * force * 0.3;
                            bubble.vy += Math.sin(angle) * force * 0.3;
                        }
                    }
                });
                
                // Update position
                bubble.x += bubble.vx;
                bubble.y += bubble.vy;
                
                // Apply friction
                bubble.vx *= this.config.friction;
                bubble.vy *= this.config.friction;
                
                // Bounce off walls
                if (bubble.x - bubble.radius < 0) {
                    bubble.x = bubble.radius;
                    bubble.vx *= -this.config.bounce;
                }
                if (bubble.x + bubble.radius > this.canvas.width) {
                    bubble.x = this.canvas.width - bubble.radius;
                    bubble.vx *= -this.config.bounce;
                }
                if (bubble.y - bubble.radius < 0) {
                    bubble.y = bubble.radius;
                    bubble.vy *= -this.config.bounce;
                }
                if (bubble.y + bubble.radius > this.canvas.height) {
                    bubble.y = this.canvas.height - bubble.radius;
                    bubble.vy *= -this.config.bounce;
                }
            }
        });
    }
    
    drawBubbles() {
        this.bubbles.forEach(bubble => {
            const pulseRadius = bubble.radius + Math.sin(bubble.pulse) * 5;
            const glowIntensity = bubble.isHovered ? 1.5 : 1;
            
            this.ctx.save();
            
            // Outer glow
            this.ctx.shadowColor = bubble.color;
            this.ctx.shadowBlur = 20 * glowIntensity;
            this.ctx.globalAlpha = 0.8;
            
            // Bubble gradient
            const gradient = this.ctx.createRadialGradient(
                bubble.x, bubble.y, 0,
                bubble.x, bubble.y, pulseRadius
            );
            gradient.addColorStop(0, bubble.color + '40');
            gradient.addColorStop(0.7, bubble.color + '20');
            gradient.addColorStop(1, bubble.color + '10');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, pulseRadius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Border
            this.ctx.strokeStyle = bubble.color;
            this.ctx.lineWidth = 2;
            this.ctx.globalAlpha = 1;
            this.ctx.stroke();
            
            this.ctx.restore();
            
            // Icon and label
            this.ctx.save();
            this.ctx.fillStyle = '#ffffff';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Icon (using text representation)
            this.ctx.font = '24px FontAwesome';
            this.ctx.fillText('●', bubble.x, bubble.y - 10); // Placeholder for icon
            
            // Label
            this.ctx.font = '14px Inter';
            this.ctx.fillText(bubble.label, bubble.x, bubble.y + 15);
            
            this.ctx.restore();
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateBubbles();
        this.drawBubbles();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize bubble resume
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.bubbleResume = new BubbleResume();
    }, 500);
});
