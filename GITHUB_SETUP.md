# 🚀 Hướng dẫn Push Code lên GitHub

## 📋 Bước 1: Tạo Repository trên GitHub

1. **Truy cập**: https://github.com/new
2. **Tên repository**: `skybird-adventure`
3. **Mô tả**: `Flappy Bird inspired mobile game built with React Native and Expo`
4. **Chọn**: Public hoặc Private
5. **KHÔNG** tích "Initialize with README" (vì đã có code)
6. **Click**: "Create repository"

## 📋 Bước 2: Kết nối với GitHub

```bash
# Thêm remote origin
git remote add origin https://github.com/YOUR_USERNAME/skybird-adventure.git

# Push code lên GitHub
git push -u origin main
```

## 📋 Bước 3: Xác thực (nếu cần)

### Option 1: Personal Access Token
1. **GitHub Settings** → **Developer settings** → **Personal access tokens**
2. **Generate new token** → Chọn scopes: `repo`
3. **Copy token** và dùng thay password

### Option 2: GitHub CLI
```bash
# Cài đặt GitHub CLI
npm install -g gh

# Đăng nhập
gh auth login

# Push code
git push -u origin main
```

## 📋 Bước 4: Cấu hình Repository

### Thêm Topics/Tags:
- `react-native`
- `expo`
- `mobile-game`
- `flappy-bird`
- `typescript`
- `admob`
- `revenuecat`
- `firebase`

### Thêm Description:
```
🎮 SkyBird Adventure - A Flappy Bird inspired mobile game built with React Native and Expo. Features AdMob integration, RevenueCat in-app purchases, and Firebase backend. Ready to build APK for Android and iOS.
```

## 📋 Bước 5: Tạo Release

1. **Go to**: Repository → **Releases**
2. **Create a new release**
3. **Tag version**: `v1.0.0`
4. **Release title**: `SkyBird Adventure v1.0.0`
5. **Description**: Copy từ README.md
6. **Publish release**

## 🔧 Troubleshooting

### Lỗi "remote origin already exists"
```bash
# Xóa remote cũ
git remote remove origin

# Thêm remote mới
git remote add origin https://github.com/YOUR_USERNAME/skybird-adventure.git
```

### Lỗi authentication
```bash
# Sử dụng Personal Access Token
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/skybird-adventure.git
```

### Lỗi "main branch not found"
```bash
# Đổi tên branch
git branch -M main
git push -u origin main
```

## 📊 Repository Structure

```
skybird-adventure/
├── 📁 src/                    # Source code
├── 📁 assets/                 # Game assets
├── 📁 scripts/                # Build scripts
├── 📄 App.tsx                 # Main app
├── 📄 package.json            # Dependencies
├── 📄 app.json                # Expo config
├── 📄 README.md               # Documentation
├── 📄 BUILD_GUIDE.md          # Build instructions
├── 📄 DEPLOYMENT.md           # Deployment guide
└── 📄 PROJECT_SUMMARY.md      # Project overview
```

## 🎯 Next Steps

1. **Push code** lên GitHub
2. **Tạo Issues** cho bugs/features
3. **Tạo Wiki** với documentation
4. **Setup CI/CD** với GitHub Actions
5. **Add collaborators** nếu cần

## 📚 Useful Commands

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Pull from GitHub
git pull origin main

# Check remotes
git remote -v
```

## 🎉 Success!

Sau khi push thành công, bạn sẽ có:
- ✅ **Repository** trên GitHub
- ✅ **Source code** được backup
- ✅ **Documentation** đầy đủ
- ✅ **Build instructions** rõ ràng
- ✅ **Ready to share** với team
