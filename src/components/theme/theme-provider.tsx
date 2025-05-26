'use client';

import { ThemeProvider as BaseThemesProvider } from 'next-themes';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <BaseThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </BaseThemesProvider>
  );
};

/*
 * 開發學習紀錄:
 *
 * == 2025-05-25 ==
 * - theme-provider 建立在 components 資料夾下作為 Shared Component 使用
 *
 * == 2025-05-26 ==
 * - 關於 client component 嵌套 server component 的發現：
 *   - 當使用 React composition pattern 時，'use client' directive 的影響範圍是有限的
 *
 *   - 實作建議：
 *     - 對於需要 'use client' 且接近根節點的 components 建議採用 composition pattern 來實作
 *
 *   - 實際案例：ThemeProvider 若標記為 'use client' 時，利用 console.log 觀察：
 *     - ThemeProvider 本身會成為 client component
 *     - 但傳入的 children 仍然保持為 server component
 */
