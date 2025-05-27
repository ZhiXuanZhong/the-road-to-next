import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { TicketList } from '@/features/ticket/components/ticket-list';

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
 *
 * ===
 */
