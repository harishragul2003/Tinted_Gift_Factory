# Email Notification Setup Guide

## Overview

Your application now sends beautiful, animated email notifications for:
- ✅ Customer order confirmations (with order details and tracking)
- ✅ Admin new order alerts (with customer info and action buttons)

## Email Templates Features

### Customer Email
- 🎨 Beautiful gradient design with animations
- 📦 Complete order summary with items list
- 💰 Total amount display
- 🚚 Shipping information
- 🔗 Track order button
- 📱 Mobile responsive

### Admin Email
- 🔔 Urgent alert design with glowing effects
- 👤 Customer contact information
- 📋 Detailed order breakdown
- 💳 Payment and order status
- ⚡ Quick action button to admin panel
- 📊 Professional dashboard-style layout

## Setup Instructions

### Step 1: Configure Gmail App Password

1. **Enable 2-Factor Authentication on Gmail:**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Artify Aura"
   - Copy the 16-character password

### Step 2: Update Environment Variables

#### Local Development (backend/.env)

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=admin@artifyaura.com
FRONTEND_URL=http://localhost:5173
```

#### Production (Render)

Add these environment variables in Render Dashboard:

1. Go to Render Dashboard → artify-aura-api → Environment
2. Add these variables:

```
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = your-16-char-app-password
ADMIN_EMAIL = admin@artifyaura.com
FRONTEND_URL = https://artify-aura.vercel.app
```

3. Save and wait for automatic redeploy

### Step 3: Test Email Notifications

#### Test Locally

1. Start your backend:
   ```bash
   cd backend
   npm start
   ```

2. Create a test order through your frontend
3. Check your email inbox for:
   - Customer confirmation email
   - Admin notification email

#### Test in Production

1. Make sure all environment variables are set in Render
2. Place a test order on your live site
3. Check both customer and admin email inboxes

## Email Configuration Options

### Using Different Email Providers

#### Gmail (Recommended)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

#### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
```

#### Yahoo
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
```

#### Custom SMTP
```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_USER=your-username
EMAIL_PASSWORD=your-password
```

## Troubleshooting

### Emails Not Sending

1. **Check Render Logs:**
   - Go to Render Dashboard → Logs
   - Look for "✅ Order confirmation email sent" or error messages

2. **Verify Gmail Settings:**
   - Make sure 2FA is enabled
   - Use App Password, not regular password
   - Check if "Less secure app access" is needed (older accounts)

3. **Check Spam Folder:**
   - Emails might be in spam initially
   - Mark as "Not Spam" to train filters

4. **Test SMTP Connection:**
   ```javascript
   // Add this to test email sending
   import { sendOrderConfirmation } from './utils/emailService.js';
   
   sendOrderConfirmation('test@example.com', {
     id: 'test-123',
     total_amount: 1000,
     payment_status: 'Pending',
     order_status: 'Processing',
     shipping_address: 'Test Address',
     items: [{ name: 'Test Product', quantity: 1, price: 1000 }]
   });
   ```

### Common Errors

#### "Invalid login: 535-5.7.8 Username and Password not accepted"
- You're using regular password instead of App Password
- Generate a new App Password from Google

#### "Connection timeout"
- Check EMAIL_HOST and EMAIL_PORT
- Verify firewall/network settings
- Try port 465 with `secure: true`

#### "Self signed certificate"
- Add to transporter config:
  ```javascript
  tls: { rejectUnauthorized: false }
  ```

### Email Not Received

1. **Check email address is correct**
2. **Look in spam/junk folder**
3. **Check Render logs for sending confirmation**
4. **Verify EMAIL_USER has sending permissions**
5. **Check Gmail daily sending limits (500 emails/day for free accounts)**

## Customization

### Change Email Design

Edit `backend/utils/emailService.js`:

- **Colors:** Change gradient colors in style attributes
- **Logo:** Add your logo image URL
- **Content:** Modify text and sections
- **Animations:** Adjust CSS animations in `<style>` tags

### Add More Email Types

Create new functions in `emailService.js`:

```javascript
export const sendShippingNotification = async (userEmail, trackingInfo) => {
  // Your email template here
};

export const sendDeliveryConfirmation = async (userEmail, orderDetails) => {
  // Your email template here
};
```

### Change Admin Email Address

Update in Render environment variables:
```
ADMIN_EMAIL = your-admin-email@domain.com
```

Or set multiple admins:
```javascript
const adminEmails = [
  'admin1@domain.com',
  'admin2@domain.com'
];
```

## Email Preview

### Customer Email Preview
- Modern gradient header with gift icon
- Animated cards with order details
- Product list with quantities and prices
- Total amount in large display
- Shipping information
- Track order button
- Professional footer

### Admin Email Preview
- Dark professional header with alert icon
- Glowing "NEW ORDER" badge
- Customer contact information card
- Detailed order items table
- Payment and status indicators
- Large total amount display
- Direct link to admin panel
- System notification footer

## Best Practices

1. **Test emails before going live**
2. **Use App Passwords, never regular passwords**
3. **Monitor email sending in logs**
4. **Keep email templates mobile-responsive**
5. **Don't send too many emails (respect limits)**
6. **Include unsubscribe option for marketing emails**
7. **Use professional "from" name and email**
8. **Test on multiple email clients (Gmail, Outlook, etc.)**

## Production Checklist

- [ ] Gmail App Password generated
- [ ] All environment variables set in Render
- [ ] ADMIN_EMAIL configured
- [ ] FRONTEND_URL points to production
- [ ] Test order placed successfully
- [ ] Customer email received
- [ ] Admin email received
- [ ] Emails not in spam folder
- [ ] Links in emails work correctly
- [ ] Mobile responsive design verified

## Support

If you encounter issues:
1. Check Render logs for error messages
2. Verify all environment variables are set
3. Test with a simple email first
4. Check Gmail account settings
5. Review Nodemailer documentation: https://nodemailer.com

## Future Enhancements

Consider adding:
- Order shipped notifications
- Delivery confirmation emails
- Payment reminder emails
- Promotional emails
- Newsletter subscriptions
- Email templates for different occasions
- SMS notifications integration
- WhatsApp notifications
