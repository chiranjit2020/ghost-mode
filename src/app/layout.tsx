import type { Metadata, Viewport } from 'next';
import { Google_Sans, Manrope, Playfair_Display } from 'next/font/google';
import type { ReactNode } from 'react';
import { WORLD } from '@/world/world.config';
import './globals.css';

const googleSans = Google_Sans({ subsets: ['latin'], variable: '--font-google-sans', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap', weight: ['600', '700', '800'] });
// Keywords inside headings only (<Accent>), so just the italic face is loaded.
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: 'italic',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL ?? 'http://localhost:3000'),
  title: { default: `${WORLD.brand} · Enter the Dark World`, template: `%s · ${WORLD.brand}` },
  description: `${WORLD.tagline} No real name, no photo. Create your Ghost, earn Devil Points, survive the Pure Souls.`,
  applicationName: WORLD.brand,
  openGraph: { siteName: WORLD.brand, type: 'website', locale: 'en_IN' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#09080c',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${googleSans.variable} ${manrope.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
