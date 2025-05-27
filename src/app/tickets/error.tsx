'use client';

import { Placeholder } from '@/components/placeholder';

export default function Error({ error }: { error: Error }) {
  return <Placeholder label={error.message || 'Something went wrong'} />;
}

/*
 * 開發學習紀錄:
 *
 * == 2025-05-27 ==
 * - Next.js Routing file(這邊是 error.tsx) 必須要是 Client component，因為 React error boundary 是在 Client 端進行
 * - 如果子節點跳錯，會從出錯的地方往上找到最近的 error.tsx 進行處理
 * - 要做到 component 層級的錯誤處理，可以使用 react-error-boundary 套件優先抓住錯誤
 *   - 如果沒有使用 react-error-boundary 的同層或以下的 component 出錯，會走 error.tsx 的錯誤處理
 *
 * ===
 */
