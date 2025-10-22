import { Audio } from 'expo-av';
import { Platform } from 'react-native';

export class SoundManager {
  private static instance: SoundManager;
  private sounds: { [key: string]: Audio.Sound } = {};
  private isEnabled = true;

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  async initialize(): Promise<void> {
    try {
      // Set audio mode for better performance
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Error initializing sound manager:', error);
    }
  }

  async loadSound(name: string, source: any): Promise<void> {
    try {
      if (this.sounds[name]) {
        await this.sounds[name].unloadAsync();
      }
      
      const { sound } = await Audio.Sound.createAsync(source);
      this.sounds[name] = sound;
    } catch (error) {
      console.error(`Error loading sound ${name}:`, error);
    }
  }

  async playSound(name: string, volume: number = 1.0): Promise<void> {
    try {
      if (!this.isEnabled || !this.sounds[name]) {
        return;
      }

      await this.sounds[name].setVolumeAsync(volume);
      await this.sounds[name].replayAsync();
    } catch (error) {
      console.error(`Error playing sound ${name}:`, error);
    }
  }

  async stopSound(name: string): Promise<void> {
    try {
      if (this.sounds[name]) {
        await this.sounds[name].stopAsync();
      }
    } catch (error) {
      console.error(`Error stopping sound ${name}:`, error);
    }
  }

  async setVolume(name: string, volume: number): Promise<void> {
    try {
      if (this.sounds[name]) {
        await this.sounds[name].setVolumeAsync(volume);
      }
    } catch (error) {
      console.error(`Error setting volume for ${name}:`, error);
    }
  }

  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  isSoundEnabled(): boolean {
    return this.isEnabled;
  }

  async cleanup(): Promise<void> {
    try {
      for (const [name, sound] of Object.entries(this.sounds)) {
        await sound.unloadAsync();
      }
      this.sounds = {};
    } catch (error) {
      console.error('Error cleaning up sounds:', error);
    }
  }

  // Predefined sound effects
  async playJumpSound(): Promise<void> {
    await this.playSound('jump', 0.7);
  }

  async playScoreSound(): Promise<void> {
    await this.playSound('score', 0.5);
  }

  async playGameOverSound(): Promise<void> {
    await this.playSound('gameOver', 0.8);
  }

  async playBackgroundMusic(): Promise<void> {
    await this.playSound('background', 0.3);
  }
}
