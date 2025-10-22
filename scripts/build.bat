@echo off
echo 🚀 SkyBird Adventure Build Script
echo ==================================

REM Check if EAS CLI is installed
where eas >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ EAS CLI not found. Installing...
    npm install -g @expo/eas-cli
)

echo Select build option:
echo 1) Build Android APK
echo 2) Build iOS App
echo 3) Build for all platforms
echo 4) Build development version
echo 5) Submit to app stores
echo 6) Exit

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" (
    echo 📱 Building for Android...
    eas build --platform android --profile production
) else if "%choice%"=="2" (
    echo 🍎 Building for iOS...
    eas build --platform ios --profile production
) else if "%choice%"=="3" (
    echo 🌍 Building for all platforms...
    eas build --platform all --profile production
) else if "%choice%"=="4" (
    echo 🔧 Building development version...
    eas build --platform android --profile development
) else if "%choice%"=="5" (
    echo 📤 Submitting to app stores...
    eas submit --platform all
) else if "%choice%"=="6" (
    echo 👋 Goodbye!
    exit /b 0
) else (
    echo ❌ Invalid choice. Please run the script again.
    exit /b 1
)

echo ✅ Build process completed!
pause
