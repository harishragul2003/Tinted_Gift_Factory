# Resend Email Setup Guide

## Why Resend?

Resend is specifically designed for modern cloud platforms like Render, Vercel, and serverless environments. It's more reliable than SMTP for these platforms and has:
- ✅ Better deliverability
- ✅ No SMTP port blocking issues
- ✅ Simple API
- ✅ Free tier: 100 emails/day, 3,000 emails/month
- ✅ Beautiful email templates support

## Setup Steps

### Step 1: Create Resend Account

1. Go to https://resend.com
2. Click "Sign Up" (free account)
3. Verify your email address
4. Complete the onboarding

### Step 2: Get API Key

1. In Resend dashboard, go to **API Keys**
2. Click "Create API Key"
3. Name it: "Artify Aura Production"
4. Select permissions: "Sending access"
5. Click "Create"
6. **Copy the API key** (starts with `re_...`)
   - You won't be able to see it again!

### Step 3: Verify Your Domain (Optional but Recommended)

For production, verify your domain to send from your own email address:

1. In Resend dashboard, go to **Domains**
2. Click "Add Domain"
3. Enter your domain (e.g., `artifyaura.com`)
4. Add the DNS records shown to your domain provider
5. Wait for verification (usually 5-10 minutes)

**For testing:** You can use `onboarding@resend.dev` (no verification needed)

### Step 4: Configure Render Environment Variables

1. Go to Render Dashboard → artify-aura-api → Environment
2. Add these variables:

```
RESEND_API_KEY = re_your_api_key_here
RESEND_FROM_EMAIL = Artify Aura <noreply@yourdomain.com>
ADMIN_EMAIL = admin@yourdomain.com
```

**For testing (before domain verification):**
```
RESEND_API_KEY = re_your_api_key_here
RESEND_FROM_EMAIL = Artify Aura <onboarding@resend.dev>
ADMIN_EMAIL = your-email@gmail.com
```

3. Click "Save Changes"
4. Wait for automatic redeploy

### Step 5: Test

Once deployed:

1. Visit: `https://artify-aura-api.onrender.com/api/test-email`
2. Or place a test order on your site
3. Check your email inbox

## Environment Variables

### Required:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Optional (with defaults):
```env
RESEND_FROM_EMAIL=Artify Aura <onboarding@resend.dev>
ADMIN_EMAIL=admin@yourdomain.com
FRONTEND_URL=https://artify-aura.vercel.app
```

## Local Development

Update `backend/.env`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=Artify Aura <onboarding@resend.dev>
ADMIN_EMAIL=your-email@gmail.com
FRONTEND_URL=http://localhost:5173
```

## Troubleshooting

### Error: "API key is required"

- Make sure `RESEND_API_KEY` is set in Render
- Check for typos in the variable name
- Verify the API key starts with `re_`

### Error: "Invalid from address"

- Use `onboarding@resend.dev` for testing
- Or verify your domain first
- Format: `Name <email@domain.com>`

### Emails not received

- Check spam folder
- Verify API key is correct
- Check Resend dashboard → Logs for delivery status
- Make sure you're within free tier limits (100/day)

### Rate limit exceeded

Free tier limits:
- 100 emails per day
- 3,000 emails per month

Upgrade to paid plan if needed.

## Resend Dashboard

Monitor your emails:

1. Go to https://resend.com/emails
2. See all sent emails
3. Check delivery status
4. View email content
5. Debug any issues

## Advantages over Gmail SMTP

| Feature | Gmail SMTP | Resend |
|---------|-----------|--------|
| Cloud platform support | ❌ Often blocked | ✅ Designed for it |
| Setup complexity | 🟡 Medium (2FA, app password) | ✅ Simple (API key) |
| Deliverability | 🟡 Good | ✅ Excellent |
| Free tier | 500/day | 100/day, 3000/month |
| Monitoring | ❌ Limited | ✅ Full dashboard |
| Custom domain | ✅ Yes | ✅ Yes |

## Pricing

**Free Tier:**
- 100 emails/day
- 3,000 emails/month
- All features included

**Paid Plans:**
- Start at $20/month
- 50,000 emails/month
- Additional emails: $1 per 1,000

For most small businesses, the free tier is sufficient.

## Migration from Gmail

If you were using Gmail SMTP before:

1. Keep Gmail env vars (as backup)
2. Add Resend env vars
3. Code now uses Resend by default
4. Gmail SMTP code is still in `emailService.js` if needed

## Custom Domain Setup

### 1. Add Domain in Resend

1. Resend Dashboard → Domains → Add Domain
2. Enter: `artifyaura.com`

### 2. Add DNS Records

Add these records to your domain provider (e.g., Namecheap, GoDaddy):

```
Type: TXT
Name: @
Value: [provided by Resend]

Type: CNAME  
Name: resend._domainkey
Value: [provided by Resend]

Type: MX
Name: @
Value: [provided by Resend]
Priority: 10
```

### 3. Wait for Verification

- Usually takes 5-10 minutes
- Check status in Resend dashboard
- Once verified, update `RESEND_FROM_EMAIL`

### 4. Update Environment Variable

```
RESEND_FROM_EMAIL=Artify Aura <noreply@artifyaura.com>
```

## Best Practices

1. **Use descriptive from names:** `Artify Aura <noreply@domain.com>`
2. **Monitor your dashboard:** Check delivery rates
3. **Stay within limits:** Track your usage
4. **Verify your domain:** Better deliverability
5. **Test before production:** Use test endpoint
6. **Handle errors gracefully:** Log failures
7. **Don't spam:** Respect user preferences

## Support

- **Resend Docs:** https://resend.com/docs
- **Resend Support:** support@resend.com
- **Status Page:** https://status.resend.com

## Quick Start Checklist

- [ ] Create Resend account
- [ ] Get API key
- [ ] Add `RESEND_API_KEY` to Render
- [ ] Add `RESEND_FROM_EMAIL` to Render (use onboarding@resend.dev for testing)
- [ ] Add `ADMIN_EMAIL` to Render
- [ ] Wait for Render to redeploy
- [ ] Test with `/api/test-email` endpoint
- [ ] Place test order
- [ ] Check email inbox
- [ ] (Optional) Verify custom domain
- [ ] Update `RESEND_FROM_EMAIL` with custom domain

## Success!

Once setup, you'll receive beautiful HTML emails for:
- ✅ Customer order confirmations
- ✅ Admin order notifications
- ✅ Order status updates

All with better deliverability and reliability than SMTP!
