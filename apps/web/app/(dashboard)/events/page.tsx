'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  type: 'tournament' | 'community' | 'challenge';
  participants: number;
  maxParticipants: number;
  prize: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  icon: string;
  game: string;
}

export default function EventsPage() {
  const { data: session, status } = useSession();
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<'all' | 'registered' | 'past'>('all');

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

  const events: Event[] = [
    {
      id: 'snake-race-1',
      name: 'Snake Masters Tournament',
      description: 'Compete with other players in the ultimate snake game tournament. Highest score wins!',
      date: '2024-02-15',
      time: '19:00',
      type: 'tournament',
      participants: 24,
      maxParticipants: 32,
      prize: '5000 Credits + PRO Badge',
      status: 'upcoming',
      icon: '🐍',
      game: 'Snake',
    },
    {
      id: 'flappy-challenge',
      name: 'Flappy Birds Challenge',
      description: 'Daily challenge: survive as long as possible in Flappy Bird mode.',
      date: '2024-02-12',
      time: '14:00',
      type: 'challenge',
      participants: 156,
      maxParticipants: 999,
      prize: '500 Credits',
      status: 'ongoing',
      icon: '🐦',
      game: 'Flappy Bird',
    },
    {
      id: 'memory-masters',
      name: 'Memory Masters Event',
      description: 'Test your memory skills! Fastest completion wins a special badge.',
      date: '2024-02-20',
      time: '20:00',
      type: 'tournament',
      participants: 45,
      maxParticipants: 50,
      prize: '3000 Credits + Elite Badge',
      status: 'upcoming',
      icon: '🎲',
      game: 'Memory',
    },
    {
      id: 'clicker-frenzy',
      name: 'Click Frenzy Marathon',
      description: 'Non-stop 12-hour clicking marathon. Register and compete for glory!',
      date: '2024-02-18',
      time: '12:00',
      type: 'community',
      participants: 89,
      maxParticipants: 100,
      prize: '2500 Credits',
      status: 'upcoming',
      icon: '⚡',
      game: 'Clicker',
    },
    {
      id: 'rust-invasion',
      name: 'Rust Base Invasion',
      description: 'Attack other players\' bases and defend your own in this community event.',
      date: '2024-02-10',
      time: '16:00',
      type: 'community',
      participants: 203,
      maxParticipants: 500,
      prize: '1000 Credits + Rewards',
      status: 'completed',
      icon: '🏚️',
      game: 'Rust',
    },
    {
      id: 'cs2-invitational',
      name: 'CS2 Aim Invitational',
      description: 'Professional aim training tournament. Only for the best shooters!',
      date: '2024-02-25',
      time: '18:00',
      type: 'tournament',
      participants: 32,
      maxParticipants: 64,
      prize: '10000 Credits + Legendary Badge',
      status: 'upcoming',
      icon: '🎯',
      game: 'CS2',
    },
  ];

  const getFilteredEvents = () => {
    let filtered = events;

    if (selectedTab === 'registered') {
      filtered = events.filter(event => registeredEvents.includes(event.id));
    } else if (selectedTab === 'past') {
      filtered = events.filter(event => event.status === 'completed');
    } else {
      filtered = events.filter(event => event.status !== 'completed');
    }

    return filtered.sort((a, b) => {
      if (a.status === 'ongoing') return -1;
      if (b.status === 'ongoing') return 1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  };

  const handleRegister = (eventId: string) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
    } else {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tournament':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'community':
        return 'bg-cyan-500/20 text-cyan-500 border-cyan-500/30';
      case 'challenge':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'text-cyberpunk-primary';
      case 'ongoing':
        return 'text-green-500 animate-pulse';
      case 'completed':
        return 'text-gray-500';
      default:
        return 'text-cyberpunk-text';
    }
  };

  const filteredEvents = getFilteredEvents();

  return (
    <div className="min-h-screen bg-cyberpunk-bg">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="gradient-text mb-4 text-4xl font-bold">🎮 ZELLIX EVENTS</h1>
          <p className="text-cyberpunk-text/70">Join tournaments, complete challenges, and win amazing rewards!</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-4xl font-bold text-cyberpunk-primary">{events.length}</div>
              <p className="text-cyberpunk-text/70 text-sm mt-2">Total Events</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-4xl font-bold text-green-500">{events.filter(e => e.status === 'ongoing').length}</div>
              <p className="text-cyberpunk-text/70 text-sm mt-2">Happening Now</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-4xl font-bold text-cyan-500">{events.filter(e => e.status === 'upcoming').length}</div>
              <p className="text-cyberpunk-text/70 text-sm mt-2">Coming Soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-4xl font-bold text-yellow-500">{registeredEvents.length}</div>
              <p className="text-cyberpunk-text/70 text-sm mt-2">Registered</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-3 border-b border-cyberpunk-primary/20 pb-4">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 font-bold rounded-t-lg transition-all ${
              selectedTab === 'all'
                ? 'bg-cyberpunk-primary text-black'
                : 'text-cyberpunk-text/70 hover:text-cyberpunk-text'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setSelectedTab('registered')}
            className={`px-4 py-2 font-bold rounded-t-lg transition-all ${
              selectedTab === 'registered'
                ? 'bg-cyberpunk-primary text-black'
                : 'text-cyberpunk-text/70 hover:text-cyberpunk-text'
            }`}
          >
            Registered ({registeredEvents.length})
          </button>
          <button
            onClick={() => setSelectedTab('past')}
            className={`px-4 py-2 font-bold rounded-t-lg transition-all ${
              selectedTab === 'past'
                ? 'bg-cyberpunk-primary text-black'
                : 'text-cyberpunk-text/70 hover:text-cyberpunk-text'
            }`}
          >
            Past Events
          </button>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Card key={event.id} hover className="border border-cyberpunk-primary/20">
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    {/* Left Side - Event Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-4">
                        <div className="text-5xl">{event.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-cyberpunk-primary">{event.name}</h3>
                            <span className={`px-3 py-1 rounded text-xs font-bold border ${getTypeColor(event.type)}`}>
                              {event.type.toUpperCase()}
                            </span>
                            {event.status === 'ongoing' && (
                              <span className="px-3 py-1 rounded text-xs font-bold bg-green-500/20 text-green-500 border border-green-500/30 animate-pulse">
                                LIVE
                              </span>
                            )}
                          </div>
                          <p className="text-cyberpunk-text/70 mb-4">{event.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <p className="text-cyberpunk-text/50">Date</p>
                              <p className="font-bold text-cyberpunk-text">{formatDate(event.date)}</p>
                            </div>
                            <div>
                              <p className="text-cyberpunk-text/50">Time</p>
                              <p className="font-bold text-cyberpunk-text">{event.time}</p>
                            </div>
                            <div>
                              <p className="text-cyberpunk-text/50">Game</p>
                              <p className="font-bold text-cyberpunk-text">{event.game}</p>
                            </div>
                            <div>
                              <p className="text-cyberpunk-text/50">Prize</p>
                              <p className="font-bold text-yellow-500">{event.prize}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Participation & Button */}
                    <div className="flex flex-col justify-between">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-cyberpunk-text/70 mb-2">Participants</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-cyberpunk-secondary/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent"
                                style={{
                                  width: `${(event.participants / event.maxParticipants) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-bold text-cyberpunk-primary whitespace-nowrap">
                              {event.participants}/{event.maxParticipants}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-cyberpunk-text/70 mb-2">Status</p>
                          <p className={`font-bold ${getStatusColor(event.status)}`}>
                            {event.status === 'ongoing' ? '🟢 LIVE' : event.status === 'upcoming' ? '⏰ UPCOMING' : '✓ COMPLETED'}
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleRegister(event.id)}
                        disabled={event.status === 'completed' || event.participants >= event.maxParticipants}
                        className={`w-full font-bold ${
                          registeredEvents.includes(event.id)
                            ? 'bg-green-500/20 text-green-500 border border-green-500/50'
                            : event.status === 'completed' || event.participants >= event.maxParticipants
                            ? 'opacity-50 cursor-not-allowed'
                            : 'bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent text-black hover:shadow-lg hover:shadow-cyberpunk-accent/50'
                        }`}
                      >
                        {event.participants >= event.maxParticipants
                          ? 'FULL'
                          : registeredEvents.includes(event.id)
                          ? '✓ REGISTERED'
                          : 'REGISTER'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-cyberpunk-text/70 text-lg">No events to display</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upcoming Events Preview */}
        {selectedTab === 'all' && (
          <div className="mt-12">
            <h2 className="gradient-text text-2xl font-bold mb-6">📅 Quick Facts</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="space-y-2 py-6">
                  <p className="text-3xl">🏆</p>
                  <p className="font-bold text-cyberpunk-primary">Biggest Prize</p>
                  <p className="text-lg font-bold text-yellow-500">10,000 Credits</p>
                  <p className="text-sm text-cyberpunk-text/70">CS2 Aim Invitational</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-2 py-6">
                  <p className="text-3xl">👥</p>
                  <p className="font-bold text-cyberpunk-primary">Most Popular</p>
                  <p className="text-lg font-bold text-cyberpunk-accent">203 Players</p>
                  <p className="text-sm text-cyberpunk-text/70">Rust Base Invasion</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-2 py-6">
                  <p className="text-3xl">⚡</p>
                  <p className="font-bold text-cyberpunk-primary">Total Prize Pool</p>
                  <p className="text-lg font-bold text-green-500">32,500 Credits</p>
                  <p className="text-sm text-cyberpunk-text/70">Across all events</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
