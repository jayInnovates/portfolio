class ProjectModals {
    constructor() {
        this.modals = [];
        this.currentModal = null;
        this.projectData = [
            {
                id: 'self-balancing-robot',
                title: 'Self-Balancing Robot',
                icon: 'fas fa-balance-scale',
                image: 'SBT.jpeg',
                description: 'MultiWii firmware-based project demonstrating advanced control systems and precise sensor integration for autonomous balancing.',
                fullDescription: 'This project showcases the implementation of a self-balancing robot using MultiWii firmware. The system employs advanced PID control algorithms, gyroscope and accelerometer sensors for real-time balance correction. The robot maintains perfect balance while navigating various terrains and can be controlled remotely via smartphone integration.',
                technologies: ['Arduino', 'Control Systems', 'Sensors', 'MultiWii', 'PID Control', 'IMU', 'Motor Control'],
                features: [
                    'Real-time balance correction using 6-DOF IMU sensors',
                    'Advanced PID control algorithm with auto-tuning',
                    'Remote control via smartphone app with live telemetry',
                    'Autonomous navigation with GPS waypoint following',
                    'Obstacle detection using ultrasonic sensors',
                    'Battery monitoring and low-power mode',
                    'Data logging for performance analysis'
                ],
                challenges: [
                    'Implementing stable PID control for dynamic balancing',
                    'Sensor fusion for accurate orientation estimation',
                    'Motor control optimization for smooth operation',
                    'Real-time processing with minimal latency'
                ],
                specifications: {
                    'Microcontroller': 'Arduino Uno R3',
                    'Sensors': 'MPU6050 6-DOF IMU',
                    'Motors': 'DC Geared Motors with Encoders',
                    'Battery': '7.4V 2200mAh Li-Po',
                    'Communication': 'HC-05 Bluetooth Module',
                    'Weight': '1.2 kg',
                    'Max Speed': '2 m/s'
                },
                github: 'https://github.com/jayvishwakarma',
                demo: '#',
                status: 'Completed'
            },
            {
                id: 'drone-flag-hosting',
                title: 'Drone Flag Hosting with Locking Mechanism',
                icon: 'fas fa-flag',
                image: 'drone.jpeg',
                description: 'Advanced drone system designed for flag hosting operations with precision locking mechanism and stable flight control for ceremonial and display purposes.',
                fullDescription: 'This innovative drone project features a sophisticated flag hosting system with precision locking mechanism. Designed for ceremonial events and patriotic displays, the drone can autonomously deploy and secure flags while maintaining stable flight patterns. The system includes GPS positioning, wind compensation, and fail-safe mechanisms for reliable operation.',
                technologies: ['Drone Technology', 'Mechanical Design', 'Flight Control', 'GPS Navigation', 'Servo Control', 'Stabilization'],
                features: [
                    'Precision flag deployment and locking mechanism',
                    'GPS-guided autonomous positioning',
                    'Wind compensation algorithms for stable hovering',
                    'Remote control with live video feed',
                    'Fail-safe automatic landing system',
                    'Battery monitoring with return-to-home feature',
                    'Ceremonial flight patterns programming'
                ],
                challenges: [
                    'Designing lightweight yet robust locking mechanism',
                    'Implementing wind-resistant flight control',
                    'Balancing payload weight with flight stability',
                    'Ensuring reliable flag deployment in various conditions'
                ],
                specifications: {
                    'Frame': 'Custom Carbon Fiber Quadcopter',
                    'Flight Controller': 'Pixhawk 4 with ArduPilot',
                    'Motors': '4x Brushless 2212 920KV',
                    'Propellers': '10x4.5 Carbon Fiber',
                    'Battery': '4S 5000mAh Li-Po',
                    'Payload Capacity': '500g',
                    'Flight Time': '15-20 minutes',
                    'Control Range': '2km'
                },
                github: 'https://github.com/jayvishwakarma',
                demo: '#',
                status: 'Completed'
            },
            {
                id: 'ai-drone-swarm',
                title: 'Autonomous AI Drone Swarm',
                icon: 'fas fa-drone',
                description: 'Cutting-edge project showcasing decentralized intelligence in swarm robotics with coordinated autonomous behavior.',
                fullDescription: 'An advanced swarm robotics project featuring multiple autonomous drones that coordinate their actions through decentralized AI algorithms. The system demonstrates emergent behavior, formation flying, and collaborative task execution.',
                technologies: ['Swarm AI', 'Autonomous Systems', 'Coordination', 'Multi-Agent Systems', 'ROS'],
                features: [
                    'Decentralized swarm intelligence',
                    'Formation flying capabilities',
                    'Collaborative task execution',
                    'Emergency response protocols',
                    'Real-time inter-drone communication'
                ],
                github: '#',
                demo: '#',
                status: 'Completed'
            },
            {
                id: 'raspberry-pi-cyberdeck',
                title: 'Raspberry Pi 5 Cyberdeck',
                icon: 'fas fa-laptop',
                image: 'images/cyberdeck.png',
                description: 'Innovative cyberdeck system integrating neuro-adaptive AI features with advanced hardware-software interfaces.',
                fullDescription: 'A futuristic cyberdeck built around the Raspberry Pi 5, featuring custom hardware interfaces, AI-powered assistance, and a unique cyberpunk aesthetic. The system includes custom PCB designs, 3D-printed enclosures, and advanced cooling solutions for optimal performance.',
                technologies: ['Raspberry Pi', 'Neuro-AI', 'Custom Hardware', 'PCB Design', '3D Printing', 'Linux'],
                features: [
                    'Custom mechanical keyboard with RGB backlighting',
                    'AI-powered voice assistant integration',
                    'Multi-display setup with OLED status screens',
                    'Custom cooling system with temperature monitoring',
                    'Modular expansion ports for additional hardware',
                    'Cyberpunk-inspired LED lighting effects',
                    'Portable battery system with fast charging'
                ],
                challenges: [
                    'Designing compact yet powerful cooling solution',
                    'Integrating multiple displays in limited space',
                    'Optimizing power consumption for portability',
                    'Creating robust custom PCB layouts'
                ],
                specifications: {
                    'Main Board': 'Raspberry Pi 5 8GB',
                    'Display': '7" IPS Touchscreen + 2x OLED',
                    'Storage': '1TB NVMe SSD',
                    'Keyboard': 'Custom 60% Mechanical',
                    'Battery': '20000mAh Power Bank',
                    'Connectivity': 'WiFi 6, Bluetooth 5.2, Ethernet',
                    'Weight': '2.5kg',
                    'Dimensions': '35x25x8cm'
                },
                github: 'https://github.com/jayvishwakarma',
                demo: 'https://youtu.be/hf2gpGZQ-Eo?si=twky6fu64yCMJGAE',
                status: 'Completed'
            },
            {
                id: 'iot-water-pump',
                title: 'IoT Water Pump System',
                icon: 'fas fa-tint',
                image: 'iotpump.png',
                description: 'NodeMCU-based precision flow control system with Firebase monitoring and real-time data analytics.',
                fullDescription: 'A comprehensive IoT solution for automated water management featuring precision flow control, real-time monitoring, and cloud-based analytics. The system includes mobile app integration, automated scheduling, and predictive maintenance capabilities.',
                technologies: ['NodeMCU', 'Firebase', 'IoT', 'Mobile App', 'Cloud Analytics', 'Sensor Integration'],
                features: [
                    'Real-time flow rate and pressure monitoring',
                    'Automated pump control based on soil moisture',
                    'Mobile app for remote monitoring and control',
                    'Cloud-based data analytics and reporting',
                    'Predictive maintenance alerts',
                    'Energy consumption optimization',
                    'Multi-zone irrigation support'
                ],
                challenges: [
                    'Ensuring reliable wireless connectivity in outdoor environments',
                    'Implementing accurate flow measurement algorithms',
                    'Designing weather-resistant sensor enclosures',
                    'Optimizing power consumption for battery operation'
                ],
                specifications: {
                    'Microcontroller': 'NodeMCU ESP8266',
                    'Sensors': 'Flow, Pressure, Soil Moisture, Temperature',
                    'Communication': 'WiFi 802.11n',
                    'Database': 'Firebase Realtime Database',
                    'Power': '12V Solar Panel + Battery Backup',
                    'Pump Rating': '1HP Submersible',
                    'Flow Range': '0-100 L/min',
                    'Operating Range': '500m WiFi'
                },
                github: 'https://github.com/jayvishwakarma',
                demo: '#',
                status: 'Completed'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.createModalContainer();
        this.bindProjectCardEvents();
    }
    
    createModalContainer() {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        modalContainer.innerHTML = `
            <div class="modal-overlay" id="modal-overlay">
                <div class="modal-content" id="modal-content">
                    <div class="modal-header">
                        <div class="modal-title-section">
                            <i class="modal-icon"></i>
                            <h2 class="modal-title"></h2>
                        </div>
                        <button class="modal-close" id="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-status">
                            <span class="status-badge"></span>
                        </div>
                        <div class="modal-description"></div>
                        <div class="modal-features">
                            <h4>Key Features</h4>
                            <ul class="features-list"></ul>
                        </div>
                        <div class="modal-technologies">
                            <h4>Technologies Used</h4>
                            <div class="tech-tags"></div>
                        </div>
                        <div class="modal-actions">
                            <a href="#" class="modal-btn github-btn" target="_blank">
                                <i class="fab fa-github"></i> View Code
                            </a>
                            <a href="#" class="modal-btn demo-btn" target="_blank">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalContainer);
        this.bindModalEvents();
    }
    
    bindProjectCardEvents() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.addEventListener('click', (e) => {
                // Don't prevent default if clicking on project links
                if (e.target.closest('.project-link')) {
                    return; // Allow the link to work normally
                }
                e.preventDefault();
                this.openModal(this.projectData[index]);
            });
            
            card.style.cursor = 'pointer';
        });
    }
    
    bindModalEvents() {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalClose = document.getElementById('modal-close');
        
        modalClose.addEventListener('click', () => this.closeModal());
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
        });
    }
    
    openModal(projectData) {
        const modal = document.getElementById('modal-container');
        const modalIcon = modal.querySelector('.modal-icon');
        const modalTitle = modal.querySelector('.modal-title');
        const statusBadge = modal.querySelector('.status-badge');
        const modalDescription = modal.querySelector('.modal-description');
        const featuresList = modal.querySelector('.features-list');
        const techTags = modal.querySelector('.tech-tags');
        const githubBtn = modal.querySelector('.github-btn');
        const demoBtn = modal.querySelector('.demo-btn');
        
        // Populate modal content
        modalIcon.className = `modal-icon ${projectData.icon}`;
        modalTitle.textContent = projectData.title;
        statusBadge.textContent = projectData.status;
        statusBadge.className = `status-badge status-${projectData.status.toLowerCase().replace(' ', '-')}`;
        modalDescription.textContent = projectData.fullDescription;
        
        // Features
        featuresList.innerHTML = '';
        projectData.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Technologies
        techTags.innerHTML = '';
        projectData.technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techTags.appendChild(tag);
        });
        
        // Links
        githubBtn.href = projectData.github;
        demoBtn.href = projectData.demo;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.currentModal = projectData;
        
        // Animation
        setTimeout(() => {
            modal.querySelector('.modal-content').classList.add('animate');
        }, 50);
    }
    
    closeModal() {
        const modal = document.getElementById('modal-container');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.classList.remove('animate');
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            this.currentModal = null;
        }, 300);
    }
}

// Initialize project modals
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.projectModals = new ProjectModals();
    }, 1000);
});
