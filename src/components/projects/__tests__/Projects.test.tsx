import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ProjectsArchive } from '../ProjectsArchive';
import { ProjectDetailView } from '../ProjectDetailView';
import { PhotoGalleryGrid } from '../PhotoGalleryGrid';
import { SEED_PROJECTS } from '@/lib/orionData';
import { GalleryItem } from '@/types/orion';

describe('Projects Partition Components', () => {
  describe('ProjectsArchive', () => {
    it('renders all initial projects with live count', () => {
      render(<ProjectsArchive initialProjects={SEED_PROJECTS} />);

      expect(
        screen.getByRole('heading', { name: /reforest — erasmus\+ youth exchange/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          name: /the financial blueprint — erasmus\+ youth exchange/i,
        })
      ).toBeInTheDocument();

      const count = screen.getByText(/showing 2 projects/i);
      expect(count).toBeInTheDocument();
      expect(count).toHaveAttribute('aria-live', 'polite');
    });

    it('filters projects by status (Completed vs Upcoming)', () => {
      render(<ProjectsArchive initialProjects={SEED_PROJECTS} />);

      const statusSelect = screen.getByLabelText(/status/i);
      fireEvent.change(statusSelect, { target: { value: 'Completed' } });

      expect(
        screen.getByRole('heading', { name: /reforest — erasmus\+ youth exchange/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', {
          name: /the financial blueprint — erasmus\+ youth exchange/i,
        })
      ).not.toBeInTheDocument();

      expect(screen.getByText(/showing 1 project \(filtered from 2\)/i)).toBeInTheDocument();

      fireEvent.change(statusSelect, { target: { value: 'Upcoming' } });

      expect(
        screen.getByRole('heading', {
          name: /the financial blueprint — erasmus\+ youth exchange/i,
        })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { name: /reforest — erasmus\+ youth exchange/i })
      ).not.toBeInTheDocument();
    });

    it('filters projects by country', () => {
      render(<ProjectsArchive initialProjects={SEED_PROJECTS} />);

      const countrySelect = screen.getByLabelText(/country/i);
      fireEvent.change(countrySelect, { target: { value: 'Hungary' } });

      expect(
        screen.getByRole('heading', {
          name: /the financial blueprint — erasmus\+ youth exchange/i,
        })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { name: /reforest — erasmus\+ youth exchange/i })
      ).not.toBeInTheDocument();
    });

    it('shows empty state and allows resetting filters', () => {
      render(<ProjectsArchive initialProjects={SEED_PROJECTS} />);

      const countrySelect = screen.getByLabelText(/country/i);
      fireEvent.change(countrySelect, { target: { value: 'Romania' } });

      const statusSelect = screen.getByLabelText(/status/i);
      fireEvent.change(statusSelect, { target: { value: 'Upcoming' } });

      expect(
        screen.getByText(/no mobilities found matching the selected filters/i)
      ).toBeInTheDocument();

      const resetBtn = screen.getByRole('button', { name: /reset all filters/i });
      fireEvent.click(resetBtn);

      expect(
        screen.getByRole('heading', { name: /reforest — erasmus\+ youth exchange/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          name: /the financial blueprint — erasmus\+ youth exchange/i,
        })
      ).toBeInTheDocument();
      expect(screen.getByText(/showing 2 projects/i)).toBeInTheDocument();
    });

    it('renders the Field Photography Showcase section aggregating project galleries', () => {
      render(<ProjectsArchive initialProjects={SEED_PROJECTS} />);

      expect(
        screen.getByRole('heading', { name: /field photography showcase/i })
      ).toBeInTheDocument();

      // Check category filter pills in showcase (3 ReForest items)
      expect(screen.getByRole('tab', { name: /all 3/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /field action 1/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /workshops 1/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /community & culture 1/i })).toBeInTheDocument();
    });
  });

  describe('ProjectDetailView', () => {
    const blueprint = SEED_PROJECTS.find(
      (p) => p.slug === 'the-financial-blueprint'
    )!;
    const reforest = SEED_PROJECTS.find((p) => p.slug === 'reforest')!;

    it('renders project detail with grant reference ledger badge when grantReference exists', () => {
      render(<ProjectDetailView project={blueprint} />);

      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /the financial blueprint — erasmus\+ youth exchange/i,
        })
      ).toBeInTheDocument();

      const grantBadge = screen.getByTestId('grant-reference-badge');
      expect(grantBadge).toBeInTheDocument();
      expect(grantBadge).toHaveTextContent('2026-1-HU01-KA152-YOU-000399636');
    });

    it('omits grant reference badge when project has no grantReference', () => {
      render(<ProjectDetailView project={reforest} />);
      expect(screen.queryByTestId('grant-reference-badge')).not.toBeInTheDocument();
    });

    it('renders impact metrics, participant quotes, and partner wordmarks', () => {
      render(<ProjectDetailView project={reforest} />);

      // Impact metrics
      expect(screen.getByText('40 + 8')).toBeInTheDocument();
      expect(screen.getByText('Young changemakers')).toBeInTheDocument();

      // Participant quotes
      expect(
        screen.getByText(/Waking up in the Carpathian mist/i)
      ).toBeInTheDocument();
      expect(screen.getByText('Kemal')).toBeInTheDocument();
      expect(screen.getAllByText('Participant').length).toBeGreaterThanOrEqual(1);

      // Partner wordmarks & official portal link
      expect(screen.getAllByText(/Asociația Agoje/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/Orion Fiatalok Informális Csoportja/i)).toBeInTheDocument();
      const portalLink = screen.getByRole('link', { name: /view reforest on asociația agoje/i });
      expect(portalLink).toHaveAttribute('href', 'https://www.agoje.eu/our-projects/reforest');

      // Navigation CTA
      expect(screen.getByRole('link', { name: /all projects archive/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /explore open calls/i })).toBeInTheDocument();
    });

    it('renders field documentation section with frame counter and all gallery items', () => {
      render(<ProjectDetailView project={reforest} />);

      expect(
        screen.getByRole('heading', { name: /field documentation/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/3 frames/i)).toBeInTheDocument();
    });
  });

  describe('PhotoGalleryGrid', () => {
    const mockGallery: GalleryItem[] = [
      {
        src: '/images/projects/reforest-1.jpg',
        alt: 'Seedling planting in mountain valley',
        caption: 'Planting day above Lacu Roșu',
        category: 'Field Action',
        date: 'October 2026',
        location: 'Lacu Roșu, Transylvania',
        photographer: 'Asociația Agoje & Orion',
        featured: true,
        projectTitle: 'ReForest — Erasmus+ Youth Exchange',
        projectSlug: 'reforest',
      },
      {
        src: '/images/projects/reforest-2.jpg',
        alt: 'Group discussion circle in meadow',
        caption: 'Evening debrief circle',
        category: 'Workshops',
        date: 'October 2026',
        location: 'Harghita Mountains, Romania',
        photographer: 'Orion Field Archive',
        projectTitle: 'ReForest — Erasmus+ Youth Exchange',
        projectSlug: 'reforest',
      },
      {
        src: '/images/projects/debrecen-1.jpg',
        alt: 'Presentation of personal roadmap',
        caption: 'Roadmap presentation',
        category: 'Community & Culture',
        date: 'March 2027',
        location: 'Location TBA, Hungary',
        photographer: 'Orion Field Archive',
        projectTitle: 'The Financial Blueprint — Erasmus+ Youth Exchange',
        projectSlug: 'the-financial-blueprint',
      },
    ];

    it('renders images and figcaptions', () => {
      const items = [
        {
          src: '/images/projects/reforest-1.jpg',
          alt: 'Tree planting',
          caption: 'Community day',
        },
      ];
      render(<PhotoGalleryGrid gallery={items} />);

      const img = screen.getByRole('img', { name: /tree planting/i });
      expect(img).toBeInTheDocument();
      expect(screen.getByText('Community day')).toBeInTheDocument();
    });

    it('filters gallery items when category filter pill is clicked', () => {
      render(<PhotoGalleryGrid gallery={mockGallery} />);

      // Filter tabs are present
      expect(screen.getByRole('tab', { name: /all 3/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /field action 1/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /workshops 1/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /community & culture 1/i })).toBeInTheDocument();

      // Click Workshops pill
      fireEvent.click(screen.getByRole('tab', { name: /workshops 1/i }));

      // Only workshops item remains in grid
      expect(screen.getByRole('img', { name: /group discussion circle in meadow/i })).toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /seedling planting in mountain valley/i })).not.toBeInTheDocument();

      // Click All pill
      fireEvent.click(screen.getByRole('tab', { name: /all 3/i }));
      expect(screen.getByRole('img', { name: /group discussion circle in meadow/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /seedling planting in mountain valley/i })).toBeInTheDocument();
    });

    it('opens lightbox dialog on photo click and supports next/previous navigation', () => {
      render(<PhotoGalleryGrid gallery={mockGallery} />);

      // Open lightbox by clicking the first photo card
      const inspectBtn = screen.getByRole('button', {
        name: /inspect photo: planting day above lacu roșu/i,
      });
      fireEvent.click(inspectBtn);

      // Lightbox dialog is displayed
      const dialog = screen.getByRole('dialog', { name: /photo lightbox/i });
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-modal', 'true');

      // Frame counter and metadata inside dialog
      const dialogScope = within(dialog);
      expect(dialogScope.getByText('01 / 03')).toBeInTheDocument();
      expect(dialogScope.getByText('Location: Lacu Roșu, Transylvania')).toBeInTheDocument();
      expect(dialogScope.getByText('Date: October 2026')).toBeInTheDocument();
      expect(dialogScope.getByText('Photo: Asociația Agoje & Orion')).toBeInTheDocument();
      expect(
        dialogScope.getByRole('link', {
          name: /view project: reforest — erasmus\+ youth exchange/i,
        })
      ).toBeInTheDocument();

      // Click Next photo
      const nextBtn = dialogScope.getByRole('button', { name: /next photo/i });
      fireEvent.click(nextBtn);

      expect(dialogScope.getByText('02 / 03')).toBeInTheDocument();
      expect(dialogScope.getByText('Evening debrief circle')).toBeInTheDocument();

      // Click Previous photo
      const prevBtn = dialogScope.getByRole('button', { name: /previous photo/i });
      fireEvent.click(prevBtn);

      expect(dialogScope.getByText('01 / 03')).toBeInTheDocument();
      expect(dialogScope.getByText('Planting day above Lacu Roșu')).toBeInTheDocument();
    });

    it('supports keyboard navigation with ArrowRight/ArrowLeft and closes with Escape', () => {
      render(<PhotoGalleryGrid gallery={mockGallery} />);

      // Open lightbox
      fireEvent.click(
        screen.getByRole('button', {
          name: /inspect photo: planting day above lacu roșu/i,
        })
      );
      expect(screen.getByRole('dialog', { name: /photo lightbox/i })).toBeInTheDocument();
      expect(screen.getByText('01 / 03')).toBeInTheDocument();

      // Keyboard ArrowRight
      fireEvent.keyDown(window, { key: 'ArrowRight' });
      expect(screen.getByText('02 / 03')).toBeInTheDocument();

      // Keyboard ArrowLeft
      fireEvent.keyDown(window, { key: 'ArrowLeft' });
      expect(screen.getByText('01 / 03')).toBeInTheDocument();

      // Keyboard Escape closes modal
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(screen.queryByRole('dialog', { name: /photo lightbox/i })).not.toBeInTheDocument();
    });

    it('closes lightbox when close button is clicked', () => {
      render(<PhotoGalleryGrid gallery={mockGallery} />);

      // Open lightbox
      fireEvent.click(
        screen.getByRole('button', {
          name: /inspect photo: planting day above lacu roșu/i,
        })
      );
      expect(screen.getByRole('dialog', { name: /photo lightbox/i })).toBeInTheDocument();

      // Click close button
      const closeBtn = screen.getByRole('button', { name: /close dialog/i });
      fireEvent.click(closeBtn);

      expect(screen.queryByRole('dialog', { name: /photo lightbox/i })).not.toBeInTheDocument();
    });
  });
});
