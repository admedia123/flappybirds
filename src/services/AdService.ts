import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from 'expo-ads-admob';
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
      // Initialize banner ad
      await AdMobBanner.setAdUnitID(AD_CONFIG.BANNER_AD_ID);
      
      // Initialize reward ad
      await AdMobRewarded.setAdUnitID(AD_CONFIG.REWARD_AD_ID);
      
      // Initialize open app ad
      await AdMobInterstitial.setAdUnitID(AD_CONFIG.OPEN_APP_AD_ID);
      
      console.log('Ads initialized successfully');
    } catch (error) {
      console.error('Error initializing ads:', error);
    }
  }

  async loadBannerAd(): Promise<boolean> {
    try {
      this.bannerAdLoaded = true;
      return true;
    } catch (error) {
      console.error('Error loading banner ad:', error);
      return false;
    }
  }

  async loadRewardAd(): Promise<boolean> {
    try {
      await AdMobRewarded.requestAdAsync();
      this.rewardAdLoaded = true;
      return true;
    } catch (error) {
      console.error('Error loading reward ad:', error);
      return false;
    }
  }

  async loadOpenAppAd(): Promise<boolean> {
    try {
      await AdMobInterstitial.requestAdAsync();
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
      
      const result = await AdMobRewarded.showAdAsync();
      return result.type === 'reward';
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
      
      await AdMobInterstitial.showAdAsync();
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
