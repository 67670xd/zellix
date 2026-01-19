import { Client, GatewayIntentBits, ChannelType } from 'discord.js';
import express from 'express';
import cors from 'cors';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import dotenv from 'dotenv';
import prisma from '../../../packages/shared/prisma';
import { registerCommands } from './commands';
import { setupEventHandlers } from './events';
import { startActivityTracking } from './services/activityTracker';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// shared prisma (real client or in-memory shim)
// imported above
// Start lightweight HTTP server to accept presence updates from the web app
try {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const PRESENCE_SECRET = process.env.PRESENCE_SECRET || '';
  const BOT_HTTP_PORT = parseInt(process.env.BOT_HTTP_PORT || '4000', 10);

  app.post('/presence', async (req, res) => {
    const secret = req.header('x-presence-secret') || '';
    if (!PRESENCE_SECRET || secret !== PRESENCE_SECRET) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }

    const { activity, type } = req.body;
    if (!activity || typeof activity !== 'string') {
      return res.status(400).json({ ok: false, error: 'Invalid activity' });
    }

    try {
      if (client.user) {
        await client.user.setActivity(activity, { type: (type as any) || 'PLAYING' });
        return res.json({ ok: true, applied: true });
      }

      await prisma.systemConfig.upsert({
        where: { key: 'pendingPresence' },
        update: { value: JSON.stringify({ activity, type }) },
        create: { key: 'pendingPresence', value: JSON.stringify({ activity, type }) },
      });

      return res.json({ ok: true, applied: false });
    } catch (err) {
      console.error('Failed to set activity:', err);
      return res.status(500).json({ ok: false, error: 'Failed to set activity' });
    }
  });

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.listen(BOT_HTTP_PORT, () => {
    console.log(`🔌 Bot HTTP server listening on port ${BOT_HTTP_PORT}`);
  });
} catch (err) {
  console.error('Failed to start bot HTTP server:', err);
}

client.once('ready', async () => {
  console.log(`✅ Bot logged in as ${client.user?.tag}`);
  
  // Register slash commands
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!);
  
  try {
    console.log('🔄 Registering slash commands...');
    await registerCommands(rest, client.user?.id!);
    console.log('✅ Slash commands registered');
  } catch (error) {
    console.error('❌ Failed to register commands:', error);
  }

  // Start activity tracking
  startActivityTracking(client);
  
  client.user?.setActivity('Discord Gaming Community', { type: 'WATCHING' });
  // apply any pending presence stored while offline
  try {
    const pending = await prisma.systemConfig.findUnique({ where: { key: 'pendingPresence' } });
    if (pending && pending.value) {
      const { activity, type } = JSON.parse(pending.value);
      if (activity) {
        await client.user?.setActivity(activity, { type: (type as any) || 'PLAYING' });
        await prisma.systemConfig.delete({ where: { key: 'pendingPresence' } });
        console.log('Applied pending presence from DB');
      }
    }
  } catch (err) {
    console.error('Failed to apply pending presence', err);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.commandName;

  try {
    switch (command) {
      case 'credits':
        await handleCreditsCommand(interaction);
        break;
      case 'profile':
        await handleProfileCommand(interaction);
        break;
      case 'event':
        await handleEventCommand(interaction);
        break;
      case 'leaderboard':
        await handleLeaderboardCommand(interaction);
        break;
      case 'achievements':
        await handleAchievementsCommand(interaction);
        break;
    }
  } catch (error) {
    console.error(`Error handling ${command}:`, error);
    await interaction.reply({ content: '❌ An error occurred', ephemeral: true });
  }
});

async function handleCreditsCommand(interaction: any) {
  const user = await prisma.user.findUnique({
    where: { discordId: interaction.user.id },
  });

  if (!user) {
    return interaction.reply({
      content: '❌ You need to be verified first. Visit our website to authenticate.',
      ephemeral: true,
    });
  }

  await interaction.reply({
    content: `💰 **${user.username}**\nZellix Credits: **${user.zellixCredits}**`,
    ephemeral: true,
  });
}

async function handleProfileCommand(interaction: any) {
  const user = await prisma.user.findUnique({
    where: { discordId: interaction.user.id },
    include: { achievements: true, gameStats: true },
  });

  if (!user) {
    return interaction.reply({
      content: '❌ You need to be verified first.',
      ephemeral: true,
    });
  }

  const unlockedAchievements = user.achievements.filter((a) => a.unlocked).length;
  const totalAchievements = user.achievements.length;

  await interaction.reply({
    embeds: [
      {
        title: user.username,
        description: user.bio || 'No bio set',
        color: 0x00f5ff,
        fields: [
          { name: 'Zellix Credits', value: `${user.zellixCredits}`, inline: true },
          { name: 'Achievements', value: `${unlockedAchievements}/${totalAchievements}`, inline: true },
          { name: 'Member Since', value: new Date(user.createdAt).toDateString(), inline: false },
        ],
      },
    ],
    ephemeral: true,
  });
}

async function handleEventCommand(interaction: any) {
  // Handle event commands (create, list, etc.)
  await interaction.reply({
    content: '📅 Event system coming soon!',
    ephemeral: true,
  });
}

async function handleLeaderboardCommand(interaction: any) {
  const topUsers = await prisma.user.findMany({
    take: 10,
    orderBy: { zellixCredits: 'desc' },
  });

  let leaderboard = '**🏆 Zellix Credits Leaderboard**\n\n';
  topUsers.forEach((user, index) => {
    leaderboard += `${index + 1}. **${user.username}** - ${user.zellixCredits} credits\n`;
  });

  await interaction.reply({
    content: leaderboard,
    ephemeral: true,
  });
}

async function handleAchievementsCommand(interaction: any) {
  const user = await prisma.user.findUnique({
    where: { discordId: interaction.user.id },
    include: { achievements: { where: { unlocked: true } } },
  });

  if (!user) {
    return interaction.reply({
      content: '❌ You need to be verified first.',
      ephemeral: true,
    });
  }

  if (user.achievements.length === 0) {
    return interaction.reply({
      content: '❌ You have no achievements yet. Keep playing!',
      ephemeral: true,
    });
  }

  let achievements = '**🏅 Your Achievements**\n\n';
  user.achievements.forEach((ach) => {
    achievements += `✅ **${ach.name}** - ${ach.description}\n`;
  });

  await interaction.reply({
    content: achievements,
    ephemeral: true,
  });
}

// Setup event handlers
setupEventHandlers(client);

client.login(process.env.DISCORD_BOT_TOKEN);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down bot...');
  await prisma.$disconnect();
  process.exit(0);
});
