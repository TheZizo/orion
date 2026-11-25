import React from 'react';
import type { Metadata } from 'next';
import { SparkleStar } from '@/components/motifs/SparkleStar';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: '404 — Signal Lost',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative min-h-[72vh] flex items-center bg-[#0B132B] text-[#F8F9FA] overflow-hidden py-20 md:py-28 border-b border-[rgba(248,249,250,0.14)]"
    >
      {/* Subtle orbital background decoration */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="82%"
            cy="48%"
            rx="420"
            ry="230"
            fill="none"
            stroke="rgba(248,249,250,0.10)"
            strokeWidth="1"
          />
          <ellipse
            cx="82%"
            cy="48%"
            rx="270"
            ry="145"
            fill="none"
            stroke="rgba(248,249,250,0.06)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>
      </div>

      <div className="container-orion relative z-10">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2.5 text-xs font-medium text-[rgba(248,249,250,0.75)] tabular-nums">
            <SparkleStar size={14} color="#E35619" />
            <span>404 / Trajectory off-course (47.53° N, 21.62° E)</span>
          </div>

          <h1 id="not-found-heading" className="type-h1 text-[#F8F9FA]">
            Signal lost in the night sky.
          </h1>

          <p className="type-body-lg text-[rgba(248,249,250,0.80)] max-w-[60ch] leading-relaxed">
            The coordinate or mobility dossier you requested does not exist at this address, or has shifted to a new orbit. Use the constellation navigation links below to return to active pathways.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Button variant="primary" href="/">
              Return to Debrecen HQ
            </Button>
            <Button variant="secondary" tone="dark" href="/open-calls">
              Explore open calls
            </Button>
            <Button variant="secondary" tone="dark" href="/projects">
              Projects archive
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
