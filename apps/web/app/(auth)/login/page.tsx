'use client';

import { useSession, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cyberpunk-bg">
        <div className="text-center">
          <p className="text-cyberpunk-text">Loading...</p>
        </div>
      </div>
    );
  }

  if (session) {
    redirect('/dashboard');
  }

  const handleDiscordLogin = async () => {
    setIsLoading(true);
    await signIn('discord', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-cyberpunk-bg overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top-left glow */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-cyberpunk-primary via-cyberpunk-accent to-transparent opacity-20 blur-3xl animate-pulse" />
        
        {/* Bottom-right glow */}
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-tl from-cyberpunk-secondary via-cyberpunk-primary to-transparent opacity-20 blur-3xl animate-pulse" />

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="animate-none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyberpunk-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Top logo area */}
        <Link href="/" className="mb-16 text-4xl font-bold text-cyberpunk-primary hover:text-cyberpunk-accent transition-colors">
          ZELLIX
        </Link>

        {/* Main login container */}
        <div className="w-full max-w-md">
          {/* Animated border card */}
          <div className="relative group">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-primary rounded-xl opacity-50 blur group-hover:opacity-75 transition duration-1000 animate-pulse" />

            {/* Main content card */}
            <div className="relative bg-cyberpunk-bg border border-cyberpunk-primary/30 rounded-xl backdrop-blur-xl p-8">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyberpunk-primary rounded-tl" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyberpunk-primary rounded-tr" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyberpunk-primary rounded-bl" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyberpunk-primary rounded-br" />

              {/* Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-cyberpunk-primary mb-2">
                    ENTER THE SYSTEM
                  </h1>
                  <p className="text-cyberpunk-text/70 text-sm tracking-widest">
                    DISCORD AUTHENTICATION REQUIRED
                  </p>
                </div>

                {/* Divider line */}
                <div className="h-px bg-gradient-to-r from-transparent via-cyberpunk-primary/50 to-transparent" />

                {/* Description */}
                <div className="text-center space-y-2">
                  <p className="text-cyberpunk-text/80">
                    Join the Zellix Gaming Community
                  </p>
                  <p className="text-xs text-cyberpunk-text/50">
                    The ultimate hub for Rust, CS2, and GTA RP enthusiasts
                  </p>
                </div>

                {/* Login button */}
                <button
                  onClick={handleDiscordLogin}
                  disabled={isLoading}
                  className="w-full group relative overflow-hidden rounded-lg bg-cyberpunk-primary hover:bg-cyberpunk-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 p-0"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />

                  <div className="relative flex items-center justify-center gap-2 px-6 py-4 font-bold text-cyberpunk-bg text-lg">
                    {/* Discord icon */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.39-.398-.875-.609-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.294a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.359.698.77 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.786-.838-8.895-3.646-12.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.948-2.157 2.157-2.157 1.211 0 2.176.964 2.157 2.157 0 1.19-.946 2.157-2.157 2.157zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.948-2.157 2.157-2.157 1.211 0 2.176.964 2.157 2.157 0 1.19-.946 2.157-2.157 2.157z" />
                    </svg>
                    {isLoading ? 'Connecting...' : 'Login with Discord'}
                  </div>
                </button>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-cyberpunk-primary/50 to-transparent" />

                {/* Footer text */}
                <div className="text-center space-y-2">
                  <p className="text-xs text-cyberpunk-text/50">
                    By signing in, you agree to our
                  </p>
                  <div className="flex justify-center gap-2 text-xs">
                    <Link href="#" className="text-cyberpunk-primary hover:text-cyberpunk-accent transition-colors underline">
                      Terms of Service
                    </Link>
                    <span className="text-cyberpunk-text/30">•</span>
                    <Link href="#" className="text-cyberpunk-primary hover:text-cyberpunk-accent transition-colors underline">
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom decorative text */}
          <div className="mt-8 text-center">
            <p className="text-xs text-cyberpunk-text/40 tracking-widest">
              █ SECURE CONNECTION █ VERIFIED █
            </p>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyberpunk-primary rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
