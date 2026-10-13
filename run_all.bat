@echo off
echo ========================================================
echo   SUPPORT TICKET ROUTER - MULTI-TIER SYSTEM LAUNCHER
echo ========================================================
echo.
echo Starting Frontend web dashboard...
start "Ticket Router - Frontend (Port 5173)" cmd /c "cd /d %~dp0frontend && npm run dev -- --host --port 5173"
echo.
echo Starting Python NLP Classifier (if Python available)...
start "Ticket Router - Python FastAPI (Port 8000)" cmd /c "cd /d %~dp0python-classifier && python -m uvicorn app:app --port 8000 --reload"
echo.
echo Starting Java Spring Boot Routing Agent (if Maven available)...
start "Ticket Router - Java Spring Boot (Port 8080)" cmd /c "cd /d %~dp0java-backend && mvn spring-boot:run"
echo.
echo Open your browser at: http://localhost:5173/
echo All components started in separate terminals.
pause
