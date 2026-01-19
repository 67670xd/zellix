import { REST } from '@discordjs/rest';
import { Routes, SlashCommandBuilder } from 'discord.js';

export async function registerCommands(rest: REST, clientId: string) {
  const commands = [
    new SlashCommandBuilder()
      .setName('credits')
      .setDescription('Check your Zellix Credits balance'),
    
    new SlashCommandBuilder()
      .setName('profile')
      .setDescription('View your profile'),
    
    new SlashCommandBuilder()
      .setName('event')
      .setDescription('Event management')
      .addSubcommand((sub) =>
        sub
          .setName('list')
          .setDescription('List upcoming events')
      )
      .addSubcommand((sub) =>
        sub
          .setName('join')
          .setDescription('Join an event')
          .addStringOption((opt) =>
            opt
              .setName('event_id')
              .setDescription('Event ID')
              .setRequired(true)
          )
      ),
    
    new SlashCommandBuilder()
      .setName('leaderboard')
      .setDescription('View credits leaderboard'),
    
    new SlashCommandBuilder()
      .setName('achievements')
      .setDescription('View your achievements'),
  ].map((command) => command.toJSON());

  const guildId = process.env.DISCORD_GUILD_ID!;

  try {
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
  } catch (error) {
    console.error('Failed to register commands:', error);
    throw error;
  }
}
