import '../index.css';
import { Providers } from '../components/Providers';
import LayoutClientWrapper from '../components/LayoutClientWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mohammed Ateeq | Full Stack & AI Engineer',
  description: 'Mohammed Ateeq — Full Stack & AI Engineer building scalable web applications, computer vision systems, and AI-driven solutions. Based in Hyderabad, India.',
  metadataBase: new URL('https://www.mohdateeqnova.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mohammed Ateeq | Full Stack & AI Engineer',
    description: 'Mohammed Ateeq — Full Stack & AI Engineer building scalable web applications, computer vision systems, and AI-driven solutions.',
    url: 'https://www.mohdateeqnova.in',
    siteName: 'Mohammed Ateeq Portfolio',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        
        {/* Preconnect to Google Fonts domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload first hero frame WebP for immediate paint */}
        <link rel="preload" as="image" href="/Hero_Frames/ezgif-frame-001.webp" type="image/webp" />
        
        {/* High performance font loading with display=swap */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Audiowide&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=Bebas+Neue&family=DM+Sans:wght@400;500&family=Syne:wght@700;800&display=swap"
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Providers>
          <LayoutClientWrapper>
            {children}
          </LayoutClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
