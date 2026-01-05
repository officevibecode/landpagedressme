@echo off
echo ============================================
echo    BUILD PARA PRODUCAO - DressMe
echo ============================================
echo.

REM Verificar se Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Instale Node.js e tente novamente.
    pause
    exit /b 1
)

echo [1/5] Verificando dependencias...
if not exist "node_modules\" (
    echo [INFO] Instalando dependencias...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERRO] Falha ao instalar dependencias!
        pause
        exit /b 1
    )
)

echo.
echo [2/5] Criando arquivo .env.production.local...
echo VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51PLUZ1BNCZo5fcGZLaG7Rxl7HSQPzrkXdT2ouSKjT3DN7yF4eYijjiDMlSgFpis0IXZZVGP0VoJXQ4WkeKlODZBC00JRWvglKB > .env.production.local
echo VITE_API_BASE_URL=https://dressme.tgoo.eu >> .env.production.local
echo [AVISO] Edite .env.production.local com suas chaves LIVE!
echo.
pause

echo.
echo [3/5] Limpando build anterior...
if exist "dist\" (
    rmdir /s /q dist
)

echo.
echo [4/5] Gerando build de producao...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao gerar build!
    pause
    exit /b 1
)

echo.
echo [5/5] Criando arquivo ZIP para deploy...
if exist "dressme-deploy.zip" (
    del dressme-deploy.zip
)

REM Criar estrutura temporária
mkdir deploy-temp
xcopy dist\*.* deploy-temp\ /E /I /Y
xcopy public deploy-temp\public\ /E /I /Y
xcopy api deploy-temp\api\ /E /I /Y /EXCLUDE:exclude-files.txt

REM Criar arquivo de exclusão
echo node_modules > exclude-files.txt
echo vendor >> exclude-files.txt
echo .env >> exclude-files.txt
echo .env.local >> exclude-files.txt

REM Compactar (requer PowerShell)
powershell -command "Compress-Archive -Path deploy-temp\* -DestinationPath dressme-deploy.zip -Force"

REM Limpar
rmdir /s /q deploy-temp
del exclude-files.txt

echo.
echo ============================================
echo           BUILD CONCLUIDO!
echo ============================================
echo.
echo Arquivos gerados:
echo   - Pasta dist\ (build otimizado)
echo   - dressme-deploy.zip (pronto para upload)
echo.
echo Proximo passo:
echo   1. Edite .env.production.local com suas chaves LIVE
echo   2. Envie dressme-deploy.zip para o servidor
echo   3. Siga o guia: GUIA-DEPLOY-PRODUCAO.md
echo.
echo Pressione qualquer tecla para visualizar o build...
pause >nul

REM Iniciar servidor de preview
call npm run preview

pause

