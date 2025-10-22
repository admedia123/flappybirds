import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';
import { IAP_CONFIG } from '../constants/GameConstants';

export class IAPService {
  private static instance: IAPService;
  private isInitialized = false;

  static getInstance(): IAPService {
    if (!IAPService.instance) {
      IAPService.instance = new IAPService();
    }
    return IAPService.instance;
  }

  async initialize(): Promise<void> {
    try {
      // Replace with your actual RevenueCat API key
      const apiKey = Platform.OS === 'ios' 
        ? 'your_ios_api_key_here' 
        : 'your_android_api_key_here';
      
      await Purchases.configure({ apiKey });
      this.isInitialized = true;
      console.log('RevenueCat initialized successfully');
    } catch (error) {
      console.error('Error initializing RevenueCat:', error);
    }
  }

  async getOfferings(): Promise<any> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }
      
      const offerings = await Purchases.getOfferings();
      return offerings;
    } catch (error) {
      console.error('Error getting offerings:', error);
      return null;
    }
  }

  async purchaseProduct(productId: string): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const { customerInfo } = await Purchases.purchaseProduct(productId);
      
      // Check if the purchase was successful
      return customerInfo.entitlements.active[productId] !== undefined;
    } catch (error) {
      console.error('Error purchasing product:', error);
      return false;
    }
  }

  async restorePurchases(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const customerInfo = await Purchases.restorePurchases();
      return customerInfo.entitlements.active !== undefined;
    } catch (error) {
      console.error('Error restoring purchases:', error);
      return false;
    }
  }

  async checkPurchaseStatus(productId: string): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const customerInfo = await Purchases.getCustomerInfo();
      return customerInfo.entitlements.active[productId] !== undefined;
    } catch (error) {
      console.error('Error checking purchase status:', error);
      return false;
    }
  }

  async removeAds(): Promise<boolean> {
    return await this.purchaseProduct(IAP_CONFIG.REMOVE_ADS_PRODUCT_ID);
  }

  async upgradeToPremium(): Promise<boolean> {
    return await this.purchaseProduct(IAP_CONFIG.PREMIUM_PRODUCT_ID);
  }

  async hasRemoveAds(): Promise<boolean> {
    return await this.checkPurchaseStatus(IAP_CONFIG.REMOVE_ADS_PRODUCT_ID);
  }

  async hasPremium(): Promise<boolean> {
    return await this.checkPurchaseStatus(IAP_CONFIG.PREMIUM_PRODUCT_ID);
  }
}
