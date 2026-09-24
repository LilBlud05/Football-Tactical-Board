// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// @ts-ignore: allow importing global CSS without type declarations
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Tactical Board | 2D Pitch Workbench',
  description: 'Interactive 2D Football Tactical Board and Formation Builder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col">
        {children}
      </body>
    </html>
  );
}