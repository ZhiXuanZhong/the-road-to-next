import Link from 'next/link';
import { Placeholder } from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { initialTickets } from '@/data';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { ticketsPath } from '@/paths';

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = initialTickets.find(ticket => ticket.id === ticketId);

  if (!ticket) {
    return (
      <div className="flex flex-1">
        <Placeholder
          label="Ticket not found"
          button={
            <Button variant="outline" asChild>
              <Link href={ticketsPath()}>Go to tickets</Link>
            </Button>
          }
        />
      </div>
    );
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
 * ===
 */
