# SkyBird Adventure - Deployment Guide

## 🚀 Quick Start

### 1. Initial Setup
```bash
# Run setup script
scripts/setup.bat  # Windows
# or
bash scripts/setup.sh  # Mac/Linux
```

### 2. Configure Services

#### AdMob Configuration
1. Go to [AdMob Console](https://admob.google.com/)
2. Create a new app
3. Get your Ad Unit IDs
4. Update `src/constants/GameConstants.ts`:

```typescript
export const AD_CONFIG = {
  BANNER_AD_ID: 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx',
  REWARD_AD_ID: 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx',
  OPEN_APP_AD_ID: 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx'
};
```

#### RevenueCat Configuration
1. Go to [RevenueCat Dashboard](https://app.revenuecat.com/)
2. Create your products
3. Get your API keys
4. Update `src/services/IAPService.ts`:

```typescript
const apiKey = Platform.OS === 'ios' 
  ? 'your_ios_api_key_here' 
  : 'your_android_api_key_here';
```

#### Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore
4. Get your config
5. Update `src/services/FirebaseService.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 3. Update App Configuration

Update `app.json` with your app details:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "package": "com.yourcompany.yourapp"
    }
  }
}
```

## 📱 Building for Production

### Android APK
```bash
# Build APK
scripts/build.bat  # Windows
# Select option 1

# Or use EAS directly
eas build --platform android --profile production
```

### iOS App
```bash
# Build iOS app
scripts/build.bat  # Windows
# Select option 2

# Or use EAS directly
eas build --platform ios --profile production
```

### Both Platforms
```bash
# Build for both
scripts/build.bat  # Windows
# Select option 3

# Or use EAS directly
eas build --platform all --profile production
```

## 🏪 App Store Submission

### Google Play Store
1. Build your APK using the build script
2. Go to [Google Play Console](https://play.google.com/console/)
3. Create a new app
4. Upload your APK
5. Fill in store listing details
6. Submit for review

### Apple App Store
1. Build your iOS app using the build script
2. Go to [App Store Connect](https://appstoreconnect.apple.com/)
3. Create a new app
4. Upload your build
5. Fill in app information
6. Submit for review

## 🔧 Development

### Start Development Server
```bash
npm start
```

### Run on Device
```bash
# Android
npm run android

# iOS (requires macOS)
npm run ios

# Web
npm run web
```

## 📊 Analytics & Monitoring

### Firebase Analytics
- Automatically tracks user engagement
- Monitor crash reports
- Track in-app purchase events

### AdMob Analytics
- Monitor ad performance
- Track revenue
- Optimize ad placement

### RevenueCat Analytics
- Track subscription metrics
- Monitor conversion rates
- Analyze user behavior

## 🛡️ Policy Compliance

### Google Play Store
- ✅ Original game mechanics (not identical to Flappy Bird)
- ✅ Custom graphics and branding
- ✅ Proper ad placement
- ✅ Clear in-app purchase descriptions
- ✅ Privacy policy compliance

### Apple App Store
- ✅ Original content and design
- ✅ Proper monetization
- ✅ User-friendly interface
- ✅ Performance optimization

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and rebuild
expo r -c
npm install
eas build --clear-cache
```

#### Ad Loading Issues
- Check AdMob configuration
- Verify Ad Unit IDs
- Test on real devices

#### IAP Issues
- Verify RevenueCat setup
- Check product IDs
- Test on real devices

#### Firebase Issues
- Check Firebase configuration
- Verify Firestore rules
- Check network connectivity

### Performance Optimization

#### Memory Management
- Use `PerformanceOptimizer` class
- Clean up unused resources
- Optimize image sizes

#### Battery Optimization
- Reduce unnecessary calculations
- Optimize game loop
- Use efficient rendering

## 📈 Monetization Strategy

### Ad Placement
- Banner ads: Menu screen
- Interstitial ads: Game over
- Rewarded ads: Bonus rewards

### In-App Purchases
- Remove ads: $2.99
- Premium upgrade: $4.99
- Additional features: $0.99

### Revenue Optimization
- A/B test ad placement
- Optimize IAP pricing
- Monitor user feedback

## 🔄 Updates & Maintenance

### Regular Updates
- Bug fixes
- Performance improvements
- New features
- Seasonal content

### Monitoring
- Crash reports
- User feedback
- Revenue metrics
- Performance data

## 📞 Support

For technical support:
1. Check the documentation
2. Review error logs
3. Test on multiple devices
4. Contact service providers

## 🎯 Success Metrics

### Key Performance Indicators
- Daily Active Users (DAU)
- Revenue per User (RPU)
- Ad Click-Through Rate (CTR)
- In-App Purchase Conversion Rate
- User Retention Rate

### Optimization Goals
- Increase user engagement
- Maximize revenue
- Improve user experience
- Reduce churn rate
- Enhance performance
