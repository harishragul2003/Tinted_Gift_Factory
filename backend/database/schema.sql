-- Surprise Basket Database Schema
-- PostgreSQL (Supabase)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    stock INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'Payment Verification Pending' 
        CHECK (payment_status IN ('Payment Verification Pending', 'Payment Verified', 'Failed')),
    order_status VARCHAR(50) DEFAULT 'Pending' 
        CHECK (order_status IN ('Pending', 'Shipped', 'Delivered', 'Cancelled')),
    transaction_id VARCHAR(255),
    payment_screenshot_url TEXT,
    shipping_address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_order_items_order ON order_items(order_id);

-- Sample Data

-- Insert sample categories
INSERT INTO categories (name, description, icon) VALUES
('Birthday Gifts', 'Perfect gifts for birthday celebrations', '🎂'),
('Anniversary Gifts', 'Romantic gifts for special occasions', '💝'),
('Corporate Gifts', 'Professional gifts for business', '💼'),
('Personalized Gifts', 'Custom made gifts with personal touch', '✨');

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category_id, stock, is_featured) VALUES
('Premium Gift Hamper', 'Luxury gift basket with assorted chocolates, wine, and gourmet treats', 2999.00, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd', (SELECT id FROM categories WHERE name = 'Birthday Gifts'), 50, true),
('Personalized Photo Frame', 'Custom engraved photo frame with your special memories', 899.00, 'https://images.unsplash.com/photo-1565372195458-9de0b320ef04', (SELECT id FROM categories WHERE name = 'Personalized Gifts'), 100, true),
('Romantic Rose Bouquet', 'Beautiful arrangement of 50 red roses', 1499.00, 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7', (SELECT id FROM categories WHERE name = 'Anniversary Gifts'), 30, true),
('Executive Pen Set', 'Premium Parker pen set in elegant box', 3499.00, 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60', (SELECT id FROM categories WHERE name = 'Corporate Gifts'), 75, false),
('Chocolate Gift Box', 'Assorted premium chocolates in decorative box', 799.00, 'https://images.unsplash.com/photo-1549007994-cb92caebd54b', (SELECT id FROM categories WHERE name = 'Birthday Gifts'), 120, true),
('Customized Mug', 'Personalized ceramic mug with photo and text', 399.00, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d', (SELECT id FROM categories WHERE name = 'Personalized Gifts'), 200, false),
('Spa Gift Set', 'Luxury spa essentials for relaxation', 1899.00, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108', (SELECT id FROM categories WHERE name = 'Anniversary Gifts'), 60, false),
('Desk Organizer Set', 'Premium wooden desk organizer with accessories', 2499.00, 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7', (SELECT id FROM categories WHERE name = 'Corporate Gifts'), 40, false);

-- Create admin user (password: admin123)
-- CHANGE THE EMAIL BELOW TO YOUR DESIRED ADMIN EMAIL
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'YOUR_EMAIL@example.com', '$2a$10$YourHashedPasswordHere', 'admin');

-- Note: Replace the hashed password with actual bcrypt hash
-- You can generate it using: bcrypt.hash('admin123', 10)
