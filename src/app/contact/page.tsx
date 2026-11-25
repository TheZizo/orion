import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { TwoModeContactForm } from '@/components/contact/TwoModeContactForm';

export const metadata: Metadata = {
  title: 'Contact & FAQ',
  description:
    'Direct lines to Orion Fiatalok Informális Csoportja in Debrecen, Hungary. Ask questions about applying or establish formal Erasmus+ consortium partnerships.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact & FAQ — Orion',
    description:
      'Direct lines to Orion Fiatalok Informális Csoportja in Debrecen, Hungary. Ask questions about applying or establish formal Erasmus+ consortium partnerships.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & FAQ — Orion',
    description:
      'Direct lines to Orion Fiatalok Informális Csoportja in Debrecen, Hungary. Ask questions about applying or establish formal Erasmus+ consortium partnerships.',
  },
};

export default function ContactPage() {
  return (
    <div>
      {/* Editorial Shared PageHeader */}
      <PageHeader
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact' },
        ]}
        eyebrow="Communications & dispatch"
        title="Open lines to Debrecen"
        lead="Whether you are taking your very first step onto an international train or drafting an Erasmus+ consortium agreement, our team in Debrecen is here to guide the way."
        aside={
          <div className="border border-[rgba(248,249,250,0.18)] p-5 text-xs text-[rgba(248,249,250,0.85)] space-y-2 tabular-nums">
            <div className="font-semibold text-[#F8F9FA]">Direct Dispatch</div>
            <div className="text-[rgba(248,249,250,0.85)]">zeid@orionyouth.eu</div>
            <div className="text-[rgba(248,249,250,0.7)]">Participants: ~24–48 hours</div>
            <div className="text-[rgba(248,249,250,0.7)]">Partners: ~2–3 business days</div>
          </div>
        }
      />

      {/* Daylight Content Canvas */}
      <div className="bg-[#F8F9FA] text-[#0B132B] py-16 md:py-24">
        <div className="container-orion">
          <Suspense
            fallback={
              <div className="py-12 text-sm text-[rgba(11,19,43,0.70)]">
                Loading contact form...
              </div>
            }
          >
            <TwoModeContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
