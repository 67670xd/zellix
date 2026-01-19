#!/bin/bash

# Zellix Deployment Script
# This script sets up and runs the entire Zellix stack

set -e

echo "🚀 Starting Zellix deployment..."

# Check for required tools
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your Discord credentials"
    exit 1
fi

# Create SSL certificates if they don't exist
if [ ! -f ssl/cert.pem ]; then
    echo "🔐 Generating SSL certificates..."
    mkdir -p ssl
    openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem \
        -days 365 -nodes -subj "/CN=localhost"
fi

# Build images
echo "🔨 Building Docker images..."
docker-compose build

# Start services
echo "▶️  Starting services..."
docker-compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database..."
sleep 10

# Run migrations
echo "🗄️  Running database migrations..."
docker-compose exec -T web npx prisma migrate deploy

# Seed database
echo "🌱 Seeding database..."
docker-compose exec -T web npx prisma db seed

echo "✅ Zellix is ready!"
echo ""
echo "📍 Access the application at: https://localhost"
echo "📊 Database available at: localhost:5432"
echo "🔴 Redis available at: localhost:6379"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f web"
echo ""
echo "To stop the stack:"
echo "  docker-compose down"
