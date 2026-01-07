# Run Angular Frontend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Angular Frontend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
Set-Location "C:\cache_project\Frontend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

Write-Host "Starting Angular development server..." -ForegroundColor Green
Write-Host "Project Path: C:\cache_project\Frontend" -ForegroundColor Gray
Write-Host ""
Write-Host "Frontend will be available at: http://localhost:4200" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Start Angular dev server
npm start
