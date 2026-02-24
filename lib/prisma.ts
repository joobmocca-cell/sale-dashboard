import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pool: Pool | undefined
}

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL_NON_POOLING

if (!globalForPrisma.pool && connectionString) {
  globalForPrisma.pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  })
}

const adapter = globalForPrisma.pool ? new PrismaPg(globalForPrisma.pool) : undefined

export const prisma = globalForPrisma.prisma ?? new PrismaClient(adapter ? { adapter } : {})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
