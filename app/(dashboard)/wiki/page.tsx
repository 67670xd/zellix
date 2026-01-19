'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/dashboard/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function WikiPage() {
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
        <h1 className="gradient-text mb-12 text-4xl font-bold">Community Wiki</h1>

        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['Guides', 'Rust', 'CS2', 'GTA5', 'Rules'].map((cat) => (
                    <a
                      key={cat}
                      href="#"
                      className="block rounded-lg p-2 text-cyberpunk-text/70 transition-all hover:bg-cyberpunk-primary/10 hover:text-cyberpunk-primary"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-cyberpunk-text/70">
                  Welcome to the Zellix Community Wiki. Here you'll find guides, strategies, and information about our games and community.
                </p>
                <div className="space-y-4">
                  <h3 className="font-bold text-cyberpunk-primary">Latest Articles</h3>
                  {[1, 2, 3].map((id) => (
                    <a
                      key={id}
                      href="#"
                      className="block rounded-lg border border-cyberpunk-primary/20 p-4 transition-all hover:border-cyberpunk-primary/50"
                    >
                      <p className="font-bold text-cyberpunk-primary">Article Title {id}</p>
                      <p className="text-sm text-cyberpunk-text/50">
                        Last updated 2 days ago
                      </p>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
