'use client';

import { LucideMoon, LucideSun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <LucideSun
        className="
      h-4 w-4 rotate-0 scale-100 transition-all duration-500
      dark:-rotate-90 dark:scale-0
    "
      />
      <LucideMoon
        className="
      absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-500
      dark:rotate-0 dark:scale-100
    "
      />
      {/* [筆記點A] */}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export { ThemeSwitcher };

/*
 * 開發學習紀錄:
 *
 * == 2025-05-25 ==
 * - [筆記點A] 使用 sr-only 告知螢幕閱讀器這個元素是什麼
 *   - 元素會被隱藏，但會被螢幕閱讀器讀取，在 A11y 設計時需要考量到這部分
 *
 */
