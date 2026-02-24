import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      employeeCode: string | null
      branchCode: string | null
      canCreateKPI: boolean
      managedRegions: string[]
      managedAreas: string[]
      managedBranches: string[]
      managedAMs: string[]
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: string
    employeeCode: string | null
    branchCode: string | null
    canCreateKPI: boolean
    managedRegions: string[]
    managedAreas: string[]
    managedBranches: string[]
    managedAMs: string[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    employeeCode: string | null
    branchCode: string | null
    canCreateKPI: boolean
    managedRegions: string[]
    managedAreas: string[]
    managedBranches: string[]
    managedAMs: string[]
  }
}
