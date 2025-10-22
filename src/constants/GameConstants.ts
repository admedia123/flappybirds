import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const GAME_CONFIG = {
  // Screen dimensions - dynamic based on device
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,

  // Bird settings
  BIRD_SIZE: 30,
  BIRD_START_X: 80,
  BIRD_START_Y: 300,
  BIRD_JUMP_FORCE: -8,
  BIRD_GRAVITY: 0.5,
  BIRD_MAX_VELOCITY: 10,
  
  // Pipe settings
  PIPE_WIDTH: 60,
  PIPE_GAP: 150,
  PIPE_SPEED: 3,
  PIPE_SPAWN_DISTANCE: 300,
  PIPE_CLEANUP_OFFSET: 50, // Remove pipes 50px off screen

  // Game settings
  GAME_SPEED: 1,
  SCORE_INCREMENT: 1,
  GROUND_OFFSET: 100, // Ground collision offset from bottom
  
  // Colors
  COLORS: {
    SKY: '#87CEEB',
    GROUND: '#90EE90',
    BIRD: '#FFD700',
    PIPE: '#228B22',
    PIPE_OUTLINE: '#006400',
    TEXT: '#FFFFFF',
    BUTTON: '#FF6B35',
    BUTTON_TEXT: '#FFFFFF'
  }
};

export const AD_CONFIG = {
  // Test Ad IDs - Replace with your actual AdMob Ad Unit IDs
  BANNER_AD_ID: 'ca-app-pub-3940256099942544/6300978111',
  REWARD_AD_ID: 'ca-app-pub-3940256099942544/5224354917',
  OPEN_APP_AD_ID: 'ca-app-pub-3940256099942544/3419835294'
};

export const IAP_CONFIG = {
  // Replace with your actual RevenueCat Product IDs
  REMOVE_ADS_PRODUCT_ID: 'remove_ads',
  PREMIUM_PRODUCT_ID: 'premium_upgrade'
};
