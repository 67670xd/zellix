'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

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
          {/* Animated glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyberpunk-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyberpunk-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-cyberpunk-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Main hero content */}
          <div className="text-center mb-12">
            {/* Logo animation */}
            <div className="mb-8 inline-block">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-secondary animate-pulse">
                  ZELLIX
                </span>
              </div>
            </div>

            {/* Tagline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-cyberpunk-text">
              The Ultimate Gaming <span className="text-cyberpunk-accent">Metaverse</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-cyberpunk-text/70 mb-8 max-w-2xl mx-auto">
              Connect with 10K+ gamers. Compete in tournaments. Earn rewards. Rule the leaderboards.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href={session ? '/dashboard' : '/login'}
                className="group relative px-8 py-4 text-lg font-bold rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent opacity-100 group-hover:opacity-110 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent opacity-0 group-hover:opacity-100 blur group-hover:blur-xl transition-all" />
                <span className="relative text-cyberpunk-bg flex items-center gap-2 justify-center">
                  {session ? '🎮 Enter Dashboard' : '🚀 Join Now'}
                </span>
              </Link>

              <Link
                href="#features"
                className="group relative px-8 py-4 text-lg font-bold rounded-lg border-2 border-cyberpunk-primary hover:border-cyberpunk-accent transition-colors overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyberpunk-primary/0 group-hover:bg-cyberpunk-primary/10 transition-colors" />
                <span className="relative text-cyberpunk-primary group-hover:text-cyberpunk-accent transition-colors flex items-center gap-2 justify-center">
                  ✨ Explore Features
                </span>
              </Link>
            </div>

            {/* Hero stats */}
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

        {/* Scroll indicator */}
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

          {/* Game tabs */}
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

          {/* Game showcase */}
          <div className="relative">
            <div className="glass rounded-xl border border-cyberpunk-primary/30 p-8 sm:p-12 overflow-hidden">
              {/* Background gradient */}
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
                      href={session ? '/dashboard' : '/login'}
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
                description: 'Earn credits through gameplay, events, and achievements. Trade, spend, collect!',
                color: 'border-cyberpunk-primary',
              },
              {
                icon: '🏆',
                title: 'Leaderboards',
                description: 'Compete globally, climb rankings, earn exclusive badges and rewards.',
                color: 'border-cyberpunk-accent',
              },
              {
                icon: '🎮',
                title: 'Mini-Games',
                description: 'Play Snake, and more coming soon. Quick games, big rewards!',
                color: 'border-cyberpunk-secondary',
              },
              {
                icon: '📅',
                title: 'Events & Tournaments',
                description: 'Join weekly tournaments, seasonal events, and special competitions.',
                color: 'border-cyberpunk-primary',
              },
              {
                icon: '👥',
                title: 'Community Hub',
                description: 'Forum, wiki, gallery, and chat. Connect with your gaming tribe.',
                color: 'border-cyberpunk-accent',
              },
              {
                icon: '⚡',
                title: 'Real-time Stats',
                description: 'Instant updates on your gaming performance across all platforms.',
                color: 'border-cyberpunk-secondary',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`glass rounded-lg border-2 ${feature.color} p-6 hover:shadow-lg hover:shadow-${feature.color === 'border-cyberpunk-primary' ? 'cyberpunk-primary' : feature.color === 'border-cyberpunk-accent' ? 'cyberpunk-accent' : 'cyberpunk-secondary'}/30 transition-all group cursor-pointer`}
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
                    'Participate in weekly tournaments with real rewards',
                    'Connect with 10K+ gamers in one community',
                    'Unlock exclusive badges and cosmetics',
                    'Stream your gaming moments directly to the platform',
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
                  { num: '∞', text: 'Possible Futures' },
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

      {/* ===== FAQ SECTION ===== */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-secondary">
                FAQ
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What games does Zellix support?',
                a: 'Currently we support Rust, CS2, and GTA RP. More games coming soon!',
              },
              {
                q: 'How do I earn Zellix Credits?',
                a: 'Earn credits through playing games, winning tournaments, daily activities, and achievements.',
              },
              {
                q: 'Is Zellix free to use?',
                a: 'Yes! Zellix is completely free. No pay-to-win mechanics, just pure gaming community.',
              },
              {
                q: 'How can I compete in tournaments?',
                a: 'Check the Events section for upcoming tournaments. Registration is free!',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass rounded-lg border border-cyberpunk-primary/30 p-6 hover:border-cyberpunk-primary/60 transition-colors group cursor-pointer"
              >
                <h3 className="text-lg font-bold text-cyberpunk-primary mb-2 group-hover:text-cyberpunk-accent transition-colors flex items-center gap-2">
                  <span className="text-cyberpunk-accent">Q:</span> {item.q}
                </h3>
                <p className="text-cyberpunk-text/70 ml-6">
                  <span className="text-cyberpunk-accent">A:</span> {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated background */}
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
              <Link
                href={session ? '/dashboard' : '/login'}
                className="group relative px-10 py-4 text-lg font-bold rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent group-hover:shadow-xl group-hover:shadow-cyberpunk-primary/50 transition-all" />
                <span className="relative text-cyberpunk-bg flex items-center justify-center">
                  {session ? '🎮 Go to Dashboard' : '🚀 Join Zellix Now'}
                </span>
              </Link>

              <Link
                href="https://discord.gg"
                className="group relative px-10 py-4 text-lg font-bold rounded-lg border-2 border-cyberpunk-accent hover:border-cyberpunk-primary transition-colors overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyberpunk-accent/0 group-hover:bg-cyberpunk-accent/10 transition-colors" />
                <span className="relative text-cyberpunk-accent group-hover:text-cyberpunk-primary transition-colors flex items-center justify-center">
                  💬 Join Discord
                </span>
              </Link>
            </div>

            {/* Footer text */}
            <p className="mt-8 text-cyberpunk-text/50 text-sm">
              © 2026 Zellix Gaming Community. Built for gamers, by gamers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
