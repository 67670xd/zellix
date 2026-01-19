import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        zellixCredits: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const transactions = await prisma.creditTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      data: {
        balance: user.zellixCredits,
        transactions,
      },
    });
  } catch (error) {
    console.error('Error fetching credits:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch credits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, amount, type, source, reason } = body;

    if (!userId || !amount || !type || !source) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const transaction = await prisma.creditTransaction.create({
      data: {
        userId,
        amount,
        type,
        source,
        reason,
        previousBalance: user.zellixCredits,
        newBalance: user.zellixCredits + (type === 'EARN' ? amount : -amount),
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        zellixCredits: user.zellixCredits + (type === 'EARN' ? amount : -amount),
      },
    });

    // If this was a shop purchase, persist inventory
    if (source === 'SHOP' && reason) {
      try {
        await prisma.inventoryItem.create({
          data: {
            userId,
            itemId: reason,
            metadata: {},
          },
        });
      } catch (err) {
        console.error('Failed to persist inventory item:', err);
      }
    }

    return NextResponse.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error('Error processing credits:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process credits' },
      { status: 500 }
    );
  }
}
