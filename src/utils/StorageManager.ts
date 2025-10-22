import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseService from '../services/FirebaseService';

export class StorageManager {
  private static instance: StorageManager;
  private firebaseService = FirebaseService.getInstance();

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  // Save high score locally and to Firebase
  async saveHighScore(score: number): Promise<boolean> {
    try {
      // Save locally
      await AsyncStorage.setItem('highScore', score.toString());
      
      // Save to Firebase
      const userId = await this.firebaseService.generateUserId();
      await this.firebaseService.saveHighScore(userId, score);
      
      return true;
    } catch (error) {
      console.error('Error saving high score:', error);
      return false;
    }
  }

  // Load high score from local storage
  async loadHighScore(): Promise<number> {
    try {
      const score = await AsyncStorage.getItem('highScore');
      return score ? parseInt(score) : 0;
    } catch (error) {
      console.error('Error loading high score:', error);
      return 0;
    }
  }

  // Save game settings
  async saveGameSettings(settings: any): Promise<boolean> {
    try {
      await AsyncStorage.setItem('gameSettings', JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving game settings:', error);
      return false;
    }
  }

  // Load game settings
  async loadGameSettings(): Promise<any> {
    try {
      const settings = await AsyncStorage.getItem('gameSettings');
      return settings ? JSON.parse(settings) : {};
    } catch (error) {
      console.error('Error loading game settings:', error);
      return {};
    }
  }

  // Save user preferences
  async saveUserPreferences(preferences: any): Promise<boolean> {
    try {
      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
      
      // Also save to Firebase
      const userId = await this.firebaseService.generateUserId();
      await this.firebaseService.saveGameData(userId, preferences);
      
      return true;
    } catch (error) {
      console.error('Error saving user preferences:', error);
      return false;
    }
  }

  // Load user preferences
  async loadUserPreferences(): Promise<any> {
    try {
      const preferences = await AsyncStorage.getItem('userPreferences');
      return preferences ? JSON.parse(preferences) : {};
    } catch (error) {
      console.error('Error loading user preferences:', error);
      return {};
    }
  }

  // Save game statistics
  async saveGameStats(stats: any): Promise<boolean> {
    try {
      await AsyncStorage.setItem('gameStats', JSON.stringify(stats));
      return true;
    } catch (error) {
      console.error('Error saving game stats:', error);
      return false;
    }
  }

  // Load game statistics
  async loadGameStats(): Promise<any> {
    try {
      const stats = await AsyncStorage.getItem('gameStats');
      return stats ? JSON.parse(stats) : {};
    } catch (error) {
      console.error('Error loading game stats:', error);
      return {};
    }
  }

  // Clear all data
  async clearAllData(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }

  // Get storage usage
  async getStorageUsage(): Promise<{ used: number; available: number }> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);
      
      let used = 0;
      data.forEach(([key, value]) => {
        used += (key.length + (value?.length || 0)) * 2; // Approximate size
      });
      
      return {
        used,
        available: 1000000 - used // Approximate available space
      };
    } catch (error) {
      console.error('Error getting storage usage:', error);
      return { used: 0, available: 1000000 };
    }
  }
}
