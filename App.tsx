import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App() {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
  };

  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
  };

  const incrementScore = () => {
    setScore(prev => prev + 1);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#87CEEB" />
      <View style={styles.container}>
        {/* Background */}
        <View style={styles.background} />
        
        {/* Game Content */}
        <View style={styles.gameArea}>
          {!gameStarted && !gameOver && (
            <View style={styles.menuContainer}>
              <Text style={styles.title}>SkyBird Adventure</Text>
              <Text style={styles.subtitle}>Tap to fly!</Text>
              <TouchableOpacity style={styles.startButton} onPress={startGame}>
                <Text style={styles.buttonText}>START GAME</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {gameStarted && !gameOver && (
            <View style={styles.gameContainer}>
              <Text style={styles.score}>Score: {score}</Text>
              <TouchableOpacity 
                style={styles.tapArea} 
                onPress={incrementScore}
                activeOpacity={0.8}
              >
                <Text style={styles.tapText}>TAP TO FLY!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.endButton} onPress={endGame}>
                <Text style={styles.buttonText}>END GAME</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {gameOver && (
            <View style={styles.gameOverContainer}>
              <Text style={styles.gameOverText}>Game Over!</Text>
              <Text style={styles.finalScore}>Final Score: {score}</Text>
              <TouchableOpacity style={styles.restartButton} onPress={startGame}>
                <Text style={styles.buttonText}>PLAY AGAIN</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#87CEEB',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  gameContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 30,
    borderRadius: 20,
  },
  score: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  tapArea: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 30,
    marginBottom: 20,
  },
  tapText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  endButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  gameOverContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 40,
    borderRadius: 20,
  },
  gameOverText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  finalScore: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});