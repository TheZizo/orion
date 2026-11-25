'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PartnerInquiry } from '@/types/orion';
import { partnerInquiryRepository, validatePartnerInquiry } from '@/lib/storage';
import { Button } from '@/components/ui/Button';

interface PartnerFormState {
  organizationName: string;
  country: string;
  contactPerson: string;
  email: string;
  topic: string;
  message: string;
}

const INITIAL_FORM_STATE: PartnerFormState = {
  organizationName: '',
  country: '',
  contactPerson: '',
  email: '',
  topic: '',
  message: '',
};

export function InstitutionalDossier() {
  const [formData, setFormData] = useState<PartnerFormState>(INITIAL_FORM_STATE);
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<PartnerInquiry | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<'resend' | 'mailto'>('mailto');
  const [copiedInquiry, setCopiedInquiry] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

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
    return `inquiry-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

  const buildMailtoHref = (inquiry: {
    organizationName: string;
    country: string;
    contactPerson: string;
    email: string;
    topic: string;
    message: string;
  }) => {
    const subject = encodeURIComponent(
      `[Erasmus+ Partnership Inquiry] ${inquiry.topic} - ${inquiry.organizationName} (${inquiry.country})`
    );
    const body = encodeURIComponent(
      `Organisation: ${inquiry.organizationName}\nCountry: ${inquiry.country}\nContact Person: ${inquiry.contactPerson}\nOfficial Email: ${inquiry.email}\nPartnership Topic: ${inquiry.topic}\n\nMessage:\n${inquiry.message}`
    );
    return `mailto:zeid@orionyouth.eu?subject=${subject}&body=${body}`;
  };

  const buildPlaintextInquiry = (inquiry: PartnerInquiry): string =>
    [
      `Organisation: ${inquiry.organizationName}`,
      `Country: ${inquiry.country}`,
      `Contact Person: ${inquiry.contactPerson}`,
      `Official Email: ${inquiry.email}`,
      `Partnership Topic: ${inquiry.topic}`,
      ``,
      `Message:`,
      inquiry.message,
    ].join('\n');

  const handleCopyInquiry = async () => {
    if (!submittedInquiry || typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }
    try {
      await navigator.clipboard.writeText(buildPlaintextInquiry(submittedInquiry));
      setCopiedInquiry(true);
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = setTimeout(() => setCopiedInquiry(false), 2500);
    } catch {
      // Clipboard write unavailable
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validatePartnerInquiry(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(`partner-${firstKey}`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    let record: PartnerInquiry | null = null;
    try {
      record = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        organizationName: formData.organizationName.trim(),
        country: formData.country.trim(),
        contactPerson: formData.contactPerson.trim(),
        email: formData.email.trim(),
        projectType: 'Erasmus+ Partnership',
        topic: formData.topic.trim(),
        message: formData.message.trim(),
      };

      try {
        await partnerInquiryRepository.save(record);
      } catch (storageErr) {
        console.warn('[InstitutionalDossier] Local storage persistence skipped:', storageErr);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'partner', ...record, orion_hp_trap: website }),
      });

      let data: {
        ok?: boolean;
        code?: string;
        delivery?: string;
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
        const el = document.getElementById(`partner-${firstKey}`);
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

      if (response.ok && data?.delivery === 'resend') {
        setDeliveryMode('resend');
        setSubmittedInquiry(record);
        setErrors({});
        return;
      }

      if (
        response.status === 503 ||
        response.status === 502 ||
        (response.ok && data?.delivery !== 'resend')
      ) {
        setDeliveryMode('mailto');
        setSubmittedInquiry(record);
        setErrors({});
        return;
      }

      throw new Error(data?.error || `Dispatch failed with status ${response.status}`);
    } catch (err) {
      console.error('[InstitutionalDossier] Submission failed:', err);
      if (record) {
        setDeliveryMode('mailto');
        setSubmittedInquiry(record);
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
    setSubmittedInquiry(null);
    setDeliveryMode('mailto');
    setCopiedInquiry(false);
    setWebsite('');
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
  };

  return (
    <div className="space-y-20 md:space-y-28">
      {/* Verbatim Lead Paragraph & Partnership Introduction */}
      <section className="space-y-6 max-w-4xl">
        <p className="type-body-lg text-xl md:text-2xl text-[#0B132B] font-medium leading-relaxed">
          Orion is an international youth initiative that turns participation into
          memories, growth, and human connection. Guided by the idea of a
          constellation of young changemakers who help each other navigate and move
          upward, we create programs that deliver measurable personal and
          cross-cultural impact.
        </p>

        <p className="type-body text-[rgba(11,19,43,0.75)] leading-relaxed">
          Anchored in <strong>Debrecen, Hungary</strong>,{' '}
          <strong>Orion Fiatalok Informális Csoportja</strong> collaborates with
          European youth NGOs, grassroots collectives, and educational initiatives on
          Erasmus+ KA1 Youth Exchanges, youth worker mobilities, and KA2 cooperation
          partnerships. Use the form below to email our coordination team directly.
        </p>
      </section>

      {/* Main 12-Column Partner Email Inquiry Hub */}
      <section
        id="partner-inquiry"
        aria-labelledby="partner-inquiry-heading"
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start border-t border-[rgba(11,19,43,0.12)] pt-12"
      >
        {/* Left 7 Columns: Partner Email Inquiry Form */}
        <div className="lg:col-span-7">
          {submittedInquiry ? (
            <div
              data-testid="partner-inquiry-confirmation"
              className="border border-[rgba(11,19,43,0.15)] bg-white p-8 md:p-10 space-y-6"
            >
              <div className="border-b border-[rgba(11,19,43,0.12)] pb-4">
                <span className="text-xs font-semibold text-[#0B132B] tabular-nums">
                  Inquiry recorded, reference {submittedInquiry.id.slice(0, 8)}
                </span>
                <h2 className="type-h2 text-[#0B132B] mt-1">
                  {deliveryMode === 'resend'
                    ? 'Partnership inquiry dispatched'
                    : 'Partnership inquiry ready for dispatch'}
                </h2>
              </div>

              {deliveryMode === 'resend' ? (
                <p className="type-body text-[rgba(11,19,43,0.85)] leading-relaxed">
                  Thank you, <strong className="text-[#0B132B]">{submittedInquiry.contactPerson}</strong>.
                  Your inquiry on behalf of{' '}
                  <strong className="text-[#0B132B]">{submittedInquiry.organizationName}</strong>{' '}
                  ({submittedInquiry.country}) has been delivered directly to{' '}
                  <strong className="text-[#0B132B]">zeid@orionyouth.eu</strong>. Our
                  coordination desk typically responds within ~2 business days.
                </p>
              ) : (
                <p className="type-body text-[rgba(11,19,43,0.85)] leading-relaxed">
                  Thank you, <strong className="text-[#0B132B]">{submittedInquiry.contactPerson}</strong>.
                  Your inquiry on behalf of{' '}
                  <strong className="text-[#0B132B]">{submittedInquiry.organizationName}</strong>{' '}
                  ({submittedInquiry.country}) has been saved. Click below to open your
                  email client with the pre-addressed dispatch to{' '}
                  <strong className="text-[#0B132B]">zeid@orionyouth.eu</strong>, or copy
                  the preview for your records.
                </p>
              )}

              {/* Message Preview Box */}
              <div className="border border-[rgba(11,19,43,0.14)] bg-[#F8F9FA] p-5 space-y-2 text-sm">
                <div className="text-xs font-semibold text-[rgba(11,19,43,0.6)]">
                  Prepared email preview
                </div>
                <div className="text-[#0B132B] font-medium">
                  To: zeid@orionyouth.eu
                </div>
                <div className="text-[#0B132B] font-medium">
                  Topic: {submittedInquiry.topic}
                </div>
                <p className="text-[rgba(11,19,43,0.8)] whitespace-pre-line pt-2 border-t border-[rgba(11,19,43,0.08)]">
                  {submittedInquiry.message}
                </p>
              </div>

              {deliveryMode === 'resend' ? (
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button variant="secondary" tone="light" onClick={handleReset}>
                    Write another inquiry
                  </Button>
                  <a
                    href={buildMailtoHref(submittedInquiry)}
                    className="text-xs font-semibold text-[#0B132B] underline hover:text-[#e35619] transition-colors"
                  >
                    Open in email client (zeid@orionyouth.eu)
                  </a>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={buildMailtoHref(submittedInquiry)}
                    className="inline-flex items-center justify-center bg-[#e35619] text-[#0B132B] font-display font-semibold text-sm px-6 py-3.5 rounded-none hover:bg-[#d04b12] transition-colors"
                  >
                    Open in email client (zeid@orionyouth.eu)
                  </a>
                  <Button variant="secondary" tone="light" type="button" onClick={handleCopyInquiry}>
                    {copiedInquiry ? 'Copied inquiry text' : 'Copy inquiry text'}
                  </Button>
                  <Button variant="secondary" tone="light" onClick={handleReset}>
                    Write another inquiry
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="border border-[rgba(11,19,43,0.15)] bg-[#F8F9FA] p-6 md:p-10 space-y-6"
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

              <div className="border-b border-[rgba(11,19,43,0.10)] pb-5 space-y-1.5">
                <span className="text-xs font-semibold text-[rgba(11,19,43,0.6)] block">
                  Consortium &amp; mobility inquiries
                </span>
                <h2 id="partner-inquiry-heading" className="type-h2 text-[#0B132B]">
                  Email our partnership coordinator
                </h2>
                <p className="type-body text-sm text-[rgba(11,19,43,0.72)]">
                  Share your project concept, target call deadline, and how we can
                  collaborate.
                </p>
              </div>

              {errors.form && (
                <div
                  role="alert"
                  className="p-4 border-l-2 border-[#B91C1C] bg-[#FEF2F2] text-[#B91C1C] text-sm font-semibold"
                >
                  {errors.form}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Organisation Name */}
                <div>
                  <label
                    htmlFor="partner-organizationName"
                    className="block text-xs font-semibold text-[#0B132B] mb-2"
                  >
                    Organisation name <span className="text-[#B93E0A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="partner-organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={Boolean(errors.organizationName)}
                    aria-describedby={
                      errors.organizationName ? 'err-partner-org' : undefined
                    }
                    placeholder="e.g. Asociación Aurora"
                    className={`w-full h-12 px-3.5 bg-white border text-[#0B132B] font-body text-sm rounded-none focus-visible:outline-none focus:border-[#0B132B] focus:ring-1 focus:ring-[#0B132B] ${
                      errors.organizationName
                        ? 'border-[#B91C1C]'
                        : 'border-[rgba(11,19,43,0.26)]'
                    }`}
                  />
                  {errors.organizationName && (
                    <p
                      id="err-partner-org"
                      className="mt-1.5 border-l-2 border-[#B91C1C] pl-2 text-xs font-semibold text-[#B91C1C]"
                    >
                      {errors.organizationName}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="partner-country"
                    className="block text-xs font-semibold text-[#0B132B] mb-2"
                  >
                    Country <span className="text-[#B93E0A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="partner-country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={Boolean(errors.country)}
                    aria-describedby={
                      errors.country ? 'err-partner-country' : undefined
                    }
                    placeholder="e.g. Spain"
                    className={`w-full h-12 px-3.5 bg-white border text-[#0B132B] font-body text-sm rounded-none focus-visible:outline-none focus:border-[#0B132B] focus:ring-1 focus:ring-[#0B132B] ${
                      errors.country
                        ? 'border-[#B91C1C]'
                        : 'border-[rgba(11,19,43,0.26)]'
                    }`}
                  />
                  {errors.country && (
                    <p
                      id="err-partner-country"
                      className="mt-1.5 border-l-2 border-[#B91C1C] pl-2 text-xs font-semibold text-[#B91C1C]"
                    >
                      {errors.country}
                    </p>
                  )}
                </div>

                {/* Contact Person */}
                <div>
                  <label
                    htmlFor="partner-contactPerson"
                    className="block text-xs font-semibold text-[#0B132B] mb-2"
                  >
                    Contact person <span className="text-[#B93E0A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="partner-contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={Boolean(errors.contactPerson)}
                    aria-describedby={
                      errors.contactPerson ? 'err-partner-contact' : undefined
                    }
                    placeholder="e.g. Sofia Ruiz"
                    className={`w-full h-12 px-3.5 bg-white border text-[#0B132B] font-body text-sm rounded-none focus-visible:outline-none focus:border-[#0B132B] focus:ring-1 focus:ring-[#0B132B] ${
                      errors.contactPerson
                        ? 'border-[#B91C1C]'
                        : 'border-[rgba(11,19,43,0.26)]'
                    }`}
                  />
                  {errors.contactPerson && (
                    <p
                      id="err-partner-contact"
                      className="mt-1.5 border-l-2 border-[#B91C1C] pl-2 text-xs font-semibold text-[#B91C1C]"
                    >
                      {errors.contactPerson}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="partner-email"
                    className="block text-xs font-semibold text-[#0B132B] mb-2"
                  >
                    Email address <span className="text-[#B93E0A]">*</span>
                  </label>
                  <input
                    type="email"
                    id="partner-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? 'err-partner-email' : undefined
                    }
                    placeholder="e.g. sofia@aurora-youth.es"
                    className={`w-full h-12 px-3.5 bg-white border text-[#0B132B] font-body text-sm rounded-none focus-visible:outline-none focus:border-[#0B132B] focus:ring-1 focus:ring-[#0B132B] ${
                      errors.email
                        ? 'border-[#B91C1C]'
                        : 'border-[rgba(11,19,43,0.26)]'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="err-partner-email"
                      className="mt-1.5 border-l-2 border-[#B91C1C] pl-2 text-xs font-semibold text-[#B91C1C]"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Partnership Topic */}
              <div>
                <label
                  htmlFor="partner-topic"
                  className="block text-xs font-semibold text-[#0B132B] mb-2"
                >
                  Partnership topic <span className="text-[#B93E0A]">*</span>
                </label>
                <input
                  type="text"
                  id="partner-topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={Boolean(errors.topic)}
                  aria-describedby={
                    errors.topic ? 'err-partner-topic' : undefined
                  }
                  placeholder="e.g. KA152 Youth Exchange consortium invitation"
                  className={`w-full h-12 px-3.5 bg-white border text-[#0B132B] font-body text-sm rounded-none focus-visible:outline-none focus:border-[#0B132B] focus:ring-1 focus:ring-[#0B132B] ${
                    errors.topic
                      ? 'border-[#B91C1C]'
                      : 'border-[rgba(11,19,43,0.26)]'
                  }`}
                />
                {errors.topic && (
                  <p
                    id="err-partner-topic"
                    className="mt-1.5 border-l-2 border-[#B91C1C] pl-2 text-xs font-semibold text-[#B91C1C]"
                  >
                    {errors.topic}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="partner-message"
                  className="block text-xs font-semibold text-[#0B132B] mb-2"
                >
                  Collaboration scope &amp; message{' '}
                  <span className="text-[#B93E0A]">*</span>
                </label>
                <textarea
                  id="partner-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'err-partner-message' : undefined
                  }
                  placeholder="Tell us about your project concept, target timeline, and proposed role for Orion..."
                  className={`w-full p-3.5 bg-white border text-[#0B132B] font-body text-sm rounded-none focus-visible:outline-none focus:border-[#0B132B] focus:ring-1 focus:ring-[#0B132B] ${
                    errors.message
                      ? 'border-[#B91C1C]'
                      : 'border-[rgba(11,19,43,0.26)]'
                  }`}
                />
                {errors.message && (
                  <p
                    id="err-partner-message"
                    className="mt-1.5 border-l-2 border-[#B91C1C] pl-2 text-xs font-semibold text-[#B91C1C]"
                  >
                    {errors.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-[rgba(11,19,43,0.68)]">
                  Minimum 20 characters required. Maximum 4,000 characters.
                </p>
              </div>

              <div className="pt-2">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? 'Preparing inquiry...'
                    : 'Send partnership inquiry'}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Right 5 Columns: Direct Dispatch Side Panel */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="border border-[rgba(11,19,43,0.15)] bg-white p-6 md:p-8 space-y-6">
            <div className="border-b border-[rgba(11,19,43,0.12)] pb-4">
              <span className="text-xs font-semibold text-[rgba(11,19,43,0.6)] block">
                Direct dispatch
              </span>
              <h3 className="type-h3 text-[#0B132B] mt-1">
                Coordination desk
              </h3>
            </div>

            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold text-[rgba(11,19,43,0.6)]">
                  Organisation
                </dt>
                <dd className="text-[#0B132B] font-semibold mt-0.5">
                  Orion Fiatalok Informális Csoportja
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold text-[rgba(11,19,43,0.6)]">
                  Base location
                </dt>
                <dd className="text-[#0B132B] font-medium mt-0.5">
                  Debrecen, Hungary
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold text-[rgba(11,19,43,0.6)]">
                  Primary Coordinator
                </dt>
                <dd className="text-[#0B132B] font-semibold mt-0.5">
                  Zeid Isaac
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold text-[rgba(11,19,43,0.6)]">
                  Direct Email
                </dt>
                <dd className="mt-0.5">
                  <a
                    href="mailto:zeid@orionyouth.eu"
                    className="font-semibold text-[#0B132B] underline hover:text-[#e35619] transition-colors"
                  >
                    zeid@orionyouth.eu
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold text-[rgba(11,19,43,0.6)]">
                  Active Grant Reference
                </dt>
                <dd className="text-[#0B132B] font-semibold tabular-nums mt-0.5">
                  2026-1-HU01-KA152-YOU-000399636
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold text-[rgba(11,19,43,0.6)]">
                  Response cadence
                </dt>
                <dd className="text-[#0B132B] font-medium tabular-nums mt-0.5">
                  ~2 business days
                </dd>
              </div>
            </dl>

            <div className="border-t border-[rgba(11,19,43,0.12)] pt-4 text-xs text-[rgba(11,19,43,0.75)] leading-relaxed">
              Complete institutional registration details and signed partner
              mandates are exchanged directly upon inquiry.
            </div>
          </div>
        </aside>
      </section>

      {/* Our Competencies — Concise Prose Section */}
      <section className="space-y-8 border-t border-[rgba(11,19,43,0.10)] pt-16">
        <div>
          <h2 className="type-h2 text-[#0B132B]">Our competencies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-sm">
          <div className="space-y-2.5">
            <h3 className="type-h3 text-[#0B132B] text-lg md:text-xl">
              Youth exchanges and worker mobility
            </h3>
            <p className="type-body text-[rgba(11,19,43,0.75)] leading-relaxed">
              Comprehensive design and execution of KA152 Youth Exchanges and KA153
              Training Courses. We coordinate end-to-end logistics, green travel
              routes, and non-formal experiential curricula.
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="type-h3 text-[#0B132B] text-lg md:text-xl">
              Inclusion and diversity
            </h3>
            <p className="type-body text-[rgba(11,19,43,0.75)] leading-relaxed">
              Dedicated inclusion pathways for young people from Eastern Hungary
              facing geographical, economic, or social hurdles, with tailored
              pre-departure preparation and reinforced mentorship.
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="type-h3 text-[#0B132B] text-lg md:text-xl">
              Youthpass and safeguarding
            </h3>
            <p className="type-body text-[rgba(11,19,43,0.75)] leading-relaxed">
              Structured self-reflection and validation via the European Youthpass
              certificate, backed by verified safeguarding protocols and emotional
              safety standards across all mobilities.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Track Record — Concise Prose Section */}
      <section className="space-y-6 border-t border-[rgba(11,19,43,0.10)] pt-16">
        <h2 className="type-h2 text-[#0B132B]">Partnership track record</h2>
        <div className="max-w-3xl space-y-4 type-body text-[#0B132B] leading-relaxed">
          <p>
            Orion’s verified track record includes <strong>ReForest</strong>, a
            4-country Erasmus+ Youth Exchange (October 11–22, 2026) at Lacu Roșu
            Mountain Lodge in Harghita County, Romania, hosted by{' '}
            <em>Asociația Agoje</em> alongside <em>AzorEarth</em> (Portugal) and{' '}
            <em>Youth Group Novae</em> (Czechia).
          </p>
          <p>
            Our upcoming hosted initiative <strong>The Financial Blueprint</strong>{' '}
            (scheduled for March 2027 at Location TBA, Hungary) brings together 32
            young people aged 18–26 across Hungary, Romania, Spain, and Czechia
            under accredited grant{' '}
            <code className="tabular-nums">2026-1-HU01-KA152-YOU-000399636</code>.
          </p>
        </div>
      </section>
    </div>
  );
}
