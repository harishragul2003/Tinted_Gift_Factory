# Email Not Sending - Troubleshooting Guide

## Quick Checklist

Run through this checklist to identify the issue:

### 1. Environment Variables Set?
- [ ] `EMAIL_HOST` = `smtp.gmail.com`
- [ ] `EMAIL_PORT` = `587`
- [ ] `EMAIL_USER` = your Gmail address
- [ ] `EMAIL_PASSWORD` = 16-character app password (no spaces)
- [ ] `ADMIN_EMAIL` = admin email address

### 2. Latest Code Deployed?
- [ ] Check Render Events tab for recent deployment
- [ ] Deployment should be after the email code was pushed
- [ ] If not, manually deploy latest commit

### 3. Check Render Logs

Look for these patterns in logs:

**Success Messages:**
```
✅ Order confirmation email sent to: user@example.com
✅ Admin notification email sent for order: abc123
```

**Error Messages:**
```
❌ Email sending error: [error details]
Failed to send customer email: [error]
Failed to send admin email: [error]
```

## Common Errors and Fixes

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Cause:** Wrong email credentials

**Fix:**
1. Verify `EMAIL_USER` is your full Gmail address
2. Verify `EMAIL_PASSWORD` is the App Password (not regular password)
3. Make sure there are no spaces in the password
4. Generate a new App Password if needed

### Error: "Connection timeout" or "ETIMEDOUT"

**Cause:** Network/firewall issue or wrong SMTP settings

**Fix:**
1. Verify `EMAIL_HOST` = `smtp.gmail.com`
2. Verify `EMAIL_PORT` = `587`
3. Try alternative port `465` with secure connection
4. Check if Render has SMTP restrictions

### Error: "Self signed certificate"

**Cause:** SSL certificate validation issue

**Fix:** Update `backend/utils/emailService.js`:
```javascript
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false  // Add this line
  }
});
```

### No Error Messages in Logs

**Cause:** Code not deployed or email function not being called

**Fix:**
1. Verify latest code is deployed on Render
2. Check if order is being created successfully
3. Look for "Create order error" in logs
4. Manually trigger deployment

## Testing Email Configuration

### Test 1: Check Environment Variables

In Render logs, you should see on startup:
```
🚀 Server running on port 5000
```

Add this to `backend/server.js` temporarily to verify env vars:
```javascript
console.log('📧 Email Config:', {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  user: process.env.EMAIL_USER,
  hasPassword: !!process.env.EMAIL_PASSWORD,
  admin: process.env.ADMIN_EMAIL
});
```

### Test 2: Manual Email Test

Create a test endpoint in `backend/server.js`:
```javascript
import { sendOrderConfirmation } from './utils/emailService.js';

app.get('/api/test-email', async (req, res) => {
  try {
    await sendOrderConfirmation('test@example.com', {
      id: 'test-123',
      total_amount: 1000,
      payment_status: 'Pending',
      order_status: 'Processing',
      shipping_address: 'Test Address',
      items: [{ name: 'Test Product', quantity: 1, price: 1000 }]
    });
    res.json({ message: 'Test email sent!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

Then visit: `https://artify-aura-api.onrender.com/api/test-email`

### Test 3: Check Gmail Settings

1. Go to https://myaccount.google.com/security
2. Verify 2-Step Verification is ON
3. Go to App Passwords
4. Verify "Artify Aura" app password exists
5. If unsure, revoke and create a new one

### Test 4: Check Spam Folder

- Check user's spam/junk folder
- Check admin's spam/junk folder
- Mark as "Not Spam" if found

## Detailed Debugging Steps

### Step 1: Enable Detailed Logging

Update `backend/utils/emailService.js`:

```javascript
export const sendOrderConfirmation = async (userEmail, orderDetails) => {
  console.log('📧 Attempting to send email to:', userEmail);
  console.log('📧 Email config:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    hasPassword: !!process.env.EMAIL_PASSWORD
  });
  
  try {
    // ... existing code ...
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    console.log('✅ Response:', info.response);
  } catch (error) {
    console.error('❌ Email error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    throw error;
  }
};
```

### Step 2: Check Order Creation

Make sure order is being created successfully:

1. Check Render logs for "Create order error"
2. Verify database connection is working
3. Check if order appears in admin panel

### Step 3: Verify Email Function is Called

Add logging in `backend/controllers/orderController.js`:

```javascript
// After order creation
console.log('📧 Sending emails for order:', order.id);
console.log('📧 Customer email:', user.email);
console.log('📧 Admin email:', process.env.ADMIN_EMAIL);

sendOrderConfirmation(user.email, orderDetailsForCustomer)
  .then(() => console.log('✅ Customer email queued'))
  .catch(err => console.error('❌ Customer email failed:', err.message));

sendAdminOrderNotification(orderDetailsForCustomer, customerInfo)
  .then(() => console.log('✅ Admin email queued'))
  .catch(err => console.error('❌ Admin email failed:', err.message));
```

## Alternative Solutions

### Option 1: Use SendGrid (Free Tier)

If Gmail continues to have issues:

1. Sign up at https://sendgrid.com (free 100 emails/day)
2. Get API key
3. Update email service to use SendGrid

### Option 2: Use Mailgun

1. Sign up at https://mailgun.com
2. Get API credentials
3. Update email configuration

### Option 3: Use Resend (Modern Alternative)

1. Sign up at https://resend.com
2. Very developer-friendly
3. Good free tier

## Quick Fixes to Try

### Fix 1: Redeploy with Clear Cache

1. Render Dashboard → artify-aura-api
2. Manual Deploy → Clear build cache & deploy
3. Wait for deployment
4. Test again

### Fix 2: Use Port 465 (Secure)

Update environment variables:
```
EMAIL_PORT = 465
```

Update `emailService.js`:
```javascript
const transporter = nodemailer.createTransate({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,  // Change to true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

### Fix 3: Verify Gmail Account

1. Try logging into Gmail with the account
2. Check for security alerts
3. Approve any suspicious activity notifications
4. Try generating a new App Password

## Still Not Working?

If none of the above works, share:

1. **Render logs** (last 50 lines after placing order)
2. **Environment variables** (hide password, just confirm they're set)
3. **Any error messages** from browser console or Render logs
4. **Gmail account type** (personal, workspace, etc.)

## Success Indicators

You'll know it's working when you see:

**In Render Logs:**
```
✅ Order confirmation email sent to: user@example.com
✅ Admin notification email sent for order: abc-123
```

**In Email Inbox:**
- Beautiful HTML email with order details
- Animated cards and gradients
- Working "Track Order" button

**In Admin Inbox:**
- Professional alert email
- Customer information
- Order details table
- "Process Order" button
