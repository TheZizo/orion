import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TwoModeContactForm } from '../TwoModeContactForm';
import { ParticipantFaq, PARTICIPANT_FAQS } from '../ParticipantFaq';
import { contactRepository } from '@/lib/storage';

describe('Contact Partition Components', () => {
  describe('ParticipantFaq', () => {
    it('renders all required FAQ items using native details and summary', () => {
      render(<ParticipantFaq />);

      expect(PARTICIPANT_FAQS.length).toBeGreaterThanOrEqual(6);

      expect(
        screen.getByText(/do i need to pay anything to take part\?/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/i've never travelled alone before — is that okay\?/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/do i need to speak perfect english\?/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/what is a youthpass\?/i)).toBeInTheDocument();
      expect(
        screen.getByText(/how are travel costs reimbursed\?/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/who can apply\?/i)).toBeInTheDocument();
    });
  });

  describe('TwoModeContactForm', () => {
    beforeEach(() => {
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

    it('initializes in participant mode and renders participant copy and FAQ', () => {
      render(<TwoModeContactForm />);

      const participantTab = screen.getByRole('tab', {
        name: /i'm a young person applying/i,
      });
      expect(participantTab).toHaveAttribute('aria-selected', 'true');

      expect(
        screen.getByText(/ask anything about joining an orion mobility/i)
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: /frequently asked questions/i })
      ).toBeInTheDocument();
    });

    it('switches to partner mode via click, changes copy, and hides FAQ', () => {
      render(<TwoModeContactForm />);

      const partnerTab = screen.getByRole('tab', {
        name: /i represent a partner organization/i,
      });
      fireEvent.click(partnerTab);

      expect(partnerTab).toHaveAttribute('aria-selected', 'true');
      expect(
        screen.getByText(/institutional & consortium contact/i)
      ).toBeInTheDocument();

      // In partner mode, FAQ is replaced with link to /partners
      expect(
        screen.queryByRole('heading', { name: /frequently asked questions/i })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: /open institutional dossier/i })
      ).toBeInTheDocument();
    });

    it('supports arrow-key keyboard navigation between tabs', () => {
      render(<TwoModeContactForm />);

      const participantTab = screen.getByRole('tab', {
        name: /i'm a young person applying/i,
      });
      const partnerTab = screen.getByRole('tab', {
        name: /i represent a partner organization/i,
      });

      // Press ArrowRight from participant
      fireEvent.keyDown(participantTab, { key: 'ArrowRight' });
      expect(partnerTab).toHaveAttribute('aria-selected', 'true');

      // Press ArrowLeft from partner
      fireEvent.keyDown(partnerTab, { key: 'ArrowLeft' });
      expect(participantTab).toHaveAttribute('aria-selected', 'true');
    });

    it('validates required fields on empty submit', async () => {
      render(<TwoModeContactForm />);

      const submitBtn = screen.getByRole('button', {
        name: /send my question/i,
      });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(
          screen.getByText(/email address is required/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/subject is required/i)).toBeInTheDocument();
        expect(
          screen.getByText(/message content is required/i)
        ).toBeInTheDocument();
      });
    });

    it('submits valid message with participant mode and saves to contactRepository', async () => {
      const saveSpy = vi.spyOn(contactRepository, 'save');

      render(<TwoModeContactForm />);

      fireEvent.change(screen.getByLabelText(/your full name/i), {
        target: { value: 'Bence Varga' },
      });
      fireEvent.change(screen.getByLabelText(/your email address/i), {
        target: { value: 'bence@varga-mail.hu' },
      });
      fireEvent.change(screen.getByLabelText(/subject/i), {
        target: { value: 'Question regarding travel insurance' },
      });
      fireEvent.change(screen.getByLabelText(/message content/i), {
        target: {
          value:
            'Hello Orion! Do I need to buy private travel health insurance, or does European Health Insurance Card (EHIC) suffice?',
        },
      });

      const submitBtn = screen.getByRole('button', {
        name: /send my question/i,
      });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(saveSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            mode: 'participant',
            name: 'Bence Varga',
            email: 'bence@varga-mail.hu',
            subject: 'Question regarding travel insurance',
          })
        );
        expect(
          screen.getByTestId('contact-submission-success')
        ).toBeInTheDocument();
        expect(
          screen.getByText(/message received! we've got your back/i)
        ).toBeInTheDocument();
      });
    });

    it('submits valid message with partner mode and displays institutional tone confirmation', async () => {
      const saveSpy = vi.spyOn(contactRepository, 'save');

      render(<TwoModeContactForm />);

      const partnerTab = screen.getByRole('tab', {
        name: /i represent a partner organization/i,
      });
      fireEvent.click(partnerTab);

      fireEvent.change(screen.getByLabelText(/contact person & title/i), {
        target: { value: 'Elena Rossi' },
      });
      fireEvent.change(screen.getByLabelText(/your email address/i), {
        target: { value: 'elena@youth-service.it' },
      });
      fireEvent.change(screen.getByLabelText(/subject/i), {
        target: { value: 'KA153 consortium partner request' },
      });
      fireEvent.change(screen.getByLabelText(/message content/i), {
        target: {
          value:
            'We would like to discuss hosting a preliminary planning meeting in Rome or Debrecen for our 2027 initiative.',
        },
      });

      const submitBtn = screen.getByRole('button', {
        name: /transmit institutional dispatch/i,
      });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(saveSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            mode: 'partner',
            name: 'Elena Rossi',
          })
        );
        expect(
          screen.getByText(/institutional inquiry registered/i)
        ).toBeInTheDocument();
      });
    });

    it('renders HQ contact block with location and mailto link to zeid@orionyouth.eu', () => {
      render(<TwoModeContactForm />);

      expect(screen.getByText(/orion headquarters/i)).toBeInTheDocument();
      expect(screen.getByText(/debrecen, hungary/i)).toBeInTheDocument();
      expect(screen.queryByText(/47\.53° N, 21\.62° E/i)).toBeNull();

      const mailto = screen.getByRole('link', {
        name: 'zeid@orionyouth.eu',
      });
      expect(mailto).toHaveAttribute('href', 'mailto:zeid@orionyouth.eu');
    });

    it('updates email placeholder when switching to partner mode', () => {
      render(<TwoModeContactForm />);

      const emailInput = screen.getByLabelText(/your email address/i);
      expect(emailInput).toHaveAttribute('placeholder', 'e.g. bence@example.hu');

      const partnerTab = screen.getByRole('tab', {
        name: /i represent a partner organization/i,
      });
      fireEvent.click(partnerTab);

      expect(emailInput).toHaveAttribute(
        'placeholder',
        'e.g. maria.kovacs@youth-ngo.eu'
      );
    });

    it('renders contact-direct-email-fallback with preserved mailto link on 503 RELAY_NOT_CONFIGURED', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: false,
          status: 503,
          json: async () => ({
            ok: false,
            code: 'RELAY_NOT_CONFIGURED',
            error: 'Relay offline',
          }),
        })
      );

      render(<TwoModeContactForm />);

      const userMessage =
        'Hi Orion team, I would like to ask about train tickets from Budapest to Lacu Rosu.';

      fireEvent.change(screen.getByLabelText(/your full name/i), {
        target: { value: 'Bence Varga' },
      });
      fireEvent.change(screen.getByLabelText(/your email address/i), {
        target: { value: 'bence@varga-mail.hu' },
      });
      fireEvent.change(screen.getByLabelText(/subject/i), {
        target: { value: 'Travel reimbursement question' },
      });
      fireEvent.change(screen.getByLabelText(/message content/i), {
        target: { value: userMessage },
      });

      fireEvent.click(screen.getByRole('button', { name: /send my question/i }));

      await waitFor(() => {
        expect(
          screen.getByTestId('contact-direct-email-fallback')
        ).toBeInTheDocument();
      });

      const mailtoLink = screen.getByRole('link', {
        name: /open in email client \(zeid@orionyouth\.eu\)/i,
      });
      const href = mailtoLink.getAttribute('href') ?? '';
      expect(href).toContain('mailto:zeid@orionyouth.eu');
      expect(decodeURIComponent(href)).toContain(userMessage);
    });
  });
});
