'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function ClickerGame() {
  const { data: session } = useSession();
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [clickPower, setClickPower] = useState(1);
  const [criticalChance, setCriticalChance] = useState(5);

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setClickPower(1);
    setCriticalChance(5);
    setGameActive(true);
  };

  const handleClick = () => {
    if (!gameActive) return;

    const isCritical = Math.random() * 100 < criticalChance;
    const points = isCritical ? clickPower * 3 : clickPower;

    setScore(score + points);
  };

  // Auto upgrades
  useEffect(() => {
    if (!gameActive) return;

    if (score >= 100 && clickPower === 1) {
      setClickPower(2);
    } else if (score >= 500 && clickPower === 2) {
      setClickPower(3);
    } else if (score >= 1500 && clickPower === 3) {
      setClickPower(5);
      setCriticalChance(15);
    }
  }, [score, clickPower, gameActive]);

  // award credits when game ends
  useEffect(() => {
    if (gameActive) return;
    if (score <= 0) return;

    const credits = Math.floor(score / 10);
    async function award() {
      try {
        if (!session?.user?.id) return;
        await fetch('/api/credits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: session.user.id,
            amount: credits,
            type: 'EARN',
            source: 'GAME',
            reason: 'clicker',
          }),
        });
      } catch (err) {
        console.error('Failed to award credits for clicker', err);
      }
    }

    award();
  }, [gameActive, score, session]);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="text-center">
        <h2 className="gradient-text text-2xl font-bold mb-2">⚡ CLICKER GAME</h2>
        <p className="text-cyberpunk-text/70 text-sm">Click as fast as you can!</p>
      </div>

      {!gameActive && score === 0 && (
        <button
          onClick={startGame}
          className="px-8 py-3 bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyberpunk-accent/50 transition-all text-lg"
        >
          START GAME (30s)
        </button>
      )}

      {gameActive && (
        <div className="text-center space-y-4">
          <div className="text-5xl font-bold text-cyberpunk-accent">{timeLeft}s</div>

          <button
            onClick={handleClick}
            className="w-48 h-48 rounded-full bg-gradient-to-br from-cyberpunk-primary to-cyberpunk-accent text-4xl font-bold text-black shadow-2xl shadow-cyberpunk-accent/50 hover:scale-110 active:scale-95 transition-transform"
          >
            💥
          </button>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm text-cyberpunk-text/70">Click Power</div>
              <div className="text-2xl font-bold text-green-500">{clickPower}x</div>
            </div>
            <div>
              <div className="text-sm text-cyberpunk-text/70">Critical Rate</div>
              <div className="text-2xl font-bold text-orange-500">{criticalChance}%</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-8 justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-cyberpunk-accent">{score}</div>
          <p className="text-cyberpunk-text/70 text-sm">Score</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-500">{Math.floor(score / 10)}</div>
          <p className="text-cyberpunk-text/70 text-sm">Credits Earned</p>
        </div>
      </div>

      {!gameActive && score > 0 && (
        <div className="w-full text-center p-6 bg-cyberpunk-secondary/20 border-2 border-cyberpunk-primary rounded-lg">
          <h3 className="text-cyberpunk-primary font-bold text-lg mb-2">⏹️ GAME ENDED</h3>
          <p className="text-cyberpunk-text/70 text-sm mb-3">
            Final Score: {score} | Earned {Math.floor(score / 10)} credits!
          </p>
          <button
            onClick={startGame}
            className="px-6 py-2 bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyberpunk-accent/50 transition-all"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}
