#!/bin/bash

echo "🚀 Setting up Vercel Environment Variables..."

# Pull current environment variables
echo "📥 Pulling environment variables..."
vercel env pull .env.local

# Check if POSTGRES_PRISMA_URL exists
if grep -q "POSTGRES_PRISMA_URL" .env.local; then
    echo "✅ Found POSTGRES_PRISMA_URL"
    
    # Extract POSTGRES_PRISMA_URL value
    POSTGRES_URL=$(grep "POSTGRES_PRISMA_URL" .env.local | cut -d '=' -f2- | tr -d '"')
    
    # Add DATABASE_URL (same as POSTGRES_PRISMA_URL)
    echo "📝 Adding DATABASE_URL..."
    echo "$POSTGRES_URL" | vercel env add DATABASE_URL production
    echo "$POSTGRES_URL" | vercel env add DATABASE_URL preview
    echo "$POSTGRES_URL" | vercel env add DATABASE_URL development
else
    echo "❌ POSTGRES_PRISMA_URL not found. Please create Postgres database first."
    exit 1
fi

# Add NEXTAUTH_URL
echo "📝 Adding NEXTAUTH_URL..."
echo "https://sales-dashboard-three-tau.vercel.app" | vercel env add NEXTAUTH_URL production
echo "https://sales-dashboard-three-tau.vercel.app" | vercel env add NEXTAUTH_URL preview
echo "http://localhost:3000" | vercel env add NEXTAUTH_URL development

# Add NEXTAUTH_SECRET
echo "📝 Adding NEXTAUTH_SECRET..."
echo "nAvT9vbDZxmVJanhdGyNBHUHOu3BwgrhKhU7p47yqFE=" | vercel env add NEXTAUTH_SECRET production
echo "nAvT9vbDZxmVJanhdGyNBHUHOu3BwgrhKhU7p47yqFE=" | vercel env add NEXTAUTH_SECRET preview
echo "nAvT9vbDZxmVJanhdGyNBHUHOu3BwgrhKhU7p47yqFE=" | vercel env add NEXTAUTH_SECRET development

echo ""
echo "✅ Environment variables added!"
echo ""
echo "🔄 Redeploying to apply changes..."
vercel --prod

echo ""
echo "⏳ Waiting for deployment to complete..."
sleep 30

echo ""
echo "🗄️ Setting up database..."
vercel env pull .env.local
npx prisma db push --accept-data-loss
npx prisma db seed

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🌐 Your app is ready at: https://sales-dashboard-three-tau.vercel.app"
echo ""
echo "👤 Test accounts:"
echo "   Admin: admin@example.com / Admin123!"
echo "   RM: rm@example.com / RM123!"
echo "   AM: am@example.com / AM123!"
echo "   BM: bm@example.com / BM123!"
echo "   Staff: staff@example.com / Staff123!"
