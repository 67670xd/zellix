# Zellix - Gaming Community Hub

**Ultimate gaming community platform for Discord communities**

Built with Next.js 14, PostgreSQL, Redis, Discord OAuth, and Docker.

## 🚀 Features

- **Discord Authentication** - Seamless OAuth2 login with role sync
- **Zellix Credits Economy** - Earn credits through activity and events
- **Event Calendar** - Full calendar integration with RSVP system
- **Game Integration** - Stats tracking for Rust, CS2, GTA RP
- **Mini-Games** - Browser-based games with leaderboards
- **Community Features** - Forum, Wiki, Gallery, Ticket System
- **Achievements** - Unlock badges and achievements
- **Admin Panel** - Complete management dashboard
- **Discord Bot** - Real-time activity tracking and notifications

## 📋 Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Node.js microservices
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis
- **Auth**: NextAuth.js + Discord OAuth
- **Real-time**: Socket.io + Discord Webhooks
- **Deployment**: Docker + Docker Compose

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Discord Bot Token
- Discord OAuth Credentials

### Installation

1. **Clone and setup**
```bash
cd zellix-community
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your Discord credentials
```

3. **Run with Docker**
```bash
docker-compose up -d
```

Or **run locally**:
```bash
# Start database
docker-compose up -d postgres redis

# Setup database
npx prisma migrate deploy
npx prisma db seed

# Run development servers
npm run dev
```

## 📚 Project Structure

```
zellix-community/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── styles/
│   └── bot/                 # Discord bot microservice
├── packages/
│   ├── database/            # Prisma schema
│   └── shared/              # TypeScript types
├── docker-compose.yml
├── nginx.conf
└── deploy.sh
```

## 🎮 Core Features Details

### Authentication
- Discord OAuth2 with role synchronization
- JWT-based sessions
- Protected routes with middleware

### Credits System
- Earn credits through:
  - Voice chat activity (1 credit/minute, max 100/day)
  - Event participation (50 credits/event)
  - Daily login (10 credits)
  - Forum posts (5 credits/post)
  - Mini-game scores (25 credits)
  
- Spend credits on:
  - Custom roles (500 credits)
  - Profile customization (100 credits)
  - Forum sticky (200 credits)
  - Game server perks (1000 credits)

### Events
- FullCalendar integration
- RSVP system
- Discord event sync
- Auto notifications

### Games
- **Rust Raid Simulator** - Tower defense
- **CS2 Aim Trainer** - Shooting game
- **GTA Chase** - Racing game
- Weekly leaderboards

## 📊 Database Models

- **User** - Discord profile + credits
- **Event** - Calendar events with RSVP
- **GameStats** - Rust/CS2/GTA5 statistics
- **Achievement** - Unlockable badges
- **CreditTransaction** - Economy log
- **Ticket** - Support system
- **ForumPost** - Community discussions
- **WikiPage** - Knowledge base
- **GalleryItem** - Media uploads

See `packages/database/prisma/schema.prisma` for full schema.

## 🤖 Discord Bot Commands

- `/credits` - Check balance
- `/profile` - View profile
- `/event create` - Create event
- `/leaderboard` - View leaderboards
- `/achievements` - View achievements

## 🔒 Security

- NextAuth.js for authentication
- Prisma for SQL injection prevention
- Rate limiting on API endpoints
- HTTPS enforcement
- XSS protection headers
- CORS configuration
- File upload validation

## 📈 Performance

- Redis caching layer
- Image optimization
- CDN-ready static assets
- Database connection pooling
- Optimized queries

## 🚢 Deployment

### Docker
```bash
docker-compose up -d
```

### Vercel (Web only)
```bash
npm install -g vercel
vercel deploy apps/web
```

### Heroku
```bash
heroku create
heroku config:set DATABASE_URL=...
git push heroku main
```

## 📖 API Documentation

### Authentication
```
POST /api/auth/signin
GET  /api/auth/session
POST /api/auth/signout
```

### Events
```
GET  /api/events
POST /api/events
GET  /api/events/:id
POST /api/events/:id/rsvp
```

### Credits
```
GET  /api/credits?userId=...
POST /api/credits
GET  /api/credits/leaderboard
```

### Tickets
```
GET  /api/tickets
POST /api/tickets
GET  /api/tickets/:id
POST /api/tickets/:id/respond
```

## 🧪 Testing

```bash
npm run test
```

## 🛠️ Development

```bash
# Development server
npm run dev

# Build production
npm run build

# Start production
npm start

# Lint
npm run lint

# Format code
npm run format
```

## 📝 Environment Variables

See `.env.example` for required configuration:
- Discord OAuth credentials
- Database URLs
- Bot token
- API keys (Steam, Stripe)

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Run tests and lint
4. Submit pull request

## 📄 License

Proprietary - Zellix Community

## 🆘 Support

- Discord: [Community Server]
- Email: support@zellix.gg
- Wiki: See `/wiki` in app

## 🎯 Roadmap

- [ ] Mobile app
- [ ] Advanced game stats integration
- [ ] Video streaming integration
- [ ] Payment system
- [ ] Advanced achievements
- [ ] Custom game servers
- [ ] Social features

---

**Built with ❤️ for the gaming community**
