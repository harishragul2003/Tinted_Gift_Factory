@echo off
REM Surprise Basket - Installation Script for Windows

echo.
echo 🎁 Welcome to Surprise Basket Setup!
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js v18+ first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version
echo.

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Backend installation failed
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed
echo.

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Frontend installation failed
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed
echo.

REM Setup environment files
echo ⚙️  Setting up environment files...
cd ..\backend
if not exist .env (
    copy .env.example .env
    echo ✅ Created backend\.env (Please update with your credentials)
) else (
    echo ⚠️  backend\.env already exists, skipping...
)

cd ..\frontend
if not exist .env (
    copy .env.example .env
    echo ✅ Created frontend\.env
) else (
    echo ⚠️  frontend\.env already exists, skipping...
)

cd ..
echo.

REM Final instructions
echo 🎉 Installation Complete!
echo.
echo 📋 Next Steps:
echo 1. Set up your Supabase database:
echo    - Create account at https://supabase.com
echo    - Create new project
echo    - Run SQL from backend\database\schema.sql
echo.
echo 2. Update backend\.env with your database credentials
echo.
echo 3. Start the application:
echo    Terminal 1: cd backend ^&^& npm run dev
echo    Terminal 2: cd frontend ^&^& npm run dev
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo 📚 For detailed instructions, see QUICKSTART.md
echo.
echo Happy coding! 🚀
echo.
pause
