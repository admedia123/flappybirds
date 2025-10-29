import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { GameState, GameProps } from '../types/GameTypes';
import { GAME_CONFIG } from '../constants/GameConstants';
import {
  createInitialGameState,
  updateBird,
  jumpBird,
  updatePipes,
  checkCollisions,
  checkScore,
  createPipe,
} from '../utils/GameLogic';
import Bird from '../components/Bird';
import Pipe from '../components/Pipe';
import AdService from '../services/AdService';
import IAPService from '../services/IAPService';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GameScreen: React.FC<GameProps> = ({ onGameOver, onScoreUpdate }) => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const adService = AdService.getInstance();
  const iapService = IAPService.getInstance();

  useEffect(() => {
    initializeServices();
    return () => {
      // Cleanup: Clear interval when component unmounts
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, []);

  // Cleanup interval when game stops running
  useEffect(() => {
    if (!isRunning && gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, [isRunning]);

  const initializeServices = async () => {
    try {
      await adService.initializeAds();
      await iapService.initialize();
    } catch (error) {
      console.error('Error initializing services:', error);
    }
  };

  const startGame = () => {
    setGameState(prevState => ({
      ...prevState,
      gameStarted: true,
      gameOver: false,
      score: 0,
      bird: { ...prevState.bird, position: { x: GAME_CONFIG.BIRD_START_X, y: GAME_CONFIG.BIRD_START_Y }, velocity: 0, rotation: 0 },
      pipes: [],
    }));
    setIsRunning(true);
    startGameLoop();
  };

  const startGameLoop = () => {
    // Clear any existing interval before starting new one
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    gameLoopRef.current = setInterval(() => {
      updateGame();
    }, 16); // ~60 FPS
  };

  const updateGame = () => {
    setGameState(prevState => {
      if (prevState.gameOver) return prevState;

      // Update bird
      const updatedBird = updateBird(prevState.bird);

      // Update pipes
      let updatedPipes = updatePipes(prevState.pipes);

      // Spawn new pipes
      const lastPipe = updatedPipes[updatedPipes.length - 1];
      if (!lastPipe || lastPipe.x < SCREEN_WIDTH - GAME_CONFIG.PIPE_SPAWN_DISTANCE) {
        updatedPipes.push(createPipe(SCREEN_WIDTH));
      }

      // Check collisions
      const hasCollision = checkCollisions(updatedBird, updatedPipes);

      // Check score (returns updated pipes with scored flags)
      const { score: scoreIncrement, updatedPipes: pipesWithScore } = checkScore(updatedBird, updatedPipes);
      updatedPipes = pipesWithScore;
      const newScore = prevState.score + scoreIncrement;

      if (scoreIncrement > 0) {
        onScoreUpdate(newScore);
      }

      if (hasCollision) {
        // Game over
        setIsRunning(false);
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
        
        const finalScore = newScore;
        const newHighScore = Math.max(prevState.highScore, finalScore);
        
        onGameOver(finalScore);
        
        // Show ads if not premium
        showGameOverAds();
        
        return {
          ...prevState,
          gameOver: true,
          score: finalScore,
          highScore: newHighScore,
        };
      }
      
      return {
        ...prevState,
        bird: updatedBird,
        pipes: updatedPipes,
        score: newScore,
      };
    });
  };

  const showGameOverAds = async () => {
    try {
      const hasRemoveAds = await iapService.hasRemoveAds();
      
      if (!hasRemoveAds) {
        // Show open app ad
        await adService.showOpenAppAd();
      }
    } catch (error) {
      console.error('Error showing game over ads:', error);
    }
  };

  const handleJump = () => {
    if (!gameState.gameStarted || gameState.gameOver) {
      if (!gameState.gameStarted) {
        startGame();
      }
      return;
    }
    
    setGameState(prevState => ({
      ...prevState,
      bird: jumpBird(prevState.bird),
    }));
  };

  const handleRewardAd = async () => {
    try {
      const success = await adService.showRewardAd();
      if (success) {
        // Give player extra life or bonus
        Alert.alert('Reward Earned!', 'You earned a bonus!');
      }
    } catch (error) {
      console.error('Error showing reward ad:', error);
    }
  };

  const renderGameEntities = () => {
    const entities: any = {};
    
    // Add bird
    entities.bird = {
      position: gameState.bird.position,
      velocity: gameState.bird.velocity,
      rotation: gameState.bird.rotation,
      size: gameState.bird.size,
      renderer: <Bird bird={gameState.bird} />,
    };
    
    // Add pipes
    gameState.pipes.forEach((pipe, index) => {
      entities[`pipe-${index}`] = {
        position: { x: pipe.x, y: 0 },
        topHeight: pipe.topHeight,
        bottomY: pipe.bottomY,
        width: pipe.width,
        gap: pipe.gap,
        renderer: <Pipe pipe={pipe} />,
      };
    });
    
    return entities;
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.background} />
      
      {/* Game Engine */}
      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        systems={[]}
        entities={renderGameEntities()}
        running={isRunning}
        style={styles.gameEngine}
      />
      
      {/* UI Overlay */}
      <View style={styles.overlay}>
        {/* Score */}
        <Text style={styles.score}>{gameState.score}</Text>
        
        {/* Game Over Screen */}
        {gameState.gameOver && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Game Over!</Text>
            <Text style={styles.finalScore}>Score: {gameState.score}</Text>
            <Text style={styles.highScore}>High Score: {gameState.highScore}</Text>
            
            <TouchableOpacity style={styles.restartButton} onPress={startGame}>
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.rewardButton} onPress={handleRewardAd}>
              <Text style={styles.buttonText}>Watch Ad for Bonus</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Start Screen */}
        {!gameState.gameStarted && !gameState.gameOver && (
          <View style={styles.startContainer}>
            <Text style={styles.title}>SkyBird Adventure</Text>
            <Text style={styles.instruction}>Tap to fly!</Text>
            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Touch Handler */}
      <TouchableOpacity
        style={styles.touchArea}
        onPress={handleJump}
        activeOpacity={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GAME_CONFIG.COLORS.SKY,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: GAME_CONFIG.COLORS.SKY,
  },
  gameEngine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    position: 'absolute',
    top: 50,
    left: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: GAME_CONFIG.COLORS.TEXT,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  gameOverContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: GAME_CONFIG.COLORS.TEXT,
    marginBottom: 20,
  },
  finalScore: {
    fontSize: 24,
    color: GAME_CONFIG.COLORS.TEXT,
    marginBottom: 10,
  },
  highScore: {
    fontSize: 20,
    color: GAME_CONFIG.COLORS.TEXT,
    marginBottom: 30,
  },
  startContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: GAME_CONFIG.COLORS.TEXT,
    marginBottom: 20,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 18,
    color: GAME_CONFIG.COLORS.TEXT,
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: GAME_CONFIG.COLORS.BUTTON,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  restartButton: {
    backgroundColor: GAME_CONFIG.COLORS.BUTTON,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  rewardButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: GAME_CONFIG.COLORS.BUTTON_TEXT,
    fontSize: 18,
    fontWeight: 'bold',
  },
  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default GameScreen;
