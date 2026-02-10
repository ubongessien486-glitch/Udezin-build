@echo off
echo ==========================================
echo       REPAIRING UDEZEin DASHBOARD
echo ==========================================
echo.
echo 1. Installing compatible software versions...
echo    (This depends on internet speed, please wait...)
call npm install
echo.
echo 2. Starting the website...
echo.
call npm run dev
echo.
pause
