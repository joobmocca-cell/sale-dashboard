#!/bin/bash

echo "🔧 Fixing database schema and creating admin user..."

# Pull latest env vars
vercel env pull .env.production

# Use production DATABASE_URL
source .env.production

# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push --accept-data-loss

# Create admin user
npx tsx create-admin.ts

echo "✅ Done!"
