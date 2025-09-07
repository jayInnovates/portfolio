# AI-Integrated Live Feedback System Setup Guide

## Overview
This guide will help you set up the AI-powered feedback system for your portfolio website. The system includes real-time chat with OpenAI integration and email notifications.

## Prerequisites
1. OpenAI API key
2. EmailJS account (free tier available)
3. Modern web browser with JavaScript enabled

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in your project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit the `.env` file with your actual credentials:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-actual-openai-api-key

# EmailJS Configuration (Get these from https://www.emailjs.com/)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key

# Email Configuration
RECIPIENT_EMAIL=jay_ug_24@ee.nits.ac.in
```

### 2. OpenAI API Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

**Important**: Keep your API key secure and never commit it to version control.

### 3. EmailJS Setup

1. Go to [EmailJS](https://www.emailjs.com/)
2. Create a free account
3. Add an email service (Gmail, Outlook, etc.)
4. Create an email template with these variables:
   - `{{to_email}}` - Recipient email
   - `{{from_name}}` - Sender name
   - `{{subject}}` - Email subject
   - `{{message}}` - Message content
   - `{{timestamp}}` - Timestamp
   - `{{conversation_id}}` - Conversation ID

5. Copy your Service ID, Template ID, and Public Key to `.env`

### 4. Email Template Example

Create an EmailJS template with this structure:

```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})
Time: {{timestamp}}
Conversation ID: {{conversation_id}}

Message:
{{message}}

---
This message was sent from Jay's Portfolio AI Assistant.
```

### 5. Testing the System

1. Start your local server:
   ```bash
   python3 -m http.server 8000
   ```

2. Open your browser and navigate to `http://localhost:8000`

3. Look for the floating chat button in the bottom-right corner

4. Test the chat functionality:
   - Click the chat button to open the interface
   - Send a test message like "Tell me about Jay's projects"
   - Verify AI responses are working
   - Check that emails are being sent to your configured address

### 6. Features Included

#### Chat Interface
- Floating chat button with notification badge
- Expandable chat interface with smooth animations
- Message history with timestamps
- Typing indicators
- Quick action buttons for common queries
- Copy message functionality
- Clear chat option

#### AI Integration
- OpenAI GPT-3.5-turbo integration
- Context-aware responses about your portfolio
- Fallback responses for API failures
- Rate limiting (50 messages per hour per user)
- Message validation and sanitization

#### Email System
- Automatic email notifications for all conversations
- Formatted email templates
- Conversation history tracking
- Fallback logging when email fails

#### Security Features
- Rate limiting to prevent spam
- Message length validation
- Input sanitization
- Secure API key handling

### 7. Customization Options

#### Modify AI Responses
Edit `utils/config.js` to customize the AI system prompt and behavior.

#### Styling
Modify `feedback-widget.css` to match your design preferences.

#### Rate Limiting
Adjust rate limits in `utils/config.js`:
```javascript
rateLimiting: {
    maxMessagesPerHour: 50, // Adjust as needed
    maxMessageLength: 1000  // Adjust as needed
}
```

### 8. Troubleshooting

#### Chat Button Not Appearing
- Check browser console for JavaScript errors
- Ensure all files are properly linked in `index.html`
- Verify the CSS file is loading correctly

#### AI Responses Not Working
- Verify OpenAI API key is correct and has credits
- Check browser console for API errors
- Ensure rate limits haven't been exceeded

#### Emails Not Sending
- Verify EmailJS configuration
- Check EmailJS dashboard for service status
- Review browser console for EmailJS errors

#### Mobile Responsiveness Issues
- The widget is designed to be mobile-friendly
- Test on various screen sizes
- Adjust CSS media queries if needed

### 9. Production Deployment

When deploying to production:

1. **Never expose API keys in client-side code**
2. Consider implementing a backend proxy for OpenAI API calls
3. Set up proper CORS headers if needed
4. Monitor API usage and costs
5. Implement additional security measures as needed

### 10. Cost Considerations

#### OpenAI API Costs
- GPT-3.5-turbo: ~$0.002 per 1K tokens
- Monitor usage in OpenAI dashboard
- Set usage limits to control costs

#### EmailJS Limits
- Free tier: 200 emails/month
- Upgrade if you need more capacity

### 11. Support and Maintenance

- Monitor conversation logs for improvements
- Update AI prompts based on common queries
- Review and respond to important conversations
- Keep dependencies updated for security

## File Structure

```
portfolio-website/
├── components/
│   └── FeedbackWidget.js      # Main widget component
├── utils/
│   ├── config.js              # Configuration settings
│   ├── openai.js              # OpenAI API integration
│   ├── emailService.js        # Email service integration
│   └── rateLimiter.js         # Rate limiting utility
├── feedback-widget.css        # Widget styling
├── .env                       # Environment variables (create this)
├── .env.example              # Environment template
└── package.json              # Project dependencies
```

## Security Best Practices

1. **API Key Security**: Never commit API keys to version control
2. **Rate Limiting**: Implemented to prevent abuse
3. **Input Validation**: All user inputs are validated and sanitized
4. **HTTPS**: Use HTTPS in production
5. **Content Security Policy**: Consider implementing CSP headers

## Analytics and Monitoring

The system includes built-in logging and conversation tracking:
- Conversation history is stored locally (24-hour retention)
- Email notifications include full conversation context
- Rate limiting statistics are tracked
- Error logging for debugging

Your AI feedback system is now ready to provide intelligent, real-time assistance to your portfolio visitors!
