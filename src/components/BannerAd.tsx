import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import { AD_CONFIG } from '../constants/GameConstants';
import IAPService from '../services/IAPService';

interface BannerAdProps {
  style?: any;
}

const BannerAd: React.FC<BannerAdProps> = ({ style }) => {
  const [showAd, setShowAd] = useState(true);
  const [hasRemoveAds, setHasRemoveAds] = useState(false);
  const iapService = IAPService.getInstance();

  useEffect(() => {
    checkRemoveAdsStatus();
  }, []);

  const checkRemoveAdsStatus = async () => {
    try {
      const removeAds = await iapService.hasRemoveAds();
      setHasRemoveAds(removeAds);
      setShowAd(!removeAds);
    } catch (error) {
      console.error('Error checking remove ads status:', error);
    }
  };

  const handleAdError = (error: any) => {
    console.error('Banner ad error:', error);
    setShowAd(false);
  };

  const handleAdLoaded = () => {
    console.log('Banner ad loaded successfully');
  };

  if (!showAd || hasRemoveAds) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <AdMobBanner
        bannerSize="banner"
        adUnitID={AD_CONFIG.BANNER_AD_ID}
        servePersonalizedAds={true}
        onDidFailToReceiveAdWithError={handleAdError}
        onAdLoaded={handleAdLoaded}
        style={styles.banner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: '100%',
    height: 50,
  },
});

export default BannerAd;
