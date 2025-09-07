# Email Setup Instructions for Contact Form

## EmailJS Configuration

To enable the contact form to send emails to `jeeaspirant39@gmail.com`, you need to set up EmailJS:

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" 
4. Connect your Gmail account (`jeeaspirant39@gmail.com`)
5. Note down the **Service ID** (e.g., `service_xyz123`)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Note down the **Template ID** (e.g., `template_abc456`)

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., `user_def789`)

### Step 5: Update Configuration
Replace the placeholders in `script.js`:

```javascript
// Line 223: Replace YOUR_PUBLIC_KEY
emailjs.init("user_def789"); // Your actual public key

// Line 264: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID  
emailjs.send('service_xyz123', 'template_abc456', templateParams)
```

### Step 6: Test
1. Deploy your website
2. Fill out the contact form
3. Check `jeeaspirant39@gmail.com` for the email

## Current Status
- ✅ EmailJS library added to HTML
- ✅ Contact form JavaScript updated
- ⏳ Needs EmailJS account setup and configuration
- ⏳ Needs Service ID, Template ID, and Public Key

## Alternative: Formspree (Simpler Option)
If EmailJS seems complex, you can use Formspree:
1. Go to [https://formspree.io/](https://formspree.io/)
2. Create account and get form endpoint
3. Update form action to point to Formspree endpoint

Let me know which option you prefer!
