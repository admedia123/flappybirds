import { GameState } from '../types/GameTypes';

export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private frameCount = 0;
  private lastFPS = 60;
  private targetFPS = 60;

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Optimize game loop performance
  optimizeGameLoop(gameState: GameState): boolean {
    this.frameCount++;
    
    // Skip frames if performance is poor
    if (this.lastFPS < 30 && this.frameCount % 2 === 0) {
      return false;
    }
    
    // Skip frames if too many pipes
    if (gameState.pipes.length > 10 && this.frameCount % 2 === 0) {
      return false;
    }
    
    return true;
  }

  // Optimize pipe rendering
  shouldRenderPipe(pipe: any, screenWidth: number): boolean {
    // Only render pipes that are visible or about to be visible
    return pipe.x + pipe.width > -50 && pipe.x < screenWidth + 50;
  }

  // Optimize bird physics
  optimizeBirdPhysics(bird: any): any {
    // Reduce physics calculations for better performance
    const optimizedBird = { ...bird };
    
    // Limit velocity calculations
    if (Math.abs(optimizedBird.velocity) > 15) {
      optimizedBird.velocity = Math.sign(optimizedBird.velocity) * 15;
    }
    
    return optimizedBird;
  }

  // Memory management
  cleanupOldPipes(pipes: any[]): any[] {
    // Remove pipes that are far off screen
    return pipes.filter(pipe => pipe.x + pipe.width > -100);
  }

  // Performance monitoring
  updateFPS(deltaTime: number): void {
    if (deltaTime > 0) {
      this.lastFPS = Math.round(1000 / deltaTime);
    }
  }

  getCurrentFPS(): number {
    return this.lastFPS;
  }

  // Adaptive quality settings
  getQualitySettings(): { particleCount: number; shadowQuality: number } {
    if (this.lastFPS < 30) {
      return { particleCount: 10, shadowQuality: 0.5 };
    } else if (this.lastFPS < 45) {
      return { particleCount: 20, shadowQuality: 0.7 };
    } else {
      return { particleCount: 30, shadowQuality: 1.0 };
    }
  }
}
