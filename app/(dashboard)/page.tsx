"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardRouter() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const role = session.user.role
      
      switch (role) {
        case "ADMIN":
          router.push("/admin")
          break
        case "RM":
          router.push("/rm")
          break
        case "AM":
          router.push("/am")
          break
        case "BM":
          router.push("/bm")
          break
        case "STAFF":
          router.push("/staff")
          break
        default:
          router.push("/login")
      }
    }
  }, [session, status, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-lg">กำลังโหลด...</div>
    </div>
  )
}
