@echo off
echo 🚀 SkyBird Adventure - Build APK
echo =================================

echo 📱 Cách 1: Test với Expo Go (Nhanh nhất)
echo.
echo 1. Tải Expo Go từ Google Play Store
echo 2. Chạy: npm start
echo 3. Quét QR code với Expo Go
echo.

echo 📱 Cách 2: Build APK với EAS Build
echo.
echo 1. Tạo tài khoản tại: https://expo.dev/
echo 2. Chạy: npx expo login
echo 3. Chạy: npx eas build --platform android --profile preview
echo.

echo 📱 Cách 3: Build APK Local
echo.
echo 1. Cài đặt Android Studio
echo 2. Chạy: npx expo eject
echo 3. Chạy: cd android && ./gradlew assembleRelease
echo.

echo 🎯 Khuyến nghị:
echo - Test nhanh: Dùng Expo Go
echo - Build APK: Dùng EAS Build
echo - Tùy chỉnh: Dùng Local Build
echo.

echo 📚 Xem chi tiết trong BUILD_GUIDE.md
pause
