import type { Ticket } from '@prisma/client';
import clsx from 'clsx';
import { LucideSquareArrowOutUpRight, LucideTrash } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { deleteTicket } from '@/features/ticket/action/delete-ticket';
import { TICKET_ICONS } from '@/features/ticket/constants';
import { ticketPath } from '@/paths';

type TicketItemProps = {
  // [筆記點D] 延伸 Typed APIs 的做法
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    // [筆記點B]
    <Link
      // [筆記點F] 關於 prefetch 的實作
      prefetch
      href={ticketPath(ticket.id)}
      className={buttonVariants({ variant: 'outline', size: 'icon' })}
    >
      <LucideSquareArrowOutUpRight className="w-4 h-4" />
    </Link>
  );

  // const handleDeleteTicket = async () => {
  //   await deleteTicket(ticket.id);
  // };

  // const deleteButton = (
  //   <Button variant="outline" size="icon" onClick={handleDeleteTicket}>
  //     <LucideTrash className="w-4 h-4" />
  //   </Button>
  // );

  // [筆記點E]
  const deleteButton = (
    <form action={deleteTicket.bind(null, ticket.id)}>
      <Button variant="outline" size="icon">
        <LucideTrash className="w-4 h-4" />
      </Button>
    </form>
  );

  return (
    <div
      // [筆記點C]
      className={clsx('w-full flex gap-x-1', {
        'max-w-[580px]': isDetail,
        'max-w-[420px]': !isDetail,
      })}
    >
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center overflow-hidden">
            <span>{TICKET_ICONS[ticket.status]}</span>
            {/* [筆記點A] */}
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* [筆記點A] */}
          <span
            className={clsx('whitespace-break-spaces', {
              'line-clamp-3': !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
      </Card>
      {/* 筆記點B */}
      <div className="flex flex-col gap-y-1">{isDetail ? deleteButton : detailButton}</div>
    </div>
  );
};

export { TicketItem };

/*
 * 開發學習紀錄:
 *
 * == 2025-05-21 ==
 * - [筆記點A] 文字顯示的 UI 優化實作方案
 *   1. 單行文字：使用 truncate 處理，適用於標題等需要單行顯示的元素
 *   1.1 在父層使用 overflow-hidden 才可以讓超出的文字顯示成...
 *
 *   2. 多行文字：使用 line-clamp 處理，適用於摘要、評論等需要多行顯示的描述性內容
 *
 * == 2025-05-24 ==
 * - [筆記點B] Button 在頁面上的實作要點
 *   1. 有 Icon 這個尺寸可以利用
 *   2. 設計按鈕容器時，可以預先複製多個按鈕測試版型，確保容器能靈活適應按鈕數量變化
 *
 * - [筆記點B] Ternary 或 Boolean logic 的抉擇
 *   - 如果要邏輯明確，且需要 true, false 狀況(尤其是falsy值)的回傳值被分開定義就用 Ternary
 *   - 單純的 UI 隱藏顯示就用 Boolean logic
 *   - 範例：
 *     1. 計數器顯示：
 *        - Boolean: {count && <div>Count: {count}</div>}  // 當 count 為 0 時不會顯示
 *        - Ternary: {count !== undefined ? <div>Count: {count}</div> : null}  // 正確處理 0
 *
 *     2. 錯誤訊息：
 *        - Boolean: {error && <div className="error">{error}</div>}  // 空字串不會顯示
 *        - Ternary: {error !== '' ? <div className="error">{error}</div> : null}  // 正確處理空字串
 *
 *     3. 功能開關：
 *        - Boolean: {isEnabled && <FeatureComponent />}  // 停用時不顯示任何內容
 *        - Ternary: {isEnabled ? <FeatureComponent /> : <DisabledComponent />}  // 明確處理兩種狀態
 *
 * - [筆記點C] 使用 clsx 的實作
 *   1. 使用 clsx 可以讓我們更方便的控制元素的 class 屬性
 *     - 第一個參數是 class 屬性，第二個參數是條件 object
 *
 * == 2025-05-29 ==
 * - [筆記點D] 延伸 Typed APIs 的做法
 *   - 前端的資料結構實務上未必都會直接映射到資料庫對應的型別，在中小型的 app 使用 prisma 的型別定義會比較務實方便
 *   - 當 app 持續擴張的狀況下，就可能會對 DB 回來的資料進行加工，如計算、加入欄位等。這時就會有以 API 回傳結果自訂型別的需求
 *     - 缺點：增加維護的難度(定義型別的規則開始有差異)
 *     - 實作：這邊的 Ticket 的型別如果以 API 的結果而不直接使用 prisma 的型別定義
 *       - type TicketItemProps = {
 *         ticket:
 *           | Awaited<ReturnType<typeof getTickets>>[number]
 *           | Awaited<ReturnType<typeof getTicket>>;
 *         isDetail?: boolean;
 *       };
 *
 * == 2025-05-29 ==
 * - [筆記點E] 關於 Server Action 的實作
 *   1. 兩種實作方式比較：
 *     a. 傳統 async function 方式：
 *        - 以 Client component 實作，使用 'use client' 就可以使用 onClick 事件處理
 *        - 優點簡單易懂，缺點是最大化使用 Server component 的優勢
 *        - 範例：
 *          ```typescript
 *          const handleDeleteTicket = async () => {
 *            await deleteTicket(ticket.id);
 *          };
 *
 *          const deleteButton = (
 *            <Button
 *              variant="outline"
 *              size="icon"
 *              onClick={handleDeleteTicket}
 *            >
 *              <LucideTrash className="w-4 h-4" />
 *            </Button>
 *          );
 *          ```
 *
 *     b. Server Action 綁定方式：
 *        - 直接使用 form 的 action 屬性
 *        - 利用 bind 方法預先傳遞參數，讓操作盡可能的在 Server 端執行
 *        - 優點：最大化 Server component 的優勢，在資料處理盡可能提前於 Client 端進行，但缺點是需要使用 form 標籤，這種實作方式與傳統 React 的元件設計模式略有不同
 *        - 範例：
 *          ```typescript
 *          const deleteButton = (
 *            <form action={deleteTicket.bind(null, ticket.id)}>
 *              <Button variant="outline" size="icon">
 *                <LucideTrash className="w-4 h-4" />
 *              </Button>
 *            </form>
 *          );
 *          ```
 *
 * == 2025-06-04 ==
 * - [筆記點F] 關於 prefetch 的實作
 *   - prefetch Cache 也是 Client-Side Cache，兩者都屬於 Router Cache 的範疇(Soft Cache)
 *   - 在 Link 元件中使用 prefetch 屬性，讓元素進入 Viewport 時就載入目標頁面，這對用戶體驗是好的，但可能造成效能浪費，因為預先載入了用戶不需要的部分
 *
 * ===
 */
