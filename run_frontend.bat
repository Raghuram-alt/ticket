@echo off
echo ========================================================
echo   SUPPORT TICKET ROUTER - STARTING FRONTEND (React+Vite)
echo ========================================================
cd /d "%~dp0frontend"
call npm install
call npm run dev -- --host --port 5173
pause
