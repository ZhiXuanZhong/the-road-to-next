import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { TicketList } from '@/features/ticket/components/ticket-list';

// [筆記點C] 關於 dynamic 的實作
// export const dynamic = 'force-dynamic';
// export const revalidate = 10;

const TicketsPage = () => {
  return (
    // 筆記點B-2
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      {/* 筆記點B-1 */}
      <Suspense fallback={<Spinner />}>
        {/* 筆記點A */}
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;

/*
 * 開發學習紀錄:
 *
 * == 2025-05-27 ==
 * - [筆記點A] TicketList 拆出去
 *   - 原先的程式碼邏輯有 async/ await 的取資料流程，拆出去後變成一個獨立的元件，讓他可以被等待
 *
 * - [筆記點B] Suspense 的用法與行為
 *   - 透過 Suspense 可以先跳過尚未 return 的 component
 *   - 比較晚 return 的 component 準備好後，會以 Streaming 的方式渲染在頁面上
 *   - Streaming 的意思是：讓頁面內容分段載入，漸進式的呈現給用戶，而不是等待所有內容都準備好才展示給用戶
 *   - 想像：就像串流影片可以邊下載邊播放，Streaming 渲染讓頁面可以邊準備邊顯示，不用等所有內容都準備好才開始呈現。
 *
 * - [筆記點C] Next.js 的 Full Route Cache(Server-Side Cache, Hard Cache)
 *   - 要 build && start 在 Production 環境中進行測試才會準確，在 Development 中的 Cache 機制不穩定
 *   - 如果有未預期的 Cache 行為，可以先從 Build 出來的 Route list 是 static or dynamic 著手
 *   - 可以在 nextConfig object 中加入 exprimental.staleTimes.dynamic: 30 來達成全專案路由都 cache 30 秒
 *   - 要注意 revalidate 的做法在 Route list 中顯示為 static，這屬於 Time-Based Cache，有 Incremental Static Regeneration (ISR) 的行為
 *   - 使用 next/cache 中的 revalidatePath 來實踐 On-Demand Caching(也屬於ISR) 會有更好的 UX, DX，詳情參考 delete-ticket.ts 的做法
 *
 * ===
 */
