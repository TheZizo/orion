import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar, NAV_LINKS } from '@/components/layout/Navbar';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/'),
}));

describe('Navbar component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders brand logo and all primary navigation links', () => {
    render(<Navbar />);

    // Brand logo link to home
    const homeLink = screen.getByRole('link', { name: /Orion Homepage/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');

    // Check all 5 primary desktop links
    NAV_LINKS.forEach((item) => {
      const linkEls = screen.getAllByRole('link', { name: item.label });
      expect(linkEls.length).toBeGreaterThanOrEqual(1);
      expect(linkEls[0].getAttribute('href')).toBe(item.href);
    });

    // Right CTA button with high-contrast off-white style
    const ctaLinks = screen.getAllByRole('link', { name: /Explore open calls/i });
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
    expect(ctaLinks[0].getAttribute('href')).toBe('/open-calls');
  });

  it('toggles mobile menu disclosure and updates aria-expanded state', () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', {
      name: /open navigation menu/i,
    });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Open mobile menu
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('button', { name: /close navigation menu/i })
    ).toBeInTheDocument();

    // The mobile drawer is open and contains links
    const drawer = document.getElementById('mobile-menu');
    expect(drawer).toBeInTheDocument();

    // Close mobile menu
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('mobile-menu')).toBeNull();
  });

  it('closes mobile menu on Escape key press', () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', {
      name: /open navigation menu/i,
    });
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    // Press Escape
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('mobile-menu')).toBeNull();
  });

  it('locks document.body.style.overflow when mobile drawer opens and resets when closed', () => {
    document.body.style.overflow = '';
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', {
      name: /open navigation menu/i,
    });
    expect(document.body.style.overflow).toBe('');

    fireEvent.click(toggleButton);
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(toggleButton);
    expect(document.body.style.overflow).toBe('');
  });
});
