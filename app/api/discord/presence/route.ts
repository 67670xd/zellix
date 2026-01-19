import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { activity, type } = body || {};
  if (!activity || typeof activity !== 'string') {
    return NextResponse.json({ error: 'Invalid activity' }, { status: 400 });
  }

  const BOT_URL = process.env.BOT_PRESENCE_URL || 'http://localhost:4000/presence';
  const PRESENCE_SECRET = process.env.PRESENCE_SECRET || '';

  try {
    const res = await fetch(BOT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-presence-secret': PRESENCE_SECRET,
      },
      body: JSON.stringify({ activity, type }),
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: data?.error || 'Bot error' }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Network error' }, { status: 500 });
  }
}
