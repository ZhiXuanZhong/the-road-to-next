import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/*
 * 開發學習紀錄:
 *
 * == 2025-05-29 ==
 * - 這段程式碼是為了避免 Next.js 的 hot reload 機制在每次使用 prisma 時都重新建立一個 PrismaClient instance
 *   - ref: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
 *
 * ===
 */
