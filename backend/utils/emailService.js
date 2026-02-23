import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendOrderConfirmation = async (userEmail, orderDetails) => {
  try {
    const mailOptions = {
      from: `"Surprise Basket" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: '🎁 Order Confirmation - Surprise Basket',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">🎁 Surprise Basket</h1>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1f2937;">Thank You for Your Order!</h2>
            <p style="color: #6b7280; font-size: 16px;">
              Your order has been received and is being processed.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #ec4899; margin-top: 0;">Order Details</h3>
              <p><strong>Order ID:</strong> ${orderDetails.id}</p>
              <p><strong>Total Amount:</strong> ₹${orderDetails.total_amount}</p>
              <p><strong>Payment Status:</strong> ${orderDetails.payment_status}</p>
              <p><strong>Order Status:</strong> ${orderDetails.order_status}</p>
            </div>
            
            <p style="color: #6b7280;">
              We'll send you another email once your payment is verified and your order is shipped.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL}/dashboard" 
                 style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); 
                        color: white; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        display: inline-block;">
                View Order Status
              </a>
            </div>
          </div>
          
          <div style="background: #1f2937; padding: 20px; text-align: center; color: white;">
            <p style="margin: 0;">© 2024 Surprise Basket. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', userEmail);
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

export const sendOrderStatusUpdate = async (userEmail, orderDetails) => {
  try {
    const mailOptions = {
      from: `"Surprise Basket" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `📦 Order Update - ${orderDetails.order_status}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">🎁 Surprise Basket</h1>
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
            <p style="margin: 0;">© 2024 Surprise Basket. All rights reserved.</p>
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
