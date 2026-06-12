import type { Metadata, Viewport } from 'next';
import './globals.css';
import weddingConfig from '@/config/wedding.json';
import { isBrideSide } from '@/lib/perspective';

const { groom, bride } = weddingConfig.couple;
const primary   = isBrideSide ? bride.name   : groom.name;
const secondary = isBrideSide ? groom.name   : bride.name;

const metaTitle       = `${primary} & ${secondary} | Wedding Reception`;
const metaDescription = `You are cordially invited to the wedding reception of ${primary} and ${secondary} on July 5, 2026`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3C1020',
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  ),
  title: metaTitle,
  description: metaDescription,
  icons: { icon: '/logo.jpeg', apple: '/logo.jpeg' },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    images: [{ url: '/logo.jpeg', width: 1066, height: 1600 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: ['/logo.jpeg'],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
