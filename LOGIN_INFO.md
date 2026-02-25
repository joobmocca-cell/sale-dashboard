# 🔐 ข้อมูลการเข้าสู่ระบบ

## ลิงก์เว็บ:
**https://sales-dashboard-three-tau.vercel.app/login**

## วิธีล้อคอิน (ตอนนี้):

ระบบรองรับทั้ง username และ email ในช่อง "Username"

### ตัวเลือกที่ 1: ใช้ email (ข้อมูลเดิมที่มีอยู่)
```
Username: admin@example.com
Password: Admin123!
```

### ตัวเลือกที่ 2: หลังจาก deploy เสร็จ จะสร้าง admin ใหม่
```
Username: admin
Password: 1234
```

## สถานะ:
- ✅ เปลี่ยนหน้า login เป็น username/password แล้ว
- ✅ รองรับล้อคอินด้วย email (fallback)
- 🔄 กำลัง deploy ไป Vercel
- ⏳ รอ deploy เสร็จแล้วจะสร้าง admin user ใหม่

## ขั้นตอนต่อไป:
1. รอ Vercel deploy เสร็จ (1-2 นาที)
2. ลองล้อคอินด้วย admin@example.com / Admin123!
3. ถ้าเข้าได้ จะสร้าง user admin/1234 ให้ใหม่
