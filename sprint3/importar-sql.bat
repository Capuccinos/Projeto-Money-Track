@echo off
REM Script para importar SQL automaticamente - MoneyTrack
REM Este script cria o banco de dados automaticamente!

setlocal enabledelayedexpansion

set "MYSQL_BIN="

REM Buscar mysql no PATH
where mysql >nul 2>&1
if %errorlevel% equ 0 set "MYSQL_BIN=mysql"

REM Buscar em locais comuns do XAMPP
if "%MYSQL_BIN%"=="" if exist "C:\xampp\mysql\bin\mysql.exe" set "MYSQL_BIN=C:\xampp\mysql\bin\mysql.exe"
if "%MYSQL_BIN%"=="" if exist "D:\xampp\mysql\bin\mysql.exe" set "MYSQL_BIN=D:\xampp\mysql\bin\mysql.exe"
if "%MYSQL_BIN%"=="" if exist "%ProgramFiles%\xampp\mysql\bin\mysql.exe" set "MYSQL_BIN=%ProgramFiles%\xampp\mysql\bin\mysql.exe"
if "%MYSQL_BIN%"=="" if exist "%ProgramFiles(x86)%\xampp\mysql\bin\mysql.exe" set "MYSQL_BIN=%ProgramFiles(x86)%\xampp\mysql\bin\mysql.exe"

if "%MYSQL_BIN%"=="" (
    echo.
    echo [ERRO] MySQL nao encontrado no PATH.
    echo.
    echo Informe o caminho completo para mysql.exe ou deixe em branco para abortar.
    set /p "MYSQL_BIN=Ex: C:\xampp\mysql\bin\mysql.exe: "
    if "%MYSQL_BIN%"=="" (
        echo.
        echo Abortando.
        pause
        exit /b 1
    )
)

if not exist "%MYSQL_BIN%" (
    echo.
    echo [ERRO] Arquivo mysql.exe nao encontrado em: %MYSQL_BIN%
    pause
    exit /b 1
)

echo.
echo ========================================
echo   MoneyTrack - Importar Banco de Dados
echo ========================================
echo.

echo [INFO] Usando: %MYSQL_BIN%

echo [INFO] Verificando conexao com MySQL...
"%MYSQL_BIN%" -u root -e "SELECT 1" >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Nao foi possivel conectar ao MySQL.
    echo Verifique se o servidor MySQL esta rodando no XAMPP.
    echo.
    echo Se estiver usando senha de root, eh necessario alterar o script para usar -p.
    pause
    exit /b 1
)

echo [OK] MySQL esta rodando!
echo.
echo Importando banco de dados...
echo.

"%MYSQL_BIN%" -u root < "%~dp0database\moneytrack.sql"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo [OK] Banco de dados criado com sucesso!
    echo ========================================
    echo.
    echo Proximas etapas:
    echo 1. Clique em "iniciar-servidor.bat" para iniciar o servidor
    echo 2. Abra seu navegador em http://localhost:8000/receitas.html
    echo.
) else (
    echo.
    echo [ERRO] Nao conseguiu importar o banco!
    echo Tente manualmente:
    echo.
    echo   "%MYSQL_BIN%" -u root
    echo   source %~dp0database\moneytrack.sql;
    echo   exit
    echo.
)

pause
