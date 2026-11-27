import React from 'react';
import { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { MotionTrailDivider } from '@/components/motifs/MotionTrailDivider';
import { InstitutionalDossier } from '@/components/partners/InstitutionalDossier';

export const metadata: Metadata = {
  title: 'Partner With Us — Consortium & Mobility Inquiries',
  description:
    'Partner with Orion Fiatalok Informális Csoportja in Debrecen, Hungary for Erasmus+ KA1 Youth Exchanges, youth worker mobilities, and KA2 cooperation partnerships.',
  alternates: {
    canonical: '/partners',
  },
  openGraph: {
    title: 'Partner With Us — Consortium & Mobility Inquiries — Orion',
    description:
      'Partner with Orion Fiatalok Informális Csoportja in Debrecen, Hungary for Erasmus+ KA1 Youth Exchanges, youth worker mobilities, and KA2 cooperation partnerships.',
    url: '/partners',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner With Us — Consortium & Mobility Inquiries — Orion',
    description:
      'Partner with Orion Fiatalok Informális Csoportja in Debrecen, Hungary for Erasmus+ KA1 Youth Exchanges, youth worker mobilities, and KA2 cooperation partnerships.',
  },
};

export default function PartnersPage() {
  return (
    <div>
      <PageHeader
        className="!border-b-0"
        eyebrow="Consortium & mobility inquiries"
        title="Partner with Orion Fiatalok Informális Csoportja"
        lead="Direct Erasmus+ KA1 and KA2 consortium coordination for European youth NGOs, grassroots collectives, and educational initiatives."
      />
      <MotionTrailDivider from="navy" to="offwhite" height={56} />

      <div className="bg-[#F8F9FA] text-[#0B132B] py-16 md:py-24">
        <div className="container-orion">
          <InstitutionalDossier />
        </div>
      </div>
    </div>
  );
}
