@echo off
echo ========================================
echo   NoteApp - Iniciando Aplicacao
echo ========================================
echo.

REM Verifica se as dependências estão instaladas
if not exist "backend\node_modules\" (
    echo [AVISO] Dependencias do backend nao encontradas
    echo Execute: install.bat
    pause
    exit /b 1
)

if not exist "frontend\node_modules\" (
    echo [AVISO] Dependencias do frontend nao encontradas
    echo Execute: install.bat
    pause
    exit /b 1
)

echo Iniciando Backend na porta 5000...
echo Iniciando Frontend na porta 3000...
echo.
echo Pressione Ctrl+C para parar os servidores
echo.

REM Inicia o backend em uma nova janela
start "NoteApp Backend" cmd /k "cd backend && npm run dev"

REM Aguarda 3 segundos
timeout /t 3 /nobreak >nul

REM Inicia o frontend em uma nova janela
start "NoteApp Frontend" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo   Servidores Iniciados!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Feche as janelas dos servidores para parar a aplicacao
echo.
