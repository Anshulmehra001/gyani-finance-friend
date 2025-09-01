@echo off
echo Starting Gyani Development Server...
echo.
echo Checking for processes on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Killing process %%a on port 3000...
    taskkill /PID %%a /F >nul 2>&1
)
echo.
echo Frontend: http://localhost:5173 (or next available port)
echo Backend:  http://localhost:3000
echo.
npm run dev
pause
