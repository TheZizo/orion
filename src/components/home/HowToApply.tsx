import React from 'react';
import Link from 'next/link';
import { TrajectoryArc } from '@/components/motifs/TrajectoryArc';

interface StepInfo {
  num: string;
  title: string;
  time: string;
  description: string;
}

const STEPS: StepInfo[] = [
  {
    num: '1',
    title: 'About you',
    time: '~2 mins',
    description: 'Contact details, residency, and language comfort.',
  },
  {
    num: '2',
    title: 'Your motivation',
    time: '~5 mins',
    description: 'Three honest sentences on why you want to join.',
  },
  {
    num: '3',
    title: 'Travel and confirmation',
    time: '~3 mins',
    description: 'Selection confirmation, travel plan, and group prep.',
  },
];

/**
 * HowToApply Component — Daylight Off-White (#F8F9FA)
 *
 * Static 3-step application trajectory joined by a clean TrajectoryArc flight path.
 * Zero tab clicking: all 3 steps are presented in borderless editorial columns.
 */
export function HowToApply() {
  const ARC_CURVATURE = -0.045;
  const startPt = { x: 133, y: 26 };
  const endPt = { x: 667, y: 26 };
  const midY = startPt.y + 0.5 * (endPt.x - startPt.x) * ARC_CURVATURE;

  const arcPoints = [startPt, { x: 400, y: midY }, endPt];

  return (
    <section className="w-full bg-[#F8F9FA] text-[#0B132B] py-20 md:py-24 border-b border-[rgba(11,19,43,0.10)]">
      <div className="container-orion space-y-12">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="type-h2 text-[#0B132B]">
              Here&apos;s how to apply, 3 steps, 10 minutes.
            </h2>
          </div>

          <Link
            href="/open-calls"
            className="text-sm font-semibold text-[#0B132B] hover:underline whitespace-nowrap self-start sm:self-end"
          >
            See all open calls
          </Link>
        </div>

        {/* 3 Static Step Columns Joined by TrajectoryArc */}
        <div className="space-y-6">
          {/* Desktop Arc Running Across Column Tops */}
          <div className="hidden lg:block relative h-10">
            <svg
              viewBox="0 0 800 40"
              className="w-full h-full block"
              fill="none"
              aria-hidden="true"
            >
              <TrajectoryArc
                from={startPt}
                to={endPt}
                curvature={ARC_CURVATURE}
                stroke="rgba(11,19,43,0.18)"
                strokeWidth={2}
              />
              <TrajectoryArc
                from={startPt}
                to={endPt}
                curvature={ARC_CURVATURE}
                progress={1}
                stroke="#E35619"
                strokeWidth={2}
              />
              {arcPoints.map((pt, idx) => (
                <circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r={idx === 1 ? 6 : 4.5}
                  fill="#E35619"
                  stroke="#0B132B"
                  strokeWidth={1.5}
                />
              ))}
            </svg>
          </div>

          {/* 3 Borderless Editorial Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pt-2">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="border-t border-[rgba(11,19,43,0.14)] pt-6 space-y-3 text-left min-w-0"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#0B132B]/20 tabular-nums leading-none">
                    0{step.num}
                  </span>
                  <span className="text-xs font-semibold text-[rgba(11,19,43,0.65)] tabular-nums whitespace-nowrap">
                    {step.time}
                  </span>
                </div>

                <h3 className="type-h3 text-lg md:text-xl text-[#0B132B] leading-snug">
                  {step.title}
                </h3>

                <p className="type-body text-sm text-[rgba(11,19,43,0.76)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowToApply;
