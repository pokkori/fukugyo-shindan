@echo off
setlocal
set "TARGET=%~dp0.."
set "TARGET=%TARGET:~0,-1%"
set "JUNCTION=C:\dev\fukugyo-shindan"
set "LAUNCHER=C:\dev\start-fukugyo.cmd"

if not exist "C:\dev" mkdir "C:\dev"

if not exist "%JUNCTION%" (
    mklink /J "%JUNCTION%" "%TARGET%"
    echo Created junction: %JUNCTION% -> %TARGET%
) else (
    echo Junction already exists: %JUNCTION%
)

(
echo @echo off
echo cd /d %JUNCTION%
echo if not exist node_modules npm install
echo npm run dev
) > "%LAUNCHER%"
echo Created launcher: %LAUNCHER%

echo.
echo Done. Run: %LAUNCHER%
endlocal
