@echo off
echo ========================================================
echo   SUPPORT TICKET ROUTER - PYTHON FASTAPI CLASSIFIER
echo ========================================================
cd /d "%~dp0python-classifier"
pip install -r requirements.txt
python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
pause
