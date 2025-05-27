import { notFound } from 'next/navigation';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTicket } from '@/features/ticket/queries/get-ticket';

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex justify-center animate-fade-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
};

export default TicketPage;

/*
 * 開發學習紀錄:
 *
 * == 2025-05-17 ==
 * - Next 15 之後的 params 是 async 所以要 await
 *   - React 19 breaking Change: https://bit.ly/4hGvurc
 *   - Dynamic APIs are Asynchronous: https://arc.net/l/quote/wamhxcqg
 * - 有用到 Params 的頁面 typesctipt 型別可以參考這邊的寫法
 *
 * == 2025-05-18 ==
 * - 這邊是以 ticket 有沒有資料來動態渲染頁面，而不是 params 有沒有 ticketId，總體來說是檢測有沒有資料，而不是有沒有 params
 *
 * == 2025-05-27 ==
 * - 在 Dynamic Routes 中，開發時應該要考量 notFound 機制，並且要轉到 404 頁面，而不是用條件渲染
 * - notFound() 是 Next.js 內建的 function，會跳轉到 404 頁面，跟條件渲染的差異是，會多了 meta 資訊對 SEO 友善
 *
 * ===
 */
