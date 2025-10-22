#!/bin/bash

# SkyBird Adventure Setup Script
# This script helps set up the development environment

echo "🎮 SkyBird Adventure Setup Script"
echo "================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Expo CLI if not present
if ! command -v expo &> /dev/null; then
    echo "📱 Installing Expo CLI..."
    npm install -g @expo/cli
fi

# Install EAS CLI if not present
if ! command -v eas &> /dev/null; then
    echo "🔧 Installing EAS CLI..."
    npm install -g @expo/eas-cli
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p assets
mkdir -p src/components
mkdir -p src/screens
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/types
mkdir -p src/constants

# Create placeholder assets
echo "🎨 Creating placeholder assets..."
touch assets/icon.png
touch assets/splash.png
touch assets/adaptive-icon.png
touch assets/favicon.png

echo "✅ Setup completed!"
echo ""
echo "Next steps:"
echo "1. Update your AdMob Ad Unit IDs in src/constants/GameConstants.ts"
echo "2. Update your RevenueCat API keys in src/services/IAPService.ts"
echo "3. Update your Firebase config in src/services/FirebaseService.ts"
echo "4. Update app.json with your app details"
echo "5. Run 'npm start' to start development"
echo "6. Run 'bash scripts/build.sh' to build for production"
