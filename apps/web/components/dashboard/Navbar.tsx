'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const DevMenu = process.env.NEXT_PUBLIC_ENABLE_DEV_MENU === 'true' ? dynamic(() => import('../DevMenu').then(m => m.DevMenu), { ssr: false }) : null;

export function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50 border-b border-cyberpunk-primary/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-cyberpunk-primary">
          ZELLIX
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 sm:flex">
          {status === 'loading' ? (
            <div className="text-cyberpunk-text/50">Loading...</div>
          ) : session ? (
            <>
              <nav className="flex gap-6">
                <Link
                  href="/dashboard"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                >
                  Dashboard
                </Link>
                <Link
                  href="/games"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                >
                  Games
                </Link>
                <Link
                  href="/events"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                >
                  Events
                </Link>
                <Link
                  href="/people"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                >
                  People
                </Link>
                <Link
                  href="/leaderboards"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                >
                  Leaderboards
                </Link>
              </nav>

              {/* Discord Badge */}
              <a
                href="https://discord.gg/eCF3J6G7aH"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-300 transition-all hover:shadow-lg hover:shadow-cyan-400/20"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.39-.398-.875-.609-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.294a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.359.698.77 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.786-.838-8.895-3.646-12.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.948-2.157 2.157-2.157 1.211 0 2.176.964 2.157 2.157 0 1.19-.946 2.157-2.157 2.157zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.948-2.157 2.157-2.157 1.211 0 2.176.964 2.157 2.157 0 1.19-.946 2.157-2.157 2.157z" />
                </svg>
                <span className="text-sm font-semibold">Discord</span>
              </a>

              <div className="h-6 w-px bg-cyberpunk-primary/20" />

              <div className="flex items-center gap-4">
                {DevMenu ? <DevMenu /> : null}
                <button
                  onClick={() => {
                    const userIdHash = btoa(session.user?.email || 'user');
                    window.open(`/profile?uid=${userIdHash}`, '_blank');
                  }}
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <span className="text-cyberpunk-text text-sm hover:text-cyberpunk-primary transition-colors">{session.user?.name}</span>
                </button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <a
                href="https://discord.gg/eCF3J6G7aH"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-300 transition-all hover:shadow-lg hover:shadow-cyan-400/20"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.39-.398-.875-.609-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.294a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.359.698.77 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.786-.838-8.895-3.646-12.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.948-2.157 2.157-2.157 1.211 0 2.176.964 2.157 2.157 0 1.19-.946 2.157-2.157 2.157zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.948-2.157 2.157-2.157 1.211 0 2.176.964 2.157 2.157 0 1.19-.946 2.157-2.157 2.157z" />
                </svg>
                <span className="text-sm font-semibold">Discord</span>
              </a>

              <Button
                size="sm"
                variant="primary"
                onClick={() => signIn('discord')}
              >
                Login with Discord
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden flex items-center justify-center w-10 h-10 rounded border border-cyberpunk-primary/30 text-cyberpunk-primary hover:bg-cyberpunk-primary/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="text-xl">{mobileMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-cyberpunk-primary/30 sm:hidden">
          <div className="flex flex-col gap-4 px-4 py-4">
            {status === 'loading' ? (
              <div className="text-cyberpunk-text/50">Loading...</div>
            ) : session ? (
              <>
                <div className="flex items-center gap-2 pb-4 border-b border-cyberpunk-primary/20">
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <span className="text-cyberpunk-text">{session.user?.name}</span>
                </div>

                <Link
                  href="/dashboard"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/games"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Games
                </Link>
                <Link
                  href="/events"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Events
                </Link>
                <Link
                  href="/shop"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/people"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  People
                </Link>
                <Link
                  href="/leaderboards"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Leaderboards
                </Link>
                <Link
                  href="/messages"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  href="/profile"
                  className="text-cyberpunk-text/70 transition-colors hover:text-cyberpunk-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>

                <a
                  href="https://discord.gg/eCF3J6G7aH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-300 transition-all text-sm font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.39-.398-.875-.609-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.294a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.359.698.77 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.786-.838-8.895-3.646-12.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.948-2.157 2.157-2.157 1.211 0 2.176.964 2.157 2.157 0 1.19-.946 2.157-2.157 2.157zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.948-2.157 2.157-2.157 1.211 0 2.176.964 2.157 2.157 0 1.19-.946 2.157-2.157 2.157z" />
                  </svg>
                  Join Discord
                </a>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <a
                  href="https://discord.gg/eCF3J6G7aH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-300 transition-all text-sm font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.39-.398-.875-.609-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.294a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.359.698.77 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.786-.838-8.895-3.646-12.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.948-2.157 2.157-2.157 1.211 0 2.176.964 2.157 2.157 0 1.19-.946 2.157-2.157 2.157zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.948-2.157 2.157-2.157 1.211 0 2.176.964 2.157 2.157 0 1.19-.946 2.157-2.157 2.157z" />
                  </svg>
                  Join Discord
                </a>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    signIn('discord');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Login with Discord
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
