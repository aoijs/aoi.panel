@echo off
set /p "id=Enter a cmd to run (default powershell) "
if not "%id%"=="" (
    %id%
    echo exited
) else (
    powershell
    echo exited
)