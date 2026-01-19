'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/dashboard/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ForumPage() {
  const { data: session, status } = useSession();

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

  return (
    <div className="min-h-screen bg-cyberpunk-bg">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="gradient-text mb-2 text-4xl font-bold">
              Community Forum
            </h1>
            <p className="text-cyberpunk-text/70">
              Discuss gaming, strategy, and community topics
            </p>
          </div>
          <Button variant="primary" size="lg">
            New Post
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto">
          {['General', 'Rust', 'CS2', 'GTA5', 'Events'].map((cat) => (
            <button
              key={cat}
              className="glass rounded-lg border border-cyberpunk-primary/30 px-4 py-2 text-cyberpunk-text transition-all hover:border-cyberpunk-primary hover:bg-cyberpunk-primary/10 whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Forum Posts */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((id) => (
            <Card key={id} hover>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-bold text-cyberpunk-primary">
                      Discussion Topic {id}
                    </h3>
                    <p className="mb-3 text-cyberpunk-text/70">
                      This is a great discussion about game strategy and tips...
                    </p>
                    <div className="flex gap-4 text-sm text-cyberpunk-text/50">
                      <span>👤 User {id}</span>
                      <span>💬 {id * 5} replies</span>
                      <span>👀 {id * 25} views</span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-cyberpunk-text/50">
                    <p>{id}h ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
