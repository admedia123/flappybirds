import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { GAME_CONFIG } from '../constants/GameConstants';
import AdService from '../services/AdService';
import IAPService from '../services/IAPService';
import FirebaseService from '../services/FirebaseService';

interface MenuScreenProps {
  onStartGame: () => void;
  highScore: number;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame, highScore }) => {
  const [hasRemoveAds, setHasRemoveAds] = useState(false);
  const [hasPremium, setHasPremium] = useState(false);
  const adService = AdService.getInstance();
  const iapService = IAPService.getInstance();
  const firebaseService = FirebaseService.getInstance();

  useEffect(() => {
    checkPurchaseStatus();
    loadBannerAd();
  }, []);

  const checkPurchaseStatus = async () => {
    try {
      const removeAds = await iapService.hasRemoveAds();
      const premium = await iapService.hasPremium();
      setHasRemoveAds(removeAds);
      setHasPremium(premium);
    } catch (error) {
      console.error('Error checking purchase status:', error);
    }
  };

  const loadBannerAd = async () => {
    try {
      if (!hasRemoveAds) {
        await adService.loadBannerAd();
      }
    } catch (error) {
      console.error('Error loading banner ad:', error);
    }
  };

  const handleRemoveAds = async () => {
    try {
      const success = await iapService.removeAds();
      if (success) {
        setHasRemoveAds(true);
        Alert.alert('Success!', 'Ads have been removed!');
      } else {
        Alert.alert('Error', 'Failed to purchase. Please try again.');
      }
    } catch (error) {
      console.error('Error removing ads:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const handlePremiumUpgrade = async () => {
    try {
      const success = await iapService.upgradeToPremium();
      if (success) {
        setHasPremium(true);
        Alert.alert('Success!', 'Welcome to Premium!');
      } else {
        Alert.alert('Error', 'Failed to purchase. Please try again.');
      }
    } catch (error) {
      console.error('Error upgrading to premium:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const handleRestorePurchases = async () => {
    try {
      const success = await iapService.restorePurchases();
      if (success) {
        await checkPurchaseStatus();
        Alert.alert('Success!', 'Purchases restored successfully!');
      } else {
        Alert.alert('Info', 'No purchases to restore.');
      }
    } catch (error) {
      console.error('Error restoring purchases:', error);
      Alert.alert('Error', 'An error occurred while restoring purchases.');
    }
  };

  const handleRateApp = () => {
    // Implement app rating logic
    Alert.alert('Rate App', 'Thank you for playing! Please rate us on the App Store/Google Play.');
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.background} />
      
      {/* Title */}
      <Text style={styles.title}>SkyBird Adventure</Text>
      
      {/* High Score */}
      <Text style={styles.highScore}>High Score: {highScore}</Text>
      
      {/* Menu Buttons */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={onStartGame}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuButton} onPress={handleRateApp}>
          <Text style={styles.buttonText}>RATE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuButton} onPress={handleRestorePurchases}>
          <Text style={styles.buttonText}>RESTORE</Text>
        </TouchableOpacity>
        
        {!hasRemoveAds && (
          <TouchableOpacity style={styles.menuButton} onPress={handleRemoveAds}>
            <Text style={styles.buttonText}>REMOVE ADS</Text>
          </TouchableOpacity>
        )}
        
        {!hasPremium && (
          <TouchableOpacity style={styles.menuButton} onPress={handlePremiumUpgrade}>
            <Text style={styles.buttonText}>GO PREMIUM</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Copyright */}
      <Text style={styles.copyright}>© 2024 SkyBird Games</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GAME_CONFIG.COLORS.SKY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: GAME_CONFIG.COLORS.SKY,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: GAME_CONFIG.COLORS.TEXT,
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  highScore: {
    fontSize: 24,
    color: GAME_CONFIG.COLORS.TEXT,
    marginBottom: 40,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  menuContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  menuButton: {
    backgroundColor: GAME_CONFIG.COLORS.BUTTON,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: GAME_CONFIG.COLORS.BUTTON_TEXT,
    fontSize: 18,
    fontWeight: 'bold',
  },
  copyright: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: GAME_CONFIG.COLORS.TEXT,
    textAlign: 'center',
  },
});

export default MenuScreen;
