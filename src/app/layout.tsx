import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ORION_ORG } from '@/lib/orionData';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  fallback: ['Sora', 'system-ui', 'sans-serif'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.orionyouth.eu'
).replace(/\/$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: './',
  },
  title: {
    template: '%s — Orion',
    default: 'Orion — Spark something bigger.',
  },
  description: ORION_ORG.shortBoilerplate,
  openGraph: {
    title: 'Orion — Spark something bigger.',
    description: ORION_ORG.shortBoilerplate,
    siteName: 'Orion Youth',
    locale: 'en_EU',
    type: 'website',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orion — Spark something bigger.',
    description: ORION_ORG.shortBoilerplate,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: ORION_ORG.legalName,
    alternateName: ORION_ORG.legalNameLatin,
    url: siteUrl,
    email: ORION_ORG.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Debrecen',
      postalCode: '4027',
      addressCountry: 'HU',
    },
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#0B132B] font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#e35619] focus:text-[#0B132B] font-bold shadow-lg"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
