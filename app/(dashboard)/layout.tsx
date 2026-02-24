"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">กำลังโหลด...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const navigation = [
    { name: "Dashboard", href: "/", roles: ["ADMIN", "RM", "AM", "BM", "STAFF"] },
    { name: "จัดการผู้ใช้", href: "/admin/users", roles: ["ADMIN"] },
    { name: "อัพโหลดข้อมูล", href: "/admin/upload", roles: ["ADMIN"] },
  ]

  const filteredNav = navigation.filter((item) =>
    item.roles.includes(session.user.role)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <h1 className="text-xl font-bold text-gray-900">Sales Dashboard</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {filteredNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="border-t p-4">
            <div className="mb-2 text-sm">
              <p className="font-medium text-gray-900">{session.user.email}</p>
              <p className="text-gray-500">
                {session.user.role === "ADMIN" && "ผู้ดูแลระบบ"}
                {session.user.role === "RM" && "Regional Manager"}
                {session.user.role === "AM" && "Area Manager"}
                {session.user.role === "BM" && "Branch Manager"}
                {session.user.role === "STAFF" && "พนักงานขาย"}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
