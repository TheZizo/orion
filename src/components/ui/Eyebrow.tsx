import React from 'react';
import { SparkleStar } from '@/components/motifs/SparkleStar';

export interface EyebrowProps {
  children: React.ReactNode;
  tone?: 'light' | 'dark';
  sparkle?: boolean;
  className?: string;
}

/**
 * Locked Eyebrow Component
 * Space Grotesk, 12px, 600 SemiBold, line-height 1.3, sentence case.
 */
export function Eyebrow({
  children,
  tone = 'dark',
  sparkle = false,
  className = '',
}: EyebrowProps) {
  const textColor =
    tone === 'dark' ? 'text-[rgba(248,249,250,0.85)]' : 'text-[#0B132B]';

  return (
    <div
      className={`inline-flex items-center gap-2 font-display text-[12px] font-semibold leading-[1.3] tracking-[0.01em] ${textColor} ${className}`.trim()}
    >
      {sparkle && (
        <SparkleStar
          size={12}
          color={tone === 'dark' ? '#e35619' : '#e35619'}
        />
      )}
      <span>{children}</span>
    </div>
  );
}
