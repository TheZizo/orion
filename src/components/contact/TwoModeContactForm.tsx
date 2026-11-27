'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ContactMessage, ContactMode } from '@/types/orion';
import { contactRepository, validateContactMessage } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { ParticipantFaq } from './ParticipantFaq';

export function TwoModeContactForm() {
  const searchParams = useSearchParams();
  const paramMode = searchParams?.get('mode') ?? null;
  const paramSubject = searchParams?.get('subject')?.trim().slice(0, 150) ?? '';
  const searchKey = `${paramMode ?? ''}|${paramSubject}`;

  const [prevSearchKey, setPrevSearchKey] = useState(searchKey);
  const [mode, setMode] = useState<ContactMode>(() =>
    paramMode === 'partner' ? 'partner' : 'participant'
  );
  const [formData, setFormData] = useState<Partial<ContactMessage>>(() => ({
    name: '',
    email: '',
    subject: paramSubject,
    message: '',
  }));
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<ContactMessage | null>(
    null
  );
  const [fallbackMessage, setFallbackMessage] = useState<ContactMessage | null>(
    null
  );
  const [copiedFallback, setCopiedFallback] = useState(false);

  const participantTabRef = useRef<HTMLButtonElement>(null);
  const partnerTabRef = useRef<HTMLButtonElement>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (prevSearchKey !== searchKey) {
    setPrevSearchKey(searchKey);
    if (paramMode === 'partner' || paramMode === 'participant') {
      setMode(paramMode);
    }
    if (paramSubject) {
      setFormData((prev) => ({ ...prev, subject: paramSubject }));
    }
  }

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleModeChange = (newMode: ContactMode) => {
    setMode(newMode);
    setErrors({});
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (mode === 'participant') {
        handleModeChange('partner');
        partnerTabRef.current?.focus();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (mode === 'partner') {
        handleModeChange('participant');
        participantTabRef.current?.focus();
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const generateId = (): string => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

  const buildMailtoHref = (msg: ContactMessage) => {
    const subject = encodeURIComponent(msg.subject);
    const body = encodeURIComponent(
      `From: ${msg.name} (${msg.email})\nMode: ${msg.mode}\n\n${msg.message}`
    );
    return `mailto:zeid@orionyouth.eu?subject=${subject}&body=${body}`;
  };

  const handleCopyFallback = async () => {
    if (!fallbackMessage || typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }
    try {
      await navigator.clipboard.writeText(
        `Subject: ${fallbackMessage.subject}\nFrom: ${fallbackMessage.name} (${fallbackMessage.email})\n\n${fallbackMessage.message}`
      );
      setCopiedFallback(true);
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = setTimeout(() => setCopiedFallback(false), 2500);
    } catch {
      // Clipboard write unavailable
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const candidate: Partial<ContactMessage> = {
      ...formData,
      mode,
    };

    const validationErrors = validateContactMessage(candidate);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(`contact-${firstKey}`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    let record: ContactMessage | null = null;
    try {
      record = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        mode,
        name: formData.name!.trim(),
        email: formData.email!.trim(),
        subject: formData.subject!.trim(),
        message: formData.message!.trim(),
      };

      try {
        await contactRepository.save(record);
      } catch (storageErr) {
        console.warn('[TwoModeContactForm] Local storage persistence skipped:', storageErr);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'contact', ...record, orion_hp_trap: website }),
      });

      let data: {
        ok?: boolean;
        code?: string;
        error?: string;
        errors?: Record<string, string>;
      } | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.status === 400 && data?.errors) {
        setErrors(data.errors);
        const firstKey = Object.keys(data.errors)[0];
        const el = document.getElementById(`contact-${firstKey}`);
        if (el) el.focus();
        return;
      }

      if (response.status === 400) {
        setErrors({
          form: data?.error || 'Please check your entries and try again.',
        });
        return;
      }

      if (response.status === 429) {
        setErrors({
          form:
            data?.error ||
            'Too many requests. Please wait a few minutes or email zeid@orionyouth.eu directly.',
        });
        return;
      }

      if (
        (response.status === 503 && data?.code === 'RELAY_NOT_CONFIGURED') ||
        response.status === 502
      ) {
        setFallbackMessage(record);
        setErrors({});
        return;
      }

      if (!response.ok) {
        throw new Error(data?.error || `Dispatch failed with status ${response.status}`);
      }

      setSubmittedMessage(record);
      setErrors({});
    } catch (err) {
      console.error('[TwoModeContactForm] Submission failed:', err);
      if (record) {
        setFallbackMessage(record);
        setErrors({});
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (copyTimerRef.current) {
      clearTimeout(copyTimerRef.current);
      copyTimerRef.current = null;
    }
    setSubmittedMessage(null);
    setFallbackMessage(null);
    setCopiedFallback(false);
    setWebsite('');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <div className="space-y-12">
      {/* 2-Option Accessible Mode Selector */}
      <div
        role="tablist"
        aria-label="Contact purpose selector"
        onKeyDown={handleKeyDown}
        className="grid grid-cols-1 sm:grid-cols-2 border border-[rgba(11,19,43,0.15)] bg-transparent p-1 gap-1"
      >
        <button
          ref={participantTabRef}
          type="button"
          role="tab"
          id="tab-participant"
          aria-selected={mode === 'participant'}
          aria-controls="panel-contact"
          tabIndex={mode === 'participant' ? 0 : -1}
          onClick={() => handleModeChange('participant')}
          className={`py-3.5 px-5 text-left font-display text-sm md:text-base font-semibold tracking-tight transition-colors cursor-pointer select-none rounded-none border-t-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus-visible:ring-offset-2 ${
            mode === 'participant'
              ? 'bg-[#0B132B] text-[#F8F9FA] border-t-[#E35619]'
              : 'border-t-transparent text-[#0B132B] hover:bg-[rgba(11,19,43,0.04)]'
          }`}
        >
          <span className="block text-xs opacity-70">
            For individuals
          </span>
          I&apos;m a young person applying
        </button>

        <button
          ref={partnerTabRef}
          type="button"
          role="tab"
          id="tab-partner"
          aria-selected={mode === 'partner'}
          aria-controls="panel-contact"
          tabIndex={mode === 'partner' ? 0 : -1}
          onClick={() => handleModeChange('partner')}
          className={`py-3.5 px-5 text-left font-display text-sm md:text-base font-semibold tracking-tight transition-colors cursor-pointer select-none rounded-none border-t-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus-visible:ring-offset-2 ${
            mode === 'partner'
              ? 'bg-[#0B132B] text-[#F8F9FA] border-t-[#E35619]'
              : 'border-t-transparent text-[#0B132B] hover:bg-[rgba(11,19,43,0.04)]'
          }`}
        >
          <span className="block text-xs opacity-70">
            For NGOs &amp; institutions
          </span>
          I represent a partner organization
        </button>
      </div>

      {/* Main 2-Column Layout */}
      <div
        id="panel-contact"
        role="tabpanel"
        aria-labelledby={mode === 'participant' ? 'tab-participant' : 'tab-partner'}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
      >
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 min-w-0">
          {fallbackMessage ? (
            <div
              data-testid="contact-direct-email-fallback"
              className="bg-[#0B132B] text-[#F8F9FA] border-t-2 border-t-[#E35619] p-8 md:p-10 space-y-6"
            >
              <div className="border-b border-white/15 pb-4">
                <span className="text-xs font-semibold text-[#F8F9FA]/80 tabular-nums">
                  Message preserved locally (Ref: {fallbackMessage.id.slice(0, 8)})
                </span>
                <h3 className="type-h2 text-[#F8F9FA] mt-1">
                  Automated relay is temporarily offline
                </h3>
              </div>

              <p className="type-body text-[#F8F9FA]/85 leading-relaxed">
                Your message was saved safely so nothing was lost. Send it directly
                via your email client to{' '}
                <strong className="text-[#F8F9FA]">zeid@orionyouth.eu</strong> or copy
                the text below.
              </p>

              <div className="bg-[#111D3B]/80 border border-white/15 p-5 space-y-2 text-sm">
                <div className="text-[#F8F9FA] font-medium">
                  Subject: {fallbackMessage.subject}
                </div>
                <p className="text-[#F8F9FA]/85 whitespace-pre-line pt-2 border-t border-white/10">
                  {fallbackMessage.message}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={buildMailtoHref(fallbackMessage)}
                  className="inline-flex items-center justify-center bg-[#E35619] text-[#0B132B] font-display font-semibold text-sm px-6 py-3.5 rounded-none hover:bg-[#d04b12] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B132B]"
                >
                  Open in email client (zeid@orionyouth.eu)
                </a>
                <Button
                  variant="secondary"
                  tone="dark"
                  type="button"
                  onClick={handleCopyFallback}
                >
                  {copiedFallback ? 'Copied message' : 'Copy message'}
                </Button>
                <Button
                  variant="secondary"
                  tone="dark"
                  type="button"
                  onClick={handleReset}
                >
                  Edit or write another
                </Button>
              </div>
            </div>
          ) : submittedMessage ? (
            <div
              data-testid="contact-submission-success"
              className="bg-[#0B132B] text-[#F8F9FA] border-t-2 border-t-[#E35619] p-8 md:p-10 space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-white/15 pb-4">
                <span className="text-xs font-semibold text-[#F8F9FA]/80 tabular-nums">
                  Dispatch recorded (Ref: {submittedMessage.id.slice(0, 8)})
                </span>
              </div>

              {mode === 'participant' ? (
                <div className="space-y-4">
                  <h3 className="type-h2 text-[#F8F9FA]">
                    Message received! We&apos;ve got your back.
                  </h3>
                  <p className="type-body text-[#F8F9FA]/85 leading-relaxed">
                    Hey {submittedMessage.name}, thank you for reaching out. One
                    of our youth coordinators in Debrecen will read your message and
                    reply to <strong className="text-[#F8F9FA]">{submittedMessage.email}</strong>{' '}
                    shortly.
                  </p>
                  <p className="type-body text-[#F8F9FA]/85 leading-relaxed">
                    No question is too small—whether it&apos;s about packing, booking
                    trains, or language fears. You&apos;ve got this!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="type-h2 text-[#F8F9FA]">
                    Institutional inquiry registered
                  </h3>
                  <p className="type-body text-[#F8F9FA]/85 leading-relaxed">
                    Thank you, {submittedMessage.name}. Your correspondence has been
                    routed to the Orion international coordination board.
                  </p>
                  <p className="type-body text-[#F8F9FA]/85 leading-relaxed">
                    We will review your inquiry concerning &ldquo;{submittedMessage.subject}&rdquo;{' '}
                    and respond via <strong className="text-[#F8F9FA]">{submittedMessage.email}</strong> within{' '}
                    <span className="tabular-nums">2–3 business days</span>.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-white/15">
                <Button
                  variant="secondary"
                  tone="dark"
                  type="button"
                  onClick={handleReset}
                >
                  Send another message
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="border-t-2 border-t-[#0B132B] bg-white border-x border-b border-[rgba(11,19,43,0.10)] p-6 md:p-10 space-y-6"
            >
              <input
                type="text"
                name="orion_hp_trap"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="new-password"
                aria-hidden="true"
                className="sr-only"
              />

              {/* Context header matching active mode */}
              <div className="border-b border-[rgba(11,19,43,0.10)] pb-5">
                {mode === 'participant' ? (
                  <div className="space-y-1">
                    <h3 className="type-h3 text-[#0B132B]">
                      Ask anything about joining an Orion mobility
                    </h3>
                    <p className="type-body text-sm text-[rgba(11,19,43,0.7)]">
                      Got questions about applying, traveling, or what daily life is
                      like on a project? We&apos;re here for you.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="type-h3 text-[#0B132B]">
                      Institutional & consortium contact
                    </h3>
                    <p className="type-body text-sm text-[rgba(11,19,43,0.7)]">
                      Looking to collaborate on KA1 or KA2 Erasmus+ consortia? Connect
                      with our project management team in Debrecen.
                    </p>
                    <div className="pt-1">
                      <Link
                        href="/partners"
                        className="inline-flex items-center gap-1.5 text-xs text-[#0B132B] underline hover:text-[#e35619] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus-visible:ring-offset-2"
                      >
                        <span>View complete institutional dossier &amp; credentials</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {errors.form && (
                <div
                  role="alert"
                  className="p-4 border-l-2 border-[#B91C1C] bg-[#FEF2F2] text-[#B91C1C] text-sm font-semibold"
                >
                  {errors.form}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-medium text-sm text-[#0B132B] mb-2"
                >
                  {mode === 'participant' ? 'Your full name' : 'Contact person & title'}{' '}
                  <span className="text-[#B93E0A]">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  enterKeyHint="next"
                  value={formData.name || ''}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                  placeholder={
                    mode === 'participant'
                      ? 'e.g. Bence Varga'
                      : 'e.g. Dr. Maria Kovács, Head of Projects'
                  }
                  className={`w-full h-12 min-h-[48px] px-3 bg-white border text-[#0B132B] font-body text-base rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus-visible:ring-offset-2 focus:border-[#0B132B] ${
                    errors.name
                      ? 'border-[#B91C1C]'
                      : 'border-[rgba(11,19,43,0.26)]'
                  }`}
                />
                {errors.name && (
                  <p
                    id="err-name"
                    className="mt-1.5 border-l-2 border-[#B91C1C] pl-2 text-xs font-semibold text-[#B91C1C]"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-medium text-sm text-[#0B132B] mb-2"
                >
                  Your email address <span className="text-[#B93E0A]">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  enterKeyHint="next"
                  value={formData.email || ''}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  placeholder={
                    mode === 'participant'
                      ? 'e.g. bence@example.hu'
                      : 'e.g. maria.kovacs@youth-ngo.eu'
                  }
                  className={`w-full h-12 min-h-[48px] px-3 bg-white border text-[#0B132B] font-body text-base rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus-visible:ring-offset-2 focus:border-[#0B132B] ${
                    errors.email
                      ? 'border-[#B91C1C]'
                      : 'border-[rgba(11,19,43,0.26)]'
                  }`}
                />
                {errors.email && (
                  <p
                    id="err-email"
                    className="mt-1.5 border-l-2 border-[#B91C1C] pl-2 text-xs font-semibold text-[#B91C1C]"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block font-medium text-sm text-[#0B132B] mb-2"
                >
                  Subject <span className="text-[#B93E0A]">*</span>
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  enterKeyHint="next"
                  value={formData.subject || ''}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'err-subject' : undefined}
                  placeholder={
                    mode === 'participant'
                      ? 'e.g. Question about travel reimbursement for Portugal'
                      : 'e.g. KA210 Small-scale partnership mandate invitation'
                  }
                  className={`w-full h-12 min-h-[48px] px-3 bg-white border text-[#0B132B] font-body text-base rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus-visible:ring-offset-2 focus:border-[#0B132B] ${
                    errors.subject
                      ? 'border-[#B91C1C]'
                      : 'border-[rgba(11,19,43,0.26)]'
                  }`}
                />
                {errors.subject && (
                  <p
                    id="err-subject"
                    className="mt-1.5 border-l-2 border-[#B91C1C] pl-2 text-xs font-semibold text-[#B91C1C]"
                  >
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-medium text-sm text-[#0B132B] mb-2"
                >
                  Message content <span className="text-[#B93E0A]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message || ''}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'err-message' : undefined}
                  placeholder={
                    mode === 'participant'
                      ? 'Tell us what you are wondering about! Are you nervous about speaking English, or curious about the venue?'
                      : 'Please outline your inquiry, partner profile, or collaboration objectives.'
                  }
                  className={`w-full min-h-[48px] p-3 bg-white border text-[#0B132B] font-body text-base rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus-visible:ring-offset-2 focus:border-[#0B132B] ${
                    errors.message
                      ? 'border-[#B91C1C]'
                      : 'border-[rgba(11,19,43,0.26)]'
                  }`}
                />
                {errors.message && (
                  <p
                    id="err-message"
                    className="mt-1.5 border-l-2 border-[#B91C1C] pl-2 text-xs font-semibold text-[#B91C1C]"
                  >
                    {errors.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-[rgba(11,19,43,0.68)]">
                  Minimum 10 characters required. Maximum 3,000 characters.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? 'Transmitting message...'
                    : mode === 'participant'
                      ? 'Send my question'
                      : 'Transmit institutional dispatch'}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Column (5 cols): HQ Anchor Dock + ParticipantFaq */}
        <div className="lg:col-span-5 min-w-0 space-y-8">
          {/* Headquarters Anchor Dock */}
          <div className="bg-[#0B132B] text-[#F8F9FA] border-t-2 border-t-[#E35619] relative overflow-hidden p-6 md:p-8 space-y-5">
            <svg
              aria-hidden="true"
              viewBox="0 0 120 120"
              className="pointer-events-none absolute top-0 right-0 w-28 h-28 opacity-25"
              fill="none"
            >
              <circle cx="92" cy="24" r="1.5" fill="#E35619" />
              <circle cx="72" cy="18" r="1" fill="#F8F9FA" />
              <circle cx="104" cy="46" r="1" fill="#F8F9FA" />
              <circle cx="84" cy="42" r="0.8" fill="#F8F9FA" />
              <circle cx="54" cy="30" r="0.8" fill="#F8F9FA" />
              <circle cx="96" cy="68" r="0.8" fill="#F8F9FA" />
              <path
                d="M72 18L92 24L104 46"
                stroke="#F8F9FA"
                strokeOpacity="0.28"
                strokeWidth="0.6"
              />
            </svg>

            <div className="relative border-b border-white/15 pb-4">
              <span className="text-xs font-medium text-[#F8F9FA]/75">
                Permanent Anchor
              </span>
              <h4 className="type-h3 text-[#F8F9FA] mt-1">Orion Headquarters</h4>
            </div>

            <dl className="relative divide-y divide-white/10 text-sm">
              <div className="pb-3.5">
                <dt className="text-xs font-semibold text-[#F8F9FA]/70">
                  Location
                </dt>
                <dd className="mt-1">
                  <span className="block font-semibold text-[#F8F9FA]">
                    Debrecen, Hungary
                  </span>
                </dd>
              </div>

              <div className="py-3.5">
                <dt className="text-xs font-semibold text-[#F8F9FA]/70">
                  Direct Dispatch Email
                </dt>
                <dd className="mt-1">
                  <a
                    href="mailto:zeid@orionyouth.eu"
                    className="text-sm font-semibold text-[#F8F9FA] underline underline-offset-4 decoration-[#E35619] hover:text-[#F8F9FA]/85 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B132B]"
                  >
                    zeid@orionyouth.eu
                  </a>
                </dd>
              </div>

              <div className="pt-3.5">
                <dt className="text-xs font-semibold text-[#F8F9FA]/70">
                  Response Cadence
                </dt>
                <dd className="text-xs text-[#F8F9FA]/85 mt-1 leading-relaxed tabular-nums">
                  Participant inquiries: ~24–48 hours
                  <br />
                  Institutional proposals: ~2–3 business days
                </dd>
              </div>
            </dl>
          </div>

          {/* FAQ Section (Visible in participant mode) */}
          {mode === 'participant' ? (
            <ParticipantFaq />
          ) : (
            <div className="border-t-2 border-t-[#E35619] bg-white border-x border-b border-[rgba(11,19,43,0.10)] p-6 space-y-3">
              <h4 className="font-display font-semibold text-[#0B132B]">
                Looking for structured KA1/KA2 proposals?
              </h4>
              <p className="type-body text-sm text-[rgba(11,19,43,0.75)]">
                For detailed consortium formation, official mandates, and direct
                project coordination with Orion Fiatalok Informális Csoportja,
                visit our Partner Inquiry Hub.
              </p>
              <div className="pt-2">
                <Button variant="secondary" tone="light" href="/partners">
                  Open Institutional Dossier
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
