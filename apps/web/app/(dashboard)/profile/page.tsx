'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-cyberpunk-bg">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-cyberpunk-text/50">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cyberpunk-bg">
      <Navbar />
      
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Profile Card */}
        <div className="glass rounded-xl border border-cyberpunk-primary/30 p-8 mb-8">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div>
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  className="w-32 h-32 rounded-xl border-2 border-cyberpunk-primary/50"
                />
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-cyberpunk-primary mb-2">
                {session.user?.name}
              </h1>
              <p className="text-cyberpunk-text/70 mb-6">{session.user?.email}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="glass rounded-lg p-4 border border-cyberpunk-primary/20">
                  <div className="text-cyberpunk-text/50 text-sm mb-2">Credits</div>
                  <div className="text-2xl font-bold text-cyberpunk-primary">0</div>
                </div>
                <div className="glass rounded-lg p-4 border border-cyberpunk-primary/20">
                  <div className="text-cyberpunk-text/50 text-sm mb-2">Achievements</div>
                  <div className="text-2xl font-bold text-cyberpunk-primary">0</div>
                </div>
                <div className="glass rounded-lg p-4 border border-cyberpunk-primary/20">
                  <div className="text-cyberpunk-text/50 text-sm mb-2">Rank</div>
                  <div className="text-2xl font-bold text-cyberpunk-primary">Member</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Settings Section */}
        <div className="glass rounded-xl border border-cyberpunk-primary/30 p-8">
          <h2 className="text-2xl font-bold text-cyberpunk-primary mb-6">Account Settings</h2>
          
          <div className="space-y-4">
            <div className="pb-4 border-b border-cyberpunk-primary/20">
              <label className="text-cyberpunk-text/70 text-sm block mb-2">Username</label>
              <input
                type="text"
                value={session.user?.name || ''}
                disabled
                className="w-full bg-cyberpunk-bg rounded border border-cyberpunk-primary/20 px-4 py-2 text-cyberpunk-text disabled:opacity-50"
              />
            </div>

            <div className="pb-4 border-b border-cyberpunk-primary/20">
              <label className="text-cyberpunk-text/70 text-sm block mb-2">Email</label>
              <input
                type="email"
                value={session.user?.email || ''}
                disabled
                className="w-full bg-cyberpunk-bg rounded border border-cyberpunk-primary/20 px-4 py-2 text-cyberpunk-text disabled:opacity-50"
              />
            </div>

            <div className="pb-4">
              <label className="text-cyberpunk-text/70 text-sm block mb-2">Account Status</label>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-cyberpunk-text">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
