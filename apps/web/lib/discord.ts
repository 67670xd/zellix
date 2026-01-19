import axios, { AxiosInstance } from 'axios';

class DiscordService {
  private client: AxiosInstance;
  private token: string;

  constructor() {
    this.token = process.env.DISCORD_BOT_TOKEN || '';
    this.client = axios.create({
      baseURL: 'https://discord.com/api/v10',
      headers: {
        Authorization: `Bot ${this.token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async getGuildMember(guildId: string, userId: string) {
    try {
      const response = await this.client.get(`/guilds/${guildId}/members/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get guild member:', error);
      throw error;
    }
  }

  async updateMemberRoles(guildId: string, userId: string, roles: string[]) {
    try {
      await this.client.patch(`/guilds/${guildId}/members/${userId}`, {
        roles,
      });
    } catch (error) {
      console.error('Failed to update member roles:', error);
      throw error;
    }
  }

  async sendMessage(channelId: string, content: string, embeds?: any[]) {
    try {
      const response = await this.client.post(`/channels/${channelId}/messages`, {
        content,
        embeds,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  async createEvent(guildId: string, eventData: any) {
    try {
      const response = await this.client.post(`/guilds/${guildId}/scheduled-events`, eventData);
      return response.data;
    } catch (error) {
      console.error('Failed to create Discord event:', error);
      throw error;
    }
  }

  async getUserInfo(userId: string) {
    try {
      const response = await this.client.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get user info:', error);
      throw error;
    }
  }
}

export const discordService = new DiscordService();
