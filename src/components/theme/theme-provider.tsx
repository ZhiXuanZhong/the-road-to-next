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
 *
 * == 2025-05-27 ==
 * - Server Components vs SSR 的核心差異：
 *   - SSR：
 *     - 是 2016 年讓 Next.js 流行的技術，是第一個在 React 上實現伺服器端渲染的框架
 *     - 渲染(Server) 與執行(Client) 都是以整個頁面為最小單位
 *     - Server 渲染畫面，有 JS 的部分都在 Client 環境執行，切得很乾淨
 *   - Server Components：
 *     - 關注的是程式碼在哪裡執行，實現單個頁面中有多個在不同環境產生的渲染結果
 *     - 因為能指定元件在 Server 端執行的特性，所以可以直接存取資料庫等敏感資源
 *
 * - Server Components 與 Client Components 的渲染機制：
 *   - 兩者都會在 Server 端進行初始渲染
 *   - Server Components：
 *     - 只在 Server 環境執行
 *   - Client Components：
 *     - 在客戶端重新渲染（re-render）或水合（hydrate）
 *     - 使 hooks, event handlers 等功能可以運作
 *
 * 參考文件：
 * - Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
 * - React Rendering on the Server: https://nextjs.org/docs/app/deep-dive/caching#1-react-rendering-on-the-server
 */
