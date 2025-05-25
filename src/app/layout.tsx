import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Road to Next',
  description: 'My road to Next.js application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // [筆記點A]
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Header />
          <main
            className="
            min-h-screen flex-1
            overflow-y-auto overflow-x-hidden
            py-24 px-8
            bg-secondary/20
            flex flex-col
          "
          >
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

/*
 * 開發學習紀錄:
 *
 * == 2025-05-25 ==
 * - [筆記點A] 使用 suppressHydrationWarning 關閉 hydration 錯誤的影響
 *   - 以業務端來說不影響 SEO，因為發生主因是 Server, Client 的狀態不一致
 *   - 工程端來說，這個是安全可接受的做法，因為：
 *     - 後續的 Hydration 依然會正常運作
 *     - 屬於預料中的行為，因為 Client 端是第一個知道 Theme 的狀態且實作在最外層，所以 Server 端來的資料永遠對不上
 *       - Server : ...<html lang="en">...
 *       - Client : ...<html lang="en" className="dark" style={{color-scheme:"dark"}}>...
 *
 */
