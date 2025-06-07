'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};

/*
 * 開發學習紀錄:
 *
 * == 2025-05-30 ==
 * - 關於 Prisma client
 *   - 不應該在 Browser 中被使用，操作都要控制在 Server 端
 *   - 官方文件找不到內容說明在前端不應該使用 Prisma client，可能是預先認知這是產業基本常識了，我會有這樣的疑問應該是不了解 Prisma client 是什麼。
 *   - 參考資料：https://github.com/prisma/prisma/issues/6219#issuecomment-808055698
 *
 * - 關於 server action
 *   - 確保動作在 Server 環境執行
 *   - 行為是從 Client 端發出 POST request 的指令，跟打 API 或 RPC 的行為類似
 *   - 在 Client component 中無法使用 inline server action，在 Server component 中可以
 *   - 我的觀點：這項技術的重點是簡化了前後端整合需要的流程，但安全機制仍需謹慎設計。網路上的討論指出，server action 應被視為公開 API，需要主動規劃安全控管。
 *
 * - 關於 revalidatePath (On-Demand Caching)
 *   - 這種 Cache 策略可以融入資料 Mutate 流程，在頁面未更新時保持靜態頁面的高性能，同時在必要時動態生成最新內容
 *   - 開發體驗 (DX)：在目標頁面之外能精確控制特定 route 的 revalidate，提升了開發的靈活性，也可有效控制 DB 資料取回成本
 *   - 用戶體驗 (UX)：On-Demand Caching 允許大多數用戶享有高效能頁面，因為頁面生成的等待時間已被限制在操作 Mutate 的用戶上
 *
 * ===
 */
