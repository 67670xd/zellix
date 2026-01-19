'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: string;
  credits: number;
  level: number;
  achievements: number;
  game: string;
}

export default function PeoplePage() {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline'>('all');

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

  // Mock users data
  const users: User[] = [
    {
      id: '1',
      name: 'Pro_Gamer_X',
      email: 'user1@example.com',
      avatar: '👾',
      status: 'online',
      lastSeen: '2 seconds ago',
      credits: 15000,
      level: 42,
      achievements: 28,
      game: 'Snake',
    },
    {
      id: '2',
      name: 'CyberNinja99',
      email: 'user2@example.com',
      avatar: '🥷',
      status: 'online',
      lastSeen: '1 minute ago',
      credits: 8500,
      level: 35,
      achievements: 21,
      game: 'Flappy Bird',
    },
    {
      id: '3',
      name: 'ShadowHunter',
      email: 'user3@example.com',
      avatar: '🎯',
      status: 'away',
      lastSeen: '5 minutes ago',
      credits: 12000,
      level: 38,
      achievements: 24,
      game: 'Memory Game',
    },
    {
      id: '4',
      name: 'NeonKnight',
      email: 'user4@example.com',
      avatar: '⚔️',
      status: 'online',
      lastSeen: '3 seconds ago',
      credits: 5200,
      level: 28,
      achievements: 15,
      game: 'Clicker',
    },
    {
      id: '5',
      name: 'PhantomGhost',
      email: 'user5@example.com',
      avatar: '👻',
      status: 'offline',
      lastSeen: '2 hours ago',
      credits: 3100,
      level: 15,
      achievements: 8,
      game: 'Snake',
    },
    {
      id: '6',
      name: 'ThunderStrike',
      email: 'user6@example.com',
      avatar: '⚡',
      status: 'online',
      lastSeen: '10 seconds ago',
      credits: 22000,
      level: 51,
      achievements: 35,
      game: 'Flappy Bird',
    },
    {
      id: '7',
      name: 'MysticMage',
      email: 'user7@example.com',
      avatar: '🧙',
      status: 'offline',
      lastSeen: '4 hours ago',
      credits: 9800,
      level: 32,
      achievements: 19,
      game: 'Memory Game',
    },
    {
      id: '8',
      name: 'VortexViper',
      email: 'user8@example.com',
      avatar: '🐍',
      status: 'online',
      lastSeen: '30 seconds ago',
      credits: 11500,
      level: 40,
      achievements: 26,
      game: 'Clicker',
    },
    {
      id: '9',
      name: 'EchoKing',
      email: 'user9@example.com',
      avatar: '👑',
      status: 'away',
      lastSeen: '15 minutes ago',
      credits: 18900,
      level: 48,
      achievements: 31,
      game: 'Snake',
    },
    {
      id: '10',
      name: 'InfernoLord',
      email: 'user10@example.com',
      avatar: '🔥',
      status: 'online',
      lastSeen: '5 seconds ago',
      credits: 25000,
      level: 55,
      achievements: 38,
      game: 'Memory Game',
    },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'online' && (user.status === 'online' || user.status === 'away')) ||
        (filterStatus === 'offline' && user.status === 'offline');
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  const onlineCount = users.filter((u) => u.status === 'online' || u.status === 'away').length;
  const offlineCount = users.filter((u) => u.status === 'offline').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500 animate-pulse';
      case 'away':
        return 'bg-yellow-500 animate-pulse';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return '🟢 ONLINE';
      case 'away':
        return '🟡 AWAY';
      case 'offline':
        return '⚫ OFFLINE';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-cyberpunk-bg">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-secondary">
              👥 СООБЩЕСТВО
            </span>
          </h1>
          <p className="text-cyberpunk-text/70">Найди друзей и подключись к другим игрокам Zellix</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card hover glow>
            <CardContent className="text-center py-6">
              <div className="text-4xl font-bold text-cyberpunk-primary">{users.length}</div>
              <p className="text-cyberpunk-text/70 text-sm mt-2">Всего игроков</p>
            </CardContent>
          </Card>
          <Card hover glow>
            <CardContent className="text-center py-6">
              <div className="text-4xl font-bold text-green-500">{onlineCount}</div>
              <p className="text-cyberpunk-text/70 text-sm mt-2">Играет сейчас</p>
            </CardContent>
          </Card>
          <Card hover glow>
            <CardContent className="text-center py-6">
              <div className="text-4xl font-bold text-yellow-500">
                {users.filter((u) => u.status === 'away').length}
              </div>
              <p className="text-cyberpunk-text/70 text-sm mt-2">Неактивные</p>
            </CardContent>
          </Card>
          <Card hover glow>
            <CardContent className="text-center py-6">
              <div className="text-4xl font-bold text-gray-500">{offlineCount}</div>
              <p className="text-cyberpunk-text/70 text-sm mt-2">Оффлайн</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="Поиск игроков..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filterStatus === 'all'
                  ? 'bg-cyberpunk-primary text-black'
                  : 'bg-cyberpunk-secondary/20 text-cyberpunk-text border border-cyberpunk-primary/30 hover:border-cyberpunk-primary/50'
              }`}
            >
              All Players
            </button>
            <button
              onClick={() => setFilterStatus('online')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filterStatus === 'online'
                  ? 'bg-green-500 text-black'
                  : 'bg-cyberpunk-secondary/20 text-cyberpunk-text border border-green-500/30 hover:border-green-500/50'
              }`}
            >
              🟢 Online & Away
            </button>
            <button
              onClick={() => setFilterStatus('offline')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filterStatus === 'offline'
                  ? 'bg-gray-500 text-black'
                  : 'bg-cyberpunk-secondary/20 text-cyberpunk-text border border-gray-500/30 hover:border-gray-500/50'
              }`}
            >
              ⚫ Offline
            </button>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Card key={user.id} hover className="relative overflow-hidden">
                <CardContent className="pt-6 space-y-4">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(user.status)}`} />
                    <span className="text-xs font-bold text-cyberpunk-text/70">
                      {user.status === 'online' ? 'LIVE' : user.status === 'away' ? 'AFK' : 'OFF'}
                    </span>
                  </div>

                  {/* Avatar & Name */}
                  <div className="text-center">
                    <div className="text-6xl mb-3">{user.avatar}</div>
                    <h3 className="font-bold text-lg text-cyberpunk-primary truncate">{user.name}</h3>
                    <p className={`text-xs font-bold mt-1 ${
                      user.status === 'online' ? 'text-green-500' :
                      user.status === 'away' ? 'text-yellow-500' :
                      'text-gray-500'
                    }`}>
                      {getStatusText(user.status)}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 text-center text-sm">
                    <div className="rounded-lg bg-cyberpunk-secondary/20 p-2">
                      <p className="text-cyberpunk-text/70 text-xs">Level</p>
                      <p className="font-bold text-cyberpunk-primary text-lg">{user.level}</p>
                    </div>
                    <div className="rounded-lg bg-cyberpunk-secondary/20 p-2">
                      <p className="text-cyberpunk-text/70 text-xs">Credits</p>
                      <p className="font-bold text-green-500 text-lg">{user.credits.toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg bg-cyberpunk-secondary/20 p-2">
                      <p className="text-cyberpunk-text/70 text-xs">Achievements</p>
                      <p className="font-bold text-yellow-500 text-lg">{user.achievements}</p>
                    </div>
                    <div className="rounded-lg bg-cyberpunk-secondary/20 p-2">
                      <p className="text-cyberpunk-text/70 text-xs">Playing</p>
                      <p className="font-bold text-cyan-500 text-xs">{user.game}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      Add Friend
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      Message
                    </Button>
                  </div>

                  {/* Last Seen */}
                  <p className="text-xs text-cyberpunk-text/50 text-center">
                    {user.status === 'online' ? 'Playing right now' : `Last seen: ${user.lastSeen}`}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="md:col-span-2 lg:col-span-3 xl:col-span-4">
              <CardContent className="text-center py-12">
                <p className="text-cyberpunk-text/70 text-lg">No players found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
