import { prisma } from '@/lib/prisma';

export const getTickets = async () => {
  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

/*
 * 開發學習紀錄:
 *
 * == 2025-05-29 ==
 * - 使用 getMany() 取得所有資料
 *
 * ===
 */
