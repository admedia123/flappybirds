export interface Bird {
  position: { x: number; y: number };
  velocity: number;
  rotation: number;
  size: number;
}

export interface Pipe {
  id: string;
  x: number;
  topHeight: number;
  bottomY: number;
  width: number;
  gap: number;
}

export interface GameState {
  score: number;
  highScore: number;
  gameOver: boolean;
  gameStarted: boolean;
  bird: Bird;
  pipes: Pipe[];
  gameSpeed: number;
}

export interface GameProps {
  onGameOver: (score: number) => void;
  onScoreUpdate: (score: number) => void;
}

export interface AdConfig {
  bannerAdId: string;
  rewardAdId: string;
  openAppAdId: string;
}

export interface IAPConfig {
  removeAdsProductId: string;
  premiumProductId: string;
}
