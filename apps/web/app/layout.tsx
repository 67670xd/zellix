import { ReactNode } from 'react';
import '@/styles/globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Zellix - Gaming Community Hub',
  description: 'Ultimate gaming community platform for Discord',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
