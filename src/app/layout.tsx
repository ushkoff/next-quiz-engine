import type { Metadata } from 'next';
import { Open_Sans as OpenSans } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const openSans = OpenSans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'OBRIO Quiz',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
