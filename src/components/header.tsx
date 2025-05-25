import { LucideKanban } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme/theme-switcher';
import { buttonVariants } from '@/components/ui/button';
import { homePath, ticketsPath } from '@/paths';

const Header = () => {
  return (
    <nav
      className="
    supports-backdrop-blur:bg-background/60
    fixed left-0 right-0 top-0 z-20
    border-b bg-background/95 backdrop-blur
    w-full flex py-2.5 px-5 justify-between
  "
    >
      <div>
        {/* [筆記點A] */}
        <Link href={homePath()} className={buttonVariants({ variant: 'ghost' })}>
          <LucideKanban />
          <h1 className=" text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>

      <div className="flex gap-x-2">
        <ThemeSwitcher />
        <Link href={ticketsPath()} className={buttonVariants({ variant: 'default' })}>
          Tickets
        </Link>
      </div>
    </nav>
  );
};

export { Header };

/*
 * 開發學習紀錄:
 *
 * == 2025-05-20 ==
 * - [筆記點A] 讓 Link 擁有 Button 的樣式，這是邊緣案例不太常用。以下兩種做法可以達成
 *   1. 使用 asChild 是為了讓 DOM 結構符合語意，以 Button 的樣式傳至 Link 上，所以最終將只有 <a></a> 被渲染在頁面上，不會看到 Button 的元素
 *   - 可以比較好理解的唸法就是： 這個 Button 的樣式要 as '當作' Child 的樣式
 *   - 範例：
 *     ```tsx
 *     <Button asChild variant="outline">
 *       <Link href={homePath()}>Home</Link>
 *     </Button>
 *     ```
 *
 *   2. 在 className 上使用 buttonVariants 然後傳入需要的 variant object
 *   - 範例：
 *     ```tsx
 *     <Link href={homePath()} className={buttonVariants({ variant: 'outline' })}>
 *       Home
 *     </Link>
 *     ```
 *
 * ===
 */
