import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConstellationLeadershipGrid } from '../ConstellationLeadershipGrid';
import AboutPage from '@/app/about/page';
import { getTeam } from '@/lib/orionData';

describe('About Partition Components', () => {
  describe('ConstellationLeadershipGrid', () => {
    it('renders all 5 team members with headings, monograms, portrait placeholders, and verified PIF roles and biographies', () => {
      const team = getTeam();
      const { container } = render(<ConstellationLeadershipGrid team={team} />);

      expect(team).toHaveLength(5);

      // Verify Orion Fiatalok Informális Csoportja is rendered in section lead
      expect(
        screen.getByText(/Orion Fiatalok Informális Csoportja/i)
      ).toBeInTheDocument();

      // 1. Verify all 5 members exist by heading
      expect(
        screen.getByRole('heading', { name: 'Zeid Isaac' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Roberta Szabó' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Jázmin Szabó' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Jordan Smith' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Mehmet Ismail' })
      ).toBeInTheDocument();

      // 2. Verify monograms are rendered
      expect(screen.getByText('ZI')).toBeInTheDocument();
      expect(screen.getByText('RS')).toBeInTheDocument();
      expect(screen.getAllByText('JS')).toHaveLength(2); // Jázmin Szabó and Jordan Smith
      expect(screen.getByText('MI')).toBeInTheDocument(); // Mehmet Ismail

      // 3. Verify portrait placeholder frames and 0 <img> tags when no photoUrl is set
      expect(screen.getAllByText('Portrait placeholder')).toHaveLength(5);
      const images = container.querySelectorAll('img');
      expect(images.length).toBe(0);

      // 4. Verify verified PIF roles
      expect(
        screen.getByText('Group Leader, Strategic Planning & Cross-Cultural Pedagogy')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Intercultural Communication & Community Building')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Information Management & Public Relations')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Facilitator, Operations & Event Management')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Organizational Leadership & Narrative Dissemination')
      ).toBeInTheDocument();

      // 5. Verify full PIF biographies and highlights
      expect(screen.getAllByText(/HÖOK/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/ELTE/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/AIESEC/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/DiscoverEU/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Hungarian folk dancing/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/competitive fencing coaching/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Hungarian, English, Dutch, German/i)).toBeInTheDocument();

      // 6. Confirm old placeholder copy is NOT rendered
      expect(screen.queryByText(/Role \/ Title Placeholder/i)).toBeNull();
      expect(
        screen.queryByText(/Short biography and Erasmus\+ youth mobility focus placeholder/i)
      ).toBeNull();

      // 7. Decorative constellation arc SVG div has aria-hidden="true"
      const decorativeSvg = container.querySelector('div[aria-hidden="true"]');
      expect(decorativeSvg).toBeInTheDocument();
    });

    it('supports interactive spotlight selection and toggles leader highlight styling', () => {
      const team = getTeam();
      const { container } = render(<ConstellationLeadershipGrid team={team} />);

      const allLeadersBtn = screen.getByRole('button', { name: 'All 5 leaders' });
      expect(allLeadersBtn).toHaveAttribute('aria-pressed', 'true');

      const robertaBtn = screen.getByRole('button', { name: 'Roberta Szabó' });
      fireEvent.click(robertaBtn);

      expect(robertaBtn).toHaveAttribute('aria-pressed', 'true');
      expect(allLeadersBtn).toHaveAttribute('aria-pressed', 'false');

      // Assert all 5 team member names remain visible in the document
      expect(screen.getByRole('heading', { name: 'Zeid Isaac' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Roberta Szabó' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Jázmin Szabó' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Jordan Smith' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Mehmet Ismail' })).toBeInTheDocument();

      // Assert #team-member-roberta-szabo has class border-[#e35619]
      const robertaCard = container.querySelector('#team-member-roberta-szabo');
      expect(robertaCard).toBeInTheDocument();
      expect(robertaCard).toHaveClass('border-[#e35619]');

      // Click 'All 5 leaders' and assert 'All 5 leaders' has aria-pressed="true" again
      fireEvent.click(allLeadersBtn);
      expect(allLeadersBtn).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('AboutPage', () => {
    it('renders the PIF institutional profile, dual mandate, four operational pillars, leadership, closing CTAs, and maintains strict PII hygiene', () => {
      const { container } = render(<AboutPage />);

      // 1. Institutional profile
      expect(
        screen.getAllByText(/Orion Fiatalok Informális Csoportja/i).length
      ).toBeGreaterThan(0);
      expect(
        screen.getAllByText(/Orion Informal Group of Young People/i).length
      ).toBeGreaterThan(0);
      expect(
        screen.getAllByText(/Create the brightest stars/i).length
      ).toBeGreaterThan(0);
      expect(
        screen.getByText('Group of Young People (Non-profit)')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Youthwork / Non-formal education')
      ).toBeInTheDocument();
      expect(
        screen.getAllByText(/2026-1-HU01-KA152-YOU-000399636/).length
      ).toBeGreaterThan(0);
      expect(
        screen.getByRole('link', { name: 'zeid@orionyouth.eu' })
      ).toHaveAttribute('href', 'mailto:zeid@orionyouth.eu');

      // 2. Dual mandate headings
      expect(
        screen.getByRole('heading', { name: 'Hosting in Hungary' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Sending across Europe' })
      ).toBeInTheDocument();

      // 3. Four operational pillars
      expect(
        screen.getByRole('heading', {
          name: 'Cross-cultural pedagogy and educational integration',
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          name: 'Project management and organizational structure',
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          name: 'Advanced communication and information management',
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          name: 'Social inclusion and participant welfare',
        })
      ).toBeInTheDocument();

      // 4. All 5 team member headings rendered via ConstellationLeadershipGrid
      expect(
        screen.getByRole('heading', { name: 'Zeid Isaac' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Roberta Szabó' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Jázmin Szabó' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Jordan Smith' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Mehmet Ismail' })
      ).toBeInTheDocument();

      // 5. Closing links to /partners and /open-calls
      expect(
        screen.getByRole('link', { name: /partner dossier & inquiry/i })
      ).toHaveAttribute('href', '/partners');
      expect(
        screen.getByRole('link', { name: /explore open calls/i })
      ).toHaveAttribute('href', '/open-calls');

      // 6. Strict PII hygiene verification
      const domText = container.textContent ?? '';

      // Personal street addresses
      expect(domText).not.toMatch(/sinay/i);
      expect(domText).not.toMatch(/sinai/i);
      expect(domText).not.toMatch(/peterfia/i);
      expect(screen.queryByText(/sinay/i)).toBeNull();
      expect(screen.queryByText(/sinai/i)).toBeNull();
      expect(screen.queryByText(/peterfia/i)).toBeNull();

      // Phone numbers
      expect(domText).not.toMatch(/\+?36\s?20\s?464\s?9503/);
      expect(domText).not.toMatch(/\+?36\s?70\s?720\s?2308/);
      expect(screen.queryByText(/\+?36\s?20\s?464\s?9503/)).toBeNull();
      expect(screen.queryByText(/\+?36\s?70\s?720\s?2308/)).toBeNull();

      // Personal Gmail addresses
      expect(domText).not.toMatch(/zeidisaac@gmail\.com/i);
      expect(domText).not.toMatch(/chalkie1000000@gmail\.com/i);
      expect(domText).not.toMatch(/orionhuerasmus@gmail\.com/i);
      expect(domText).not.toMatch(/@gmail\.com/i);
      expect(screen.queryByText(/@gmail\.com/i)).toBeNull();
    });
  });
});
