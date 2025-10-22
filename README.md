# SkyBird Adventure

A Flappy Bird-inspired mobile game built with React Native and Expo, featuring AdMob integration, RevenueCat in-app purchases, and Firebase backend.

## Features

- 🎮 Classic Flappy Bird gameplay with modern graphics
- 📱 Cross-platform (iOS & Android)
- 💰 AdMob integration (Banner, Rewarded, Interstitial ads)
- 💳 RevenueCat in-app purchases (Remove ads, Premium upgrade)
- 🔥 Firebase backend for high scores and user data
- 🎨 Custom pixel art style to avoid policy issues
- ⚡ Optimized performance and smooth gameplay

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure AdMob

1. Create an AdMob account at https://admob.google.com/
2. Create a new app and get your Ad Unit IDs
3. Update `src/constants/GameConstants.ts` with your actual Ad Unit IDs:

```typescript
export const AD_CONFIG = {
  BANNER_AD_ID: 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx',
  REWARD_AD_ID: 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx',
  OPEN_APP_AD_ID: 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx'
};
```

### 3. Configure RevenueCat

1. Create a RevenueCat account at https://app.revenuecat.com/
2. Create your products in RevenueCat dashboard
3. Update `src/constants/GameConstants.ts` with your product IDs:

```typescript
export const IAP_CONFIG = {
  REMOVE_ADS_PRODUCT_ID: 'remove_ads',
  PREMIUM_PRODUCT_ID: 'premium_upgrade'
};
```

4. Update `src/services/IAPService.ts` with your RevenueCat API keys:

```typescript
const apiKey = Platform.OS === 'ios' 
  ? 'your_ios_api_key_here' 
  : 'your_android_api_key_here';
```

### 4. Configure Firebase

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore database
3. Update `src/services/FirebaseService.ts` with your Firebase config:

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

### 5. Update App Configuration

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

## Building for Production

### Android APK

```bash
# Build APK
expo build:android

# Or use EAS Build (recommended)
npx eas build --platform android
```

### iOS App

```bash
# Build for iOS (requires macOS)
expo build:ios

# Or use EAS Build
npx eas build --platform ios
```

## Development

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Bird.tsx        # Bird component
│   └── Pipe.tsx        # Pipe obstacle component
├── constants/          # Game constants and configuration
│   └── GameConstants.ts
├── screens/            # Main game screens
│   ├── GameScreen.tsx  # Main game screen
│   └── MenuScreen.tsx  # Menu screen
├── services/           # External services
│   ├── AdService.ts    # AdMob integration
│   ├── IAPService.ts   # RevenueCat integration
│   └── FirebaseService.ts # Firebase integration
├── types/              # TypeScript type definitions
│   └── GameTypes.ts
└── utils/              # Game logic utilities
    └── GameLogic.ts
```

## Customization

### Graphics
- Update colors in `src/constants/GameConstants.ts`
- Modify bird and pipe designs in `src/components/`
- Add custom backgrounds and animations

### Gameplay
- Adjust physics in `src/utils/GameLogic.ts`
- Modify difficulty settings in `src/constants/GameConstants.ts`
- Add new game modes and features

### Monetization
- Configure ad placement in `src/services/AdService.ts`
- Set up additional IAP products in `src/services/IAPService.ts`
- Implement custom reward systems

## Policy Compliance

This game is designed to be policy-compliant:
- Custom graphics and branding (not identical to Flappy Bird)
- Original game mechanics with unique features
- Proper ad placement and user experience
- Clear in-app purchase descriptions

## Support

For issues and questions:
1. Check the documentation
2. Review the code comments
3. Test on both iOS and Android devices
4. Verify all service configurations

## License

This project is for educational and commercial use. Make sure to comply with all platform policies and terms of service.
