'use client';

import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';

const DISCORD_SERVER = 'https://discord.gg/eCF3J6G7aH';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-cyberpunk-bg flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-secondary">
            ZELLIX
          </h1>
          <p className="text-xl text-cyberpunk-text/70 mt-2">Gaming Community Hub</p>
        </div>

        {/* Description */}
        <p className="text-lg text-cyberpunk-text/80 mb-8">
          Join our Discord community, track your gaming stats, compete in tournaments, and climb the global leaderboards.
        </p>

        {/* Main CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {/* Join Discord */}
          <a
            href={DISCORD_SERVER}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 text-lg font-bold rounded-lg overflow-hidden bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            <span className="relative text-white flex items-center justify-center gap-2">
              💬 Join Discord Server
            </span>
          </a>

          {/* Dashboard Link */}
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
                🚀 Login with Discord
              </span>
            </button>
          )}
        </div>

        {/* Quick Links */}
        <div className="space-y-3 mt-12 border-t border-cyberpunk-primary/30 pt-12">
          <p className="text-cyberpunk-text/70 mb-6">Features:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: '🏆', label: 'Leaderboards', href: '/dashboard/leaderboards' },
              { icon: '🎮', label: 'Games', href: '/dashboard/games' },
              { icon: '📅', label: 'Events', href: '/dashboard/events' },
              { icon: '👥', label: 'Community', href: '/dashboard/people' },
            ].map((item) => (
              <Link
                key={item.label}
                href={session ? item.href : '/login'}
                className="group glass rounded-lg p-4 border border-cyberpunk-primary/30 hover:border-cyberpunk-primary/60 hover:bg-cyberpunk-primary/10 transition-all"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-cyberpunk-primary">{item.label}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-cyberpunk-text/50 text-sm">
          <p>© 2026 Zellix Gaming Community</p>
          <p className="mt-2">Connect. Compete. Conquer.</p>
        </div>
      </div>
    </main>
  );
}
