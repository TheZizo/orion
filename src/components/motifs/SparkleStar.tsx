import React from 'react';

export interface SparkleStarProps {
  size?: number;
  color?: string;
  className?: string;
  pulse?: boolean;
  title?: string;
}

/**
 * 4-Point Celestial Sparkle Star Motif
 * Signature brand element representing individual changemakers and mobility destination nodes.
 */
export function SparkleStar({
  size = 24,
  color = 'currentColor',
  className = '',
  pulse = false,
  title,
}: SparkleStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${pulse ? 'animate-star-pulse' : ''} ${className}`.trim()}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : 'presentation'}
    >
      {title && <title>{title}</title>}
      <path
        d="M 12 2 Q 12 12 22 12 Q 12 12 12 22 Q 12 12 2 12 Q 12 12 12 2 Z"
        fill={color}
      />
    </svg>
  );
}
