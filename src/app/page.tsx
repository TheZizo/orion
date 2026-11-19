import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { MotionTrailDivider } from '@/components/motifs/MotionTrailDivider';
import { ReForestStory } from '@/components/home/ReForestStory';
import { ErasmusHorizonSlider } from '@/components/home/ErasmusHorizonSlider';
import { NextDeparture } from '@/components/home/NextDeparture';
import { HowToApply } from '@/components/home/HowToApply';
import { Beliefs } from '@/components/home/Beliefs';
import { PartnerBand } from '@/components/home/PartnerBand';

export const metadata: Metadata = {
  description:
    'Orion Fiatalok Informális Csoportja is an international Erasmus+ youth initiative based in Debrecen, Hungary. Explore interactive European youth exchanges, training courses, and mobility wayfinding.',
};

/**
 * Orion Home Page ("The 3D Celestial System")
 *
 * Quiet, disciplined, editorial home experience:
 * 1. HeroSection (Midnight Navy night-sky canvas, Display headline, 3D perspective orrery)
 * 2. MotionTrailDivider (planetary horizon curve transitioning navy -> #F8F9FA)
 * 3. ReForestStory (Daylight Editorial Spread: Position #1 post-hero, verified field proof)
 * 4. ErasmusHorizonSlider (KA152 Youth Exchange 7–12 days vs KA131 University Semester 5–10 months)
 * 5. NextDeparture (Day canvas, live departure and non-formal learning rhythm)
 * 6. HowToApply (Static 3-step trajectory)
 * 7. Beliefs (What We Believe on #F8F9FA)
 * 8. PartnerBand (Framed island dock, institutional partnership dispatch & verified grant reference)
 */
export default function HomePage() {
  return (
    <main className="w-full min-h-screen">
      {/* 1. Hero Section: 3D Celestial Orrery */}
      <HeroSection />

      {/* 2. Motion Trail Transition: Planetary Horizon Curve */}
      <MotionTrailDivider from="navy" to="offwhite" height={56} />

      {/* 3. ReForest Story: Position #1 Post-Hero Daylight Editorial Spread */}
      <ReForestStory />

      {/* 4. Erasmus Horizon Slider: Comparative Ledger */}
      <ErasmusHorizonSlider />

      {/* 5. Next Departure: The Financial Blueprint & Exchange Rhythm */}
      <NextDeparture />

      {/* 6. How To Apply: 3 Steps, 10 Minutes */}
      <HowToApply />

      {/* 7. Beliefs: What We Believe */}
      <Beliefs />

      {/* 8. Partner Band: Night Credentials & Direct Dispatch */}
      <PartnerBand />
    </main>
  );
}
