@echo off
echo ========================================
echo   NoteApp - Instalacao e Execucao
echo ========================================
echo.

REM Verifica se Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale o Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js encontrado: 
node --version
echo.

REM Instalar dependências do Backend
echo ========================================
echo Instalando dependencias do Backend...
echo ========================================
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependencias do backend
    cd ..
    pause
    exit /b 1
)
cd ..
echo [OK] Backend instalado com sucesso!
echo.

REM Instalar dependências do Frontend
echo ========================================
echo Instalando dependencias do Frontend...
echo ========================================
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependencias do frontend
    cd ..
    pause
    exit /b 1
)
cd ..
echo [OK] Frontend instalado com sucesso!
echo.

echo ========================================
echo   Instalacao Concluida!
echo ========================================
echo.
echo Para iniciar a aplicacao, execute:
echo   - Backend:  cd backend  ^&^& npm run dev
echo   - Frontend: cd frontend ^&^& npm start
echo.
echo Ou execute: start.bat
echo.
pause
