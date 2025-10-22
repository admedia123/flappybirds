@echo off
echo 🎮 SkyBird Adventure Setup Script
echo =================================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm not found. Please install npm first.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
npm install

REM Install Expo CLI if not present
where expo >nul 2>nul
if %errorlevel% neq 0 (
    echo 📱 Installing Expo CLI...
    npm install -g @expo/cli
)

REM Install EAS CLI if not present
where eas >nul 2>nul
if %errorlevel% neq 0 (
    echo 🔧 Installing EAS CLI...
    npm install -g @expo/eas-cli
)

REM Create necessary directories
echo 📁 Creating directories...
if not exist "assets" mkdir assets
if not exist "src\components" mkdir src\components
if not exist "src\screens" mkdir src\screens
if not exist "src\services" mkdir src\services
if not exist "src\utils" mkdir src\utils
if not exist "src\types" mkdir src\types
if not exist "src\constants" mkdir src\constants

REM Create placeholder assets
echo 🎨 Creating placeholder assets...
echo. > assets\icon.png
echo. > assets\splash.png
echo. > assets\adaptive-icon.png
echo. > assets\favicon.png

echo ✅ Setup completed!
echo.
echo Next steps:
echo 1. Update your AdMob Ad Unit IDs in src/constants/GameConstants.ts
echo 2. Update your RevenueCat API keys in src/services/IAPService.ts
echo 3. Update your Firebase config in src/services/FirebaseService.ts
echo 4. Update app.json with your app details
echo 5. Run 'npm start' to start development
echo 6. Run 'scripts\build.bat' to build for production
pause
