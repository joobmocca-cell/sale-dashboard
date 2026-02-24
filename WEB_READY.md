# 🎉 เว็บพร้อมใช้งานแล้ว!

## 🌐 ลิงก์เข้าใช้งาน

### Production URL (ใช้ลิงก์นี้):
**https://sales-dashboard-three-tau.vercel.app**

### หน้า Login:
**https://sales-dashboard-three-tau.vercel.app/login**

---

## 👤 บัญชีทดสอบ (5 บัญชี)

| บทบาท | อีเมล | รหัสผ่าน | สิทธิ์ |
|--------|-------|----------|--------|
| 🔑 **Admin** | admin@example.com | Admin123! | จัดการทุกอย่าง + สร้าง KPI |
| 👔 **RM** (Regional Manager) | rm@example.com | RM123! | ดูข้อมูลทั้งภูมิภาค |
| 📊 **AM** (Area Manager) | am@example.com | AM123! | ดูข้อมูลพื้นที่ |
| 🏢 **BM** (Branch Manager) | bm@example.com | BM123! | ดูข้อมูลสาขา |
| 👨‍💼 **Staff** | staff@example.com | Staff123! | ดูข้อมูลส่วนตัว |

---

## 📱 วิธีใช้งาน

### 1. เข้าสู่ระบบ
1. เปิด https://sales-dashboard-three-tau.vercel.app
2. ระบบจะ redirect ไปหน้า login อัตโนมัติ
3. ใส่ email และ password จากตารางด้านบน
4. คลิก "เข้าสู่ระบบ"

### 2. หน้า Dashboard แต่ละบทบาท

#### Admin Dashboard
- URL: `/admin`
- ฟีเจอร์:
  - จัดการผู้ใช้งาน (`/admin/users`)
  - อัพโหลดไฟล์ Excel (`/admin/upload`)
  - ดู KPI ทั้งหมด
  - สร้าง Custom KPI

#### RM Dashboard
- URL: `/rm`
- ดูข้อมูลทั้งภูมิภาคที่รับผิดชอบ

#### AM Dashboard
- URL: `/am`
- ดูข้อมูลพื้นที่ที่รับผิดชอบ

#### BM Dashboard
- URL: `/bm`
- ดูข้อมูลสาขาที่รับผิดชอบ

#### Staff Dashboard
- URL: `/staff`
- ดูข้อมูลยอดขายส่วนตัว

---

## ✅ สถานะระบบ

### ทำงานได้แล้ว:
- ✅ Authentication (NextAuth.js)
- ✅ Role-based access control
- ✅ Dashboard แยกตามบทบาท
- ✅ User management UI
- ✅ File upload UI
- ✅ Database (Supabase Postgres)
- ✅ 5 user accounts พร้อมใช้งาน
- ✅ 3 branches ตัวอย่าง

### ยังไม่ได้ทำ (Phase 2):
- ⏳ Excel file processing
- ⏳ Sales data import
- ⏳ KPI calculations
- ⏳ Charts and graphs
- ⏳ Filters and date range selection
- ⏳ Custom KPI builder

---

## 🔧 Technical Details

### Stack:
- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js v4
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma 7
- **Hosting**: Vercel

### Database:
- **Provider**: Supabase (Postgres)
- **Connection**: Pooling enabled
- **Tables**: User, Session, Branch, Sale, CustomKPI, ImportJob, Aggregates

### Environment:
- **Production**: https://sales-dashboard-three-tau.vercel.app
- **Region**: Singapore (aws-1-ap-southeast-1)

---

## 🐛 หากพบปัญหา

### ล้อคอินไม่ได้:
1. ตรวจสอบ email/password ให้ถูกต้อง
2. ลองใช้ admin@example.com / Admin123!
3. เช็ค browser console (F12) ดู error

### หน้าเว็บไม่โหลด:
1. ตรวจสอบ internet connection
2. ลอง refresh หน้าเว็บ (Ctrl+F5)
3. ลองเปิดใน incognito mode

### อื่นๆ:
- เช็ค deployment status: https://vercel.com/joobmocca-7135s-projects/sales-dashboard
- ดู logs: `vercel logs https://sales-dashboard-three-tau.vercel.app`

---

## 📝 Next Steps

หลังจากทดสอบเว็บแล้ว สามารถทำต่อได้:

1. **ทดสอบ Login** ทุก role
2. **ทดสอบ Navigation** ระหว่างหน้า
3. **เตรียมไฟล์ Excel** ตัวอย่างสำหรับ Phase 2
4. **Feedback** ว่าต้องการปรับแต่งอะไร

---

## 🎯 สรุป

เว็บ Sales Dashboard System พร้อมใช้งานแล้วที่:

🔗 **https://sales-dashboard-three-tau.vercel.app**

ลองเข้าไปทดสอบได้เลย! 🚀
