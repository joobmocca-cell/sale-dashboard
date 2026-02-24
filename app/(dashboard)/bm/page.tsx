"use client"

import { useSession } from "next-auth/react"

export default function BMDashboard() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Branch Manager Dashboard</h1>
        <p className="mt-2 text-gray-600">ยินดีต้อนรับ, {session?.user?.email}</p>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">ยอดขายสาขา</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">฿0</p>
          <p className="mt-1 text-sm text-green-600">+0% จากเดือนที่แล้ว</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">จำนวนพนักงาน</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">ธุรกรรม</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>

      {/* Staff Performance */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900">ผลงานพนักงาน</h2>
        <div className="mt-4 text-center text-gray-500">
          <p>ยังไม่มีข้อมูล</p>
        </div>
      </div>

      {/* Category Analysis */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">วิเคราะห์ตามหมวดหมู่</h2>
          <div className="mt-4 text-center text-gray-500">
            <p>ยังไม่มีข้อมูล</p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">วิเคราะห์ตามแบรนด์</h2>
          <div className="mt-4 text-center text-gray-500">
            <p>ยังไม่มีข้อมูล</p>
          </div>
        </div>
      </div>
    </div>
  )
}
