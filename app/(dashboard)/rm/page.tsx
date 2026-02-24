"use client"

import { useSession } from "next-auth/react"

export default function RMDashboard() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Regional Manager Dashboard</h1>
        <p className="mt-2 text-gray-600">ยินดีต้อนรับ, {session?.user?.email}</p>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">ยอดขายรวมภูมิภาค</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">฿0</p>
          <p className="mt-1 text-sm text-green-600">+0% จากเดือนที่แล้ว</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">จำนวน AM</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">จำนวนสาขา</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">จำนวนพนักงาน</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>

      {/* AM Performance */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900">ผลงาน Area Manager</h2>
        <div className="mt-4 text-center text-gray-500">
          <p>ยังไม่มีข้อมูล</p>
        </div>
      </div>

      {/* Branch Ranking */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">Top 10 สาขา</h2>
          <div className="mt-4 text-center text-gray-500">
            <p>ยังไม่มีข้อมูล</p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">Bottom 10 สาขา</h2>
          <div className="mt-4 text-center text-gray-500">
            <p>ยังไม่มีข้อมูล</p>
          </div>
        </div>
      </div>
    </div>
  )
}
