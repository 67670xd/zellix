'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/dashboard/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function AdminPage() {
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

  // Check if user is admin (this would be in the database)
  const isAdmin = true; // TODO: Add role checking

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-cyberpunk-bg">
        <Navbar />
        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
          <div className="text-center">
            <p className="text-2xl text-cyberpunk-text">
              ❌ Access Denied
            </p>
            <p className="mt-2 text-cyberpunk-text/50">
              You don't have permission to access this page
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyberpunk-bg">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="gradient-text mb-12 text-4xl font-bold">
          Admin Panel
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card hover>
            <CardContent>
              <div className="text-4xl font-bold text-cyberpunk-primary">
                1,234
              </div>
              <p className="mt-2 text-cyberpunk-text/70">Total Users</p>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent>
              <div className="text-4xl font-bold text-cyberpunk-secondary">
                567
              </div>
              <p className="mt-2 text-cyberpunk-text/70">Active Today</p>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent>
              <div className="text-4xl font-bold text-cyberpunk-accent">
                89
              </div>
              <p className="mt-2 text-cyberpunk-text/70">Open Tickets</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="#"
                className="glass rounded-lg border border-cyberpunk-primary/30 p-4 text-center font-bold text-cyberpunk-primary transition-all hover:border-cyberpunk-primary hover:bg-cyberpunk-primary/10"
              >
                👥 Manage Users
              </a>
              <a
                href="#"
                className="glass rounded-lg border border-cyberpunk-primary/30 p-4 text-center font-bold text-cyberpunk-primary transition-all hover:border-cyberpunk-primary hover:bg-cyberpunk-primary/10"
              >
                💰 Credits Admin
              </a>
              <a
                href="#"
                className="glass rounded-lg border border-cyberpunk-primary/30 p-4 text-center font-bold text-cyberpunk-primary transition-all hover:border-cyberpunk-primary hover:bg-cyberpunk-primary/10"
              >
                🎯 Achievements
              </a>
              <a
                href="#"
                className="glass rounded-lg border border-cyberpunk-primary/30 p-4 text-center font-bold text-cyberpunk-primary transition-all hover:border-cyberpunk-primary hover:bg-cyberpunk-primary/10"
              >
                📊 Analytics
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
