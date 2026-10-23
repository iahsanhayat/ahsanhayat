@echo off
cd /d "%~dp0"
echo ========================================================
echo Pushing Ahsan Hayat Portfolio to GitHub...
echo Repository: https://github.com/iahsanhayat/ahsanhayat.git
echo ========================================================
git push -u origin main
echo.
echo ========================================================
if %ERRORLEVEL% equ 0 (
    echo SUCCESS! Your code is now live on GitHub.
    echo You can now go back to Vercel and click Deploy!
) else (
    echo An error occurred. Please check the message above.
)
echo ========================================================
pause
