import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      canCreateKPI: true,
      managedRegions: [],
      managedAreas: [],
      managedBranches: [],
      managedAMs: [],
    },
  })

  console.log('✅ Created admin user:', admin.email)

  // Create sample branches
  const branches = [
    {
      code: 'BR001',
      name: 'สาขากรุงเทพ 1',
      unit: 'กรุงเทพ',
      rm: 'RM001',
      am: 'AM001',
      salesChannel: 'Retail',
      bm: 'BM001',
      contactNumber: '02-123-4567',
    },
    {
      code: 'BR002',
      name: 'สาขากรุงเทพ 2',
      unit: 'กรุงเทพ',
      rm: 'RM001',
      am: 'AM001',
      salesChannel: 'Retail',
      bm: 'BM002',
      contactNumber: '02-234-5678',
    },
    {
      code: 'BR003',
      name: 'สาขาเชียงใหม่',
      unit: 'ภาคเหนือ',
      rm: 'RM002',
      am: 'AM002',
      salesChannel: 'Retail',
      bm: 'BM003',
      contactNumber: '053-123-456',
    },
  ]

  for (const branch of branches) {
    await prisma.branch.upsert({
      where: { code: branch.code },
      update: {},
      create: branch,
    })
  }

  console.log('✅ Created', branches.length, 'branches')

  // Create sample users for each role
  const rmPassword = await bcrypt.hash('RM123!', 10)
  const rm = await prisma.user.upsert({
    where: { email: 'rm@example.com' },
    update: {},
    create: {
      email: 'rm@example.com',
      password: rmPassword,
      role: 'RM',
      canCreateKPI: false,
      managedRegions: ['กรุงเทพ'],
      managedAreas: [],
      managedBranches: ['BR001', 'BR002'],
      managedAMs: [],
    },
  })

  console.log('✅ Created RM user:', rm.email)

  const amPassword = await bcrypt.hash('AM123!', 10)
  const am = await prisma.user.upsert({
    where: { email: 'am@example.com' },
    update: {},
    create: {
      email: 'am@example.com',
      password: amPassword,
      role: 'AM',
      canCreateKPI: false,
      managedRegions: [],
      managedAreas: ['กรุงเทพ'],
      managedBranches: ['BR001', 'BR002'],
      managedAMs: [],
    },
  })

  console.log('✅ Created AM user:', am.email)

  const bmPassword = await bcrypt.hash('BM123!', 10)
  const bm = await prisma.user.upsert({
    where: { email: 'bm@example.com' },
    update: {},
    create: {
      email: 'bm@example.com',
      password: bmPassword,
      role: 'BM',
      canCreateKPI: false,
      branchCode: 'BR001',
      managedRegions: [],
      managedAreas: [],
      managedBranches: [],
      managedAMs: [],
    },
  })

  console.log('✅ Created BM user:', bm.email)

  const staffPassword = await bcrypt.hash('Staff123!', 10)
  const staff = await prisma.user.upsert({
    where: { email: 'staff@example.com' },
    update: {},
    create: {
      email: 'staff@example.com',
      password: staffPassword,
      role: 'STAFF',
      canCreateKPI: false,
      employeeCode: 'EMP001',
      branchCode: 'BR001',
      managedRegions: [],
      managedAreas: [],
      managedBranches: [],
      managedAMs: [],
    },
  })

  console.log('✅ Created Staff user:', staff.email)

  console.log('\n🎉 Seed completed successfully!')
  console.log('\n📝 Test accounts:')
  console.log('Admin: admin@example.com / Admin123!')
  console.log('RM: rm@example.com / RM123!')
  console.log('AM: am@example.com / AM123!')
  console.log('BM: bm@example.com / BM123!')
  console.log('Staff: staff@example.com / Staff123!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
