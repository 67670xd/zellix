'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SnakeGame } from '@/components/games/SnakeGame';
import { FlappyBirdGame } from '@/components/games/FlappyBirdGame';
import { MemoryGame } from '@/components/games/MemoryGame';
import { ClickerGame } from '@/components/games/ClickerGame';

export default function GamesPage() {
  const { data: session, status } = useSession();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cyberpunk-bg">
        <p className="text-cyberpunk-text">Loading...</p>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  const games = [
    {
      id: 'snake',
      name: 'Zellix Snake',
      description: 'Classic snake game with a cyberpunk twist. Collect food and grow!',
      icon: '🐍',
      color: 'snake',
    },
    {
      id: 'flappy',
      name: 'Flappy Bird',
      description: 'Tap to jump! Navigate through pipes and earn credits.',
      icon: '🐦',
      color: 'flappy',
    },
    {
      id: 'memory',
      name: 'Memory Game',
      description: 'Match pairs to test your memory and win credits!',
      icon: '🎲',
      color: 'memory',
    },
    {
      id: 'clicker',
      name: 'Clicker Game',
      description: 'Click fast in 30 seconds to earn the most credits!',
      icon: '⚡',
      color: 'clicker',
    },
    {
      name: 'Rust Raid Simulator',
      description: 'Tower defense style game. Defend your base!',
      icon: '🏚️',
      color: 'rust',
    },
    {
      name: 'CS2 Aim Trainer',
      description: 'Practice your headshots with our aim trainer.',
      icon: '🎯',
      color: 'cs2',
    },
  ];

  return (
    <div className="min-h-screen bg-cyberpunk-bg">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        {activeGame === 'snake' ? (
          <div>
            <Button
              variant="secondary"
              onClick={() => setActiveGame(null)}
              className="mb-6"
            >
              ← Back to Games
            </Button>
            <SnakeGame />
          </div>
        ) : activeGame === 'flappy' ? (
          <div>
            <Button
              variant="secondary"
              onClick={() => setActiveGame(null)}
              className="mb-6"
            >
              ← Back to Games
            </Button>
            <FlappyBirdGame />
          </div>
        ) : activeGame === 'memory' ? (
          <div>
            <Button
              variant="secondary"
              onClick={() => setActiveGame(null)}
              className="mb-6"
            >
              ← Back to Games
            </Button>
            <MemoryGame />
          </div>
        ) : activeGame === 'clicker' ? (
          <div>
            <Button
              variant="secondary"
              onClick={() => setActiveGame(null)}
              className="mb-6"
            >
              ← Back to Games
            </Button>
            <ClickerGame />
          </div>
        ) : (
          <>
            <h1 className="gradient-text mb-12 text-4xl font-bold">
              Минигеймы
            </h1>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {games.map((game) => (
                <Card key={game.name} hover glow>
                  <CardContent>
                    <div className="mb-4 text-6xl">{game.icon}</div>
                    <h3 className="mb-2 text-xl font-bold text-cyberpunk-primary">
                      {game.name}
                    </h3>
                    <p className="mb-6 text-cyberpunk-text/70">
                      {game.description}
                    </p>
                    <div className="mb-4 flex items-center justify-between text-sm">
                      <span className="text-cyberpunk-text/50">Награда:</span>
                      <span className="font-bold text-cyberpunk-secondary">+100-500 💎</span>
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        if ('id' in game && ['snake', 'flappy', 'memory', 'clicker'].includes(game.id)) {
                          setActiveGame(game.id);
                        }
                      }}
                    >
                      {['snake', 'flappy', 'memory', 'clicker'].includes(game.id) ? '▶ Играть' : 'Скоро'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats and Achievements */}
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Ваши лучшие результаты</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {games.map((game) => (
                        <div
                          key={game.name}
                          className="glass flex items-center justify-between rounded-lg border border-cyberpunk-primary/20 p-4 hover:border-cyberpunk-primary/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{game.icon}</span>
                            <div>
                              <p className="font-bold text-cyberpunk-text">
                                {game.name}
                              </p>
                              <p className="text-xs text-cyberpunk-text/50">
                                {'id' in game && ['snake', 'flappy', 'memory', 'clicker'].includes(game.id) 
                                  ? 'Активна' 
                                  : 'Скоро будет доступна'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-cyberpunk-primary">
                              0
                            </p>
                            <p className="text-sm text-cyberpunk-text/50">
                              Рекорд
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Статистика</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg bg-cyberpunk-primary/10 border border-cyberpunk-primary/20">
                      <p className="text-cyberpunk-text/70 text-sm">Всего игр сыграно</p>
                      <p className="text-2xl font-bold text-cyberpunk-primary">42</p>
                    </div>
                    <div className="p-3 rounded-lg bg-cyberpunk-secondary/10 border border-cyberpunk-secondary/20">
                      <p className="text-cyberpunk-text/70 text-sm">Кредитов заработано</p>
                      <p className="text-2xl font-bold text-cyberpunk-secondary">4,250</p>
                    </div>
                    <div className="p-3 rounded-lg bg-cyberpunk-accent/10 border border-cyberpunk-accent/20">
                      <p className="text-cyberpunk-text/70 text-sm">Лучшие достижения</p>
                      <p className="text-2xl font-bold text-cyberpunk-accent">8</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
