import { z } from 'zod';

// ============================================================================
// GAME TYPES
// ============================================================================

export enum GameType {
  RUST = 'RUST',
  CS2 = 'CS2',
  GTA5 = 'GTA5',
}

export enum EventType {
  TOURNAMENT = 'TOURNAMENT',
  RAID = 'RAID',
  MEETING = 'MEETING',
  SOCIAL = 'SOCIAL',
}

// ============================================================================
// USER TYPES
// ============================================================================

export interface UserProfile {
  id: string;
  discordId: string;
  username: string;
  email: string | null;
  avatar: string | null;
  banner: string | null;
  bio: string | null;
  zellixCredits: number;
  status: string;
  favoriteGame: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStats {
  totalEvents: number;
  totalForumPosts: number;
  achievements: number;
  friendCount: number;
}

// ============================================================================
// EVENT TYPES
// ============================================================================

export interface EventData {
  id: string;
  title: string;
  description: string;
  game: string;
  eventType: string;
  startTime: Date;
  endTime: Date;
  maxParticipants: number | null;
  participants: number;
  isPublic: boolean;
  createdAt: Date;
}

// ============================================================================
// CREDIT TYPES
// ============================================================================

export enum CreditSource {
  VOICE_CHAT = 'VOICE_CHAT',
  EVENT_PARTICIPATION = 'EVENT_PARTICIPATION',
  MESSAGE_MILESTONE = 'MESSAGE_MILESTONE',
  SERVER_BOOST = 'SERVER_BOOST',
  DAILY_LOGIN = 'DAILY_LOGIN',
  EVENT_RSVP = 'EVENT_RSVP',
  FORUM_POST = 'FORUM_POST',
  GALLERY_UPLOAD = 'GALLERY_UPLOAD',
  MINI_GAME = 'MINI_GAME',
  ADMIN_GIFT = 'ADMIN_GIFT',
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'EARN' | 'SPEND';
  source: CreditSource;
  reason: string | null;
  previousBalance: number;
  newBalance: number;
  createdAt: Date;
}

// ============================================================================
// ACHIEVEMENT TYPES
// ============================================================================

export interface AchievementData {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  type: string;
  category: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt: Date | null;
}

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

export const CreateEventSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(5000),
  game: z.enum(['RUST', 'CS2', 'GTA5', 'SOCIAL']),
  eventType: z.enum(['TOURNAMENT', 'RAID', 'MEETING', 'SOCIAL']),
  startTime: z.date(),
  endTime: z.date(),
  maxParticipants: z.number().int().positive().optional(),
  isPublic: z.boolean().default(true),
});

export type CreateEventInput = z.infer<typeof CreateEventSchema>;

export const UpdateProfileSchema = z.object({
  bio: z.string().max(500).optional(),
  banner: z.string().url().optional(),
  favoriteGame: z.enum(['RUST', 'CS2', 'GTA5']).optional(),
  status: z.string().max(50).optional(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

export const CreateTicketSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(5000),
  category: z.enum(['BUG', 'FEATURE', 'SUPPORT', 'APPEAL']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).default('MEDIUM'),
});

export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;

export const CreateForumPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(10000),
  category: z.enum(['GENERAL', 'RUST', 'CS2', 'GTA5', 'EVENTS', 'BUG_REPORTS']),
});

export type CreateForumPostInput = z.infer<typeof CreateForumPostSchema>;

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// DISCORD TYPES
// ============================================================================

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string | null;
  email: string | null;
  verified: boolean;
}

export interface DiscordGuildMember {
  user_id: string;
  roles: string[];
  nick: string | null;
  avatar: string | null;
}

// ============================================================================
// STEAM TYPES
// ============================================================================

export interface SteamUserStats {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  lastlogoff: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
}

export interface GameStats {
  userId: string;
  game: GameType;
  stats: Record<string, number | string>;
  lastUpdated: Date;
}
