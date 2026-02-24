"use client"

import { useState } from "react"

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState<"sales" | "branches">("sales")
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showMapping, setShowMapping] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Validate file type
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ]
    
    if (!validTypes.includes(file.type)) {
      alert("กรุณาเลือกไฟล์ Excel (.xlsx หรือ .xls)")
      return
    }

    // Validate file size (max 300MB)
    const maxSize = 300 * 1024 * 1024
    if (file.size > maxSize) {
      alert("ไฟล์มีขนาดใหญ่เกินไป (สูงสุด 300 MB)")
      return
    }

    setSelectedFile(file)
    setShowMapping(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">อัพโหลดข้อมูล</h1>
        <p className="mt-2 text-gray-600">นำเข้าข้อมูลยอดขายและสาขาจากไฟล์ Excel</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("sales")}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "sales"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            ข้อมูลยอดขาย
          </button>
          <button
            onClick={() => setActiveTab("branches")}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "branches"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            ข้อมูลสาขา
          </button>
        </nav>
      </div>

      {/* Upload Area */}
      {!showMapping ? (
        <div className="rounded-lg bg-white p-8 shadow">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative rounded-lg border-2 border-dashed p-12 text-center ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleChange}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
            
            <div className="space-y-4">
              <div className="mx-auto h-16 w-16 text-gray-400">
                <svg
                  className="h-full w-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              
              <div>
                <p className="text-lg font-medium text-gray-900">
                  ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  รองรับไฟล์ Excel (.xlsx, .xls) ขนาดไม่เกิน 300 MB
                </p>
              </div>
            </div>
          </div>

          {/* Upload History */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900">ประวัติการอัพโหลด</h3>
            <div className="mt-4 text-center text-gray-500">
              <p>ยังไม่มีประวัติการอัพโหลด</p>
            </div>
          </div>
        </div>
      ) : (
        /* Column Mapping Interface */
        <div className="rounded-lg bg-white p-8 shadow">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Column Mapping</h2>
            <p className="mt-1 text-sm text-gray-600">
              ไฟล์: {selectedFile?.name} ({(selectedFile?.size || 0) / 1024 / 1024} MB)
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900">ตัวอย่างข้อมูล (20 แถวแรก)</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">A</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">B</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">C</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">...</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-500" colSpan={4}>
                        (ตัวอย่างข้อมูลจะแสดงที่นี่)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900">กำหนด Column Mapping</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {activeTab === "sales" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Amount (ยอดขาย)
                      </label>
                      <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                        <option value="">เลือก column...</option>
                        <option value="E">Column E</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Quantity (จำนวน)
                      </label>
                      <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                        <option value="">เลือก column...</option>
                        <option value="C">Column C</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Branch Code (รหัสสาขา)
                      </label>
                      <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                        <option value="">เลือก column...</option>
                        <option value="N">Column N</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Doc Date (วันที่)
                      </label>
                      <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                        <option value="">เลือก column...</option>
                        <option value="R">Column R</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Branch Code (รหัสสาขา)
                      </label>
                      <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                        <option value="">เลือก column...</option>
                        <option value="A">Column A</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Branch Name (ชื่อสาขา)
                      </label>
                      <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                        <option value="">เลือก column...</option>
                        <option value="B">Column B</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                setShowMapping(false)
                setSelectedFile(null)
              }}
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              ยกเลิก
            </button>
            <button
              onClick={() => alert("Import functionality will be implemented in the next phase")}
              className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              เริ่มนำเข้าข้อมูล
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
