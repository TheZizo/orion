import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SparkleStar } from '@/components/motifs/SparkleStar';
import { TrajectoryArc, arcPath } from '@/components/motifs/TrajectoryArc';
import { Button } from '@/components/ui/Button';
import { StatusBadge, StatusBadgeValue } from '@/components/ui/StatusBadge';
import { CoordinateStamp } from '@/components/ui/CoordinateStamp';
import { PageHeader } from '@/components/ui/PageHeader';

describe('motifs and UI components', () => {
  describe('SparkleStar', () => {
    it('renders with custom size and color', () => {
      const { container } = render(
        <SparkleStar size={32} color="#e35619" title="Active Star" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.getAttribute('width')).toBe('32');
      expect(svg?.getAttribute('height')).toBe('32');
      expect(screen.getByText('Active Star')).toBeInTheDocument();
    });

    it('applies pulse class when pulse prop is true', () => {
      const { container } = render(<SparkleStar pulse />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('animate-star-pulse');
    });
  });

  describe('TrajectoryArc', () => {
    it('calculates curved bezier path correctly via arcPath', () => {
      const path = arcPath({ x: 0, y: 0 }, { x: 100, y: 0 }, -0.2);
      expect(path).toMatch(/^M 0\.00 0\.00 Q 50\.00/);
    });

    it('renders SVG path with animation styling', () => {
      const { container } = render(
        <svg>
          <TrajectoryArc
            from={{ x: 10, y: 20 }}
            to={{ x: 80, y: 90 }}
            animated
          />
        </svg>
      );
      const pathEl = container.querySelector('path');
      expect(pathEl).toBeInTheDocument();
      expect(pathEl?.getAttribute('stroke')).toBe('#e35619');
      expect(pathEl).toHaveClass('animate-arc-trace');
    });
  });

  describe('Button', () => {
    it('renders primary button with Ember fill and Midnight Navy text for AA contrast', () => {
      render(<Button variant="primary">Explore open calls</Button>);
      const btn = screen.getByRole('button', { name: /explore open calls/i });
      expect(btn).toBeInTheDocument();
      // Contrast verification: Ember bg (#e35619) with Midnight Navy text (#0B132B)
      expect(btn).toHaveClass('bg-[#e35619]');
      expect(btn).toHaveClass('text-[#0B132B]');
      expect(btn).toHaveClass('font-bold');
    });

    it('renders polymorphic Link when href is provided', () => {
      render(
        <Button variant="secondary" href="/partners">
          Partner dossier
        </Button>
      );
      const link = screen.getByRole('link', { name: /partner dossier/i });
      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe('/partners');
    });
  });

  describe('StatusBadge', () => {
    it('renders Open status with dark tone palette border and off-white text', () => {
      render(<StatusBadge status="Open" tone="dark" />);
      const badgeText = screen.getByText('Open');
      expect(badgeText).toBeInTheDocument();
      const badge = badgeText.parentElement;
      expect(badge).toHaveClass('border-[rgba(248,249,250,0.28)]');
      expect(badge).toHaveClass('text-[#F8F9FA]');
      expect(badge).toHaveClass('bg-transparent');
      expect(badge).not.toHaveClass('font-mono');
      expect(badge).not.toHaveClass('uppercase');
      // Palette guardrail: NO forbidden hues
      expect(badge?.className).not.toMatch(/emerald|amber|zinc|green|bg-white/);
    });

    it('renders Open status with light tone palette border and navy text', () => {
      render(<StatusBadge status="Open" tone="light" />);
      const badgeText = screen.getByText('Open');
      expect(badgeText).toBeInTheDocument();
      const badge = badgeText.parentElement;
      expect(badge).toHaveClass('border-[rgba(11,19,43,0.22)]');
      expect(badge).toHaveClass('text-[#0B132B]');
      expect(badge).toHaveClass('bg-transparent');
    });

    it('renders Closing soon status with accessible offwhite text on dark tone and SVG glyph', () => {
      const { container } = render(<StatusBadge status="Closing soon" tone="dark" />);
      const badgeText = screen.getByText('Closing soon');
      expect(badgeText).toBeInTheDocument();
      const badge = badgeText.parentElement;
      // Guardrail check: MUST NOT put orange text on navy
      expect(badge).toHaveClass('text-[#F8F9FA]');
      expect(badge).not.toHaveClass('text-[#e35619]');

      // Check inline SVG glyph
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.getAttribute('width')).toBe('8');
      expect(svg?.getAttribute('height')).toBe('8');
    });

    it('renders all lifecycle statuses in sentence case with leading glyphs', () => {
      const statuses: StatusBadgeValue[] = [
        'Open',
        'Opening soon',
        'Closing soon',
        'Closed',
        'Completed',
        'Ongoing',
        'Upcoming',
      ];

      statuses.forEach((status) => {
        const { unmount } = render(<StatusBadge status={status} />);
        expect(screen.getByText(status)).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('CoordinateStamp', () => {
    it('renders geographic coordinates in Inter with tabular numbers and no box border', () => {
      const { container } = render(<CoordinateStamp lat={47.53} lng={21.62} label="Seat" />);
      expect(screen.getByText(/Seat:/i)).toBeInTheDocument();
      expect(screen.getByText(/47\.53° N, 21\.62° E/i)).toBeInTheDocument();

      const span = container.querySelector('span');
      expect(span).toHaveClass('tabular-nums');
      expect(span).toHaveClass('font-body');
      expect(span).not.toHaveClass('font-mono');
      expect(span).not.toHaveClass('border');
    });
  });

  describe('PageHeader', () => {
    it('renders title, eyebrow, lead, breadcrumb, and aside slot', () => {
      render(
        <PageHeader
          eyebrow="Youth Exchange"
          title="The Financial Blueprint"
          lead="A 7-day youth exchange on financial literacy and economic resilience in Hungary."
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Open Calls', href: '/open-calls' },
            { label: 'The Financial Blueprint' },
          ]}
          aside={<div data-testid="aside-action">Apply Now</div>}
        />
      );

      // Verify H1 title
      const heading = screen.getByRole('heading', { level: 1, name: /The Financial Blueprint/i });
      expect(heading).toBeInTheDocument();

      // Verify eyebrow and lead
      expect(screen.getByText('Youth Exchange')).toBeInTheDocument();
      expect(
        screen.getByText(/A 7-day youth exchange on financial literacy/i)
      ).toBeInTheDocument();

      // Verify breadcrumb nav
      const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(nav).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', { name: 'Open Calls' })).toHaveAttribute('href', '/open-calls');
      expect(screen.getByText('The Financial Blueprint', { selector: 'span[aria-current="page"]' })).toBeInTheDocument();

      // Verify aside slot
      expect(screen.getByTestId('aside-action')).toBeInTheDocument();
    });

    it('renders background celestial orbit and deterministic starfield without hydration issues', () => {
      const { container } = render(
        <PageHeader title="Archive" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      // Check deterministic circles
      const circles = svg?.querySelectorAll('circle');
      expect(circles?.length).toBe(18);
      // Check elliptical orbit arc
      const ellipse = svg?.querySelector('ellipse');
      expect(ellipse).toBeInTheDocument();
    });
  });
});
