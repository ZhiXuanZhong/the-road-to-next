import { prisma } from '@/lib/prisma';

export const getTicket = async (id: string) => {
  return await prisma.ticket.findUnique({
    where: {
      id,
    },
  });
};

/*
 * 開發學習紀錄:
 *
 * == 2025-05-29 ==
 * - 使用 findUnique() 取回單筆資料，Prisma 也提供 findUniqueOrThrow() 在找不到時會跳錯的做法
 *
 * ===
 */
