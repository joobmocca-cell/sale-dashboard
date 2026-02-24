"use client"

import { useSession } from "next-auth/react"

export default function StaffDashboard() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="mt-2 text-gray-600">ยินดีต้อนรับ, {session?.user?.email}</p>
        {session?.user?.employeeCode && (
          <p className="text-sm text-gray-500">รหัสพนักงาน: {session.user.employeeCode}</p>
        )}
      </div>

      {/* Personal KPI */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">ยอดขายของฉัน</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">฿0</p>
          <p className="mt-1 text-sm text-green-600">+0% จากเดือนที่แล้ว</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">จำนวนธุรกรรม</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">ค่าเฉลี่ยต่อบิล</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">฿0</p>
        </div>
      </div>

      {/* Sales Trend */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900">แนวโน้มยอดขาย</h2>
        <div className="mt-4 text-center text-gray-500">
          <p>ยังไม่มีข้อมูล</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">ยอดขายตามหมวดหมู่</h2>
          <div className="mt-4 text-center text-gray-500">
            <p>ยังไม่มีข้อมูล</p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">ยอดขายตามแบรนด์</h2>
          <div className="mt-4 text-center text-gray-500">
            <p>ยังไม่มีข้อมูล</p>
          </div>
        </div>
      </div>
    </div>
  )
}
