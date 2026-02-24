#!/bin/bash

# Get the DATABASE_URL from POSTGRES_PRISMA_URL
DB_URL='postgres://postgres.ihlxdaoaynpvkbcappqp:nk5DZE8Y4Xu7DepG@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true'

echo "Adding DATABASE_URL to production..."
echo "$DB_URL" | vercel env add DATABASE_URL production

echo "Adding NEXTAUTH_URL to production..."
echo "https://sales-dashboard-three-tau.vercel.app" | vercel env add NEXTAUTH_URL production

echo "Adding NEXTAUTH_SECRET to production..."
echo "nAvT9vbDZxmVJanhdGyNBHUHOu3BwgrhKhU7p47yqFE=" | vercel env add NEXTAUTH_SECRET production

echo "Done! Now redeploying..."
vercel --prod
