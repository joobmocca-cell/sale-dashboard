import bcrypt from 'bcryptjs'
import { prisma } from './lib/prisma'

async function main() {
  const hashedPassword = await bcrypt.hash('1234', 10)
  console.log('Hashed password for "1234":', hashedPassword)
  
  // Delete all existing users
  await prisma.user.deleteMany()
  console.log('Deleted all existing users')
  
  // Create new admin user
  const admin = await prisma.user.create({
    data: {
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
  
  console.log('✅ Created admin user:', admin.username)
  console.log('Username: admin')
  console.log('Password: 1234')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
