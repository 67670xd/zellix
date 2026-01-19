import { Client, VoiceState } from 'discord.js';
import { PrismaClient } from '@prisma/client';
import * as cron from 'node-cron';

export function setupEventHandlers(client: Client, prisma: PrismaClient) {
  // Track voice chat activity
  client.on('voiceStateUpdate', async (oldState, newState) => {
    const userId = newState.id;
    
    // User joined voice
    if (!oldState.channelId && newState.channelId) {
      console.log(`👤 ${newState.member?.user.username} joined voice`);
    }
    
    // User left voice
    if (oldState.channelId && !newState.channelId) {
      console.log(`👤 ${oldState.member?.user.username} left voice`);
    }
  });

  import { Client } from 'discord.js';
  import prisma from '../../../packages/shared/prisma';
  import * as cron from 'node-cron';

  export function setupEventHandlers(client: Client) {
    client.on('voiceStateUpdate', async (oldState, newState) => {
      const userId = newState.id;

      if (!oldState.channelId && newState.channelId) {
        console.log(`👤 ${newState.member?.user.username} joined voice`);
      }

      if (oldState.channelId && !newState.channelId) {
        console.log(`👤 ${oldState.member?.user.username} left voice`);
      }
    });

    client.on('messageCreate', async (message) => {
      if (message.author.bot) return;

      const user = await prisma.user.findUnique({
        where: { discordId: message.author.id },
      });

      if (!user) return;

      const userMessages = await prisma.creditTransaction.count({
        where: {
          userId: user.id,
          source: 'MESSAGE_MILESTONE',
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      });

      if (userMessages % 10 === 0 && userMessages > 0) {
        await prisma.creditTransaction.create({
          data: {
            userId: user.id,
            amount: 10,
            type: 'EARN',
            source: 'MESSAGE_MILESTONE',
            reason: 'Message milestone',
            previousBalance: user.zellixCredits,
            newBalance: user.zellixCredits + 10,
          },
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { zellixCredits: { increment: 10 } },
        });
      }
    });

    cron.schedule('0 11 * * *', async () => {
      console.log('⏰ Daily check-in bonus triggered');
    });

    cron.schedule('0 0 * * 0', async () => {
      console.log('📊 Updating weekly leaderboards...');
    });
  }
