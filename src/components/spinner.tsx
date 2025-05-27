import { LucideLoaderCircle } from 'lucide-react';

const Spinner = () => {
  return (
    // 筆記點A
    <div className="flex flex-1 flex-col items-center justify-center self-center">
      <LucideLoaderCircle className="h-16 w-16 animate-spin" />
    </div>
  );
};

export { Spinner };

/*
 * 開發學習紀錄:
 *
 * == 2025-05-27 ==
 * - [筆記點A] 佔滿容器的上下、左右置中方式，為了確保多數狀況都在中間
 *   - 多加入 self-center 確保多數狀況都在中間，像是最外層是 flex-col items-start 的情境(橫向一列列的卡片)就有用
 *     正在讀取中的卡片列 Spinner 會在該列的中間，不會跑到最左邊轉
 *
 * ===
 */
