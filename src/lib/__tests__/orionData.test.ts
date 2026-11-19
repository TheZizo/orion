import { describe, it, expect } from 'vitest';
import {
  formatDateRange,
  getOpenCalls,
  getOpenCallBySlug,
  getProjects,
  getProjectBySlug,
  getTeam,
  getAtlasNodes,
  ORION_ORG,
} from '@/lib/orionData';

describe('orionData', () => {
  describe('ORION_ORG', () => {
    it('contains verified legal identity and direct dispatch contact', () => {
      expect(ORION_ORG.legalName).toBe('Orion Fiatalok Informális Csoportja');
      expect(ORION_ORG.email).toBe('zeid@orionyouth.eu');
      expect(ORION_ORG.grantReference).toBe('2026-1-HU01-KA152-YOU-000399636');
      expect(ORION_ORG.oid).toBe('');
      expect(ORION_ORG.pifUrl).toBe('');
    });
  });

  describe('formatDateRange', () => {
    it('formats dates in the same month', () => {
      const formatted = formatDateRange('2027-03-15', '2027-03-23');
      expect(formatted).toBe('15–23 Mar 2027');
    });

    it('formats dates spanning across different months in the same year', () => {
      const formatted = formatDateRange('2026-11-28', '2026-12-05');
      expect(formatted).toBe('28 Nov – 5 Dec 2026');
    });

    it('formats dates across different years', () => {
      const formatted = formatDateRange('2026-12-28', '2027-01-05');
      expect(formatted).toBe('28 Dec 2026 – 5 Jan 2027');
    });
  });

  describe('getOpenCalls', () => {
    it('returns honest seed open calls reflecting real status', () => {
      const calls = getOpenCalls();
      expect(calls.length).toBe(2);

      const hasOpeningSoon = calls.some((c) => c.status === 'Opening soon');
      const hasClosed = calls.some((c) => c.status === 'Closed');

      expect(hasOpeningSoon).toBe(true);
      expect(hasClosed).toBe(true);
    });

    it('filters calls by actionType', () => {
      const exchanges = getOpenCalls({ actionType: 'Youth Exchange' });
      expect(exchanges.length).toBe(2);
      expect(exchanges.every((c) => c.actionType === 'Youth Exchange')).toBe(true);
    });

    it('filters calls by status', () => {
      const openingSoon = getOpenCalls({ status: 'Opening soon' });
      expect(openingSoon.length).toBe(1);
      expect(openingSoon[0].slug).toBe('the-financial-blueprint');

      const closed = getOpenCalls({ status: 'Closed' });
      expect(closed.length).toBe(1);
      expect(closed[0].slug).toBe('reforest-romania');
    });

    it('filters calls by country', () => {
      const hungary = getOpenCalls({ country: 'Hungary' });
      expect(hungary.length).toBe(1);
      expect(hungary[0].slug).toBe('the-financial-blueprint');

      const romania = getOpenCalls({ country: 'Romania' });
      expect(romania.length).toBe(1);
      expect(romania[0].slug).toBe('reforest-romania');
    });

    it('finds call by slug', () => {
      const blueprint = getOpenCallBySlug('the-financial-blueprint');
      expect(blueprint).toBeDefined();
      expect(blueprint?.title).toContain('The Financial Blueprint');
      expect(blueprint?.status).toBe('Opening soon');

      const reforest = getOpenCallBySlug('reforest-romania');
      expect(reforest).toBeDefined();
      expect(reforest?.status).toBe('Closed');
    });
  });

  describe('getProjects', () => {
    it('contains strictly the 2 real projects: ReForest and The Financial Blueprint', () => {
      const projects = getProjects();
      expect(projects.length).toBe(2);

      const reforest = getProjectBySlug('reforest');
      expect(reforest).toBeDefined();
      expect(reforest?.locationLabel).toContain('Lacu Roșu');
      expect(reforest?.status).toBe('Completed');

      const blueprint = getProjectBySlug('the-financial-blueprint');
      expect(blueprint).toBeDefined();
      expect(blueprint?.grantReference).toBe('2026-1-HU01-KA152-YOU-000399636');
      expect(blueprint?.status).toBe('Ongoing');
    });

    it('filters projects by status', () => {
      const completed = getProjects({ status: 'Completed' });
      expect(completed.length).toBe(1);
      expect(completed[0].slug).toBe('reforest');

      const ongoing = getProjects({ status: 'Ongoing' });
      expect(ongoing.length).toBe(1);
      expect(ongoing[0].slug).toBe('the-financial-blueprint');
    });
  });

  describe('getTeam', () => {
    it('returns the 5 core team members defined in the brief', () => {
      const team = getTeam();
      expect(team.length).toBe(5);

      const names = team.map((t) => t.name);
      expect(names).toContain('Zeid Isaac');
      expect(names).toContain('Roberta Szabó');
      expect(names).toContain('Jázmin Szabó');
      expect(names).toContain('Jordan Smith');
      expect(names).toContain('Mehmet Ismail');
    });
  });

  describe('getAtlasNodes', () => {
    it('returns exactly the 4 clean orbital system nodes', () => {
      const nodes = getAtlasNodes();
      expect(nodes.length).toBe(4);

      const [hq, reforest, blueprint, partner] = nodes;

      expect(hq.id).toBe('orion-hq');
      expect(hq.kind).toBe('hq');
      expect(hq.coordinates).toEqual(ORION_ORG.coordinates);
      expect(hq.href).toBe('/about');

      expect(reforest.id).toBe('project-reforest');
      expect(reforest.kind).toBe('project');
      expect(reforest.statusLabel).toBe('Completed');
      expect(reforest.href).toBe('/projects/reforest');

      expect(blueprint.id).toBe('call-the-financial-blueprint');
      expect(blueprint.kind).toBe('open-call');
      expect(blueprint.statusLabel).toBe('Opening soon');
      expect(blueprint.href).toBe('/open-calls/the-financial-blueprint');

      expect(partner.id).toBe('partner-horizon');
      expect(partner.kind).toBe('open-call');
      expect(partner.statusLabel).toBe('Open');
      expect(partner.href).toBe('/partners');
    });
  });
});
