@echo off
echo ========================================
echo Starting Angular Frontend
echo ========================================
echo.

cd /d "C:\cache_project\Frontend"

REM Check if node_modules exists
if not exist "node_modules\" (
    echo node_modules not found. Installing dependencies...
    call npm install
    echo.
)

echo Starting Angular development server...
echo Project Path: C:\cache_project\Frontend
echo.
echo Frontend will be available at: http://localhost:4200
echo Press Ctrl+C to stop
echo.

npm start

pause
