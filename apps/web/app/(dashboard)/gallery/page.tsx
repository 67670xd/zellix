'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/dashboard/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function GalleryPage() {
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
        <h1 className="gradient-text mb-12 text-4xl font-bold">
          Community Gallery
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
            <Card key={id} hover>
              <CardContent className="p-0">
                <div className="mb-4 h-40 w-full rounded-t-lg bg-gradient-to-br from-cyberpunk-primary/20 to-cyberpunk-accent/20" />
                <div className="p-4">
                  <p className="mb-2 font-bold text-cyberpunk-primary">
                    Screenshot {id}
                  </p>
                  <p className="text-sm text-cyberpunk-text/50">
                    ❤️ {id * 10} likes
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
