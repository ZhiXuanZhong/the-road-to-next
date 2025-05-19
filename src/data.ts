export const initialTickets = [
  {
    id: '1',
    title: 'Ticket 1',
    content: 'This is the first ticket.',
    status: 'DONE' as const,
  },
  {
    id: '2',
    title: 'Ticket 2',
    content: 'This is the second ticket.',
    status: 'OPEN' as const,
  },
  {
    id: '3',
    title: 'Ticket 3',
    content: 'This is the third ticket.',
    status: 'IN_PROGRESS' as const,
  },
];

/*
 * 開發學習紀錄:
 *
 * == 2025-05-19 ==
 * - 關於這邊使用 const Assertions 是暫時的做法，先讓 TypeScript 檢查通過，後續會為這些 tickets 建立正確的型別
 *
 * ===
 */
