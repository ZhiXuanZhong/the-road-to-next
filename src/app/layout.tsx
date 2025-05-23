import './globals.css';
import { LucideKanban } from 'lucide-react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { homePath, ticketsPath } from '@/paths';

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav
          className="
            supports-backdrop-blur:bg-background/60
            fixed left-0 right-0 top-0 z-20
            border-b bg-background/95 backdrop-blur
            w-full flex py-2.5 px-5 justify-between
          "
        >
          <div>
            {/* [筆記點A] */}
            <Link href={homePath()} className={buttonVariants({ variant: 'ghost' })}>
              <LucideKanban />
              <h1 className=" text-lg font-semibold">TicketBounty</h1>
            </Link>
          </div>
          <div>
            <Link href={ticketsPath()} className={buttonVariants({ variant: 'default' })}>
              Tickets
            </Link>
          </div>
        </nav>
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
      </body>
    </html>
  );
}

/*
 * 開發學習紀錄:
 *
 * == 2025-05-20 ==
 * - [筆記點A] 讓 Link 擁有 Button 的樣式，這是邊緣案例不太常用。以下兩種做法可以達成
 *   1. 使用 asChild 是為了讓 DOM 結構符合語意，以 Button 的樣式傳至 Link 上，所以最終將只有 <a></a> 被渲染在頁面上，不會看到 Button 的元素
 *   - 範例：
 *     ```tsx
 *     <Button asChild variant="outline">
 *       <Link href={homePath()}>Home</Link>
 *     </Button>
 *     ```
 *
 *   2. 在 className 上使用 buttonVariants 然後傳入需要的 variant object
 *   - 範例：
 *     ```tsx
 *     <Link href={homePath()} className={buttonVariants({ variant: 'outline' })}>
 *       Home
 *     </Link>
 *     ```
 *
 * ===
 */
