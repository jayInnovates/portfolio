class CircuitBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.circuits = [];
        this.nodes = [];
        this.animationId = null;
        
        this.config = {
            nodeCount: 15,
            circuitColor: '#00ff88',
            nodeColor: '#00ffff',
            glowColor: '#39ff14',
            lineWidth: 2,
            nodeSize: 4,
            glowIntensity: 0.6,
            animationSpeed: 0.02,
            connectionDistance: 200
        };
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createNodes();
        this.createCircuits();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'circuit-background';
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
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createNodes() {
        this.nodes = [];
        for (let i = 0; i < this.config.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.02
            });
        }
    }
    
    createCircuits() {
        this.circuits = [];
        // Create some fixed circuit patterns
        const patterns = [
            // Horizontal lines
            { x1: 0.1, y1: 0.2, x2: 0.3, y2: 0.2 },
            { x1: 0.7, y1: 0.3, x2: 0.9, y2: 0.3 },
            { x1: 0.1, y1: 0.8, x2: 0.4, y2: 0.8 },
            
            // Vertical lines
            { x1: 0.2, y1: 0.1, x2: 0.2, y2: 0.4 },
            { x1: 0.8, y1: 0.6, x2: 0.8, y2: 0.9 },
            
            // L-shapes
            { x1: 0.5, y1: 0.1, x2: 0.5, y2: 0.3, x3: 0.7, y3: 0.3 },
            { x1: 0.3, y1: 0.7, x2: 0.3, y2: 0.9, x3: 0.6, y3: 0.9 }
        ];
        
        patterns.forEach(pattern => {
            this.circuits.push({
                ...pattern,
                glow: Math.random(),
                glowDirection: Math.random() > 0.5 ? 1 : -1,
                glowSpeed: 0.01 + Math.random() * 0.02
            });
        });
    }
    
    updateNodes() {
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            node.pulse += node.pulseSpeed;
            
            // Bounce off edges
            if (node.x <= 0 || node.x >= this.canvas.width) node.vx *= -1;
            if (node.y <= 0 || node.y >= this.canvas.height) node.vy *= -1;
            
            // Keep within bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
        });
    }
    
    updateCircuits() {
        this.circuits.forEach(circuit => {
            circuit.glow += circuit.glowDirection * circuit.glowSpeed;
            if (circuit.glow >= 1 || circuit.glow <= 0) {
                circuit.glowDirection *= -1;
            }
            circuit.glow = Math.max(0, Math.min(1, circuit.glow));
        });
    }
    
    drawCircuits() {
        this.circuits.forEach(circuit => {
            const glowAlpha = 0.3 + (circuit.glow * 0.7);
            
            this.ctx.save();
            this.ctx.strokeStyle = this.config.circuitColor;
            this.ctx.lineWidth = this.config.lineWidth;
            this.ctx.globalAlpha = glowAlpha;
            
            // Add glow effect
            this.ctx.shadowColor = this.config.glowColor;
            this.ctx.shadowBlur = 10 + (circuit.glow * 10);
            
            this.ctx.beginPath();
            this.ctx.moveTo(circuit.x1 * this.canvas.width, circuit.y1 * this.canvas.height);
            this.ctx.lineTo(circuit.x2 * this.canvas.width, circuit.y2 * this.canvas.height);
            
            if (circuit.x3 !== undefined) {
                this.ctx.lineTo(circuit.x3 * this.canvas.width, circuit.y3 * this.canvas.height);
            }
            
            this.ctx.stroke();
            this.ctx.restore();
        });
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            const pulseSize = this.config.nodeSize + Math.sin(node.pulse) * 2;
            const pulseAlpha = 0.5 + Math.sin(node.pulse) * 0.3;
            
            this.ctx.save();
            this.ctx.globalAlpha = pulseAlpha;
            this.ctx.fillStyle = this.config.nodeColor;
            this.ctx.shadowColor = this.config.nodeColor;
            this.ctx.shadowBlur = 15;
            
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    drawConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.connectionDistance) {
                    const alpha = (this.config.connectionDistance - distance) / this.config.connectionDistance * 0.3;
                    
                    this.ctx.save();
                    this.ctx.strokeStyle = this.config.circuitColor;
                    this.ctx.lineWidth = 1;
                    this.ctx.globalAlpha = alpha;
                    this.ctx.shadowColor = this.config.glowColor;
                    this.ctx.shadowBlur = 5;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateNodes();
        this.updateCircuits();
        
        this.drawCircuits();
        this.drawConnections();
        this.drawNodes();
        
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

// Initialize circuit background
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.circuitBackground = new CircuitBackground();
    }, 200);
});
