import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("กรุณากรอก username และรหัสผ่าน")
        }

        // Try to find by username first, then by email
        let user = await prisma.user.findUnique({
          where: { username: credentials.username },
          include: { branch: true }
        })
        
        // If not found by username, try email
        if (!user) {
          user = await prisma.user.findUnique({
            where: { email: credentials.username },
            include: { branch: true }
          })
        }

        if (!user || !user.password) {
          throw new Error("username หรือรหัสผ่านไม่ถูกต้อง")
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error("username หรือรหัสผ่านไม่ถูกต้อง")
        }

        return {
          id: user.id,
          username: user.username || user.email,
          email: user.email,
          role: user.role,
          employeeCode: user.employeeCode,
          branchCode: user.branchCode,
          canCreateKPI: user.canCreateKPI,
          managedRegions: user.managedRegions,
          managedAreas: user.managedAreas,
          managedBranches: user.managedBranches,
          managedAMs: user.managedAMs,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
        token.employeeCode = user.employeeCode
        token.branchCode = user.branchCode
        token.canCreateKPI = user.canCreateKPI
        token.managedRegions = user.managedRegions
        token.managedAreas = user.managedAreas
        token.managedBranches = user.managedBranches
        token.managedAMs = user.managedAMs
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.role = token.role as string
        session.user.employeeCode = token.employeeCode as string | null
        session.user.branchCode = token.branchCode as string | null
        session.user.canCreateKPI = token.canCreateKPI as boolean
        session.user.managedRegions = token.managedRegions as string[]
        session.user.managedAreas = token.managedAreas as string[]
        session.user.managedBranches = token.managedBranches as string[]
        session.user.managedAMs = token.managedAMs as string[]
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}
