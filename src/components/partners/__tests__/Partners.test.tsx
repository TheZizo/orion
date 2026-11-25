import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InstitutionalDossier } from '../InstitutionalDossier';
import { partnerInquiryRepository } from '@/lib/storage';

describe('Partners Partition Components', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ok: true, recipient: 'zeid@orionyouth.eu' }),
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('InstitutionalDossier (Partner Email Inquiry Hub)', () => {
    it('renders verbatim lead paragraph, official organisation name, direct dispatch side panel, and no OID or PIF download button', () => {
      render(<InstitutionalDossier />);

      const mandatoryLead =
        'Orion is an international youth initiative that turns participation into memories, growth, and human connection. Guided by the idea of a constellation of young changemakers who help each other navigate and move upward, we create programs that deliver measurable personal and cross-cultural impact.';

      expect(screen.getByText(mandatoryLead)).toBeInTheDocument();
      expect(
        screen.getAllByText('Orion Fiatalok Informális Csoportja').length
      ).toBeGreaterThan(0);
      expect(screen.getAllByText('Debrecen, Hungary').length).toBeGreaterThan(0);
      expect(screen.getByText('Zeid Isaac')).toBeInTheDocument();
      expect(screen.getByText('zeid@orionyouth.eu')).toBeInTheDocument();
      expect(screen.getByText('~2 business days')).toBeInTheDocument();
      expect(
        screen.getAllByText('2026-1-HU01-KA152-YOU-000399636').length
      ).toBeGreaterThan(0);

      // Must NOT render geographic coordinates, OID, or PIF download button
      expect(screen.queryByText(/47\.53° N, 21\.62° E/i)).toBeNull();
      expect(screen.queryByText(/E103XXXXX/i)).toBeNull();
      expect(screen.queryByText(/orion-pif\.pdf/i)).toBeNull();
    });

    it('validates required fields on empty submit', async () => {
      render(<InstitutionalDossier />);

      const submitBtn = screen.getByRole('button', {
        name: /send partnership inquiry/i,
      });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(
          screen.getByText(/organisation name is required/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/country is required/i)).toBeInTheDocument();
        expect(
          screen.getByText(/contact person name is required/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/email address is required/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/partnership topic is required/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            /please provide details regarding your partnership inquiry/i
          )
        ).toBeInTheDocument();
      });
    });

    it('saves valid partnership inquiry to repository and shows mailto confirmation to zeid@orionyouth.eu', async () => {
      const saveSpy = vi.spyOn(partnerInquiryRepository, 'save');

      render(<InstitutionalDossier />);

      fireEvent.change(screen.getByLabelText(/organisation name/i), {
        target: { value: 'Asociación Aurora' },
      });
      fireEvent.change(screen.getByLabelText(/country/i), {
        target: { value: 'Spain' },
      });
      fireEvent.change(screen.getByLabelText(/contact person/i), {
        target: { value: 'Sofia Ruiz' },
      });
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'sofia@aurora-youth.es' },
      });
      fireEvent.change(screen.getByLabelText(/partnership topic/i), {
        target: { value: 'KA152 Youth Exchange Consortium' },
      });
      fireEvent.change(
        screen.getByLabelText(/collaboration scope & message/i),
        {
          target: {
            value:
              'We are preparing a KA152 proposal and would love Orion Fiatalok Informális Csoportja to act as the Hungarian partner.',
          },
        }
      );

      const submitBtn = screen.getByRole('button', {
        name: /send partnership inquiry/i,
      });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(saveSpy).toHaveBeenCalledTimes(1);
        expect(
          screen.getByTestId('partner-inquiry-confirmation')
        ).toBeInTheDocument();
        expect(
          screen.getByText(/partnership inquiry ready for dispatch/i)
        ).toBeInTheDocument();
        expect(screen.getByText('Asociación Aurora')).toBeInTheDocument();

        const mailtoLink = screen.getByRole('link', {
          name: /open in email client \(zeid@orionyouth\.eu\)/i,
        });
        expect(mailtoLink.getAttribute('href')).toContain(
          'mailto:zeid@orionyouth.eu'
        );
      });
    });

    it('shows inline validation error and skips fetch when message is shorter than 20 characters', async () => {
      render(<InstitutionalDossier />);

      fireEvent.change(screen.getByLabelText(/organisation name/i), {
        target: { value: 'Asociación Aurora' },
      });
      fireEvent.change(screen.getByLabelText(/country/i), {
        target: { value: 'Spain' },
      });
      fireEvent.change(screen.getByLabelText(/contact person/i), {
        target: { value: 'Sofia Ruiz' },
      });
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'sofia@aurora-youth.es' },
      });
      fireEvent.change(screen.getByLabelText(/partnership topic/i), {
        target: { value: 'KA152 Consortium' },
      });
      fireEvent.change(
        screen.getByLabelText(/collaboration scope & message/i),
        {
          target: { value: 'Too short' },
        }
      );

      fireEvent.click(
        screen.getByRole('button', { name: /send partnership inquiry/i })
      );

      await waitFor(() => {
        expect(
          screen.getByText(/message must be at least 20 characters/i)
        ).toBeInTheDocument();
      });
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });
  });
});
