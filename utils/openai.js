// OpenAI API integration utility
import config from './config.js';

class OpenAIService {
    constructor() {
        this.apiKey = config.openai.apiKey;
        this.model = config.openai.model;
        this.baseURL = 'https://api.openai.com/v1/chat/completions';
    }

    async generateResponse(userMessage, conversationHistory = []) {
        if (!this.apiKey) {
            throw new Error('OpenAI API key not configured');
        }

        const messages = [
            { role: 'system', content: config.systemPrompt },
            ...conversationHistory,
            { role: 'user', content: userMessage }
        ];

        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: messages,
                    max_tokens: config.openai.maxTokens,
                    temperature: config.openai.temperature,
                    stream: false
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            return data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response at the moment.';
        } catch (error) {
            console.error('OpenAI API Error:', error);
            return this.getFallbackResponse(userMessage);
        }
    }

    getFallbackResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('project') || message.includes('work')) {
            return "I'd be happy to tell you about Jay's projects! He's worked on fascinating projects including a Self-Balancing Robot with MultiWii firmware, a Drone Flag Hosting system with precision locking mechanism, and a Raspberry Pi 5 Cyberdeck with neuro-adaptive AI features. Which project interests you most?";
        }
        
        if (message.includes('skill') || message.includes('technology')) {
            return "Jay specializes in Arduino and embedded systems, control systems and robotics, sensor integration, drone technology, and AI-driven projects. He's particularly skilled with Python, C/C++, and hardware-software integration. What specific technology would you like to know more about?";
        }
        
        if (message.includes('contact') || message.includes('hire') || message.includes('collaborate')) {
            return "You can reach Jay directly at jay_ug_24@ee.nits.ac.in for collaboration opportunities or project discussions. He's always interested in innovative projects involving robotics, AI, and embedded systems!";
        }
        
        if (message.includes('education') || message.includes('background')) {
            return "Jay is currently pursuing BTech in Electrical Engineering at NIT Silchar (2024-Present). He's also a Technical Team Member at IEI NIT Silchar and completed a project internship at Nephrocare India. His academic focus is on robotics, AI, and embedded systems.";
        }
        
        return "I'm here to help you learn about Jay's work in robotics, AI, and embedded systems. Feel free to ask about his projects, skills, or experience. For specific inquiries or collaboration opportunities, you can contact him directly at jay_ug_24@ee.nits.ac.in.";
    }

    validateMessage(message) {
        if (!message || typeof message !== 'string') {
            return { valid: false, error: 'Message is required and must be a string' };
        }
        
        if (message.length > config.rateLimiting.maxMessageLength) {
            return { valid: false, error: `Message too long. Maximum ${config.rateLimiting.maxMessageLength} characters allowed.` };
        }
        
        if (message.trim().length < 3) {
            return { valid: false, error: 'Message too short. Please provide a more detailed question.' };
        }
        
        return { valid: true };
    }
}

export default new OpenAIService();
