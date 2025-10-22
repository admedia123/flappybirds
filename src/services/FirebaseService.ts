import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

export class FirebaseService {
  private static instance: FirebaseService;
  private db: any;
  private isInitialized = false;

  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  async initialize(): Promise<void> {
    try {
      const app = initializeApp(firebaseConfig);
      this.db = getFirestore(app);
      this.isInitialized = true;
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase:', error);
    }
  }

  async saveHighScore(userId: string, score: number): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const userRef = doc(this.db, 'users', userId);
      await setDoc(userRef, {
        highScore: score,
        lastUpdated: new Date().toISOString()
      }, { merge: true });

      return true;
    } catch (error) {
      console.error('Error saving high score:', error);
      return false;
    }
  }

  async getHighScore(userId: string): Promise<number> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const userRef = doc(this.db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data().highScore || 0;
      }
      
      return 0;
    } catch (error) {
      console.error('Error getting high score:', error);
      return 0;
    }
  }

  async saveGameData(userId: string, gameData: any): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const userRef = doc(this.db, 'users', userId);
      await setDoc(userRef, {
        gameData: gameData,
        lastUpdated: new Date().toISOString()
      }, { merge: true });

      return true;
    } catch (error) {
      console.error('Error saving game data:', error);
      return false;
    }
  }

  async getGameData(userId: string): Promise<any> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const userRef = doc(this.db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data().gameData || {};
      }
      
      return {};
    } catch (error) {
      console.error('Error getting game data:', error);
      return {};
    }
  }

  async generateUserId(): Promise<string> {
    try {
      let userId = await AsyncStorage.getItem('userId');
      
      if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        await AsyncStorage.setItem('userId', userId);
      }
      
      return userId;
    } catch (error) {
      console.error('Error generating user ID:', error);
      return 'user_' + Date.now();
    }
  }
}
