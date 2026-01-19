import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ success: false, error: 'userId required' }, { status: 400 });

    const items = await prisma.inventoryItem.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ success: true, data: items });
  } catch (err) {
    console.error('Inventory GET error', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, itemId, metadata } = body;
    if (!userId || !itemId) return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });

    const item = await prisma.inventoryItem.create({ data: { userId, itemId, metadata: metadata || {} } });
    return NextResponse.json({ success: true, data: item });
  } catch (err) {
    console.error('Inventory POST error', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
