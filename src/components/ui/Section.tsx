import React from 'react';

export type SectionTone = 'dark' | 'light' | 'nebula';
export type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl' | 'none';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'header' | 'footer' | 'aside';
  tone?: SectionTone;
  spacing?: SectionSpacing;
  borderBottom?: boolean;
  borderTop?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Structural Section Wrapper
 * Enforces brand surface tones, 8px spatial spacing, and astronomical dividing borders.
 */
export function Section({
  as: Component = 'section',
  tone = 'light',
  spacing = 'lg',
  borderBottom = false,
  borderTop = false,
  children,
  className = '',
  ...rest
}: SectionProps) {
  const toneClasses = {
    dark: 'bg-[#0B132B] text-[#F8F9FA]',
    light: 'bg-[#F8F9FA] text-[#0B132B]',
    nebula: 'bg-[#111D3B] text-[#F8F9FA]',
  }[tone];

  const spacingClasses = {
    none: 'py-0',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-20 md:py-32',
  }[spacing];

  const borderTopClass = borderTop
    ? tone === 'light'
      ? 'border-t border-[rgba(11,19,43,0.10)]'
      : 'border-t border-[rgba(248,249,250,0.14)]'
    : '';

  const borderBottomClass = borderBottom
    ? tone === 'light'
      ? 'border-b border-[rgba(11,19,43,0.10)]'
      : 'border-b border-[rgba(248,249,250,0.14)]'
    : '';

  return (
    <Component
      className={`${toneClasses} ${spacingClasses} ${borderTopClass} ${borderBottomClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
}
