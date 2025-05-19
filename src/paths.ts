export const homePath = () => '/';
export const ticketsPath = () => '/tickets';
export const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;

/*
 * 開發學習紀錄:
 *
 * == 2025-05-18 ==
 * - 關於路徑 Utility Function 的實作
 *   - 為了讓管理更便利且容易維護，將路徑使用 Utility Function 管理
 *   - 為了維持統一性，即使是固定的路徑字串，也統一使用 Function 的方式實作
 *
 * - 關於 barrel file
 *   - 將路徑常數函式匯出到單一檔案中，如 `index.ts`，以減少頁面中的匯入數量，這種做法被稱為 barrel file
 *   - 現在以2025年的背景下不建議這樣做，因為性能問題，特別是與 tree-shaking 有關
 *   - 結論：直接在使用的地方匯入，避免多一層間接的匯入/匯出
 *
 * ===
 */
