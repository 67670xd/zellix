import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

let realPrisma: any = null;
try {
  if (process.env.DATABASE_URL) {
    // Use real Prisma client when DATABASE_URL provided
    // Lazy import to avoid requiring @prisma/client when not available
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaClient } = require('@prisma/client');
    realPrisma = new PrismaClient();
  }
} catch (err) {
  console.warn('Prisma client not available or failed to initialize, falling back to in-memory shim.');
}

const DATA_FILE = path.resolve(__dirname, '../../.dev_prisma_data.json');

function loadData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return {
      users: [],
      creditTransactions: [],
      inventoryItems: [],
      chatMessages: [],
      systemConfig: [],
      events: [],
    };
  }
}

function saveData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save dev data', err);
  }
}

function genId(prefix = '') {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

if (realPrisma) {
  export const prisma = realPrisma;
} else {
  const data = loadData();

  const model = (name: string) => {
    return {
      findUnique: async ({ where }: any) => {
        const keys = Object.keys(where || {});
        return (data[name] as any[]).find((it: any) => keys.every(k => it[k] === where[k])) || null;
      },
      findMany: async ({ where, orderBy, take }: any = {}) => {
        let items = data[name] as any[];
        if (where) {
          const keys = Object.keys(where);
          items = items.filter(it => keys.every(k => {
            const v = (where as any)[k];
            if (v && typeof v === 'object' && v.gte) return new Date(it[k]) >= new Date(v.gte);
            if (v && typeof v === 'object' && v.contains) return (it[k] || '').includes(v.contains);
            return it[k] === v;
          }));
        }
        if (orderBy) {
          const k = Object.keys(orderBy)[0];
          const dir = (orderBy as any)[k];
          items = items.sort((a, b) => (a[k] > b[k] ? 1 : -1) * (dir === 'desc' ? -1 : 1));
        }
        if (take) items = items.slice(0, take);
        return items;
      },
      create: async ({ data: d }: any) => {
        const item = { id: genId(name + '_'), createdAt: new Date().toISOString(), ...d };
        (data[name] as any[]).unshift(item);
        saveData(data);
        return item;
      },
      update: async ({ where, data: d }: any) => {
        const keys = Object.keys(where || {});
        const idx = (data[name] as any[]).findIndex(it => keys.every(k => it[k] === where[k]));
        if (idx === -1) throw new Error('Not found');
        const updated = { ...data[name][idx], ...d };
        data[name][idx] = updated;
        saveData(data);
        return updated;
      },
      upsert: async ({ where, create, update }: any) => {
        const existing = await (model(name).findUnique as any)({ where });
        if (existing) return (model(name).update as any)({ where, data: update });
        return (model(name).create as any)({ data: create });
      },
      count: async ({ where }: any = {}) => {
        const items = await (model(name).findMany as any)({ where });
        return items.length;
      },
      delete: async ({ where }: any) => {
        const keys = Object.keys(where || {});
        const idx = (data[name] as any[]).findIndex(it => keys.every(k => it[k] === where[k]));
        if (idx === -1) return null;
        const removed = data[name].splice(idx, 1)[0];
        saveData(data);
        return removed;
      }
    };
  };

  export const prisma: any = {
    user: model('users'),
    creditTransaction: model('creditTransactions'),
    inventoryItem: model('inventoryItems'),
    chatMessage: model('chatMessages'),
    systemConfig: model('systemConfig'),
    event: model('events'),
    $disconnect: async () => Promise.resolve(),
  };
}

export default prisma;
