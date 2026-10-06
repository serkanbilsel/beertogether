import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
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
    <html lang="tr" className={`${bricolage.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--accent)] selection:text-[var(--accent-ink)]">
        {children}
      </body>
    </html>
  );
}
