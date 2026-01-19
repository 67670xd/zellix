# Development

Prerequisites:

- Node.js >= 18
- npm >= 9

Quick start (root monorepo):

```bash
npm ci
npm run dev
```

Run single app locally:

```bash
cd apps/web
npm ci
npm run dev

cd ../bot
npm ci
npm run dev
```

Database:

- See `packages/database` for prisma commands:

```bash
cd packages/database
npm run db:generate
npm run db:migrate
npm run db:seed
```

Environment:

- Copy `.env.example` to `.env` and fill secrets before running.
