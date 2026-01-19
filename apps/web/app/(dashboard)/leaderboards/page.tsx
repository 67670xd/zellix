'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  value: number;
  change?: number;
  verified?: boolean;
}

export default function LeaderboardsPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('credits');

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cyberpunk-bg">
        <p className="text-cyberpunk-text">Загрузка...</p>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  const leaderboards = {
    credits: [
      { rank: 1, name: 'ThunderStrike', avatar: '⚡', value: 25000, change: 2, verified: true },
      { rank: 2, name: 'InfernoLord', avatar: '🔥', value: 24500, change: -1, verified: true },
      { rank: 3, name: 'Pro_Gamer_X', avatar: '👾', value: 15000, change: 3, verified: true },
      { rank: 4, name: 'EchoKing', avatar: '👑', value: 12000, change: 1, verified: false },
      { rank: 5, name: 'VortexViper', avatar: '🐍', value: 11500, change: 2, verified: false },
      { rank: 6, name: 'ShadowHunter', avatar: '🎯', value: 10200, change: -2, verified: true },
      { rank: 7, name: 'CyberNinja99', avatar: '🥷', value: 8500, change: 1, verified: false },
      { rank: 8, name: 'MysticMage', avatar: '🧙', value: 7100, change: 4, verified: false },
      { rank: 9, name: 'NeonKnight', avatar: '⚔️', value: 5200, change: -1, verified: true },
      { rank: 10, name: 'PhantomGhost', avatar: '👻', value: 3100, change: 0, verified: false },
    ],
    games: [
      { rank: 1, name: 'Pro_Gamer_X', avatar: '👾', value: 42, change: 0, verified: true },
      { rank: 2, name: 'ThunderStrike', avatar: '⚡', value: 38, change: 1, verified: true },
      { rank: 3, name: 'EchoKing', avatar: '👑', value: 35, change: 2, verified: false },
      { rank: 4, name: 'InfernoLord', avatar: '🔥', value: 32, change: -1, verified: true },
      { rank: 5, name: 'VortexViper', avatar: '🐍', value: 28, change: 1, verified: false },
      { rank: 6, name: 'ShadowHunter', avatar: '🎯', value: 25, change: 2, verified: true },
      { rank: 7, name: 'CyberNinja99', avatar: '🥷', value: 24, change: 0, verified: false },
      { rank: 8, name: 'MysticMage', avatar: '🧙', value: 22, change: -1, verified: false },
      { rank: 9, name: 'NeonKnight', avatar: '⚔️', value: 20, change: 1, verified: true },
      { rank: 10, name: 'PhantomGhost', avatar: '👻', value: 18, change: 3, verified: false },
    ],
    achievements: [
      { rank: 1, name: 'ThunderStrike', avatar: '⚡', value: 38, change: 0, verified: true },
      { rank: 2, name: 'InfernoLord', avatar: '🔥', value: 35, change: 2, verified: true },
      { rank: 3, name: 'Pro_Gamer_X', avatar: '👾', value: 28, change: -1, verified: true },
      { rank: 4, name: 'EchoKing', avatar: '👑', value: 31, change: 1, verified: false },
      { rank: 5, name: 'VortexViper', avatar: '🐍', value: 26, change: 0, verified: false },
      { rank: 6, name: 'ShadowHunter', avatar: '🎯', value: 24, change: 3, verified: true },
      { rank: 7, name: 'CyberNinja99', avatar: '🥷', value: 21, change: 1, verified: false },
      { rank: 8, name: 'MysticMage', avatar: '🧙', value: 19, change: -2, verified: false },
      { rank: 9, name: 'NeonKnight', avatar: '⚔️', value: 15, change: 2, verified: true },
      { rank: 10, name: 'PhantomGhost', avatar: '👻', value: 8, change: 1, verified: false },
    ],
    events: [
      { rank: 1, name: 'ThunderStrike', avatar: '⚡', value: 12, change: 1, verified: true },
      { rank: 2, name: 'InfernoLord', avatar: '🔥', value: 11, change: 0, verified: true },
      { rank: 3, name: 'EchoKing', avatar: '👑', value: 9, change: 2, verified: false },
      { rank: 4, name: 'Pro_Gamer_X', avatar: '👾', value: 8, change: -1, verified: true },
      { rank: 5, name: 'ShadowHunter', avatar: '🎯', value: 7, change: 1, verified: true },
      { rank: 6, name: 'VortexViper', avatar: '🐍', value: 6, change: 0, verified: false },
      { rank: 7, name: 'CyberNinja99', avatar: '🥷', value: 5, change: 2, verified: false },
      { rank: 8, name: 'MysticMage', avatar: '🧙', value: 4, change: -1, verified: false },
      { rank: 9, name: 'NeonKnight', avatar: '⚔️', value: 3, change: 1, verified: true },
      { rank: 10, name: 'PhantomGhost', avatar: '👻', value: 1, change: 0, verified: false },
    ],
  };

  const tabs = [
    { id: 'credits', label: '💰 Credits', icon: '💵' },
    { id: 'games', label: '🎮 Games Played', icon: '🕹️' },
    { id: 'achievements', label: '🏆 Achievements', icon: '⭐' },
    { id: 'events', label: '🎪 Events Won', icon: '🏅' },
  ];

  const currentLeaderboard = leaderboards[activeTab as keyof typeof leaderboards];

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getChangeColor = (change?: number) => {
    if (!change) return 'text-gray-500';
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-cyberpunk-bg">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="gradient-text mb-12 text-4xl font-bold">
          🏆 РЕЙТИНГИ
        </h1>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-lg font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-cyberpunk-primary text-black shadow-lg shadow-cyberpunk-primary/50'
                  : 'bg-cyberpunk-secondary/20 text-cyberpunk-text border border-cyberpunk-primary/30 hover:border-cyberpunk-primary/50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Main Leaderboard */}
        <Card className="mb-8" hover glow>
          <CardHeader>
            <CardTitle>Топ 10 игроков</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentLeaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                    entry.rank <= 3
                      ? 'bg-gradient-to-r from-cyberpunk-primary/20 to-transparent border border-cyberpunk-primary/30'
                      : 'bg-cyberpunk-secondary/20 border border-cyberpunk-primary/20 hover:border-cyberpunk-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`text-2xl font-bold w-8 text-center ${
                      entry.rank === 1 ? 'text-yellow-500' :
                      entry.rank === 2 ? 'text-gray-300' :
                      entry.rank === 3 ? 'text-orange-500' :
                      'text-cyberpunk-text/70'
                    }`}>
                      {getMedalEmoji(entry.rank)}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{entry.avatar}</span>
                      <div>
                        <p className="font-bold text-cyberpunk-primary flex items-center gap-2">
                          {entry.name}
                          {entry.verified && <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">✓ Verified</span>}
                        </p>
                        <p className="text-sm text-cyberpunk-text/70">Rank #{entry.rank}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {entry.change !== undefined && (
                      <div className={`text-sm font-bold ${getChangeColor(entry.change)}`}>
                        {entry.change > 0 ? `↑ ${entry.change}` : entry.change < 0 ? `↓ ${Math.abs(entry.change)}` : '→'}
                      </div>
                    )}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-500">{entry.value.toLocaleString()}</p>
                      <p className="text-xs text-cyberpunk-text/50">
                        {activeTab === 'credits' ? 'Credits' :
                         activeTab === 'games' ? 'Games' :
                         activeTab === 'achievements' ? 'Achievements' :
                         'Events'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-sm text-cyberpunk-text/70 mb-2">Your Rank</p>
              <p className="text-4xl font-bold text-yellow-500">#127</p>
              <p className="text-xs text-cyberpunk-text/70 mt-2">↑ 5 places this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-sm text-cyberpunk-text/70 mb-2">Your Score</p>
              <p className="text-4xl font-bold text-cyan-500">8,450</p>
              <p className="text-xs text-cyberpunk-text/70 mt-2">+125 this session</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-sm text-cyberpunk-text/70 mb-2">You vs #1</p>
              <p className="text-4xl font-bold text-red-500">-16,550</p>
              <p className="text-xs text-cyberpunk-text/70 mt-2">Points behind</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-sm text-cyberpunk-text/70 mb-2">Achievements</p>
              <p className="text-4xl font-bold text-green-500">8/40</p>
              <p className="text-xs text-cyberpunk-text/70 mt-2">20% Complete</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
