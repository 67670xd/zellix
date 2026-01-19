FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy prisma schema
COPY packages/database/prisma ./prisma

# Generate prisma client
RUN npx prisma generate

# Copy bot code
COPY apps/bot/dist ./dist

# Run migrations and start bot
CMD ["npm", "run", "db:migrate", "&&", "node", "dist/index.js"]
