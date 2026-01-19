'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Card {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

export function MemoryGame() {
  const { data: session } = useSession();
  const icons = ['🎮', '⚔️', '🎯', '💎', '🏆', '⭐', '🔥', '👾'];
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [moves, setMoves] = useState(0);

  // Initialize game
  const initGame = () => {
    const shuffled = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, idx) => ({
        id: idx,
        icon,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setMoves(0);
    setGameStarted(true);
    setGameOver(false);
  };

  // Check for matches
  useEffect(() => {
    if (flipped.length !== 2) return;

    const [first, second] = flipped;
    if (cards[first].icon === cards[second].icon) {
      setMatched([...matched, first, second]);
      setScore(score + 50);
      setFlipped([]);

      // Check if game won
      if (matched.length + 2 === cards.length) {
        setGameOver(true);
        // award credits
        (async () => {
          try {
            const credits = Math.max(0, score + 50 - (moves + 1) * 5);
            if (!session?.user?.id || credits <= 0) return;
            await fetch('/api/credits', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: session.user.id,
                amount: credits,
                type: 'EARN',
                source: 'GAME',
                reason: 'memory',
              }),
            });
          } catch (err) {
            console.error('Failed to award credits for memory game', err);
          }
        })();
      }
    } else {
      setTimeout(() => {
        setFlipped([]);
      }, 600);
    }

    setMoves(moves + 1);
  }, [flipped, cards, matched, score, moves]);

  const handleCardClick = (id: number) => {
    if (!gameStarted || gameOver || matched.includes(id) || flipped.includes(id)) return;
    setFlipped([...flipped, id]);
  };

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="text-center">
          <h2 className="gradient-text text-2xl font-bold mb-2">🎲 MEMORY GAME</h2>
          <p className="text-cyberpunk-text/70 text-sm">Match pairs to earn credits!</p>
        </div>

        <button
          onClick={initGame}
          className="px-8 py-3 bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyberpunk-accent/50 transition-all"
        >
          START GAME
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="text-center">
        <h2 className="gradient-text text-2xl font-bold mb-2">🎲 MEMORY GAME</h2>
        <div className="flex gap-8 justify-center text-sm">
          <span className="text-cyberpunk-text/70">
            Moves: <span className="text-cyberpunk-primary font-bold">{moves}</span>
          </span>
          <span className="text-cyberpunk-text/70">
            Matched: <span className="text-green-500 font-bold">{matched.length / 2}/8</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full max-w-sm">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-lg font-bold text-2xl transition-all duration-300 ${
              matched.includes(card.id)
                ? 'bg-green-500/20 border-2 border-green-500 cursor-not-allowed'
                : flipped.includes(card.id)
                ? 'bg-cyberpunk-primary text-cyberpunk-bg border-2 border-cyberpunk-primary'
                : 'bg-cyberpunk-secondary border-2 border-cyberpunk-secondary hover:border-cyberpunk-accent hover:shadow-lg hover:shadow-cyberpunk-accent/30 cursor-pointer'
            }`}
          >
            {matched.includes(card.id) || flipped.includes(card.id) ? card.icon : '?'}
          </button>
        ))}
      </div>

      <div className="flex gap-8 justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-cyberpunk-accent">{score}</div>
          <p className="text-cyberpunk-text/70 text-sm">Score</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-500">{Math.max(0, score - moves * 5)}</div>
          <p className="text-cyberpunk-text/70 text-sm">Credits Earned</p>
        </div>
      </div>

      {gameOver && (
        <div className="w-full text-center p-6 bg-cyberpunk-secondary/20 border-2 border-cyberpunk-accent rounded-lg">
          <h3 className="text-cyberpunk-accent font-bold text-lg mb-2">🎉 VICTORY!</h3>
          <p className="text-cyberpunk-text/70 text-sm mb-3">
            Completed in {moves} moves. Earned {Math.max(0, score - moves * 5)} credits!
          </p>
          <button
            onClick={initGame}
            className="px-6 py-2 bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyberpunk-accent/50 transition-all"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}
