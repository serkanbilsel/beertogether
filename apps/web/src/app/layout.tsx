import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const display = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Beer Together — Less “we should hang out.” More cheers.',
  description: 'Beer Together turns good intentions into real plans. Invite a friend, pick a spot, show up, and keep the memory.',
  metadataBase: new URL('https://beertogether.app'),
  authors: [{ name: 'Beer Together' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Beer Together — Less “we should hang out.” More cheers.',
    description: 'Beer Together turns good intentions into real plans. Invite a friend, pick a spot, show up, and keep the memory.',
    url: 'https://beertogether.app',
    siteName: 'Beer Together',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beer Together — Plans, not promises',
    description: 'Turn good intentions into real plans with your friends.',
  },
  other: {
    'apple-itunes-app': 'app-id=beertogether.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Beer Together',
        url: 'https://beertogether.app',
        logo: 'https://beertogether.app/icon.png',
      },
      {
        '@type': 'MobileApplication',
        name: 'Beer Together',
        applicationCategory: 'SocialNetworkingApplication',
        operatingSystem: 'iOS, Android',
        contentRating: '18+',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--accent)] selection:text-[var(--accent-ink)]">
        {children}
      </body>
    </html>
  );
}
