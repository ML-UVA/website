import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: {
    default: 'ML@UVA - Machine Learning at the University of Virginia',
    template: '%s | ML@UVA',
  },
  description:
    'The comprehensive machine learning and artificial intelligence organization at the University of Virginia.',
  keywords: 'Machine Learning, AI, UVA, ML@UVA, student organization, research, workshops',
  robots: 'index, follow',
  icons: { icon: '/icon.svg' },
  openGraph: {
    title: 'ML@UVA - Machine Learning at the University of Virginia',
    description: 'Join ML@UVA to build AI projects, learn from workshops, and engage in cutting-edge research.',
    url: 'https://www.sigaiatuva.org',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
