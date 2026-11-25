import React from 'react';
import Link from 'next/link';
import { TrajectoryArc } from '@/components/motifs/TrajectoryArc';

interface StepInfo {
  num: string;
  title: string;
  time: string;
  description: string;
}

const SAMPLE_MOTIVATION =
  'I am starting my first job next autumn and want to replace my anxiety around budgeting with a concrete savings system. In Hungary, I hope to share how young people in my city navigate rent and inflation while learning practical cashflow tools from peers. Afterward, I will host a local peer-budgeting workshop at my university youth club.';

const STEPS: StepInfo[] = [
  {
    num: '1',
    title: 'About you',
    time: '~2 mins',
    description:
      'Share your basic contact details, language comfort, and home country residency in two minutes.',
  },
  {
    num: '2',
    title: 'Your motivation',
    time: '~5 mins',
    description:
      'Tell us in three honest sentences what this theme means to your growth and what you hope to contribute.',
  },
  {
    num: '3',
    title: 'Travel and confirmation',
    time: '~3 mins',
    description:
      'Receive selection confirmation, practical travel guidance, and prep sessions with your national leader.',
  },
];

/**
 * HowToApply Component — Daylight Off-White (#F8F9FA)
 *
 * Static 3-step application trajectory joined by a clean TrajectoryArc flight path.
 * Zero tab clicking: all 3 steps are balanced in equal-height cards on #FFFFFF,
 * with the sample 3-sentence motivation rendered cleanly underneath as a full-width strip.
 */
export function HowToApply() {
  const ARC_CURVATURE = -0.045;
  const startPt = { x: 133, y: 26 };
  const endPt = { x: 667, y: 26 };
  const midY = startPt.y + 0.5 * (endPt.x - startPt.x) * ARC_CURVATURE;

  const arcPoints = [startPt, { x: 400, y: midY }, endPt];

  return (
    <section className="w-full bg-[#F8F9FA] text-[#0B132B] py-20 md:py-28 border-b border-[rgba(11,19,43,0.10)]">
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

          {/* 3 Static Step Cards on #FFFFFF */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="bg-white border border-[rgba(11,19,43,0.12)] p-6 space-y-4 text-left h-full flex flex-col justify-start"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 shrink-0 rounded-full bg-[#0B132B] text-[#F8F9FA] border border-[#0B132B] flex items-center justify-center font-display font-semibold text-xs tabular-nums">
                      {step.num}
                    </div>
                    <h3 className="type-h3 text-base lg:text-lg text-[#0B132B] leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  <span className="text-xs text-[rgba(11,19,43,0.68)] tabular-nums shrink-0 whitespace-nowrap">
                    {step.time}
                  </span>
                </div>

                <p className="type-body text-sm text-[rgba(11,19,43,0.76)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Full-width Sample 3-sentence motivation strip */}
          <div className="bg-white border border-[rgba(11,19,43,0.12)] p-6 space-y-2">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#E35619]"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold text-[#0B132B]">
                Sample 3-sentence motivation
              </span>
            </div>
            <blockquote className="text-sm text-[rgba(11,19,43,0.82)] italic leading-relaxed">
              &ldquo;{SAMPLE_MOTIVATION}&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowToApply;
