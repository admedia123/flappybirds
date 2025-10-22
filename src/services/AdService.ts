// NOTE: This is a stub implementation
// expo-ads-admob is deprecated and has been removed
// To enable ads, install and configure one of these alternatives:
// 1. react-native-google-mobile-ads (recommended)
// 2. expo-ads-google (if using Expo SDK 50+)
//
// Installation: npm install react-native-google-mobile-ads
// Documentation: https://docs.page/invertase/react-native-google-mobile-ads

import { AD_CONFIG } from '../constants/GameConstants';

export class AdService {
  private static instance: AdService;
  private bannerAdLoaded = false;
  private rewardAdLoaded = false;
  private openAppAdLoaded = false;

  static getInstance(): AdService {
    if (!AdService.instance) {
      AdService.instance = new AdService();
    }
    return AdService.instance;
  }

  async initializeAds(): Promise<void> {
    try {
      console.warn('⚠️ AdService: Ads are not configured. Please install react-native-google-mobile-ads to enable ads.');
      console.log('Ad Unit IDs configured:', AD_CONFIG);
      // TODO: Initialize your ad SDK here
      // Example: await mobileAds().initialize();
    } catch (error) {
      console.error('Error initializing ads:', error);
    }
  }

  async loadBannerAd(): Promise<boolean> {
    try {
      console.log('AdService: Banner ad loading (stub)');
      this.bannerAdLoaded = true;
      return true;
    } catch (error) {
      console.error('Error loading banner ad:', error);
      return false;
    }
  }

  async loadRewardAd(): Promise<boolean> {
    try {
      console.log('AdService: Reward ad loading (stub)');
      this.rewardAdLoaded = true;
      return true;
    } catch (error) {
      console.error('Error loading reward ad:', error);
      return false;
    }
  }

  async loadOpenAppAd(): Promise<boolean> {
    try {
      console.log('AdService: Open app ad loading (stub)');
      this.openAppAdLoaded = true;
      return true;
    } catch (error) {
      console.error('Error loading open app ad:', error);
      return false;
    }
  }

  async showRewardAd(): Promise<boolean> {
    try {
      if (!this.rewardAdLoaded) {
        await this.loadRewardAd();
      }

      console.log('AdService: Would show reward ad here');
      // TODO: Implement actual ad showing
      // Example: await RewardedAd.show();
      return true;
    } catch (error) {
      console.error('Error showing reward ad:', error);
      return false;
    }
  }

  async showOpenAppAd(): Promise<boolean> {
    try {
      if (!this.openAppAdLoaded) {
        await this.loadOpenAppAd();
      }

      console.log('AdService: Would show open app ad here');
      // TODO: Implement actual ad showing
      // Example: await AppOpenAd.show();
      return true;
    } catch (error) {
      console.error('Error showing open app ad:', error);
      return false;
    }
  }

  isBannerAdLoaded(): boolean {
    return this.bannerAdLoaded;
  }

  isRewardAdLoaded(): boolean {
    return this.rewardAdLoaded;
  }

  isOpenAppAdLoaded(): boolean {
    return this.openAppAdLoaded;
  }
}

export default AdService;
