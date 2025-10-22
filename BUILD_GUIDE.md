# 🚀 Hướng dẫn Build APK - SkyBird Adventure

## 📱 Cách 1: Test với Expo Go (Nhanh nhất)

### Bước 1: Cài đặt Expo Go
1. Tải **Expo Go** từ Google Play Store
2. Cài đặt trên điện thoại Android

### Bước 2: Chạy dự án
```bash
# Khởi động development server
npm start

# Hoặc
npx expo start
```

### Bước 3: Kết nối với Expo Go
1. Quét QR code hiển thị trong terminal
2. Game sẽ chạy trên điện thoại

## 📱 Cách 2: Build APK với EAS Build

### Bước 1: Tạo tài khoản Expo
1. Truy cập: https://expo.dev/
2. Đăng ký tài khoản miễn phí
3. Xác thực email

### Bước 2: Đăng nhập
```bash
# Đăng nhập vào Expo
npx expo login

# Nhập email và password
```

### Bước 3: Cấu hình EAS
```bash
# Cấu hình EAS build
npx eas build:configure
```

### Bước 4: Build APK
```bash
# Build APK
npx eas build --platform android --profile preview
```

## 📱 Cách 3: Build APK Local (Advanced)

### Bước 1: Cài đặt Android Studio
1. Tải Android Studio từ: https://developer.android.com/studio
2. Cài đặt Android SDK
3. Cấu hình ANDROID_HOME

### Bước 2: Eject dự án
```bash
# Eject dự án
npx expo eject
```

### Bước 3: Build APK
```bash
# Vào thư mục android
cd android

# Build APK
./gradlew assembleRelease
```

## 🎯 Khuyến nghị

### ✅ Để test nhanh:
- Sử dụng **Cách 1** với Expo Go
- Nhanh, đơn giản, không cần tài khoản

### ✅ Để build APK thật:
- Sử dụng **Cách 2** với EAS Build
- Cần tài khoản Expo (miễn phí)
- APK có thể cài đặt trên mọi thiết bị

### ✅ Để tùy chỉnh sâu:
- Sử dụng **Cách 3** với Android Studio
- Cần kiến thức Android development
- Tùy chỉnh được nhiều hơn

## 🔧 Troubleshooting

### Lỗi thường gặp:

#### 1. "Expo CLI not found"
```bash
# Cài đặt Expo CLI
npm install -g @expo/cli
```

#### 2. "EAS CLI not found"
```bash
# Cài đặt EAS CLI
npm install -g eas-cli
```

#### 3. "Android SDK not found"
- Cài đặt Android Studio
- Cấu hình ANDROID_HOME
- Cài đặt Android SDK

#### 4. "Build failed"
```bash
# Clear cache
npx expo r -c

# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📊 So sánh các phương pháp

| Phương pháp | Thời gian | Độ khó | Tùy chỉnh | APK |
|-------------|-----------|--------|-----------|-----|
| Expo Go | 2 phút | Dễ | Thấp | ❌ |
| EAS Build | 10-15 phút | Trung bình | Trung bình | ✅ |
| Local Build | 30+ phút | Khó | Cao | ✅ |

## 🎉 Kết luận

**Để test nhanh**: Dùng Expo Go
**Để có APK**: Dùng EAS Build
**Để tùy chỉnh**: Dùng Local Build

Chọn phương pháp phù hợp với nhu cầu của bạn!
