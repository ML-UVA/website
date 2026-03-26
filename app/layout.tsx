import type { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/css/parent.css';
import '@/css/styles.css';
import '@/index.css';
import '@/tail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const metadata: Metadata = {
  title: 'ML@UVA - AI and Machine Learning Organization',
  description:
    'The comprehensive Artificial Intelligence and Machine Learning organization at the University of Virginia (UVA) - build computer science projects, learn from weekly workshops, and engage with clients',
  keywords:
    'Artificial Intelligence, Machine Learning, UVA, ML@UVA, AI organization, UVA AI, student AI projects, computer science, workshops, AI clients',
  icons: {
    icon: '/icon.png',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'ML@UVA - Artificial Intelligence and Machine Learning Organization',
    description: 'Join ML@UVA to build AI projects, learn from workshops, and engage with clients.',
    url: 'https://www.sigaiatuva.org',
    type: 'website',
    images: [
      {
        url: '/img/SIGAI_Logo.png',
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <div id="root">{children}</div>
        <Footer />
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
