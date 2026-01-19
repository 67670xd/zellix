import { Client, VoiceState } from 'discord.js';
import prisma from '../../../packages/shared/prisma';

interface UserVoiceSession {
  userId: string;
  startTime: number;
}

const voiceSessions = new Map<string, UserVoiceSession>();

export function startActivityTracking(client: Client) {
  client.on('voiceStateUpdate', async (oldState, newState) => {
    const userId = newState.id;
    const discordId = newState.member?.user.id || oldState.member?.user.id;

    if (!discordId) return;

    // User joined voice channel
    if (!oldState.channelId && newState.channelId) {
      voiceSessions.set(userId, {
        userId: discordId,
        startTime: Date.now(),
      });
      console.log(`🎤 Voice session started for ${newState.member?.user.username}`);
    }

    // User left voice channel
    if (oldState.channelId && !newState.channelId) {
      const session = voiceSessions.get(userId);
      if (session) {
        const durationMinutes = Math.floor((Date.now() - session.startTime) / 60000);
        
        if (durationMinutes > 0) {
          const credits = Math.min(durationMinutes, 100); // Max 100 credits per session
          
          const user = await prisma.user.findUnique({
            where: { discordId: session.userId },
          });

          if (user) {
            const newBalance = user.zellixCredits + credits;
            
            await prisma.creditTransaction.create({
              data: {
                userId: user.id,
                amount: credits,
                type: 'EARN',
                source: 'VOICE_CHAT',
                reason: `Voice chat: ${durationMinutes} minutes`,
                previousBalance: user.zellixCredits,
                newBalance,
              },
            });

            await prisma.user.update({
              where: { id: user.id },
              data: { zellixCredits: newBalance },
            });

            console.log(`💰 ${newState.member?.user.username} earned ${credits} credits for voice chat`);
          }
        }

        voiceSessions.delete(userId);
      }
    }
  });
}
