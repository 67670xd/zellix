'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/dashboard/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function TicketsPage() {
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
              Support Tickets
            </h1>
            <p className="text-cyberpunk-text/70">
              Get help from our support team
            </p>
          </div>
          <Button variant="primary" size="lg">
            Create Ticket
          </Button>
        </div>

        {/* Create Ticket Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>New Support Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              label="Subject"
              placeholder="Brief description of your issue..."
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-cyberpunk-primary">
                Category
              </label>
              <select className="glass w-full rounded-lg border border-cyberpunk-primary/30 bg-cyberpunk-surface/50 px-4 py-2 text-cyberpunk-text">
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Support</option>
                <option>Appeal</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-cyberpunk-primary">
                Description
              </label>
              <textarea
                className="glass w-full rounded-lg border border-cyberpunk-primary/30 bg-cyberpunk-surface/50 px-4 py-2 text-cyberpunk-text placeholder-cyberpunk-text/50"
                rows={5}
                placeholder="Tell us more about your issue..."
              />
            </div>

            <Button variant="primary" size="lg" className="w-full">
              Submit Ticket
            </Button>
          </CardContent>
        </Card>

        {/* Recent Tickets */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-cyberpunk-primary">
            Your Tickets
          </h2>

          <div className="space-y-4">
            {[1, 2, 3].map((id) => (
              <Card key={id} hover>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-bold text-cyberpunk-primary">
                        Ticket #{1000 + id}
                      </h3>
                      <p className="mb-3 text-cyberpunk-text/70">
                        Issue with credits not being awarded...
                      </p>
                      <div className="flex gap-4 text-sm">
                        <span className="rounded-full bg-cyberpunk-secondary/20 px-3 py-1 text-cyberpunk-secondary">
                          OPEN
                        </span>
                        <span className="text-cyberpunk-text/50">
                          Created {id} days ago
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
