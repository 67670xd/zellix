'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

const DISCORD_SERVER = 'https://discord.gg/eCF3J6G7aH';

export default function Home() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('rust');

  const games = {
    rust: {
      name: 'Rust',
      emoji: '🏚️',
      description: 'Build your base, raid enemies, survive the wasteland',
      color: 'from-orange-600 to-red-600',
    },
    cs2: {
      name: 'CS2',
      emoji: '🎯',
      description: 'Tactical gameplay, skill-based combat, competitive ranks',
      color: 'from-blue-600 to-cyan-600',
    },
    gta: {
      name: 'GTA RP',
      emoji: '🏎️',
      description: 'Roleplay adventure, custom servers, endless possibilities',
      color: 'from-purple-600 to-pink-600',
    },
  };

  return (
    <main className="min-h-screen bg-cyberpunk-bg overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">
        {/* Animated background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyberpunk-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyberpunk-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-cyberpunk-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="mb-8 inline-block">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-secondary">
                  ZELLIX
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-cyberpunk-text">
              The Ultimate Gaming <span className="text-cyberpunk-accent">Community Hub</span>
            </h1>

            <p className="text-lg sm:text-xl text-cyberpunk-text/70 mb-8 max-w-2xl mx-auto">
              Connect with thousands of gamers. Compete in tournaments. Earn rewards. Rule the leaderboards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href={DISCORD_SERVER}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 text-lg font-bold rounded-lg overflow-hidden bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                <span className="relative text-white flex items-center justify-center gap-2">
                  💬 Join Discord
                </span>
              </a>

              {session ? (
                <Link
                  href="/dashboard"
                  className="group relative px-8 py-4 text-lg font-bold rounded-lg overflow-hidden bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  <span className="relative text-cyberpunk-bg flex items-center justify-center gap-2">
                    🎮 Dashboard
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => signIn('discord')}
                  className="group relative px-8 py-4 text-lg font-bold rounded-lg overflow-hidden bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  <span className="relative text-cyberpunk-bg flex items-center justify-center gap-2">
                    🚀 Login
                  </span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[
                { value: '10K+', label: 'Members' },
                { value: '50+', label: 'Online' },
                { value: '24/7', label: 'Gaming' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass rounded-lg p-4 border border-cyberpunk-primary/30 hover:border-cyberpunk-primary/60 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-cyberpunk-primary">{stat.value}</div>
                  <div className="text-sm text-cyberpunk-text/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="text-2xl text-cyberpunk-accent">↓</div>
        </div>
      </section>

      {/* ===== GAMES SHOWCASE ===== */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-secondary">
                SUPPORTED GAMES
              </span>
            </h2>
            <p className="text-xl text-cyberpunk-text/70">Track stats, earn rewards, compete with friends</p>
          </div>

          <div className="flex gap-4 justify-center mb-8 flex-wrap">
            {Object.entries(games).map(([key, game]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  activeTab === key
                    ? 'bg-cyberpunk-primary text-cyberpunk-bg shadow-lg shadow-cyberpunk-primary/50'
                    : 'bg-cyberpunk-primary/10 text-cyberpunk-primary hover:bg-cyberpunk-primary/20'
                }`}
              >
                {game.emoji} {game.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="glass rounded-xl border border-cyberpunk-primary/30 p-8 sm:p-12 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${games[activeTab as keyof typeof games].color} opacity-5`} />

              <div className="relative z-10 grid sm:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-6xl mb-6">{games[activeTab as keyof typeof games].emoji}</div>
                  <h3 className="text-3xl font-bold mb-4 text-cyberpunk-primary">
                    {games[activeTab as keyof typeof games].name}
                  </h3>
                  <p className="text-lg text-cyberpunk-text/80 mb-6">
                    {games[activeTab as keyof typeof games].description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-cyberpunk-accent">✓</span>
                      <span>Real-time stat tracking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-cyberpunk-accent">✓</span>
                      <span>Leaderboards & rankings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-cyberpunk-accent">✓</span>
                      <span>Tournaments & events</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-cyberpunk-accent">✓</span>
                      <span>Rewards system</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-6xl mb-4">{games[activeTab as keyof typeof games].emoji}</div>
                  <div className="glass rounded-lg p-8 border border-cyberpunk-primary/30">
                    <p className="text-cyberpunk-text/70 mb-4">Join thousands of competitive players</p>
                    <Link
                      href={session ? '/dashboard/games' : '/login'}
                      className="inline-block px-6 py-3 bg-cyberpunk-primary text-cyberpunk-bg rounded-lg font-bold hover:shadow-lg hover:shadow-cyberpunk-primary/50 transition-all"
                    >
                      View Stats
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section id="features" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-secondary">
                FEATURES & SYSTEMS
              </span>
            </h2>
            <p className="text-xl text-cyberpunk-text/70">Everything you need to dominate the gaming scene</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '💎',
                title: 'Zellix Credits',
                description: 'Earn credits through gameplay, events, and achievements.',
              },
              {
                icon: '🏆',
                title: 'Leaderboards',
                description: 'Compete globally and climb rankings with exclusive rewards.',
              },
              {
                icon: '🎮',
                title: 'Mini-Games',
                description: 'Play quick games and earn big rewards!',
              },
              {
                icon: '📅',
                title: 'Events & Tournaments',
                description: 'Join weekly tournaments and special competitions.',
              },
              {
                icon: '👥',
                title: 'Community Hub',
                description: 'Connect with thousands of gamers in one place.',
              },
              {
                icon: '⚡',
                title: 'Real-time Stats',
                description: 'Instant updates on your gaming performance.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="glass rounded-lg border-2 border-cyberpunk-primary/50 p-6 hover:shadow-lg hover:shadow-cyberpunk-primary/30 transition-all group cursor-pointer hover:border-cyberpunk-primary"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold text-cyberpunk-primary mb-2">{feature.title}</h3>
                <p className="text-cyberpunk-text/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY SHOWCASE ===== */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="glass rounded-xl border border-cyberpunk-primary/30 p-8 sm:p-12 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-black mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-secondary">
                    GROW YOUR GAMING LEGACY
                  </span>
                </h2>

                <div className="space-y-4 mb-8">
                  {[
                    'Build your player profile and showcase achievements',
                    'Compete on global leaderboards with live rankings',
                    'Participate in weekly tournaments with rewards',
                    'Connect with thousands of gamers',
                    'Unlock exclusive badges and cosmetics',
                    'Stream your gaming moments',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-2xl text-cyberpunk-accent">→</span>
                      <span className="text-lg text-cyberpunk-text/80">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={session ? '/dashboard' : '/login'}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent text-cyberpunk-bg font-bold rounded-lg hover:shadow-lg hover:shadow-cyberpunk-primary/50 transition-all"
                >
                  Start Your Journey
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '10K+', text: 'Community Members' },
                  { num: '50+', text: 'Daily Active Users' },
                  { num: '∞', text: 'Possibilities' },
                  { num: '24/7', text: 'Gaming Action' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="glass rounded-lg border border-cyberpunk-primary/30 p-6 text-center hover:border-cyberpunk-primary/60 transition-colors group"
                  >
                    <div className="text-3xl font-black text-cyberpunk-accent group-hover:text-cyberpunk-primary transition-colors mb-2">
                      {item.num}
                    </div>
                    <div className="text-sm text-cyberpunk-text/70">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-secondary/20 rounded-full blur-3xl opacity-20" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-secondary">
                READY TO ENTER ZELLIX?
              </span>
            </h2>

            <p className="text-xl text-cyberpunk-text/70 mb-12">
              The gaming revolution starts now. Join thousands of gamers already dominating the leaderboards.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href={DISCORD_SERVER}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-4 text-lg font-bold rounded-lg overflow-hidden bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:shadow-xl hover:shadow-blue-500/50 transition-all"
              >
                <span className="relative text-white flex items-center justify-center">
                  💬 Join Discord Server
                </span>
              </a>

              {session ? (
                <Link
                  href="/dashboard"
                  className="group relative px-10 py-4 text-lg font-bold rounded-lg overflow-hidden bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent hover:shadow-xl hover:shadow-cyan-500/50 transition-all"
                >
                  <span className="relative text-cyberpunk-bg flex items-center justify-center">
                    🎮 Go to Dashboard
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => signIn('discord')}
                  className="group relative px-10 py-4 text-lg font-bold rounded-lg overflow-hidden bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent hover:shadow-xl hover:shadow-cyan-500/50 transition-all"
                >
                  <span className="relative text-cyberpunk-bg flex items-center justify-center">
                    🚀 Join Zellix Now
                  </span>
                </button>
              )}
            </div>

            <p className="mt-8 text-cyberpunk-text/50 text-sm">
              © 2026 Zellix Gaming Community. Built for gamers, by gamers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
