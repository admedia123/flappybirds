# 🔧 Fix EAS Build Errors - SkyBird Adventure

## ❌ **Lỗi hiện tại:**
```
The field "cli.appVersionSource" is not set, but it will be required in the future.
EAS project not configured.
Must configure EAS project by running 'eas init' before this command can be run in non-interactive mode.
Error: build:internal command failed.
```

## ✅ **Giải pháp:**

### **Bước 1: Đăng nhập EAS**
```bash
# Đăng nhập vào EAS
npx eas login

# Nhập email và password của bạn
```

### **Bước 2: Khởi tạo EAS project**
```bash
# Khởi tạo EAS project
npx eas init

# Chọn project ID (hoặc để mặc định)
```

### **Bước 3: Cấu hình app.json**
Thêm vào `app.json`:

```json
{
  "expo": {
    "name": "SkyBird Adventure",
    "slug": "skybird-adventure",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#87CEEB"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.skybird.adventure"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#87CEEB"
      },
      "package": "com.skybird.adventure",
      "permissions": [
        "android.permission.INTERNET",
        "android.permission.ACCESS_NETWORK_STATE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "cli": {
      "appVersionSource": "remote"
    }
  }
}
```

### **Bước 4: Cấu hình eas.json**
Cập nhật `eas.json`:

```json
{
  "cli": {
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### **Bước 5: Build APK**
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

### **Lỗi "appVersionSource not set"**
Thêm vào `app.json`:
```json
{
  "expo": {
    "cli": {
      "appVersionSource": "remote"
    }
  }
}
```

### **Lỗi authentication**
```bash
# Logout và login lại
npx eas logout
npx eas login
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
3. **Cấu hình app.json**: Thêm `cli.appVersionSource`
4. **Build APK**: `npx eas build --platform android --profile preview`
5. **Download APK**: Từ EAS dashboard

## 📚 **Tài liệu tham khảo**

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [App Versions Guide](https://docs.expo.dev/build-reference/app-versions/)
- [EAS CLI Commands](https://docs.expo.dev/build/setup/)
- [Troubleshooting Guide](https://docs.expo.dev/build/troubleshooting/)
