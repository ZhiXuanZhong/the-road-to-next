import { Spinner } from '@/components/spinner';

export default function Loading() {
  return <Spinner />;
}

/*
 * 開發學習紀錄:
 *
 * == 2025-05-27 ==
 * - Next.js Routing file(這邊是 loading.tsx) 是以 Suspense 對整個頁面進行等待
 *   - 要更細緻的做法是使用 Suspense 對單一元件進行等待，像 TicketsPage 的實作方法
 *
 * ===
 */
