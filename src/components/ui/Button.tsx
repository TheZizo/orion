import React from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonTone = 'light' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseButtonProps {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

export type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonAsLink = BaseButtonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  disabled?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Polymorphic Button Component
 *
 * ACCESSIBILITY CONTRACT:
 * - Primary variant uses Ember Orange (#e35619) background with Midnight Navy (#0B132B) text.
 *   Calculated relative luminance contrast ratio is ~4.9:1, fully satisfying WCAG 2.1 AA
 *   normal text requirements (≥4.5:1), whereas white text fails at ~3.7:1.
 * - Adheres to WCAG rule: Never orange text on navy.
 * - Tab-nabbing protection: Any link with target="_blank" (explicit or external)
 *   automatically defaults rel="noopener noreferrer".
 */
export function Button({
  variant = 'primary',
  tone = 'dark',
  size = 'md',
  className = '',
  children,
  href,
  ...rest
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs md:text-sm font-medium tracking-tight',
    md: 'px-5 py-2.5 text-sm md:text-base font-semibold tracking-tight',
    lg: 'px-7 py-3.5 text-base md:text-lg font-semibold tracking-tight',
  }[size];

  // Base transition and interactive focus
  const baseClasses =
    'inline-flex items-center justify-center rounded-none transition-colors duration-150 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  let variantClasses = '';

  if (variant === 'primary') {
    // Ember background with Midnight Navy text (4.9:1 AA-safe contrast)
    variantClasses =
      'bg-[#e35619] text-[#0B132B] font-bold hover:bg-[#eb6124] active:bg-[#c9460e] focus-visible:ring-[#0B132B] focus-visible:ring-offset-[#e35619]';
  } else if (variant === 'secondary') {
    if (tone === 'dark') {
      // Dark surface context: 1px border with offwhite text
      variantClasses =
        'border border-[rgba(248,249,250,0.22)] text-[#F8F9FA] hover:bg-[rgba(248,249,250,0.08)] hover:border-[rgba(248,249,250,0.4)] focus-visible:ring-[#F8F9FA] focus-visible:ring-offset-[#0B132B]';
    } else {
      // Light surface context: 1px border with navy text
      variantClasses =
        'border border-[rgba(11,19,43,0.18)] text-[#0B132B] hover:bg-[rgba(11,19,43,0.05)] hover:border-[rgba(11,19,43,0.4)] focus-visible:ring-[#0B132B] focus-visible:ring-offset-[#F8F9FA]';
    }
  } else if (variant === 'ghost') {
    if (tone === 'dark') {
      variantClasses =
        'text-[#F8F9FA] hover:bg-[rgba(248,249,250,0.08)] focus-visible:ring-[#F8F9FA]';
    } else {
      variantClasses =
        'text-[#0B132B] hover:bg-[rgba(11,19,43,0.05)] focus-visible:ring-[#0B132B]';
    }
  }

  const combined = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`.trim();

  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    const target = (rest as ButtonAsLink).target ?? (isExternal ? '_blank' : undefined);
    const rel =
      (rest as ButtonAsLink).rel ??
      (target === '_blank' ? 'noopener noreferrer' : undefined);

    return (
      <Link
        href={href}
        className={combined}
        target={target}
        rel={rel}
        onClick={(rest as ButtonAsLink).onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combined}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
