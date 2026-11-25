'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { OrionLogo } from '@/components/motifs/OrionLogo';

export interface NavLinkItem {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { href: '/open-calls', label: 'Open Calls' },
  { href: '/projects', label: 'Projects' },
  { href: '/partners', label: 'Partner With Us' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Celestial Navigation Bar
 *
 * Sticky top navigation set on Midnight Navy (#0B132B) with 1px orbit-dark border.
 * Strict adherence to brand tokens:
 * - OrionLogo variant="full-dark" linking home
 * - Inter 14px / 500 off-white links with 1px underline on active route and aria-current="page"
 * - Orange budget compliance: CTA is an Off-White filled button with Midnight Navy text
 * - Accessible mobile disclosure menu with aria-expanded, aria-controls, Escape dismissal,
 *   and automatic close on route changes.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Close mobile drawer whenever route changes (React recommended pattern)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Handle Escape key to dismiss mobile drawer and return focus to toggle button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        requestAnimationFrame(() => toggleBtnRef.current?.focus());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock background scroll while mobile drawer is open & close if resized to desktop
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const isLinkActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';
      return pathname.startsWith(href);
    },
    [pathname]
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B132B] border-b border-[rgba(248,249,250,0.14)]">
      <div className="container-orion flex items-center justify-between h-16 md:h-20">
        {/* Brand Wordmark & Mark */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA]"
          aria-label="Orion Homepage"
        >
          <OrionLogo variant="full-dark" height={28} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`type-caption transition-colors duration-150 py-1 ${
                  active
                    ? 'text-[#F8F9FA] font-semibold border-b border-[#F8F9FA]'
                    : 'text-[rgba(248,249,250,0.8)] hover:text-[#F8F9FA]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button (Orange Budget: Off-White fill with Navy text on Hero viewport) */}
        <div className="hidden md:flex items-center">
          <Link
            href="/open-calls"
            className="inline-flex items-center justify-center bg-[#F8F9FA] text-[#0B132B] font-semibold text-sm px-4 py-2 rounded-none hover:bg-white active:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA]"
          >
            Explore open calls
          </Link>
        </div>

        {/* Mobile Disclosure Button */}
        <div className="flex md:hidden items-center">
          <button
            ref={toggleBtnRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-2 text-[#F8F9FA] hover:bg-[rgba(248,249,250,0.08)] rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Disclosure Menu Drawer */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden w-full bg-[#0B132B] border-t border-[rgba(248,249,250,0.14)] px-4 py-6 space-y-4 shadow-xl"
        >
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`type-caption py-2 px-3 border-l-2 transition-colors ${
                    active
                      ? 'border-[#F8F9FA] text-[#F8F9FA] font-semibold bg-[rgba(248,249,250,0.06)]'
                      : 'border-transparent text-[rgba(248,249,250,0.8)] hover:text-[#F8F9FA]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[rgba(248,249,250,0.14)]">
            <Link
              href="/open-calls"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center bg-[#F8F9FA] text-[#0B132B] font-semibold text-sm px-4 py-2.5 rounded-none hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA]"
            >
              Explore open calls
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
