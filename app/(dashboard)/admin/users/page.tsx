"use client"

import { useState } from "react"

export default function UsersPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "STAFF",
    employeeCode: "",
    branchCode: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement user creation API call
    alert("User creation will be implemented in the next phase")
    setShowCreateModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">จัดการผู้ใช้</h1>
          <p className="mt-2 text-gray-600">สร้างและจัดการบัญชีผู้ใช้ในระบบ</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + สร้างผู้ใช้ใหม่
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-lg bg-white shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">รายการผู้ใช้</h2>
        </div>
        <div className="p-6">
          <div className="text-center text-gray-500">
            <p>ยังไม่มีผู้ใช้ในระบบ</p>
            <p className="mt-2 text-sm">กรุณาสร้างผู้ใช้ใหม่เพื่อเริ่มต้นใช้งาน</p>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">สร้างผู้ใช้ใหม่</h2>
            
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  อีเมล
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  บทบาท
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="RM">Regional Manager</option>
                  <option value="AM">Area Manager</option>
                  <option value="BM">Branch Manager</option>
                  <option value="STAFF">Staff</option>
                </select>
              </div>

              {(formData.role === "STAFF" || formData.role === "BM") && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      รหัสพนักงาน
                    </label>
                    <input
                      type="text"
                      value={formData.employeeCode}
                      onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      รหัสสาขา
                    </label>
                    <input
                      type="text"
                      value={formData.branchCode}
                      onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  สร้างผู้ใช้
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
