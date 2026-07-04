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
