import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get('channelId');
    if (!channelId) return NextResponse.json({ success: false, error: 'channelId required' }, { status: 400 });

    const messages = await prisma.chatMessage.findMany({ where: { channelId }, orderBy: { createdAt: 'asc' }, take: 200 });
    return NextResponse.json({ success: true, data: messages });
  } catch (err) {
    console.error('Chat GET error', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { channelId, userId, content, metadata } = body;
    if (!channelId || !userId || !content) return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });

    const msg = await prisma.chatMessage.create({ data: { channelId, userId, content, metadata: metadata || {} } });
    return NextResponse.json({ success: true, data: msg });
  } catch (err) {
    console.error('Chat POST error', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
