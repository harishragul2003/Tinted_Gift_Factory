import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  },
  connectionTimeout: 30000, // 30 seconds
  greetingTimeout: 30000,
  socketTimeout: 30000,
  pool: true, // Use connection pooling
  maxConnections: 5,
  maxMessages: 10
});

// Log email configuration on startup
console.log('📧 Email Configuration:', {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  user: process.env.EMAIL_USER,
  hasPassword: !!process.env.EMAIL_PASSWORD,
  adminEmail: process.env.ADMIN_EMAIL
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Email transporter verification failed:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

export const sendOrderConfirmation = async (userEmail, orderDetails) => {
  console.log('📧 Attempting to send order confirmation to:', userEmail);
  
  try {
    const itemsList = orderDetails.items?.map(item => `
      <tr>
        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
          <div style="display: flex; align-items: center;">
            <div style="flex: 1;">
              <p style="margin: 0; font-weight: 600; color: #1f2937;">${item.name || 'Product'}</p>
              <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">Qty: ${item.quantity}</p>
            </div>
            <div style="text-align: right;">
              <p style="margin: 0; font-weight: 600; color: #ec4899;">₹${item.price}</p>
            </div>
          </div>
        </td>
      </tr>
    `).join('') || '';

    const mailOptions = {
      from: `"Artify Aura" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: '🎉 Order Confirmed - Artify Aura',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @keyframes slideIn {
              from { transform: translateY(-20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            .animated-card {
              animation: slideIn 0.6s ease-out;
            }
            .pulse-icon {
              animation: pulse 2s infinite;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background: #f3f4f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.1);">
            
            <!-- Header with gradient -->
            <div style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center; position: relative;">
              <div class="pulse-icon" style="font-size: 60px; margin-bottom: 10px;">🎁</div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">Order Confirmed!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Thank you for shopping with us</p>
            </div>
            
            <!-- Success Badge -->
            <div style="text-align: center; margin-top: -25px;">
              <div style="display: inline-block; background: #10b981; color: white; padding: 10px 25px; border-radius: 25px; font-weight: 600; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
                ✓ Payment ${orderDetails.payment_status}
              </div>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <p style="color: #1f2937; font-size: 18px; line-height: 1.6; margin: 0 0 30px 0;">
                Hi there! 👋<br>
                Your order has been confirmed and we're getting it ready for you.
              </p>
              
              <!-- Order Info Card -->
              <div class="animated-card" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid #f59e0b;">
                <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">📋 Order Summary</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #78350f; font-weight: 600;">Order ID:</td>
                    <td style="padding: 8px 0; color: #92400e; text-align: right; font-family: monospace;">#${orderDetails.id?.slice(0, 8).toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #78350f; font-weight: 600;">Order Date:</td>
                    <td style="padding: 8px 0; color: #92400e; text-align: right;">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #78350f; font-weight: 600;">Status:</td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">${orderDetails.order_status}</span>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Items List -->
              ${itemsList ? `
              <div class="animated-card" style="background: #f9fafb; padding: 20px; border-radius: 15px; margin-bottom: 30px;">
                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">🛍️ Order Items</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  ${itemsList}
                </table>
              </div>
              ` : ''}
              
              <!-- Total Amount Card -->
              <div class="animated-card" style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 25px; border-radius: 15px; margin-bottom: 30px; text-align: center;">
                <p style="color: rgba(255,255,255,0.9); margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Total Amount</p>
                <h2 style="color: white; margin: 0; font-size: 36px; font-weight: 700;">₹${orderDetails.total_amount}</h2>
              </div>
              
              <!-- Shipping Info -->
              <div class="animated-card" style="background: #eff6ff; padding: 20px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid #3b82f6;">
                <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">🚚 Delivery Information</h3>
                <p style="color: #1e3a8a; margin: 0; line-height: 1.6;">
                  <strong>Address:</strong><br>
                  ${orderDetails.shipping_address || 'As provided during checkout'}
                </p>
                <p style="color: #3b82f6; margin: 15px 0 0 0; font-size: 14px;">
                  📦 Estimated delivery: 3-5 business days
                </p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.FRONTEND_URL}/my-orders" 
                   style="display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 30px; font-weight: 600; font-size: 16px; box-shadow: 0 10px 30px rgba(236, 72, 153, 0.3); transition: transform 0.3s;">
                  Track Your Order →
                </a>
              </div>
              
              <!-- Help Section -->
              <div style="background: #f9fafb; padding: 20px; border-radius: 15px; text-align: center;">
                <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">Need help with your order?</p>
                <p style="color: #ec4899; margin: 0; font-weight: 600;">Contact us at support@artifyaura.com</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #1f2937; padding: 30px; text-align: center;">
              <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 14px;">Thank you for choosing Artify Aura</p>
              <p style="color: #6b7280; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Artify Aura. All rights reserved.</p>
              <div style="margin-top: 20px;">
                <a href="${process.env.FRONTEND_URL}" style="color: #ec4899; text-decoration: none; margin: 0 10px; font-size: 12px;">Visit Store</a>
                <span style="color: #4b5563;">|</span>
                <a href="${process.env.FRONTEND_URL}/about" style="color: #ec4899; text-decoration: none; margin: 0 10px; font-size: 12px;">About Us</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Order confirmation email sent successfully to:', userEmail);
  } catch (error) {
    console.error('❌ Email sending error:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    throw error;
  }
};

export const sendOrderStatusUpdate = async (userEmail, orderDetails) => {
  try {
    const mailOptions = {
      from: `"Artify Aura" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `📦 Order Update - ${orderDetails.order_status}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">🎁 Artify Aura</h1>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1f2937;">Order Status Updated</h2>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #ec4899; margin-top: 0;">Order #${orderDetails.id.slice(0, 8)}</h3>
              <p><strong>Status:</strong> ${orderDetails.order_status}</p>
              <p><strong>Payment:</strong> ${orderDetails.payment_status}</p>
            </div>
            
            ${orderDetails.order_status === 'Shipped' ? `
              <p style="color: #6b7280;">
                🚚 Your order is on its way! You should receive it within 3-5 business days.
              </p>
            ` : ''}
            
            ${orderDetails.order_status === 'Delivered' ? `
              <p style="color: #10b981; font-weight: bold;">
                ✅ Your order has been delivered! We hope you love your gifts!
              </p>
            ` : ''}
          </div>
          
          <div style="background: #1f2937; padding: 20px; text-align: center; color: white;">
            <p style="margin: 0;">© 2024 Artify Aura. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Order status email sent to:', userEmail);
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

// Admin notification for new orders
export const sendAdminOrderNotification = async (orderDetails, customerInfo) => {
  console.log('📧 Attempting to send admin notification for order:', orderDetails.id);
  
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    console.log('📧 Admin email address:', adminEmail);
    
    const itemsList = orderDetails.items?.map(item => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; color: #1f2937;">${item.name || 'Product'}</td>
        <td style="padding: 12px; text-align: center; color: #6b7280;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right; color: #ec4899; font-weight: 600;">₹${item.price}</td>
      </tr>
    `).join('') || '';

    const mailOptions = {
      from: `"Artify Aura System" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `🔔 New Order Received - #${orderDetails.id?.slice(0, 8).toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @keyframes slideIn {
              from { transform: translateY(-20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
              50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.6); }
            }
            .animated-card {
              animation: slideIn 0.6s ease-out;
            }
            .glow-card {
              animation: glow 2s infinite;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background: #f3f4f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 700px; margin: 40px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.1);">
            
            <!-- Admin Header -->
            <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 60px; margin-bottom: 10px;">🔔</div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">New Order Alert!</h1>
              <p style="color: #9ca3af; margin: 10px 0 0 0; font-size: 16px;">Action required - Process this order</p>
            </div>
            
            <!-- Urgent Badge -->
            <div style="text-align: center; margin-top: -25px;">
              <div class="glow-card" style="display: inline-block; background: #ef4444; color: white; padding: 10px 25px; border-radius: 25px; font-weight: 600;">
                🚨 NEW ORDER
              </div>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Order ID Card -->
              <div class="animated-card" style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 25px; border-radius: 15px; margin-bottom: 30px; text-align: center;">
                <p style="color: rgba(255,255,255,0.9); margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Order ID</p>
                <h2 style="color: white; margin: 0; font-size: 32px; font-weight: 700; font-family: monospace;">#${orderDetails.id?.slice(0, 8).toUpperCase()}</h2>
                <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 14px;">${new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}</p>
              </div>
              
              <!-- Customer Info -->
              <div class="animated-card" style="background: #eff6ff; padding: 25px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid #3b82f6;">
                <h3 style="color: #1e40af; margin: 0 0 20px 0; font-size: 18px;">👤 Customer Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #1e3a8a; font-weight: 600; width: 120px;">Name:</td>
                    <td style="padding: 8px 0; color: #1f2937;">${customerInfo.name || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1e3a8a; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0; color: #1f2937;">${customerInfo.email || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1e3a8a; font-weight: 600;">Phone:</td>
                    <td style="padding: 8px 0; color: #1f2937;">${customerInfo.phone || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1e3a8a; font-weight: 600; vertical-align: top;">Address:</td>
                    <td style="padding: 8px 0; color: #1f2937;">${orderDetails.shipping_address || 'N/A'}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Order Items -->
              ${itemsList ? `
              <div class="animated-card" style="background: #f9fafb; padding: 25px; border-radius: 15px; margin-bottom: 30px;">
                <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px;">📦 Order Items</h3>
                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden;">
                  <thead>
                    <tr style="background: #f3f4f6;">
                      <th style="padding: 12px; text-align: left; color: #6b7280; font-weight: 600; font-size: 12px; text-transform: uppercase;">Product</th>
                      <th style="padding: 12px; text-align: center; color: #6b7280; font-weight: 600; font-size: 12px; text-transform: uppercase;">Qty</th>
                      <th style="padding: 12px; text-align: right; color: #6b7280; font-weight: 600; font-size: 12px; text-transform: uppercase;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsList}
                  </tbody>
                </table>
              </div>
              ` : ''}
              
              <!-- Payment & Status -->
              <div style="display: table; width: 100%; margin-bottom: 30px;">
                <div style="display: table-cell; width: 50%; padding-right: 10px;">
                  <div class="animated-card" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 15px; text-align: center;">
                    <p style="color: rgba(255,255,255,0.9); margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase;">Payment</p>
                    <h3 style="color: white; margin: 0; font-size: 18px;">${orderDetails.payment_status}</h3>
                  </div>
                </div>
                <div style="display: table-cell; width: 50%; padding-left: 10px;">
                  <div class="animated-card" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 20px; border-radius: 15px; text-align: center;">
                    <p style="color: rgba(255,255,255,0.9); margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase;">Status</p>
                    <h3 style="color: white; margin: 0; font-size: 18px;">${orderDetails.order_status}</h3>
                  </div>
                </div>
              </div>
              
              <!-- Total Amount -->
              <div class="animated-card" style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px; text-align: center;">
                <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Total Order Value</p>
                <h2 style="color: white; margin: 0; font-size: 42px; font-weight: 700;">₹${orderDetails.total_amount}</h2>
              </div>
              
              <!-- Action Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.FRONTEND_URL}/admin/orders" 
                   style="display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 30px; font-weight: 600; font-size: 16px; box-shadow: 0 10px 30px rgba(236, 72, 153, 0.3);">
                  Process Order in Admin Panel →
                </a>
              </div>
              
              <!-- Quick Actions -->
              <div style="background: #fef3c7; padding: 20px; border-radius: 15px; text-align: center; border-left: 5px solid #f59e0b;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                  ⚡ Quick Actions: Update order status, verify payment, and arrange shipping from the admin panel.
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #1f2937; padding: 30px; text-align: center;">
              <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 14px;">Artify Aura Admin System</p>
              <p style="color: #6b7280; margin: 0; font-size: 12px;">This is an automated notification. Do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent successfully for order:', orderDetails.id);
  } catch (error) {
    console.error('❌ Admin email sending error:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    throw error;
  }
};
