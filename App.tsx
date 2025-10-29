import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GameScreen from './src/screens/GameScreen';

export default function App() {
  const [highScore, setHighScore] = useState(0);

  const handleGameOver = (score: number) => {
    if (score > highScore) {
      setHighScore(score);
    }
  };

  const handleScoreUpdate = (score: number) => {
    // Optional: Handle score updates during gameplay
    console.log('Current score:', score);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#87CEEB" />
      <GameScreen
        onGameOver={handleGameOver}
        onScoreUpdate={handleScoreUpdate}
      />
    </SafeAreaProvider>
  );
}
