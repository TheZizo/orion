import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HeroSection } from '@/components/home/HeroSection';
import { NextDeparture } from '@/components/home/NextDeparture';
import { HowToApply } from '@/components/home/HowToApply';
import { Beliefs } from '@/components/home/Beliefs';
import { ReForestStory } from '@/components/home/ReForestStory';
import { PartnerBand } from '@/components/home/PartnerBand';

describe('Home Page Components — Exceptional Editorial Architecture', () => {
  beforeEach(() => {
    // Mock window.matchMedia for jsdom
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  describe('HeroSection', () => {
    it('renders the live telemetry pill, Space Grotesk bold headline with orange bigger (no italic serif), and CTAs', () => {
      render(<HeroSection />);

      // Live Telemetry Pill with updated name
      expect(
        screen.getByText(/Orion Fiatalok Informális Csoportja/i)
      ).toBeInTheDocument();

      // Display headline
      const headline = screen.getByRole('heading', { level: 1 });
      expect(headline).toBeInTheDocument();
      expect(headline.textContent).toContain('Spark something bigger.');

      // Orange keyword "bigger." without italic or font-serif
      const orangeWord =
        headline.querySelector('.text-\\[\\#e35619\\]') ??
        headline.querySelector('.text-\\[\\#E35619\\]');
      expect(orangeWord).toBeInTheDocument();
      expect(orangeWord?.textContent).toBe('bigger.');
      expect(headline.querySelector('.italic')).toBeNull();
      expect(headline.querySelector('.font-serif')).toBeNull();

      // Verbatim Lead copy
      expect(
        screen.getByText(
          /Orion helps young people find direction, cross borders, and grow, together\./i
        )
      ).toBeInTheDocument();

      // High-contrast CTAs
      const ctaOpenCalls = screen.getByRole('link', {
        name: /Explore open calls/i,
      });
      expect(ctaOpenCalls).toHaveAttribute('href', '/open-calls');

      const ctaPartners = screen.getAllByRole('link', {
        name: /Partner dossier/i,
      })[0];
      expect(ctaPartners).toHaveAttribute('href', '/partners');
    });
  });

  describe('ReForestStory', () => {
    it('renders daylight spread on #F8F9FA, telemetry badge, 4 canonical metrics (40 + 8, 4, 12 days, 1,200+), Kemal quote, no accordion button, and project links', () => {
      const { container } = render(<ReForestStory />);

      const section = container.querySelector('section');
      expect(section?.className).toContain('bg-[#F8F9FA]');

      expect(
        screen.getByText(/46\.78° N, 25\.78° E, Lacu Roșu, Romania/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/October 11–22, 2026, Alpine Meadow, Lacu Roșu, Harghita/i)
      ).toBeInTheDocument();

      // Title & verified single testimonial attributed to Kemal
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Not a program, but memories, growth, and human connection\./i,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/ReForest — Erasmus\+ Youth Exchange/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Kemal/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /ReForest showed me how non-formal education makes ecological theory real, urgent, and deeply human\./i
        )
      ).toBeInTheDocument();

      // No accordion button
      expect(screen.queryByRole('button')).toBeNull();

      // 4 Canonical impact metrics
      expect(screen.getByText('40 + 8')).toBeInTheDocument();
      expect(screen.getByText(/Young changemakers/i)).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText(/Partner countries/i)).toBeInTheDocument();
      expect(screen.getByText('12 days')).toBeInTheDocument();
      expect(screen.getByText(/Mobility duration/i)).toBeInTheDocument();
      expect(screen.getByText('1,200+')).toBeInTheDocument();
      expect(screen.getByText(/Seedlings planted/i)).toBeInTheDocument();

      // Links: internal story & external official project portal
      const storyLink = screen.getByRole('link', {
        name: /Read the ReForest story/i,
      });
      expect(storyLink).toHaveAttribute('href', '/projects/reforest');

      const agojeLink = screen.getByRole('link', {
        name: /Official ReForest project page/i,
      });
      expect(agojeLink).toHaveAttribute(
        'href',
        'https://www.agoje.eu/our-projects/reforest'
      );
    });
  });

  describe('NextDeparture', () => {
    it('renders 4-column specs bar, consortium/outcome dossier, open 4-column 24-hour exchange rhythm, and grant reference on #F8F9FA', () => {
      const { container } = render(<NextDeparture />);

      const section = container.querySelector('section');
      expect(section?.className).toContain('bg-[#F8F9FA]');

      expect(screen.getByText(/Next departure/i)).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /The Financial Blueprint/i,
        })
      ).toBeInTheDocument();

      // 4-column specs bar
      expect(screen.getByText('When')).toBeInTheDocument();
      expect(screen.getAllByText(/March 2027/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Where')).toBeInTheDocument();
      expect(screen.getAllByText(/Eastern Hungary/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Who')).toBeInTheDocument();
      expect(screen.getByText(/18–26/i)).toBeInTheDocument();
      expect(screen.getByText('Cost')).toBeInTheDocument();
      expect(screen.getByText(/100% Erasmus\+ funded/i)).toBeInTheDocument();

      // Open 4-column 24-hour exchange rhythm
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: /A day on an exchange\. Zero lectures\./i,
        })
      ).toBeInTheDocument();
      expect(screen.getByText('08:30')).toBeInTheDocument();
      expect(screen.getByText('10:00')).toBeInTheDocument();
      expect(screen.getByText('15:00')).toBeInTheDocument();
      expect(screen.getByText('20:00')).toBeInTheDocument();

      // Verified grant reference
      expect(
        screen.getAllByText(/2026-1-HU01-KA152-YOU-000399636/i).length
      ).toBeGreaterThanOrEqual(1);

      // Actions
      const applyBtn = screen.getByRole('link', {
        name: /Register early interest/i,
      });
      expect(applyBtn).toHaveAttribute(
        'href',
        '/open-calls/the-financial-blueprint'
      );

      // Static consortium & outcome dossier
      expect(screen.getByText(/International Consortium/i)).toBeInTheDocument();
      expect(screen.getByText(/What You Will Master/i)).toBeInTheDocument();
      expect(screen.getByText(/Official Recognition/i)).toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: /Read the infopack/i })
      ).toBeNull();
    });
  });

  describe('HowToApply', () => {
    it('renders static 3-step trajectory on #F8F9FA with permanent Step 2 motivation quote and zero tab buttons', () => {
      const { container } = render(<HowToApply />);

      const section = container.querySelector('section');
      expect(section?.className).toContain('bg-[#F8F9FA]');

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Here's how to apply, 3 steps, 10 minutes\./i,
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('heading', { level: 3, name: /About you/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: /Your motivation/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: /Travel and confirmation/i,
        })
      ).toBeInTheDocument();

      // Zero interactive step buttons
      expect(screen.queryAllByRole('button')).toHaveLength(0);

      // Permanent display of sample 3-sentence motivation inside Step 2
      expect(
        screen.getByText(
          /I am starting my first job next autumn and want to replace my anxiety around budgeting with a concrete savings system/i
        )
      ).toBeInTheDocument();

      const openCallsLink = screen.getByRole('link', {
        name: /See all open calls/i,
      });
      expect(openCallsLink).toHaveAttribute('href', '/open-calls');
    });
  });

  describe('Beliefs', () => {
    it('renders "What we believe" on #F8F9FA with bg-white cells, all 4 locked pillar H3s, and no Roman numerals', () => {
      const { container } = render(<Beliefs />);

      const section = container.querySelector('section');
      expect(section?.className).toContain('bg-[#F8F9FA]');

      expect(
        screen.getByRole('heading', { level: 2, name: /What we believe/i })
      ).toBeInTheDocument();

      // Roman numerals I–IV must NOT be present
      expect(screen.queryByText('I')).toBeNull();
      expect(screen.queryByText('II')).toBeNull();
      expect(screen.queryByText('III')).toBeNull();
      expect(screen.queryByText('IV')).toBeNull();

      // All 4 locked pillar headings
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: /Not a program, but memories, growth, and human connection\./i,
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('heading', {
          level: 3,
          name: /A guide that helps you find direction\./i,
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('heading', {
          level: 3,
          name: /A constellation of young changemakers\./i,
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('heading', {
          level: 3,
          name: /Real impact, backed by proof\./i,
        })
      ).toBeInTheDocument();
    });
  });

  describe('PartnerBand', () => {
    it('renders outer #F8F9FA section wrapping framed #0B132B container with verbatim long-form boilerplate and copy buttons', async () => {
      const { container } = render(<PartnerBand />);

      const section = container.querySelector('section');
      expect(section?.className).toContain('bg-[#F8F9FA]');
      expect(container.querySelector('.bg-\\[\\#0B132B\\]')).toBeInTheDocument();

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /For partner organisations/i,
        })
      ).toBeInTheDocument();

      // Verbatim long-form boilerplate
      expect(
        screen.getByText(
          'Orion is an international youth initiative that turns participation into memories, growth, and human connection. Guided by the idea of a constellation of young changemakers who help each other navigate and move upward, we create programs that deliver measurable personal and cross-cultural impact.'
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(/Orion Fiatalok Informális Csoportja/i)
      ).toBeInTheDocument();
      expect(screen.getByText('zeid@orionyouth.eu')).toBeInTheDocument();
      expect(
        screen.getByText(/2026-1-HU01-KA152-YOU-000399636/i)
      ).toBeInTheDocument();

      // 1-Click Copy buttons on dispatch dock
      const copyEmailBtn = screen.getByRole('button', {
        name: /Copy coordinator email/i,
      });
      const copyGrantBtn = screen.getByRole('button', {
        name: /Copy accredited grant reference/i,
      });
      expect(copyEmailBtn).toBeInTheDocument();
      expect(copyGrantBtn).toBeInTheDocument();

      // Test copying email
      fireEvent.click(copyEmailBtn);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'zeid@orionyouth.eu'
      );
      await waitFor(() => {
        expect(
          screen.getAllByText(/Copied to clipboard/i).length
        ).toBeGreaterThan(0);
      });

      // Test copying grant code
      fireEvent.click(copyGrantBtn);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        '2026-1-HU01-KA152-YOU-000399636'
      );
      await waitFor(() => {
        expect(
          screen.getAllByText(/Copied to clipboard/i).length
        ).toBeGreaterThan(0);
      });

      // Zero OID placeholder and Zero dead PIF links
      expect(screen.queryByText(/E103XXXXX/i)).toBeNull();
      expect(screen.queryByText(/Download PIF/i)).toBeNull();

      // Action links
      const inquiryLink = screen.getByRole('link', {
        name: /Send a partnership inquiry/i,
      });
      expect(inquiryLink).toHaveAttribute('href', '/partners');

      const dossierLink = screen.getByRole('link', {
        name: /Partner dossier/i,
      });
      expect(dossierLink).toHaveAttribute('href', '/partners');
    });
  });
});
