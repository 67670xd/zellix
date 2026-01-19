'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface GameState {
  snake: Position[];
  food: Position;
  direction: Position;
  nextDirection: Position;
  score: number;
  gameOver: boolean;
  gamePaused: boolean;
  gameStarted: boolean;
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
    gameOver: false,
    gamePaused: false,
    gameStarted: false,
  });

  const gridSize = 20;
  const tileCount = 20;
  const tileSize = 400 / tileCount;

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = gameStateRef.current;

    // Background
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= tileCount; i++) {
      const pos = i * tileSize;
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, pos);
      ctx.lineTo(canvas.width, pos);
      ctx.stroke();
    }

    // Food
    ctx.fillStyle = '#ff00ff';
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 10;
    ctx.fillRect(
      state.food.x * tileSize + 2,
      state.food.y * tileSize + 2,
      tileSize - 4,
      tileSize - 4
    );
    ctx.shadowBlur = 0;

    // Snake body
    ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
    ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
    ctx.shadowBlur = 8;
    for (let i = 1; i < state.snake.length; i++) {
      ctx.fillRect(
        state.snake[i].x * tileSize + 1,
        state.snake[i].y * tileSize + 1,
        tileSize - 2,
        tileSize - 2
      );
    }

    // Snake head
    ctx.fillStyle = '#00ffff';
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 15;
    ctx.fillRect(
      state.snake[0].x * tileSize,
      state.snake[0].y * tileSize,
      tileSize,
      tileSize
    );
    ctx.shadowBlur = 0;

    // Game over overlay
    if (state.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ffff';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);

      ctx.fillStyle = '#ff00ff';
      ctx.font = '24px Arial';
      ctx.fillText(`Final Score: ${state.score}`, canvas.width / 2, canvas.height / 2 + 20);

      ctx.fillStyle = '#00ffff';
      ctx.font = '16px Arial';
      ctx.fillText('Press SPACE to restart', canvas.width / 2, canvas.height / 2 + 60);
    }

    // Paused overlay
    if (state.gamePaused && state.gameStarted && !state.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ffff';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    }
  }, []);

  const generateFood = useCallback(() => {
    const state = gameStateRef.current;
    let newFood: Position;
    let collision = true;

    while (collision) {
      newFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      };

      collision = state.snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
    }

    state.food = newFood;
  }, []);

  const updateGame = useCallback(() => {
    const state = gameStateRef.current;

    if (state.gameOver || state.gamePaused || !state.gameStarted) {
      return;
    }

    state.direction = state.nextDirection;

    const head = { ...state.snake[0] };
    head.x += state.direction.x;
    head.y += state.direction.y;

    // Wrap around
    head.x = (head.x + tileCount) % tileCount;
    head.y = (head.y + tileCount) % tileCount;

    // Check collision with self
    if (state.snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      state.gameOver = true;
      return;
    }

    state.snake.unshift(head);

    // Check food collision
    if (head.x === state.food.x && head.y === state.food.y) {
      state.score += 10;
      generateFood();
    } else {
      state.snake.pop();
    }
  }, [generateFood]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const state = gameStateRef.current;

      if (e.key === ' ') {
        e.preventDefault();
        if (!state.gameStarted || state.gameOver) {
          gameStateRef.current = {
            snake: [{ x: 10, y: 10 }],
            food: { x: 15, y: 15 },
            direction: { x: 1, y: 0 },
            nextDirection: { x: 1, y: 0 },
            score: 0,
            gameOver: false,
            gamePaused: false,
            gameStarted: true,
          };
          generateFood();
        } else {
          state.gamePaused = !state.gamePaused;
        }
        return;
      }

      if (!state.gameStarted) return;

      const key = e.key.toLowerCase();
      const currentDir = state.direction;

      switch (key) {
        case 'arrowup':
        case 'w':
          e.preventDefault();
          if (currentDir.y === 0) state.nextDirection = { x: 0, y: -1 };
          break;
        case 'arrowdown':
        case 's':
          e.preventDefault();
          if (currentDir.y === 0) state.nextDirection = { x: 0, y: 1 };
          break;
        case 'arrowleft':
        case 'a':
          e.preventDefault();
          if (currentDir.x === 0) state.nextDirection = { x: -1, y: 0 };
          break;
        case 'arrowright':
        case 'd':
          e.preventDefault();
          if (currentDir.x === 0) state.nextDirection = { x: 1, y: 0 };
          break;
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      updateGame();
      drawGame();
    }, 100);

    return () => clearInterval(gameLoop);
  }, [updateGame, drawGame]);

  useEffect(() => {
    drawGame();
  }, [drawGame]);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="text-center">
        <h2 className="gradient-text text-2xl font-bold mb-2">ZELLIX SNAKE</h2>
        <p className="text-cyberpunk-text/70 text-sm">
          Use Arrow Keys or WASD to control • Press SPACE to {gameStateRef.current.gameStarted && !gameStateRef.current.gameOver ? 'Pause/Resume' : 'Start'}
        </p>
      </div>

      <div className="relative border-2 border-cyberpunk-primary rounded-lg overflow-hidden shadow-lg shadow-cyberpunk-primary/30">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="block bg-cyberpunk-bg"
        />
      </div>

      <div className="flex gap-8 justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-cyberpunk-primary">
            {gameStateRef.current.score}
          </div>
          <p className="text-cyberpunk-text/70 text-sm">Score</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-cyberpunk-accent">
            {gameStateRef.current.snake.length}
          </div>
          <p className="text-cyberpunk-text/70 text-sm">Length</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-cyberpunk-text/60 max-w-md">
        <div>↑ W - Up</div>
        <div>↓ S - Down</div>
        <div>← A - Left</div>
        <div>→ D - Right</div>
        <div className="col-span-2 text-center pt-2">
          SPACE - {gameStateRef.current.gameStarted && !gameStateRef.current.gameOver ? 'Pause' : 'Start'}
        </div>
      </div>
    </div>
  );
}
