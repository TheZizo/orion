import React from 'react';
import { SparkleStar } from '@/components/motifs/SparkleStar';

export interface MotionTrailDividerProps {
  from?: 'navy' | 'offwhite';
  to?: 'navy' | 'offwhite';
  height?: number;
  className?: string;
}

/**
 * MotionTrailDivider Component — Option 2: "The Orbital System"
 *
 * Graceful sweeping planetary horizon curve transitioning from Midnight Navy (#0B132B)
 * night sky to Daylight Off-White (#F8F9FA).
 *
 * Features:
 * - 56px default height
 * - Smooth planetary cosmic arc meeting the daylight section
 * - Luminous tapered Ember Orange (#e35619) atmospheric rim-light streak
 * - Culminates in a crisp 4-point #e35619 sparkle star on the right horizon
 * - Zero ruler ticks or visual noise.
 */
export function MotionTrailDivider({
  height = 56,
  className = '',
}: MotionTrailDividerProps) {
  const emberColor = '#e35619';

  return (
    <div
      aria-hidden="true"
      style={{ height: `${height}px` }}
      className={`w-full relative overflow-hidden select-none bg-[#0B132B] ${className}`.trim()}
    >
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="w-full h-full block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="rimStreakGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={emberColor} stopOpacity="0" />
            <stop offset="30%" stopColor={emberColor} stopOpacity="0.4" />
            <stop offset="70%" stopColor={emberColor} stopOpacity="0.85" />
            <stop offset="100%" stopColor={emberColor} stopOpacity="1" />
          </linearGradient>

          <filter id="rimGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Midnight Navy Night Sky */}
        <rect width="1440" height="56" fill="#0B132B" />

        {/* Delicate subtle upper graticule curve */}
        <path
          d="M 0 32 Q 720 0 1440 32"
          fill="none"
          stroke="rgba(248,249,250,0.06)"
          strokeWidth="1"
        />

        {/* Luminous Tapered Ember Atmospheric Rim-Light Streak with soft glow */}
        <path
          d="M 180 31 Q 720 6 1260 31"
          fill="none"
          stroke={emberColor}
          strokeWidth="4"
          opacity="0.3"
          filter="url(#rimGlow)"
        />
        <path
          d="M 180 31 Q 720 6 1260 31"
          fill="none"
          stroke="url(#rimStreakGrad)"
          strokeWidth="1.75"
        />

        {/* Culminating 4-Point Ember Sparkle Star on Horizon */}
        <g transform="translate(1254, 25)">
          <SparkleStar size={12} color={emberColor} />
        </g>

        {/* Graceful Daylight Planetary Arc Cut (Pure #F8F9FA) */}
        <path
          d="M 0 56 L 0 38 Q 720 6 1440 38 L 1440 56 Z"
          fill="#F8F9FA"
        />

        {/* Crisp 1px Architectural Dividing Line on Horizon Arc */}
        <path
          d="M 0 38 Q 720 6 1440 38"
          fill="none"
          stroke="rgba(11,19,43,0.12)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export default MotionTrailDivider;
