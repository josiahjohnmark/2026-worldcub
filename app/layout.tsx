import type {Metadata} from 'next';
import { Inter, Anton } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const anton = Anton({
  subsets: ['latin'],
  variable: '--font-anton',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Hopes - A Radiant Experience',
  description: 'Interactive shader-driven hero section inspired by hopes, dreams, and premium WebGL illumination.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${anton.variable}`}>
      <body suppressHydrationWarning className="bg-black text-white antialiased overflow-hidden font-sans">
        {children}
      </body>
    </html>
  );
}

