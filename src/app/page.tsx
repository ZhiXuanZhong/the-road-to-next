import Link from 'next/link';
import { ticketsPath } from '@/paths';

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">HomePage</h2>
        <p className="text-sm text-muted-foreground">Your home place to start</p>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <Link href={ticketsPath()} className="underline">
          Go to Tickets
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

/*
 * 開發學習紀錄:
 *
 * == 2025-05-20 ==
 * - 關於一直以來我對 flex-1 的用法一直把握，現在依照實際應用來說明
 *   - 請節制的使用 flex-1 否則會造成 layout 混亂難以預測
 *   - 通常一個容器中只會有一個 flex-1
 *   - 內容動態變化大的容器，可以使用 flex-1 來靈活分配剩餘空間
 *
 * ===
 */
