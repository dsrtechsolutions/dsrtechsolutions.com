@echo off
title DSR Tech Solutions - Dev Server
color 0A

echo.
echo  ██████╗ ███████╗██████╗     ████████╗███████╗ ██████╗██╗  ██╗
echo  ██╔══██╗██╔════╝██╔══██╗    ╚══██╔══╝██╔════╝██╔════╝██║  ██║
echo  ██║  ██║███████╗██████╔╝       ██║   █████╗  ██║     ███████║
echo  ██║  ██║╚════██║██╔══██╗       ██║   ██╔══╝  ██║     ██╔══██║
echo  ██████╔╝███████║██║  ██║       ██║   ███████╗╚██████╗██║  ██║
echo  ╚═════╝ ╚══════╝╚═╝  ╚═╝       ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝
echo.
echo  DSR Tech Solutions — dsrtechsolutions.com
echo  ─────────────────────────────────────────
echo.

cd /d "%~dp0"

echo  [1/2] Checking dependencies...
if not exist "node_modules" (
    echo  node_modules not found. Installing...
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo.
        echo  ERROR: npm install failed. Make sure Node.js is installed.
        pause
        exit /b 1
    )
) else (
    echo  node_modules found. Skipping install.
)

echo.
echo  [2/2] Starting development server...
echo.
echo  App will open at: http://localhost:5173
echo  Press Ctrl+C to stop the server.
echo.

npm run dev

pause
