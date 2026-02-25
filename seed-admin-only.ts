// Simple script to create admin user
// Run with: vercel env pull && npx tsx seed-admin-only.ts

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Creating admin user...')
  
  const hashedPassword = await bcrypt.hash('1234', 10)
  
  // Try to update or create admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@system.local' },
    update: {
      username: 'admin',
      password: hashedPassword,
    },
    create: {
      username: 'admin',
      email: 'admin@system.local',
      password: hashedPassword,
      role: 'ADMIN',
      canCreateKPI: true,
      managedRegions: [],
      managedAreas: [],
      managedBranches: [],
      managedAMs: [],
    }
  })
  
  console.log('✅ Admin user ready!')
  console.log('Username: admin')
  console.log('Password: 1234')
  console.log('Email:', admin.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
