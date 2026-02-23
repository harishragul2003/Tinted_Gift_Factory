@echo off
REM Surprise Basket - Development Server Starter for Windows

echo.
echo 🎁 Starting Surprise Basket Development Servers...
echo.

REM Start backend in new window
echo Starting backend server...
start "Surprise Basket - Backend" cmd /k "cd backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
echo Starting frontend server...
start "Surprise Basket - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Servers started in separate windows!
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Close the terminal windows to stop the servers.
echo.
pause
