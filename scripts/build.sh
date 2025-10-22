#!/bin/bash

# SkyBird Adventure Build Script
# This script helps build the game for different platforms

echo "🚀 SkyBird Adventure Build Script"
echo "=================================="

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g @expo/eas-cli
fi

# Function to build for Android
build_android() {
    echo "📱 Building for Android..."
    eas build --platform android --profile production
}

# Function to build for iOS
build_ios() {
    echo "🍎 Building for iOS..."
    eas build --platform ios --profile production
}

# Function to build for both platforms
build_all() {
    echo "🌍 Building for all platforms..."
    eas build --platform all --profile production
}

# Function to build development version
build_dev() {
    echo "🔧 Building development version..."
    eas build --platform android --profile development
}

# Function to submit to app stores
submit_apps() {
    echo "📤 Submitting to app stores..."
    eas submit --platform all
}

# Main menu
echo "Select build option:"
echo "1) Build Android APK"
echo "2) Build iOS App"
echo "3) Build for all platforms"
echo "4) Build development version"
echo "5) Submit to app stores"
echo "6) Exit"

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        build_android
        ;;
    2)
        build_ios
        ;;
    3)
        build_all
        ;;
    4)
        build_dev
        ;;
    5)
        submit_apps
        ;;
    6)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo "✅ Build process completed!"
