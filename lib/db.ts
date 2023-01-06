import { PrismaClient } from '@prisma/client'

/**
 * Prisma client - loaded from cache if defined
 */
export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

// ref: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
