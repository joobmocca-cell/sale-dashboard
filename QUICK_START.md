# 🚀 Quick Start Guide

เริ่มต้นใช้งาน Sales Dashboard System ใน 5 นาที!

## ⚡ Quick Setup

### 1. ติดตั้ง Dependencies (1 นาที)

```bash
npm install
```

### 2. Setup Database (2 นาที)

```bash
# Push schema to database
npm run db:push

# Seed test data
npm run db:seed
```

### 3. Run Development Server (1 นาที)

```bash
npm run dev
```

### 4. Login & Test (1 นาที)

เปิด http://localhost:3000

Login ด้วย:
```
Email: admin@example.com
Password: Admin123!
```

## ✅ ทดสอบ Features

### 1. Test Authentication
- ✅ Login ด้วย admin account
- ✅ ดู Admin Dashboard
- ✅ Logout และ login ด้วย role อื่น

### 2. Test Navigation
- ✅ คลิก "จัดการผู้ใช้" ใน sidebar
- ✅ คลิก "อัพโหลดข้อมูล" ใน sidebar
- ✅ กลับไปที่ Dashboard

### 3. Test User Management
- ✅ คลิก "+ สร้างผู้ใช้ใหม่"
- ✅ กรอกข้อมูลในฟอร์ม
- ✅ เลือก role ต่างๆ ดูว่า fields เปลี่ยนตาม role

### 4. Test File Upload
- ✅ ไปที่หน้า "อัพโหลดข้อมูล"
- ✅ ลาก Excel file มาวาง
- ✅ ดู column mapping interface

### 5. Test Different Roles
Login ด้วย accounts ต่างๆ:

**RM Account:**
```
Email: rm@example.com
Password: RM123!
```

**AM Account:**
```
Email: am@example.com
Password: AM123!
```

**BM Account:**
```
Email: bm@example.com
Password: BM123!
```

**Staff Account:**
```
Email: staff@example.com
Password: Staff123!
```

## 🎯 What to Check

### Admin Dashboard
- [ ] เห็น system overview
- [ ] เห็น quick actions (จัดการผู้ใช้, อัพโหลดข้อมูล)
- [ ] Sidebar มี menu "จัดการผู้ใช้" และ "อัพโหลดข้อมูล"

### RM Dashboard
- [ ] เห็น regional metrics
- [ ] เห็น AM performance section
- [ ] เห็น branch ranking section

### AM Dashboard
- [ ] เห็น area metrics
- [ ] เห็น branch performance section
- [ ] เห็น top staff section

### BM Dashboard
- [ ] เห็น branch metrics
- [ ] เห็น staff performance section
- [ ] เห็น category/brand analysis

### Staff Dashboard
- [ ] เห็น personal metrics
- [ ] เห็น sales trend section
- [ ] เห็น category/brand breakdown

## 🐛 Troubleshooting

### Database Connection Error

**Error:** "Can't reach database server"

**Solution:**
```bash
# Check if Prisma Postgres is running
# If not, start it or update DATABASE_URL in .env
```

### Build Error

**Error:** "Cannot find module '@prisma/client'"

**Solution:**
```bash
npx prisma generate
npm run build
```

### Login Not Working

**Error:** "Invalid credentials"

**Solution:**
```bash
# Re-run seed script
npm run db:seed
```

## 📝 Test Checklist

- [ ] ติดตั้ง dependencies สำเร็จ
- [ ] Database setup สำเร็จ
- [ ] Dev server รันได้
- [ ] Login ด้วย admin สำเร็จ
- [ ] เห็น Admin Dashboard
- [ ] เข้าหน้า User Management ได้
- [ ] เข้าหน้า Upload ได้
- [ ] Login ด้วย role อื่นๆ ได้
- [ ] แต่ละ role เห็น dashboard ที่แตกต่างกัน
- [ ] Logout ทำงานได้

## 🎉 Success!

ถ้าทุกอย่างทำงานได้ตาม checklist แสดงว่า MVP พร้อมใช้งานแล้ว!

## 📚 Next Steps

1. อ่าน [README.md](README.md) สำหรับรายละเอียดเพิ่มเติม
2. อ่าน [DEPLOYMENT.md](DEPLOYMENT.md) สำหรับการ deploy
3. อ่าน [MVP_SUMMARY.md](MVP_SUMMARY.md) สำหรับสรุป features

## 🚀 Ready to Deploy?

```bash
# Build for production
npm run build

# Test production build locally
npm start
```

ถ้า build สำเร็จ พร้อม deploy ไป Vercel แล้ว!

ดูคำแนะนำใน [DEPLOYMENT.md](DEPLOYMENT.md)
