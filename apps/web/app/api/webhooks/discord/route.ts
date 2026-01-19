import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle different webhook types from Discord
    if (body.type === 'PING') {
      return NextResponse.json({ type: 1 });
    }

    // Handle interactions
    if (body.type === 'INTERACTION') {
      // Process Discord interactions
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
