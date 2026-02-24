# 🚀 Deployment Guide - Sales Dashboard System

คู่มือการ deploy Sales Dashboard System ไปยัง Vercel

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub repository
- [ ] Environment variables prepared
- [ ] Database ready (Vercel Postgres or external PostgreSQL)
- [ ] Vercel account created

## 🗄️ Database Setup

### Option 1: Vercel Postgres (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to "Storage" tab
3. Click "Create Database" → "Postgres"
4. Copy the `DATABASE_URL` connection string
5. Add to environment variables

### Option 2: External PostgreSQL

Use any PostgreSQL provider:
- Supabase
- Railway
- Neon
- AWS RDS
- Your own server

## 🔐 Environment Variables

Set these in Vercel project settings:

```bash
# Database
DATABASE_URL="your-postgres-connection-string"

# NextAuth
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Optional: Vercel Blob Storage (for file uploads in future)
# BLOB_READ_WRITE_TOKEN="your-blob-token"
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## 📦 Deployment Steps

### 1. Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create main branch
git branch -M main

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push
git push -u origin main
```

### 2. Deploy to Vercel

#### Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `prisma generate && next build`
   - **Output Directory**: .next
5. Add environment variables (see above)
6. Click "Deploy"

#### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts to link project
```

### 3. Database Migration

After first deployment:

```bash
# Pull environment variables
vercel env pull .env.production

# Push database schema
npx prisma db push

# Seed initial data
npx prisma db seed
```

Or use Vercel CLI to run commands:

```bash
vercel env pull
npx prisma db push --accept-data-loss
npx prisma db seed
```

## ✅ Post-Deployment Verification

### 1. Check Deployment Status

- Visit your Vercel dashboard
- Ensure build completed successfully
- Check deployment logs for errors

### 2. Test Application

Visit your deployed URL and test:

- [ ] Homepage loads
- [ ] Login page accessible
- [ ] Can login with admin account
- [ ] Dashboard redirects work
- [ ] All role dashboards accessible
- [ ] User management page loads
- [ ] Upload page loads

### 3. Test Accounts

Login with seeded accounts:

```
Admin: admin@example.com / Admin123!
RM: rm@example.com / RM123!
AM: am@example.com / AM123!
BM: bm@example.com / BM123!
Staff: staff@example.com / Staff123!
```

## 🔧 Troubleshooting

### Build Fails

**Error**: "Cannot find module '@prisma/client'"

**Solution**: Ensure `prisma generate` runs before build
```json
// vercel.json
{
  "buildCommand": "prisma generate && next build"
}
```

### Database Connection Issues

**Error**: "Can't reach database server"

**Solutions**:
1. Check `DATABASE_URL` is set correctly
2. Ensure database allows connections from Vercel IPs
3. Verify connection string format
4. Check database is running

### Authentication Issues

**Error**: "NEXTAUTH_SECRET not set"

**Solution**: Add `NEXTAUTH_SECRET` to environment variables

**Error**: "Invalid callback URL"

**Solution**: Set `NEXTAUTH_URL` to your production URL

### Prisma Issues

**Error**: "Prisma Client not generated"

**Solution**: Add build command in vercel.json:
```json
{
  "buildCommand": "prisma generate && next build"
}
```

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel will automatically deploy
```

### Preview Deployments

- Every branch gets a preview URL
- Pull requests get automatic preview deployments
- Test changes before merging to main

## 📊 Monitoring

### Vercel Analytics

Enable in project settings:
1. Go to "Analytics" tab
2. Enable Web Analytics
3. View real-time metrics

### Error Tracking

Check deployment logs:
1. Go to "Deployments" tab
2. Click on deployment
3. View "Build Logs" and "Function Logs"

## 🔒 Security Checklist

- [ ] `NEXTAUTH_SECRET` is strong and unique
- [ ] Database credentials are secure
- [ ] Environment variables are not committed to git
- [ ] `.env` is in `.gitignore`
- [ ] Production database has backups enabled
- [ ] SSL/HTTPS is enabled (automatic on Vercel)

## 🎯 Performance Optimization

### Enable Caching

Vercel automatically caches:
- Static assets
- API routes (with proper headers)
- Server components

### Database Connection Pooling

Prisma automatically handles connection pooling. For production:

```prisma
datasource db {
  provider = "postgresql"
  // Connection pooling is automatic
}
```

### Edge Functions (Optional)

For better performance, consider using Edge Runtime:

```typescript
// app/api/route.ts
export const runtime = 'edge'
```

## 📈 Scaling

### Vercel Pro Features

Consider upgrading for:
- More concurrent builds
- Increased bandwidth
- Advanced analytics
- Team collaboration
- Priority support

### Database Scaling

Monitor database performance:
- Connection count
- Query performance
- Storage usage

Upgrade database plan as needed.

## 🆘 Support

### Vercel Support

- Documentation: [vercel.com/docs](https://vercel.com/docs)
- Community: [github.com/vercel/next.js/discussions](https://github.com/vercel/next.js/discussions)
- Support: Available for Pro/Enterprise plans

### Common Issues

Check these resources:
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Prisma Deployment Docs](https://www.prisma.io/docs/guides/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

## 🎉 Success!

Your Sales Dashboard System is now live! 

Share the URL with your team and start using the system.

**Next Steps:**
1. Create additional user accounts
2. Prepare to upload sales data (coming in next phase)
3. Monitor system usage and performance
4. Gather user feedback for improvements
