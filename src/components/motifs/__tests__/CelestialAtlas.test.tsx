import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CelestialAtlas, project, ATLAS_BOUNDS, ATLAS_VIEWBOX } from '@/components/motifs/CelestialAtlas';
import { NodeInspector } from '@/components/motifs/NodeInspector';
import { getAtlasNodes } from '@/lib/orionData';

describe('CelestialAtlas component & projection math', () => {
  beforeEach(() => {
    // Mock matchMedia for jsdom
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
  });

  describe('project() math helper', () => {
    it('projects origin boundary corners correctly', () => {
      // Top-left: maxLat, minLng -> (0, 0)
      const topLeft = project(ATLAS_BOUNDS.maxLat, ATLAS_BOUNDS.minLng);
      expect(topLeft.x).toBe(0);
      expect(topLeft.y).toBe(0);

      // Bottom-right: minLat, maxLng -> (width, height)
      const bottomRight = project(ATLAS_BOUNDS.minLat, ATLAS_BOUNDS.maxLng);
      expect(bottomRight.x).toBe(ATLAS_VIEWBOX.width);
      expect(bottomRight.y).toBe(ATLAS_VIEWBOX.height);
    });

    it('projects Debrecen coordinates accurately within European bounds', () => {
      const debrecen = project(47.53, 21.62);
      // Lon range: -12 to 45 (57° total). (21.62 - (-12)) / 57 * 800 ≈ 471.86
      // Lat range: 33 to 62 (29° total). (62 - 47.53) / 29 * 550 ≈ 274.43
      expect(debrecen.x).toBeGreaterThan(450);
      expect(debrecen.x).toBeLessThan(500);
      expect(debrecen.y).toBeGreaterThan(250);
      expect(debrecen.y).toBeLessThan(300);
    });
  });

  describe('Option 2: Orbital System Interactive Controls & Selection', () => {
    it('renders a focusable control per orbital node with accessible label', () => {
      render(<CelestialAtlas />);
      const allNodes = getAtlasNodes();
      const nodeButtons = screen.getAllByRole('button');

      // The interactive node controls in the SVG are role="button" with tabIndex={0}
      expect(nodeButtons.length).toBeGreaterThanOrEqual(allNodes.length);

      // Check Debrecen HQ node specifically
      const hqNode = screen.getByRole('button', {
        name: /Orion Headquarters/i,
      });
      expect(hqNode).toBeInTheDocument();
      expect(hqNode).toHaveAttribute('tabindex', '0');
    });

    it('renders the 4-item mission tab list', () => {
      render(<CelestialAtlas />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBe(4);
      expect(screen.getByRole('tab', { name: /Core: Debrecen HQ/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /Orbit 01: ReForest/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /Orbit 02: The Financial Blueprint/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /Orbit 03: Partner Horizon/i })).toBeInTheDocument();
    });

    it('updates NodeInspector title when a node is clicked', () => {
      render(<CelestialAtlas />);

      // Click on Debrecen HQ node
      const hqNode = screen.getByRole('button', {
        name: /Orion Headquarters/i,
      });
      fireEvent.click(hqNode);

      // Inspector now displays Orion Headquarters
      expect(
        screen.getByRole('heading', { level: 3, name: /Orion Headquarters/i })
      ).toBeInTheDocument();
    });

    it('updates NodeInspector when Enter key is pressed on a focused node', () => {
      render(<CelestialAtlas />);

      const projectNode = screen.getByRole('button', {
        name: /ReForest/i,
      });

      fireEvent.keyDown(projectNode, { key: 'Enter', code: 'Enter' });

      expect(
        screen.getByRole('heading', { level: 3, name: /ReForest — Transylvania, Romania/i })
      ).toBeInTheDocument();
    });

    it('updates NodeInspector when a floating SVG label is clicked', () => {
      const { container } = render(<CelestialAtlas />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();

      const reforestLabel = Array.from(svg!.querySelectorAll('text')).find(
        (el) => el.textContent === 'ReForest ’26'
      );
      expect(reforestLabel).toBeDefined();

      fireEvent.click(reforestLabel!);

      expect(
        screen.getByRole('heading', { level: 3, name: /ReForest — Transylvania, Romania/i })
      ).toBeInTheDocument();
    });

    it('updates active node when tab strip button is clicked', () => {
      render(<CelestialAtlas />);

      const partnerTab = screen.getByRole('tab', {
        name: /Orbit 03: Partner Horizon/i,
      });

      fireEvent.click(partnerTab);

      expect(
        screen.getByRole('heading', { level: 3, name: /Next Horizon — Partner With Orion/i })
      ).toBeInTheDocument();
    });

    it('responds to pointer move by updating 3D projection offsets and returns toward neutral on pointer leave', () => {
      const { container } = render(<CelestialAtlas />);
      const stage = container.querySelector(
        '[aria-label="Celestial Atlas: Interactive European mobility chart"]'
      )?.parentElement;
      expect(stage).toBeInTheDocument();

      vi.spyOn(stage!, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        top: 0,
        width: 740,
        height: 440,
        right: 740,
        bottom: 440,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      const paths = container.querySelectorAll('svg g[fill="none"] path');
      expect(paths.length).toBeGreaterThan(0);
      const initialD = paths[0].getAttribute('d');
      expect(initialD).toBeTruthy();

      // Pointer move off-center tilts the 3D projection
      fireEvent.pointerMove(stage!, { clientX: 600, clientY: 100 });
      const movedD = paths[0].getAttribute('d');
      expect(movedD).toBeTruthy();
      expect(movedD).not.toBe(initialD);

      // Pointer leave returns the projection toward neutral
      fireEvent.pointerLeave(stage!);
      const leftD = paths[0].getAttribute('d');
      expect(leftD).toBeTruthy();
      expect(leftD).not.toBe(movedD);
    });

    it('disables pointer parallax when prefers-reduced-motion is enabled', () => {
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(<CelestialAtlas />);
      const stage = container.querySelector(
        '[aria-label="Celestial Atlas: Interactive European mobility chart"]'
      )?.parentElement;
      expect(stage).toBeInTheDocument();

      const paths = container.querySelectorAll('svg g[fill="none"] path');
      const initialD = paths[0].getAttribute('d');

      fireEvent.pointerMove(stage!, { clientX: 600, clientY: 100 });
      const movedD = paths[0].getAttribute('d');
      expect(movedD).toBe(initialD);
    });
  });

  describe('NodeInspector: 3-Cell Geodesic Telemetry & Untruncated Readout', () => {
    it('renders the 3-cell geodesic telemetry bar (Vector from HQ, Action Type, Status) with no coordinates', () => {
      const allNodes = getAtlasNodes();
      const blueprintNode = allNodes.find((n) => n.id === 'call-the-financial-blueprint');
      expect(blueprintNode).toBeDefined();

      const { container } = render(<NodeInspector node={blueprintNode} />);

      // Verify Coordinates is absent
      expect(screen.queryByText('Coordinates')).toBeNull();
      expect(screen.queryByText(/47\.16° N, 19\.50° E/i)).toBeNull();

      // Verify the 3 geodesic telemetry cells
      expect(screen.getByText('Vector from HQ')).toBeInTheDocument();
      expect(screen.getByText('Action Type')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();

      // Verify geodesic values for The Financial Blueprint
      expect(screen.getByText(/Host Venue, Hungary/i)).toBeInTheDocument();
      expect(screen.getByText('KA152 Youth Exchange')).toBeInTheDocument();
      expect(screen.getByText('Opening soon')).toBeInTheDocument();

      // Verify complete untruncated copy without line-clamp-2
      const summaryParagraph = container.querySelector('p.type-body');
      expect(summaryParagraph).toBeInTheDocument();
      expect(summaryParagraph).not.toHaveClass('line-clamp-2');
      expect(container.querySelectorAll('.line-clamp-2').length).toBe(0);
    });

    it('renders ReForest geodesic telemetry bar without coordinates', () => {
      const allNodes = getAtlasNodes();
      const reforestNode = allNodes.find((n) => n.id === 'project-reforest');
      expect(reforestNode).toBeDefined();

      const { container } = render(<NodeInspector node={reforestNode} />);

      expect(screen.queryByText('Coordinates')).toBeNull();
      expect(screen.queryByText(/46\.78° N, 25\.78° E/i)).toBeNull();

      expect(screen.getByText('Vector from HQ')).toBeInTheDocument();
      expect(screen.getByText('Action Type')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();

      expect(screen.getByText(/328 km ESE, Lacu Roșu/i)).toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();

      expect(container.querySelectorAll('.line-clamp-2').length).toBe(0);
    });

    it('renders Debrecen HQ geodesic telemetry bar correctly without coordinates', () => {
      const allNodes = getAtlasNodes();
      const hqNode = allNodes.find((n) => n.id === 'orion-hq');
      expect(hqNode).toBeDefined();

      const { container } = render(<NodeInspector node={hqNode} />);

      expect(screen.queryByText('Coordinates')).toBeNull();
      expect(screen.queryByText(/47\.53° N, 21\.62° E/i)).toBeNull();

      expect(screen.getByText('Vector from HQ')).toBeInTheDocument();
      expect(screen.getByText('Action Type')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();

      expect(screen.getByText(/0 km, Origin Core/i)).toBeInTheDocument();
      expect(screen.getByText('Accredited NGO Seat')).toBeInTheDocument();

      // Ensure no line-clamp-2 on summary
      expect(container.querySelectorAll('.line-clamp-2').length).toBe(0);
    });

    it('renders empty selection state without line-clamp-2 truncation', () => {
      const { container } = render(<NodeInspector node={null} />);

      expect(
        screen.getByRole('heading', { level: 3, name: /Select a mission/i })
      ).toBeInTheDocument();

      const summaryParagraph = container.querySelector('p.type-body');
      expect(summaryParagraph).toBeInTheDocument();
      expect(summaryParagraph).not.toHaveClass('line-clamp-2');
      expect(container.querySelectorAll('.line-clamp-2').length).toBe(0);
    });
  });
});
