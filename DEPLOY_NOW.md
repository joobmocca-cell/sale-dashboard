# 🚀 Deploy ใน 5 นาที!

## ขั้นตอนที่ 1: เตรียม Code (1 นาที)

Code พร้อมแล้ว! ✅

## ขั้นตอนที่ 2: สร้าง GitHub Repository (2 นาที)

### 2.1 สร้าง Repository ใหม่
1. ไปที่ https://github.com/new
2. ตั้งชื่อ repository: `sales-dashboard`
3. เลือก **Private** (แนะนำ)
4. **ไม่ต้อง** เลือก "Initialize with README"
5. คลิก **Create repository**

### 2.2 Push Code ไป GitHub

Copy commands ด้านล่างนี้ไป run ใน terminal:

```bash
# เพิ่ม remote (แทน YOUR_USERNAME ด้วย GitHub username ของคุณ)
git remote add origin https://github.com/YOUR_USERNAME/sales-dashboard.git

# Push code
git push -u origin main
```

**หรือถ้ามี error ว่า remote มีอยู่แล้ว:**
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/sales-dashboard.git
git push -u origin main
```

## ขั้นตอนที่ 3: Deploy ไป Vercel (2 นาที)

### 3.1 Import Project
1. ไปที่ https://vercel.com/new
2. คลิก **Import Git Repository**
3. เลือก repository `sales-dashboard` ที่เพิ่งสร้าง
4. คลิก **Import**

### 3.2 Configure Project

**Framework Preset:** Next.js (auto-detected) ✅

**Build Settings:**
- Build Command: `prisma generate && next build`
- Output Directory: `.next`
- Install Command: `npm install`

### 3.3 Add Environment Variables

คลิก **Environment Variables** แล้วเพิ่ม:

#### 1. DATABASE_URL
```
DATABASE_URL
```
**Value:** คลิก **Add** → **Create Postgres Database** → Vercel จะสร้างให้อัตโนมัติ

#### 2. NEXTAUTH_URL
```
NEXTAUTH_URL
```
**Value:** `https://your-project-name.vercel.app` (Vercel จะบอก URL ให้)
**หรือใส่:** `https://${VERCEL_URL}` (จะ auto-detect)

#### 3. NEXTAUTH_SECRET
```
NEXTAUTH_SECRET
```
**Value:** Generate ด้วยคำสั่งนี้ใน terminal:
```bash
openssl rand -base64 32
```
Copy ผลลัพธ์มาใส่

### 3.4 Deploy!

คลิก **Deploy** แล้วรอ 2-3 นาที

## ขั้นตอนที่ 4: Setup Database (1 นาที)

หลังจาก deploy สำเร็จ:

### 4.1 Run Database Migration

1. ไปที่ Vercel Dashboard → Project → **Settings** → **Environment Variables**
2. Copy `DATABASE_URL` value
3. Run ใน terminal:

```bash
# Set DATABASE_URL temporarily
export DATABASE_URL="your-copied-database-url"

# Push schema
npx prisma db push

# Seed data
npx prisma db seed
```

**หรือใช้ Vercel CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Pull environment variables
vercel env pull .env.production

# Run migrations
npx prisma db push
npx prisma db seed
```

## ✅ เสร็จแล้ว!

เปิด URL ที่ Vercel ให้มา (เช่น https://sales-dashboard-xxx.vercel.app)

**Login ด้วย:**
```
Email: admin@example.com
Password: Admin123!
```

## 🎉 Success!

ระบบ deploy เรียบร้อยแล้ว!

---

## 🔧 Troubleshooting

### Build Failed?

**Error:** "Cannot find module '@prisma/client'"

**Fix:** ตรวจสอบว่า Build Command เป็น:
```
prisma generate && next build
```

### Database Connection Error?

**Fix:** 
1. ไปที่ Vercel → Storage → Postgres
2. Copy connection string ใหม่
3. Update `DATABASE_URL` ใน Environment Variables
4. Redeploy

### Login Not Working?

**Fix:**
1. ตรวจสอบว่า run `npx prisma db seed` แล้ว
2. ตรวจสอบ `NEXTAUTH_SECRET` ตั้งค่าแล้ว
3. ตรวจสอบ `NEXTAUTH_URL` ถูกต้อง

---

## 📞 Need Help?

ถ้ามีปัญหาตรงไหน บอกได้เลยครับ!
