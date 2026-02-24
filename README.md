# Sales Dashboard System MVP

ระบบติดตามยอดขายและ KPI สำหรับองค์กร รองรับ multi-role dashboard และการนำเข้าข้อมูลจาก Excel

## 🚀 Features (MVP Version)

- ✅ Authentication System (NextAuth.js v5)
- ✅ Role-based Dashboard (Admin, RM, AM, BM, Staff)
- ✅ User Management UI
- ✅ File Upload UI (UI only, logic coming in next phase)
- ✅ Responsive Design with Tailwind CSS
- ✅ Database Schema with Prisma ORM
- ✅ Seed Data for Testing

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Prisma Postgres)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Prisma Postgres (local or cloud)

## 🏃 Getting Started

### 1. Clone and Install

```bash
npm install
```

### 2. Set up Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for local)
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`

### 3. Set up Database

```bash
# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👥 Test Accounts

After running the seed script, you can login with these accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | Admin123! |
| RM | rm@example.com | RM123! |
| AM | am@example.com | AM123! |
| BM | bm@example.com | BM123! |
| Staff | staff@example.com | Staff123! |

## 📁 Project Structure

```
├── app/
│   ├── (auth)/
│   │   └── login/          # Login page
│   ├── (dashboard)/
│   │   ├── admin/          # Admin dashboard & pages
│   │   ├── rm/             # RM dashboard
│   │   ├── am/             # AM dashboard
│   │   ├── bm/             # BM dashboard
│   │   └── staff/          # Staff dashboard
│   ├── api/
│   │   └── auth/           # NextAuth API routes
│   └── layout.tsx          # Root layout
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   └── prisma.ts           # Prisma client
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed script
└── types/
    └── next-auth.d.ts      # NextAuth type definitions
```

## 🎯 Current Features

### Authentication
- Email/password login
- Session management (24-hour expiry)
- Password hashing with bcrypt (10 rounds)
- Role-based access control

### Dashboards
- **Admin**: System overview, quick actions to user management and upload
- **RM**: Regional metrics, AM performance, branch ranking
- **AM**: Area metrics, branch performance, top staff
- **BM**: Branch metrics, staff performance, category analysis
- **Staff**: Personal metrics, sales trends, category breakdown

### User Management (Admin Only)
- View users list
- Create new users with role-specific fields
- Role selection (Admin, RM, AM, BM, Staff)

### File Upload (Admin Only)
- Drag-and-drop file upload
- File validation (Excel only, max 300MB)
- Column mapping interface (UI only)
- Support for Sales Data and Branch Data

## 🚧 Coming in Next Phase

- [ ] File processing logic (background jobs)
- [ ] KPI calculation engine
- [ ] Charts and visualizations (Recharts)
- [ ] Data export (Excel/CSV)
- [ ] Custom KPI builder
- [ ] Advanced filtering
- [ ] Performance optimization

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Sales Dashboard MVP"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `DATABASE_URL`: Your production PostgreSQL URL
   - `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
   - `NEXTAUTH_SECRET`: Generate a new secret for production
5. Click "Deploy"

### 3. Set up Database

After deployment, run migrations and seed:

```bash
# Using Vercel CLI
vercel env pull .env.production
npx prisma db push
npx prisma db seed
```

## 📝 Notes

- This is an MVP version focusing on UI and authentication
- File upload and data processing will be implemented in the next phase
- Charts and KPI calculations are placeholders for now
- All dashboards show "ยังไม่มีข้อมูล" (No data yet) until data import is implemented

## 🐛 Troubleshooting

### Database Connection Issues

If you see "Can't reach database server":
1. Make sure Prisma Postgres is running
2. Check your `DATABASE_URL` in `.env`
3. Try `npx prisma db push` to sync schema

### Authentication Issues

If login doesn't work:
1. Make sure `NEXTAUTH_SECRET` is set in `.env`
2. Check that seed script ran successfully
3. Verify user exists in database

## 📄 License

Private - Internal Use Only
