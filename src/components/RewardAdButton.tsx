import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AdService from '../services/AdService';
import { GAME_CONFIG } from '../constants/GameConstants';

interface RewardAdButtonProps {
  onRewardEarned?: () => void;
  title?: string;
  style?: any;
  textStyle?: any;
}

const RewardAdButton: React.FC<RewardAdButtonProps> = ({
  onRewardEarned,
  title = 'Watch Ad for Reward',
  style,
  textStyle,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const adService = AdService.getInstance();

  const handlePress = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      const success = await adService.showRewardAd();
      
      if (success) {
        Alert.alert('Reward Earned!', 'You received a bonus!');
        onRewardEarned?.();
      } else {
        Alert.alert('Ad Not Available', 'Please try again later.');
      }
    } catch (error) {
      console.error('Error showing reward ad:', error);
      Alert.alert('Error', 'Failed to load ad. Please try again.');
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
        {isLoading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
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

export default RewardAdButton;
