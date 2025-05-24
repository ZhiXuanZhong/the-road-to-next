import { LucideCircleCheck, LucideFileText, LucidePencil } from 'lucide-react';

/* [筆記點A] */
export const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  DONE: <LucideCircleCheck />,
};

/*
 * 開發學習紀錄:
 *
 * == 2025-05-21 ==
 * - [筆記點A] 使用 Lucide 的 Icon 建議以 Prefix 的方式引入，避免發生名稱衝突。
 *   - 例如 Link 的 Icon 會跟 Next 的 Link 衝突，所以建議以 { LucideLink } 的方式引入。
 *
 * ===
 */
