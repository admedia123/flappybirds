import { GameState, Bird, Pipe } from '../types/GameTypes';
import { GAME_CONFIG } from '../constants/GameConstants';

export const createInitialBird = (): Bird => ({
  position: { x: GAME_CONFIG.BIRD_START_X, y: GAME_CONFIG.BIRD_START_Y },
  velocity: 0,
  rotation: 0,
  size: GAME_CONFIG.BIRD_SIZE,
});

export const createInitialGameState = (): GameState => ({
  score: 0,
  highScore: 0,
  gameOver: false,
  gameStarted: false,
  bird: createInitialBird(),
  pipes: [],
  gameSpeed: GAME_CONFIG.GAME_SPEED,
});

export const updateBird = (bird: Bird): Bird => {
  const newVelocity = bird.velocity + GAME_CONFIG.BIRD_GRAVITY;
  const newY = bird.position.y + newVelocity;
  const newRotation = Math.min(Math.max(newVelocity * 3, -30), 30);
  
  return {
    ...bird,
    position: { ...bird.position, y: newY },
    velocity: Math.min(newVelocity, GAME_CONFIG.BIRD_MAX_VELOCITY),
    rotation: newRotation,
  };
};

export const jumpBird = (bird: Bird): Bird => ({
  ...bird,
  velocity: GAME_CONFIG.BIRD_JUMP_FORCE,
});

export const createPipe = (x: number): Pipe => {
  const minHeight = 50;
  const maxHeight = GAME_CONFIG.SCREEN_HEIGHT - GAME_CONFIG.PIPE_GAP - 150;
  const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;

  return {
    id: Math.random().toString(36).substr(2, 9),
    x,
    topHeight,
    bottomY: topHeight + GAME_CONFIG.PIPE_GAP,
    width: GAME_CONFIG.PIPE_WIDTH,
    gap: GAME_CONFIG.PIPE_GAP,
    scored: false, // Initialize scored flag
  };
};

export const updatePipes = (pipes: Pipe[]): Pipe[] => {
  return pipes
    .map(pipe => ({ ...pipe, x: pipe.x - GAME_CONFIG.PIPE_SPEED }))
    .filter(pipe => pipe.x + pipe.width > -GAME_CONFIG.PIPE_CLEANUP_OFFSET);
};

export const checkCollisions = (bird: Bird, pipes: Pipe[]): boolean => {
  // Ground collision
  if (bird.position.y + bird.size / 2 >= GAME_CONFIG.SCREEN_HEIGHT - GAME_CONFIG.GROUND_OFFSET) {
    return true;
  }
  
  // Ceiling collision
  if (bird.position.y - bird.size / 2 <= 0) {
    return true;
  }
  
  // Pipe collisions
  for (const pipe of pipes) {
    const birdLeft = bird.position.x - bird.size / 2;
    const birdRight = bird.position.x + bird.size / 2;
    const birdTop = bird.position.y - bird.size / 2;
    const birdBottom = bird.position.y + bird.size / 2;
    
    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + pipe.width;
    
    // Check if bird is within pipe's x range
    if (birdRight > pipeLeft && birdLeft < pipeRight) {
      // Check if bird hits top or bottom pipe
      if (birdTop < pipe.topHeight || birdBottom > pipe.bottomY) {
        return true;
      }
    }
  }
  
  return false;
};

export const checkScore = (bird: Bird, pipes: Pipe[]): { score: number; updatedPipes: Pipe[] } => {
  let newScore = 0;
  const updatedPipes = pipes.map(pipe => {
    // Check if bird has passed the pipe and hasn't been scored yet
    if (bird.position.x > pipe.x + pipe.width && !pipe.scored) {
      newScore += GAME_CONFIG.SCORE_INCREMENT;
      return { ...pipe, scored: true }; // Create new object instead of mutating
    }
    return pipe;
  });

  return { score: newScore, updatedPipes };
};
