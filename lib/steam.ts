import axios, { AxiosInstance } from 'axios';

interface SteamAppStats {
  name: string;
  playtime_forever?: number;
  playtime_2weeks?: number;
  rtime_last_played?: number;
}

interface SteamPlayerSummary {
  steamid: string;
  communityvisibilitystate: number;
  profilestate?: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personastate: number;
  realname?: string;
  primaryclanid?: string;
  timecreated?: number;
  loccountrycode?: string;
  locstatecode?: string;
  loccityid?: number;
}

class SteamService {
  private apiKey: string;
  private client: AxiosInstance;

  constructor() {
    this.apiKey = process.env.STEAM_API_KEY || '';
    this.client = axios.create({
      baseURL: 'https://api.steampowered.com',
    });
  }

  async getPlayerSummary(steamId: string): Promise<SteamPlayerSummary | null> {
    try {
      const response = await this.client.get('/ISteamUser/GetPlayerSummaries/v0002/', {
        params: {
          key: this.apiKey,
          steamids: steamId,
        },
      });

      if (response.data.response.players.length > 0) {
        return response.data.response.players[0];
      }
      return null;
    } catch (error) {
      console.error('Failed to get Steam player summary:', error);
      throw error;
    }
  }

  async getOwnedGames(steamId: string) {
    try {
      const response = await this.client.get('/IPlayerService/GetOwnedGames/v1/', {
        params: {
          key: this.apiKey,
          steamid: steamId,
          include_appinfo: true,
          include_played_free_games: true,
        },
      });

      return response.data.response.games || [];
    } catch (error) {
      console.error('Failed to get owned games:', error);
      throw error;
    }
  }

  async getGameStats(steamId: string, appId: number) {
    try {
      const response = await this.client.get(
        `/ISteamUserStats/GetUserStatsForGame/v0002/`,
        {
          params: {
            key: this.apiKey,
            steamid: steamId,
            appid: appId,
          },
        }
      );

      return response.data.playerstats || null;
    } catch (error) {
      console.error('Failed to get game stats:', error);
      throw error;
    }
  }

  // Game specific stats getters
  async getRustStats(steamId: string) {
    // Rust App ID: 252490
    return this.getGameStats(steamId, 252490);
  }

  async getCS2Stats(steamId: string) {
    // Counter-Strike 2 App ID: 730
    return this.getGameStats(steamId, 730);
  }

  async getGTAVStats(steamId: string) {
    // Grand Theft Auto V App ID: 271590
    return this.getGameStats(steamId, 271590);
  }
}

export const steamService = new SteamService();
