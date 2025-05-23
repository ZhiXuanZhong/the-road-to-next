import { LucideCircleCheck, LucideFileText, LucidePencil } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { initialTickets } from '@/data';
import { ticketPath } from '@/paths';

/* [筆記點B] */
const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  DONE: <LucideCircleCheck />,
};

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
        <p className="text-sm text-muted-foreground">All your tickets at one place</p>
      </div>

      <Separator />

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map(ticket => (
          <Card key={ticket.id} className="w-full max-w-[420px]">
            <CardHeader>
              <CardTitle className="flex gap-x-2 items-center">
                <span>{TICKET_ICONS[ticket.status]}</span>
                {/* [筆記點A] */}
                <span className="truncate">{ticket.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* [筆記點A] */}
              <span className="line-clamp-3 whitespace-break-spaces">{ticket.content}</span>
            </CardContent>
            <CardFooter>
              <Link href={ticketPath(ticket.id)} className="text-sm underline">
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;

/*
 * 開發學習紀錄:
 *
 * == 2025-05-21 ==
 * - [筆記點A] 文字顯示的 UI 優化實作方案
 *   1. 單行文字：使用 truncate 處理，適用於標題等需要單行顯示的元素
 *   2. 多行文字：使用 line-clamp 處理，適用於摘要、評論等需要多行顯示的描述性內容
 *
 * - [筆記點B] 使用 Lucide 的 Icon 建議以 Prefix 的方式引入，避免發生名稱衝突。
 *   - 例如 Link 的 Icon 會跟 Next 的 Link 衝突，所以建議以 { LucideLink } 的方式引入。
 *
 * ===
 */
