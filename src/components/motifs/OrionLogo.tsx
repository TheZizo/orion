import React from 'react';

export type OrionLogoVariant = 'full-light' | 'full-dark' | 'star-only';

export interface OrionLogoProps {
  variant?: OrionLogoVariant;
  className?: string;
  height?: number;
  title?: string;
}

/**
 * Orion Brand Logo
 *
 * Geometric bold wordmark "ORION" and diagonal ember shooting star with
 * 3 tapered motion trails sweeping to a 4-point sparkle star above the final 'N'.
 *
 * Strictly pure inline SVG without external font dependencies for pixel-identical rendering.
 * - 'full-dark': off-white (#F8F9FA) wordmark for dark navy backgrounds
 * - 'full-light': navy (#0B132B) wordmark for light off-white backgrounds
 * - 'star-only': favicon / symbol mark (sparkle star + trails only)
 */
export function OrionLogo({
  variant = 'full-dark',
  className = '',
  height = 28,
  title = 'Orion',
}: OrionLogoProps) {
  // Enforce minimum height of 24px as mandated by the brand guidelines
  const actualHeight = Math.max(24, height);

  const wordmarkColor = variant === 'full-dark' ? '#F8F9FA' : '#0B132B';
  const emberColor = '#e35619';

  if (variant === 'star-only') {
    return (
      <svg
        width={actualHeight}
        height={actualHeight}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block shrink-0 select-none ${className}`.trim()}
        role="img"
        aria-label={title}
      >
        <title>{title}</title>
        {/* Trail 3 (shortest, subtle) */}
        <path
          d="M 13 33.5 C 17.5 30 20.5 25.5 22 20 L 21 21 C 19.5 26.5 16.5 31 13 33.5 Z"
          fill={emberColor}
          fillOpacity="0.35"
        />
        {/* Trail 2 (mid length, mid opacity) */}
        <path
          d="M 8 32 C 14 27 18.5 21.5 22 16 L 21 17.5 C 17.5 23 13 28.5 8 32 Z"
          fill={emberColor}
          fillOpacity="0.6"
        />
        {/* Trail 1 (longest, highest opacity) */}
        <path
          d="M 3 31 C 10 25 16 19 21.5 13 L 20.5 14.5 C 15 20.5 9 27 3 31 Z"
          fill={emberColor}
          fillOpacity="0.9"
        />
        {/* 4-Point Sparkle Star */}
        <path
          d="M 24 4 Q 24 11 31 11 Q 24 11 24 18 Q 24 11 17 11 Q 24 11 24 4 Z"
          fill={emberColor}
        />
      </svg>
    );
  }

  // Full wordmark aspect ratio: 144 x 44
  const calculatedWidth = Math.round(actualHeight * (144 / 44));

  return (
    <svg
      width={calculatedWidth}
      height={actualHeight}
      viewBox="0 0 144 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 select-none ${className}`.trim()}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>

      {/* Tapered Motion Trails sweeping up from lower-left to above the final 'N' */}
      {/* Trail 3 (shortest) */}
      <path
        d="M 98 36 C 106 32 114 26 120 19 L 119 20.5 C 113 27 105 33 98 36 Z"
        fill={emberColor}
        fillOpacity="0.35"
      />
      {/* Trail 2 (medium) */}
      <path
        d="M 84 34 C 97 29 110 22 121 16 L 120 17.5 C 109 23.5 96 30 84 34 Z"
        fill={emberColor}
        fillOpacity="0.6"
      />
      {/* Trail 1 (longest) */}
      <path
        d="M 70 32 C 86 26 104 19 122 13 L 121 14.5 C 103 20.5 86 27.5 70 32 Z"
        fill={emberColor}
        fillOpacity="0.9"
      />

      {/* 4-Point Sparkle Star above right side of wordmark (above N) */}
      <path
        d="M 126 5 Q 126 12 133 12 Q 126 12 126 19 Q 126 12 119 12 Q 126 12 126 5 Z"
        fill={emberColor}
      />

      {/* Wordmark O R I O N (Geometric Bold Paths with letter-spacing ~0.08em) */}
      <g fill={wordmarkColor}>
        {/* Letter 1: 'O' */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 20 20 C 25.5 20 30 24.5 30 30 C 30 35.5 25.5 40 20 40 C 14.5 40 10 35.5 10 30 C 10 24.5 14.5 20 20 20 Z M 20 24.5 C 17 24.5 14.5 27 14.5 30 C 14.5 33 17 35.5 20 35.5 C 23 35.5 25.5 33 25.5 30 C 25.5 27 23 24.5 20 24.5 Z"
        />

        {/* Letter 2: 'R' */}
        <path
          d="M 36 20 H 45.5 C 48.5 20 50.5 22 50.5 25.5 C 50.5 29 48.5 31 45.5 31 H 40.5 V 40 H 36 V 20 Z M 40.5 24 V 27.5 H 45 C 46.5 27.5 47.5 26.8 47.5 25.5 C 47.5 24.2 46.5 24 45 24 H 40.5 Z"
        />
        <path
          d="M 42 30 L 49.5 40 H 44.5 L 38.5 31 H 42.5 Z"
        />

        {/* Letter 3: 'I' */}
        <rect x="57" y="20" width="4.5" height="20" />

        {/* Letter 4: 'O' */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 78 20 C 83.5 20 88 24.5 88 30 C 88 35.5 83.5 40 78 40 C 72.5 40 68 35.5 68 30 C 68 24.5 72.5 20 78 20 Z M 78 24.5 C 75 24.5 72.5 27 72.5 30 C 72.5 33 75 35.5 78 35.5 C 81 35.5 83.5 33 83.5 30 C 83.5 27 81 24.5 78 24.5 Z"
        />

        {/* Letter 5: 'N' */}
        <path
          d="M 94 20 H 99 L 108 33 V 20 H 112.5 V 40 H 107.5 L 98.5 27 V 40 H 94 Z"
        />
      </g>
    </svg>
  );
}

export default OrionLogo;
