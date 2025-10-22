# 🔧 EAS Setup Guide - Fix "EAS project not configured"

## ❌ **Lỗi hiện tại:**
```
EAS project not configured.
Must configure EAS project by running 'eas init' before this command can be run in non-interactive mode.
Error: build:internal command failed.
```

## ✅ **Giải pháp từng bước:**

### **Bước 1: Đăng nhập EAS**
```bash
# Đăng nhập vào EAS
npx eas login

# Nhập email và password của bạn
# Nếu chưa có tài khoản, tạo tại: https://expo.dev/
```

### **Bước 2: Khởi tạo EAS project**
```bash
# Khởi tạo EAS project
npx eas init

# Chọn project ID (hoặc để mặc định)
# Chọn team (hoặc personal)
```

### **Bước 3: Kiểm tra cấu hình**
```bash
# Kiểm tra EAS project
npx eas project:info

# Kiểm tra build profiles
npx eas build:list
```

### **Bước 4: Build APK**
```bash
# Build APK preview
npx eas build --platform android --profile preview

# Hoặc build production
npx eas build --platform android --profile production
```

## 🚀 **Alternative: Build Local (Không cần EAS)**

### **Option 1: Expo Go (Nhanh nhất)**
```bash
# Chạy development server
npm start

# Quét QR code với Expo Go app
# Không cần EAS, không cần tài khoản
```

### **Option 2: Local Build**
```bash
# Eject project
npx expo eject

# Build APK local
cd android
./gradlew assembleRelease
```

### **Option 3: Expo Build Service (Legacy)**
```bash
# Cài đặt Expo CLI
npm install -g @expo/cli

# Build APK
expo build:android
```

## 🔧 **Troubleshooting**

### **Lỗi "EAS project not configured"**
```bash
# Xóa cache
npx expo r -c

# Reinstall dependencies
rm -rf node_modules
npm install

# Khởi tạo lại EAS
npx eas init
```

### **Lỗi authentication**
```bash
# Logout và login lại
npx eas logout
npx eas login
```

### **Lỗi "appVersionSource not set"**
Đã fix trong app.json:
```json
{
  "expo": {
    "cli": {
      "appVersionSource": "remote"
    }
  }
}
```

## 📱 **Khuyến nghị Build**

### ✅ **Để test nhanh:**
- **Expo Go**: `npm start` + quét QR code
- **Nhanh, đơn giản, không cần tài khoản**

### ✅ **Để build APK:**
- **EAS Build**: Cần tài khoản Expo (miễn phí)
- **Local Build**: Cần Android Studio
- **Expo Build Service**: Legacy, có thể không ổn định

### ✅ **Để production:**
- **EAS Build**: Khuyến nghị nhất
- **App Store**: Tự động submit
- **CI/CD**: Tích hợp GitHub Actions

## 🎯 **Next Steps**

1. **Đăng nhập EAS**: `npx eas login`
2. **Khởi tạo project**: `npx eas init`
3. **Kiểm tra cấu hình**: `npx eas project:info`
4. **Build APK**: `npx eas build --platform android --profile preview`
5. **Download APK**: Từ EAS dashboard

## 📚 **Tài liệu tham khảo**

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS CLI Commands](https://docs.expo.dev/build/setup/)
- [Troubleshooting Guide](https://docs.expo.dev/build/troubleshooting/)
- [Expo Account Setup](https://docs.expo.dev/accounts/)
