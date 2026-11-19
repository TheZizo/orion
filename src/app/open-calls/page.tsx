import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getOpenCalls } from '@/lib/orionData';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { OpenCallsDirectory } from '@/components/open-calls/OpenCallsDirectory';

export const metadata: Metadata = {
  title: 'Open calls | Orion',
  description:
    'Explore fully funded Erasmus+ youth exchanges and training courses. Find your next European mobility trajectory.',
};

export default function OpenCallsPage() {
  const calls = getOpenCalls();

  return (
    <>
      <PageHeader
        eyebrow="Open calls"
        title="Find your next trajectory."
        lead="Explore fully funded Erasmus+ mobilities organized by Orion and accredited European partners. Every exchange is an intentional arc toward personal growth, human connection, and cross-border leadership."
      />

      <Section tone="light" spacing="lg">
        <Container>
          <Suspense
            fallback={
              <div className="py-16 text-center text-sm text-[rgba(11,19,43,0.60)]">
                Loading calls...
              </div>
            }
          >
            <OpenCallsDirectory initialCalls={calls} />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
