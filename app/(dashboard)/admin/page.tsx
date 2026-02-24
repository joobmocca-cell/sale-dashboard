"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"

export default function AdminDashboard() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">ยินดีต้อนรับ, {session?.user?.email}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">ยอดขายรวม</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">฿0</p>
          <p className="mt-1 text-sm text-gray-500">ยังไม่มีข้อมูล</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">จำนวนสาขา</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
          <p className="mt-1 text-sm text-gray-500">ยังไม่มีข้อมูล</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">จำนวนพนักงาน</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
          <p className="mt-1 text-sm text-gray-500">ยังไม่มีข้อมูล</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">ธุรกรรม</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
          <p className="mt-1 text-sm text-gray-500">ยังไม่มีข้อมูล</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900">เริ่มต้นใช้งาน</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/admin/users"
            className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500 hover:bg-blue-50"
          >
            <h3 className="font-medium text-gray-900">จัดการผู้ใช้</h3>
            <p className="mt-1 text-sm text-gray-500">สร้างและจัดการบัญชีผู้ใช้</p>
          </Link>

          <Link
            href="/admin/upload"
            className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500 hover:bg-blue-50"
          >
            <h3 className="font-medium text-gray-900">อัพโหลดข้อมูล</h3>
            <p className="mt-1 text-sm text-gray-500">นำเข้าข้อมูลยอดขายจาก Excel</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900">กิจกรรมล่าสุด</h2>
        <div className="mt-4 text-center text-gray-500">
          <p>ยังไม่มีกิจกรรม</p>
        </div>
      </div>
    </div>
  )
}
