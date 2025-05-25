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
 */
