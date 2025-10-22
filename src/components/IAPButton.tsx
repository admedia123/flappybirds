import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import IAPService from '../services/IAPService';
import { GAME_CONFIG } from '../constants/GameConstants';

interface IAPButtonProps {
  productId: string;
  title: string;
  price?: string;
  onPurchaseSuccess?: () => void;
  style?: any;
  textStyle?: any;
}

const IAPButton: React.FC<IAPButtonProps> = ({
  productId,
  title,
  price,
  onPurchaseSuccess,
  style,
  textStyle,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const iapService = IAPService.getInstance();

  const handlePress = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      const success = await iapService.purchaseProduct(productId);
      
      if (success) {
        Alert.alert('Purchase Successful!', 'Thank you for your purchase!');
        onPurchaseSuccess?.();
      } else {
        Alert.alert('Purchase Failed', 'Please try again or contact support.');
      }
    } catch (error) {
      console.error('Error purchasing product:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {isLoading ? 'Processing...' : `${title}${price ? ` - ${price}` : ''}`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: GAME_CONFIG.COLORS.BUTTON,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
  },
  buttonText: {
    color: GAME_CONFIG.COLORS.BUTTON_TEXT,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IAPButton;
