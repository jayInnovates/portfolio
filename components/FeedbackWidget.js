// Main feedback widget component
class FeedbackWidget {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.conversationId = this.generateConversationId();
        this.isTyping = false;
        this.messageQueue = [];
        this.init();
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
        this.loadConversationHistory();
    }

    createWidget() {
        // Create the floating chat button
        const chatButton = document.createElement('div');
        chatButton.id = 'chat-button';
        chatButton.className = 'chat-button';
        chatButton.innerHTML = `
            <div class="chat-button-icon">
                <i class="fas fa-comments"></i>
            </div>
            <div class="chat-button-notification" id="chat-notification" style="display: none;">
                <span>1</span>
            </div>
        `;

        // Create the chat interface
        const chatInterface = document.createElement('div');
        chatInterface.id = 'chat-interface';
        chatInterface.className = 'chat-interface';
        chatInterface.innerHTML = `
            <div class="chat-header">
                <div class="chat-header-info">
                    <div class="chat-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="chat-header-text">
                        <h4>Jay's AI Assistant</h4>
                        <span class="chat-status">Online</span>
                    </div>
                </div>
                <div class="chat-header-actions">
                    <button class="chat-action-btn" id="clear-chat" title="Clear Chat">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="chat-action-btn" id="minimize-chat" title="Minimize">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="welcome-message">
                    <div class="message ai-message">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <p>Hi! I'm Jay's AI assistant. I can help you learn about his projects, skills, and experience in robotics, AI, and embedded systems. What would you like to know?</p>
                            <span class="message-time">${this.getCurrentTime()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-typing" id="chat-typing" style="display: none;">
                <div class="typing-indicator">
                    <div class="typing-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="chat-input-container">
                <div class="chat-input-wrapper">
                    <input type="text" id="chat-input" placeholder="Ask about Jay's projects, skills, or experience..." maxlength="1000">
                    <button id="send-message" class="send-button">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                <div class="chat-quick-actions">
                    <button class="quick-action-btn" data-message="Tell me about Jay's projects">
                        Projects
                    </button>
                    <button class="quick-action-btn" data-message="What are Jay's technical skills?">
                        Skills
                    </button>
                    <button class="quick-action-btn" data-message="How can I contact Jay?">
                        Contact
                    </button>
                </div>
            </div>
        `;

        // Append to body
        document.body.appendChild(chatButton);
        document.body.appendChild(chatInterface);
    }

    attachEventListeners() {
        const chatButton = document.getElementById('chat-button');
        const chatInterface = document.getElementById('chat-interface');
        const minimizeBtn = document.getElementById('minimize-chat');
        const clearBtn = document.getElementById('clear-chat');
        const sendBtn = document.getElementById('send-message');
        const chatInput = document.getElementById('chat-input');
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');

        // Toggle chat interface
        chatButton.addEventListener('click', () => this.toggleChat());
        minimizeBtn.addEventListener('click', () => this.toggleChat());

        // Clear chat
        clearBtn.addEventListener('click', () => this.clearChat());

        // Send message
        sendBtn.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Quick actions
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                chatInput.value = message;
                this.sendMessage();
            });
        });

        // Auto-resize input
        chatInput.addEventListener('input', () => {
            this.adjustInputHeight();
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !chatInterface.contains(e.target) && !chatButton.contains(e.target)) {
                // Don't close immediately, add a small delay
                setTimeout(() => {
                    if (!chatInterface.matches(':hover')) {
                        this.toggleChat();
                    }
                }, 100);
            }
        });
    }

    toggleChat() {
        const chatInterface = document.getElementById('chat-interface');
        const chatButton = document.getElementById('chat-button');
        const notification = document.getElementById('chat-notification');

        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            chatInterface.classList.add('chat-open');
            chatButton.classList.add('chat-active');
            notification.style.display = 'none';
            
            // Focus input after animation
            setTimeout(() => {
                document.getElementById('chat-input').focus();
            }, 300);
            
            // Scroll to bottom
            this.scrollToBottom();
        } else {
            chatInterface.classList.remove('chat-open');
            chatButton.classList.remove('chat-active');
        }
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (!message) return;

        // Clear input
        input.value = '';
        this.adjustInputHeight();

        // Add user message to chat
        this.addMessage(message, 'user');

        // Show typing indicator
        this.showTyping();

        try {
            // Import and use OpenAI service
            const { default: openaiService } = await import('../utils/openai.js');
            const { default: emailService } = await import('../utils/emailService.js');
            const { default: rateLimiter } = await import('../utils/rateLimiter.js');

            // Check rate limiting
            if (!rateLimiter.isAllowed('user')) {
                throw new Error('Rate limit exceeded. Please wait before sending another message.');
            }

            // Validate message
            const validation = openaiService.validateMessage(message);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            // Get AI response
            const aiResponse = await openaiService.generateResponse(message, this.conversationHistory);

            // Hide typing indicator
            this.hideTyping();

            // Add AI response to chat
            this.addMessage(aiResponse, 'ai');

            // Update conversation history
            this.conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: aiResponse }
            );

            // Send email notification
            await emailService.sendFeedback({
                userMessage: message,
                aiResponse: aiResponse,
                conversationId: this.conversationId,
                conversationHistory: this.conversationHistory,
                timestamp: new Date().toISOString()
            });

            // Save conversation
            this.saveConversationHistory();

        } catch (error) {
            console.error('Error sending message:', error);
            this.hideTyping();
            this.addMessage(
                `I apologize, but I encountered an error: ${error.message}. Please try again or contact Jay directly at jay_ug_24@ee.nits.ac.in.`,
                'ai',
                true
            );
        }
    }

    addMessage(content, sender, isError = false) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message ${isError ? 'error-message' : ''}`;

        const avatar = sender === 'user' ? 
            '<i class="fas fa-user"></i>' : 
            '<i class="fas fa-robot"></i>';

        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${avatar}
            </div>
            <div class="message-content">
                <p>${this.formatMessage(content)}</p>
                <span class="message-time">${this.getCurrentTime()}</span>
                <div class="message-actions">
                    <button class="message-action-btn copy-btn" title="Copy message">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);

        // Add copy functionality
        const copyBtn = messageDiv.querySelector('.copy-btn');
        copyBtn.addEventListener('click', () => this.copyMessage(content));

        // Animate message appearance
        setTimeout(() => {
            messageDiv.classList.add('message-appear');
        }, 50);

        this.scrollToBottom();
    }

    formatMessage(content) {
        // Basic formatting for links, bold text, etc.
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
            .replace(/\n/g, '<br>');
    }

    showTyping() {
        const typingIndicator = document.getElementById('chat-typing');
        typingIndicator.style.display = 'block';
        this.isTyping = true;
        this.scrollToBottom();
    }

    hideTyping() {
        const typingIndicator = document.getElementById('chat-typing');
        typingIndicator.style.display = 'none';
        this.isTyping = false;
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    adjustInputHeight() {
        const input = document.getElementById('chat-input');
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    }

    clearChat() {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = `
            <div class="welcome-message">
                <div class="message ai-message">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>Chat cleared! How can I help you learn about Jay's work?</p>
                        <span class="message-time">${this.getCurrentTime()}</span>
                    </div>
                </div>
            </div>
        `;
        
        this.conversationHistory = [];
        this.conversationId = this.generateConversationId();
        this.saveConversationHistory();
    }

    copyMessage(content) {
        navigator.clipboard.writeText(content).then(() => {
            this.showNotification('Message copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = content;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Message copied to clipboard!');
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'chat-notification-popup';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    generateConversationId() {
        return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    saveConversationHistory() {
        localStorage.setItem('chatConversationHistory', JSON.stringify({
            history: this.conversationHistory,
            conversationId: this.conversationId,
            timestamp: Date.now()
        }));
    }

    loadConversationHistory() {
        const saved = localStorage.getItem('chatConversationHistory');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                // Only load if less than 24 hours old
                if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
                    this.conversationHistory = data.history || [];
                    this.conversationId = data.conversationId || this.generateConversationId();
                }
            } catch (error) {
                console.error('Error loading conversation history:', error);
            }
        }
    }
}

// Initialize the feedback widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FeedbackWidget();
});

export default FeedbackWidget;
