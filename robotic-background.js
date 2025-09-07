class RoboticBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.circuits = [];
        this.nodes = [];
        this.gears = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        this.config = {
            circuitCount: 0,
            nodeCount: 0,
            gearCount: 3,
            circuitColor: '#00ffea',
            nodeColor: '#0066ff',
            gearColor: '#00ffea',
            backgroundColor: 'transparent',
            pulseSpeed: 0.02,
            gearSpeed: 0.005,
            lineWidth: 1,
            nodeSize: 3,
            gearSize: 40
        };
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createCircuits();
        this.createNodes();
        this.createGears();
        this.bindEvents();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'robotic-background';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            pointer-events: none;
            opacity: 0.3;
        `;
        
        document.body.insertBefore(this.canvas, document.body.firstChild);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }
    
    createCircuits() {
        this.circuits = [];
        for (let i = 0; i < this.config.circuitCount; i++) {
            this.circuits.push({
                x1: Math.random() * this.canvas.width,
                y1: Math.random() * this.canvas.height,
                x2: Math.random() * this.canvas.width,
                y2: Math.random() * this.canvas.height,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: this.config.pulseSpeed + Math.random() * 0.01,
                opacity: 0.3 + Math.random() * 0.4
            });
        }
    }
    
    createNodes() {
        this.nodes = [];
        for (let i = 0; i < this.config.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: this.config.pulseSpeed + Math.random() * 0.02,
                size: this.config.nodeSize + Math.random() * 3,
                opacity: 0.4 + Math.random() * 0.6
            });
        }
    }
    
    createGears() {
        this.gears = [];
        for (let i = 0; i < this.config.gearCount; i++) {
            this.gears.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                rotation: 0,
                rotationSpeed: this.config.gearSpeed + Math.random() * 0.01,
                size: this.config.gearSize + Math.random() * 20,
                opacity: 0.1 + Math.random() * 0.2,
                teeth: 8 + Math.floor(Math.random() * 4)
            });
        }
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        window.addEventListener('resize', () => {
            this.resize();
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Redistribute elements on resize
        if (this.circuits.length > 0) {
            this.createCircuits();
            this.createNodes();
            this.createGears();
        }
    }
    
    drawCircuits() {
        this.circuits.forEach(circuit => {
            circuit.pulse += circuit.pulseSpeed;
            const pulseIntensity = (Math.sin(circuit.pulse) + 1) / 2;
            const opacity = circuit.opacity * pulseIntensity;
            
            this.ctx.save();
            this.ctx.globalAlpha = opacity;
            this.ctx.strokeStyle = this.config.circuitColor;
            this.ctx.lineWidth = this.config.lineWidth;
            this.ctx.shadowColor = this.config.circuitColor;
            this.ctx.shadowBlur = 3;
            
            this.ctx.beginPath();
            this.ctx.moveTo(circuit.x1, circuit.y1);
            this.ctx.lineTo(circuit.x2, circuit.y2);
            this.ctx.stroke();
            this.ctx.restore();
        });
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            node.pulse += node.pulseSpeed;
            const pulseIntensity = (Math.sin(node.pulse) + 1) / 2;
            const size = node.size * (0.8 + pulseIntensity * 0.4);
            const opacity = node.opacity * pulseIntensity;
            
            this.ctx.save();
            this.ctx.globalAlpha = opacity;
            this.ctx.fillStyle = this.config.nodeColor;
            this.ctx.shadowColor = this.config.nodeColor;
            this.ctx.shadowBlur = 5;
            
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    drawGears() {
        this.gears.forEach(gear => {
            gear.rotation += gear.rotationSpeed;
            
            this.ctx.save();
            this.ctx.globalAlpha = gear.opacity;
            this.ctx.strokeStyle = this.config.gearColor;
            this.ctx.lineWidth = 2;
            this.ctx.translate(gear.x, gear.y);
            this.ctx.rotate(gear.rotation);
            
            // Draw gear
            const outerRadius = gear.size;
            const innerRadius = gear.size * 0.7;
            const toothHeight = gear.size * 0.2;
            
            this.ctx.beginPath();
            for (let i = 0; i < gear.teeth; i++) {
                const angle = (i / gear.teeth) * Math.PI * 2;
                const nextAngle = ((i + 1) / gear.teeth) * Math.PI * 2;
                
                // Outer tooth
                this.ctx.lineTo(
                    Math.cos(angle) * outerRadius,
                    Math.sin(angle) * outerRadius
                );
                this.ctx.lineTo(
                    Math.cos(angle + 0.1) * (outerRadius + toothHeight),
                    Math.sin(angle + 0.1) * (outerRadius + toothHeight)
                );
                this.ctx.lineTo(
                    Math.cos(nextAngle - 0.1) * (outerRadius + toothHeight),
                    Math.sin(nextAngle - 0.1) * (outerRadius + toothHeight)
                );
            }
            this.ctx.closePath();
            this.ctx.stroke();
            
            // Inner circle
            this.ctx.beginPath();
            this.ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.restore();
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawCircuits();
        this.drawNodes();
        this.drawGears();
        
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

// Initialize robotic background
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.roboticBackground = new RoboticBackground();
    }, 100);
});
