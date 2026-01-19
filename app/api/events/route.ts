import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const events = await prisma.event.findMany({
      skip: offset,
      take: limit,
      where: {
        startTime: {
          gte: new Date(),
        },
        isPublic: true,
      },
      orderBy: {
        startTime: 'asc',
      },
      include: {
        participants: {
          select: {
            id: true,
          },
        },
      },
    });

    const total = await prisma.event.count({
      where: {
        startTime: {
          gte: new Date(),
        },
        isPublic: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: events.map((event) => ({
        ...event,
        participantCount: event.participants.length,
        participants: undefined,
      })),
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookie(request);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, game, eventType, startTime, endTime, maxParticipants } = body;

    if (!title || !description || !game || !eventType || !startTime || !endTime) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        game,
        eventType,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        maxParticipants,
        isPublic: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

async function getSessionFromCookie(request: NextRequest) {
  // This would be implemented with your session handling
  // For now, returning a placeholder
  return null;
}
