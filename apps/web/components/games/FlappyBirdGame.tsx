'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

export function FlappyBirdGame() {
  const { data: session } = useSession();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<{
    score: number;
    gameOver: boolean;
    gameStarted: boolean;
  }>({
    score: 0,
    gameOver: false,
    gameStarted: false,
  });

  const gameRef = useRef({
    birdY: 150,
    birdVelocity: 0,
    pipes: [] as Array<{ x: number; gap: number }>,
    score: 0,
    gameOver: false,
  });

  const GRAVITY = 0.4;
  const JUMP_STRENGTH = -8;
  const PIPE_GAP = 120;
  const PIPE_WIDTH = 80;
  const PIPE_SPACING = 200;

  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const game = gameRef.current;

    // Background
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Bird
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(60, game.birdY, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Pipes
    ctx.fillStyle = '#00ff00';
    ctx.shadowColor = '#00ff00';
    ctx.shadowBlur = 10;
    game.pipes.forEach((pipe) => {
      // Top pipe
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gap);
      // Bottom pipe
      ctx.fillRect(pipe.x, pipe.gap + PIPE_GAP, PIPE_WIDTH, canvas.height);
    });
    ctx.shadowBlur = 0;

    // Score
    ctx.fillStyle = '#00ffff';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`Score: ${game.score}`, 10, 30);

    if (game.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ff00ff';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);
      ctx.fillStyle = '#00ffff';
      ctx.font = '24px Arial';
      ctx.fillText(`Final Score: ${game.score}`, canvas.width / 2, canvas.height / 2 + 20);
    }
  };

  const updateGame = () => {
    const game = gameRef.current;
    if (game.gameOver || !gameState.gameStarted) return;

    game.birdVelocity += GRAVITY;
    game.birdY += game.birdVelocity;

    // Check boundaries
    if (game.birdY + 15 > 400 || game.birdY - 15 < 0) {
      game.gameOver = true;
      setGameState({ ...gameState, gameOver: true, score: game.score });
      // award credits
      (async () => {
        try {
          const credits = game.score > 0 ? game.score * 5 : 0;
          if (!session?.user?.id || credits <= 0) return;
          await fetch('/api/credits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: session.user.id,
              amount: credits,
              type: 'EARN',
              source: 'GAME',
              reason: 'flappy',
            }),
          });
        } catch (err) {
          console.error('Failed to award credits for flappy', err);
        }
      })();
    }

    // Move pipes
    game.pipes = game.pipes.filter((pipe) => pipe.x > -PIPE_WIDTH);

    game.pipes.forEach((pipe) => {
      pipe.x -= 5;

      // Check collision
      if (
        60 + 15 > pipe.x &&
        60 - 15 < pipe.x + PIPE_WIDTH &&
        (game.birdY - 15 < pipe.gap || game.birdY + 15 > pipe.gap + PIPE_GAP)
      ) {
        game.gameOver = true;
        setGameState({ ...gameState, gameOver: true, score: game.score });
        // award credits
        (async () => {
          try {
            const credits = game.score > 0 ? game.score * 5 : 0;
            if (!session?.user?.id || credits <= 0) return;
            await fetch('/api/credits', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: session.user.id,
                amount: credits,
                type: 'EARN',
                source: 'GAME',
                reason: 'flappy',
              }),
            });
          } catch (err) {
            console.error('Failed to award credits for flappy', err);
          }
        })();
      }

      // Score point
      if (pipe.x === 0) {
        game.score += 10;
        setGameState({ ...gameState, score: game.score });
      }
    });

    // Add new pipe
    if (game.pipes.length === 0 || game.pipes[game.pipes.length - 1].x < 300) {
      game.pipes.push({
        x: 400,
        gap: Math.random() * (300 - PIPE_GAP) + 50,
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (!gameState.gameStarted) {
          gameRef.current = {
            birdY: 150,
            birdVelocity: 0,
            pipes: [],
            score: 0,
            gameOver: false,
          };
          setGameState({ score: 0, gameOver: false, gameStarted: true });
        } else if (gameState.gameOver) {
          gameRef.current = {
            birdY: 150,
            birdVelocity: 0,
            pipes: [],
            score: 0,
            gameOver: false,
          };
          setGameState({ score: 0, gameOver: false, gameStarted: true });
        } else {
          gameRef.current.birdVelocity = JUMP_STRENGTH;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameStarted, gameState.gameOver]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      updateGame();
      drawGame();
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameState]);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="text-center">
        <h2 className="gradient-text text-2xl font-bold mb-2">🐦 FLAPPY BIRD</h2>
        <p className="text-cyberpunk-text/70 text-sm">Press SPACE to jump • Avoid pipes!</p>
      </div>

      <div className="relative border-2 border-cyberpunk-accent rounded-lg overflow-hidden shadow-lg shadow-cyberpunk-accent/30">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="block bg-cyberpunk-bg"
        />
      </div>

      <div className="flex gap-8 justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-cyberpunk-accent">{gameState.score}</div>
          <p className="text-cyberpunk-text/70 text-sm">Score</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-500">
            {gameState.score > 0 ? gameState.score * 5 : 0}
          </div>
          <p className="text-cyberpunk-text/70 text-sm">Credits Earned</p>
        </div>
      </div>
    </div>
  );
}
