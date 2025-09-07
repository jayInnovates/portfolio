// Email service integration using EmailJS
import config from './config.js';

class EmailService {
    constructor() {
        this.serviceId = config.emailjs.serviceId;
        this.templateId = config.emailjs.templateId;
        this.publicKey = config.emailjs.publicKey;
        this.recipientEmail = config.email.recipient;
    }

    async sendFeedback(messageData) {
        if (!this.serviceId || !this.templateId || !this.publicKey) {
            console.warn('EmailJS not configured, logging message instead');
            this.logMessage(messageData);
            return { success: true, message: 'Message received and logged' };
        }

        try {
            // Load EmailJS if not already loaded
            if (typeof emailjs === 'undefined') {
                await this.loadEmailJS();
            }

            const templateParams = {
                to_email: this.recipientEmail,
                from_name: messageData.userName || 'Portfolio Visitor',
                from_email: messageData.userEmail || 'visitor@portfolio.com',
                subject: `Portfolio Feedback: ${messageData.subject || 'AI Chat Conversation'}`,
                message: this.formatMessage(messageData),
                timestamp: new Date().toLocaleString(),
                conversation_id: messageData.conversationId || this.generateConversationId(),
                user_ip: messageData.userIP || 'Unknown'
            };

            const response = await emailjs.send(
                this.serviceId,
                this.templateId,
                templateParams,
                this.publicKey
            );

            return {
                success: true,
                message: 'Feedback sent successfully',
                messageId: response.text
            };
        } catch (error) {
            console.error('Email sending failed:', error);
            // Fallback to logging
            this.logMessage(messageData);
            return {
                success: false,
                message: 'Email sending failed, but message was logged',
                error: error.message
            };
        }
    }

    formatMessage(messageData) {
        const { userMessage, aiResponse, timestamp, conversationHistory } = messageData;
        
        let formattedMessage = `
=== PORTFOLIO AI CHAT CONVERSATION ===

Timestamp: ${timestamp || new Date().toLocaleString()}
Conversation ID: ${messageData.conversationId || 'N/A'}

--- Latest Exchange ---
User: ${userMessage}
AI Response: ${aiResponse}

`;

        if (conversationHistory && conversationHistory.length > 0) {
            formattedMessage += `
--- Conversation History ---
`;
            conversationHistory.forEach((msg, index) => {
                formattedMessage += `${index + 1}. ${msg.role === 'user' ? 'User' : 'AI'}: ${msg.content}\n`;
            });
        }

        formattedMessage += `
--- Technical Details ---
User Agent: ${navigator.userAgent || 'Unknown'}
Page URL: ${window.location.href || 'Unknown'}
Screen Resolution: ${screen.width}x${screen.height}
Timestamp: ${new Date().toISOString()}

=== END CONVERSATION ===
`;

        return formattedMessage;
    }

    logMessage(messageData) {
        // Fallback logging when email service is not available
        console.log('=== PORTFOLIO FEEDBACK LOG ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('User Message:', messageData.userMessage);
        console.log('AI Response:', messageData.aiResponse);
        console.log('Conversation ID:', messageData.conversationId);
        console.log('================================');
        
        // Store in localStorage for development
        const logs = JSON.parse(localStorage.getItem('portfolioFeedbackLogs') || '[]');
        logs.push({
            ...messageData,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 50 logs
        if (logs.length > 50) {
            logs.splice(0, logs.length - 50);
        }
        
        localStorage.setItem('portfolioFeedbackLogs', JSON.stringify(logs));
    }

    async loadEmailJS() {
        return new Promise((resolve, reject) => {
            if (typeof emailjs !== 'undefined') {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => {
                emailjs.init(this.publicKey);
                resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    generateConversationId() {
        return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get stored logs for development/debugging
    getStoredLogs() {
        return JSON.parse(localStorage.getItem('portfolioFeedbackLogs') || '[]');
    }

    // Clear stored logs
    clearStoredLogs() {
        localStorage.removeItem('portfolioFeedbackLogs');
    }
}

export default new EmailService();
