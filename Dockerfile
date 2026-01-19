# Use Node LTS as base
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY packages/ ./packages/
COPY apps/web/ ./apps/web/

RUN npm ci

# Generate Prisma client
RUN npx prisma generate --schema packages/database/prisma/schema.prisma

# Build Next.js
WORKDIR /app/apps/web
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install production dependencies
COPY package*.json ./
COPY packages/ ./packages/
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY apps/web/next.config.js ./apps/web/

# Generate Prisma for production
RUN npx prisma generate --schema packages/database/prisma/schema.prisma

EXPOSE 3000

CMD ["npm", "run", "start"]
