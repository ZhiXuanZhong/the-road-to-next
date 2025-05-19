import { initialTickets } from '@/data';

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = initialTickets.find(ticket => ticket.id === ticketId);

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div>
      <h2>{ticket.title}</h2>
      <p>{ticket.content}</p>
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
 * ===
 */
