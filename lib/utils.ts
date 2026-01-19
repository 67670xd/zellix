import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return formatDate(date);
}

export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function formatCredits(credits: number): string {
  return credits.toLocaleString();
}

export function getThemeColor(theme: string): Record<string, string> {
  const themes: Record<string, Record<string, string>> = {
    cyberpunk: {
      bg: '#0a0a0f',
      surface: '#151520',
      primary: '#00f5ff',
      secondary: '#ff00aa',
      accent: '#9d00ff',
      text: '#ffffff',
    },
    rust: {
      bg: '#1a0f0a',
      surface: '#261914',
      primary: '#ff5500',
      secondary: '#a83232',
      accent: '#e6b422',
      text: '#f0e6d2',
    },
    cs2: {
      bg: '#0c0f12',
      surface: '#1a1d21',
      primary: '#4b9ae8',
      secondary: '#f0b232',
      accent: '#32a852',
      text: '#e6e6e6',
    },
  };

  return themes[theme] || themes.cyberpunk;
}

export function getGameColor(game: string): string {
  const colors: Record<string, string> = {
    RUST: '#ff5500',
    CS2: '#4b9ae8',
    GTA5: '#a83232',
    SOCIAL: '#9d00ff',
  };

  return colors[game] || '#00f5ff';
}

export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateDiscordId(id: string): boolean {
  return /^\d{17,19}$/.test(id);
}

export function generateId(length: number = 12): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
