@echo off
REM Script para iniciar servidor PHP localmente - MoneyTrack
REM Basta duplo-clique neste arquivo e o servidor inicia!

setlocal enabledelayedexpansion

set "PHP_BIN="

REM Buscar php no PATH
where php >nul 2>&1
if %errorlevel% equ 0 set "PHP_BIN=php"

REM Buscar em locais comuns do XAMPP
if "%PHP_BIN%"=="" if exist "C:\xampp\php\php.exe" set "PHP_BIN=C:\xampp\php\php.exe"
if "%PHP_BIN%"=="" if exist "D:\xampp\php\php.exe" set "PHP_BIN=D:\xampp\php\php.exe"
if "%PHP_BIN%"=="" if exist "%ProgramFiles%\xampp\php\php.exe" set "PHP_BIN=%ProgramFiles%\xampp\php\php.exe"
if "%PHP_BIN%"=="" if exist "%ProgramFiles(x86)%\xampp\php\php.exe" set "PHP_BIN=%ProgramFiles(x86)%\xampp\php\php.exe"

if "%PHP_BIN%"=="" (
    echo.
    echo [ERRO] PHP nao encontrado no PATH.
    echo.
    echo Informe o caminho completo para php.exe ou deixe em branco para abortar.
    set /p "PHP_BIN=Ex: C:\xampp\php\php.exe: "
    if "%PHP_BIN%"=="" (
        echo.
        echo Abortando.
        pause
        exit /b 1
    )
)

if not exist "%PHP_BIN%" (
    echo.
    echo [ERRO] Arquivo php.exe nao encontrado em: %PHP_BIN%
    pause
    exit /b 1
)

"%PHP_BIN%" -v >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERRO] Nao foi possivel executar PHP em: %PHP_BIN%
    pause
    exit /b 1
)

for /f "tokens=2" %%i in ('"%PHP_BIN%" -v ^| findstr /i "PHP"') do set "PHP_VERSION=%%i" & goto :found_php
:found_php

echo.
echo ========================================
echo   MoneyTrack - Servidor PHP Local
echo ========================================
echo.

echo [OK] PHP %PHP_VERSION% encontrado!
echo.

REM Mudar para o diretório do script
cd /d "%~dp0"

echo [INFO] Iniciando servidor em http://localhost:8000
echo [INFO] Pasta: %cd%
echo.
echo Digite CTRL+C para parar o servidor
echo.
echo.
start "" "http://localhost:8000/html/login.html"

echo [INFO] Abra o navegador se a pagina nao abrir automaticamente.

echo.

REM Iniciar servidor PHP
"%PHP_BIN%" -S localhost:8000

pause
