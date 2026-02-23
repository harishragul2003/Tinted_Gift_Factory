#!/bin/bash

# Surprise Basket - Installation Script
# This script automates the setup process for Unix-based systems (Mac/Linux)

echo "🎁 Welcome to Surprise Basket Setup!"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed"
    exit 1
fi
echo "✅ Backend dependencies installed"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed"
    exit 1
fi
echo "✅ Frontend dependencies installed"
echo ""

# Setup environment files
echo "⚙️  Setting up environment files..."
cd ../backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created backend/.env (Please update with your credentials)"
else
    echo "⚠️  backend/.env already exists, skipping..."
fi

cd ../frontend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created frontend/.env"
else
    echo "⚠️  frontend/.env already exists, skipping..."
fi

cd ..
echo ""

# Final instructions
echo "🎉 Installation Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Set up your Supabase database:"
echo "   - Create account at https://supabase.com"
echo "   - Create new project"
echo "   - Run SQL from backend/database/schema.sql"
echo ""
echo "2. Update backend/.env with your database credentials"
echo ""
echo "3. Start the application:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: cd frontend && npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For detailed instructions, see QUICKSTART.md"
echo ""
echo "Happy coding! 🚀"
