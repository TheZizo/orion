import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ORION_ORG } from '@/lib/orionData';
import { validateContactMessage, validatePartnerInquiry } from '@/lib/storage';
import type { ContactMessage, PartnerInquiry } from '@/types/orion';

interface ContactApiPayload extends Partial<ContactMessage>, Partial<PartnerInquiry> {
  kind?: 'contact' | 'partner';
  orion_hp_trap?: string;
}

const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_RATE_LIMIT_ENTRIES = 1000;
const rateLimitStore = new Map<string, number[]>();

export function resetContactRateLimit(): void {
  rateLimitStore.clear();
}

function extractClientIp(request: Request): string {
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Reverse proxies append the connecting client IP to the right edge
    const lastIp = forwardedFor
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)
      .pop();
    if (lastIp) return lastIp;
  }

  return 'unknown';
}

function pruneExpiredRateLimits(now: number): void {
  const windowStart = now - WINDOW_MS;
  for (const [key, timestamps] of rateLimitStore.entries()) {
    const active = timestamps.filter((ts) => ts > windowStart);
    if (active.length === 0) {
      rateLimitStore.delete(key);
    } else {
      rateLimitStore.set(key, active);
    }
  }
  while (rateLimitStore.size > MAX_RATE_LIMIT_ENTRIES) {
    const oldestKey = rateLimitStore.keys().next().value;
    if (oldestKey === undefined) break;
    rateLimitStore.delete(oldestKey);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  pruneExpiredRateLimits(now);

  const recent = (rateLimitStore.get(ip) ?? []).filter((ts) => ts > windowStart);

  if (recent.length >= MAX_REQUESTS) {
    rateLimitStore.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
}

function isAllowedOrigin(headerValue: string): boolean {
  try {
    const parsedOrigin = new URL(headerValue);
    if (parsedOrigin.protocol !== 'https:') {
      return false;
    }

    const configuredSiteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://www.orionyouth.eu';
    let configuredOrigin = 'https://www.orionyouth.eu';
    try {
      configuredOrigin = new URL(configuredSiteUrl).origin;
    } catch {
      configuredOrigin = 'https://www.orionyouth.eu';
    }

    const allowedOrigins = new Set([
      'https://orionyouth.eu',
      'https://www.orionyouth.eu',
      configuredOrigin,
    ]);

    return allowedOrigins.has(parsedOrigin.origin);
  } catch {
    return false;
  }
}

function generateId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cleanSingleLine(value: unknown): string {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim();
}

function renderHtmlSection(
  heading: string,
  rows: Array<[label: string, value: string]>,
  message: string
): string {
  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;font-weight:600;color:#4a5568;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#111827;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  const messageHtml = escapeHtml(message).replace(/\r?\n/g, '<br />');

  return [
    '<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#111827;line-height:1.5;">',
    `<h2 style="margin:0 0 16px;font-size:18px;color:#0f172a;">${escapeHtml(heading)}</h2>`,
    `<table style="border-collapse:collapse;width:100%;margin-bottom:20px;font-size:14px;">${rowsHtml}</table>`,
    '<div style="padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;font-size:14px;color:#111827;">',
    '<div style="font-weight:600;color:#4a5568;margin-bottom:8px;">Message</div>',
    `<div>${messageHtml}</div>`,
    '</div>',
    '</div>',
  ].join('');
}

function formatEmailPayload(body: ContactApiPayload, kind: 'contact' | 'partner'): {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
} {
  if (kind === 'partner') {
    const org = cleanSingleLine(body.organizationName);
    const country = cleanSingleLine(body.country);
    const contactPerson = cleanSingleLine(body.contactPerson);
    const email = cleanSingleLine(body.email);
    const topic = cleanSingleLine(body.topic);
    const message = String(body.message ?? '').trim();

    return {
      subject: `[Orion Partner Inquiry] ${topic} — ${org} (${country})`,
      replyTo: email,
      html: renderHtmlSection(
        'New Erasmus+ Partnership Inquiry via orionyouth.eu',
        [
          ['Organisation', org],
          ['Country', country],
          ['Contact Person', contactPerson],
          ['Official Email', email],
          ['Topic', topic],
        ],
        message
      ),
      text: [
        `New Erasmus+ Partnership Inquiry via orionyouth.eu`,
        ``,
        `Organisation: ${org}`,
        `Country: ${country}`,
        `Contact Person: ${contactPerson}`,
        `Official Email: ${email}`,
        `Topic: ${topic}`,
        ``,
        `Message:`,
        message,
      ].join('\n'),
    };
  }

  const modeLabel = body.mode === 'partner' ? 'Partner / Institution' : 'Participant';
  const name = cleanSingleLine(body.name);
  const email = cleanSingleLine(body.email);
  const subjectLine = cleanSingleLine(body.subject);
  const message = String(body.message ?? '').trim();

  return {
    subject: `[Orion Contact · ${modeLabel}] ${subjectLine}`,
    replyTo: email,
    html: renderHtmlSection(
      'New Contact Message via orionyouth.eu',
      [
        ['Sender Mode', modeLabel],
        ['Name', name],
        ['Email', email],
        ['Subject', subjectLine],
      ],
      message
    ),
    text: [
      `New Contact Message via orionyouth.eu`,
      ``,
      `Sender Mode: ${modeLabel}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subjectLine}`,
      ``,
      `Message:`,
      message,
    ].join('\n'),
  };
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    const originHeader =
      request.headers.get('origin') ?? request.headers.get('referer');
    if (!originHeader || !isAllowedOrigin(originHeader)) {
      return NextResponse.json(
        { ok: false, error: 'Forbidden origin.' },
        { status: 403 }
      );
    }
  }

  const clientIp = extractClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Too many requests. Please wait a few minutes or email zeid@orionyouth.eu directly.',
      },
      { status: 429 }
    );
  }

  let body: ContactApiPayload;
  try {
    body = (await request.json()) as ContactApiPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON request body.' },
      { status: 400 }
    );
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json(
      { ok: false, error: 'Request payload must be a JSON object.' },
      { status: 400 }
    );
  }

  if (typeof body.orion_hp_trap === 'string' && body.orion_hp_trap.trim().length > 0) {
    return NextResponse.json(
      { ok: false, error: 'Invalid submission.' },
      { status: 400 }
    );
  }

  const kind: 'contact' | 'partner' = body.kind === 'partner' ? 'partner' : 'contact';
  const errors =
    kind === 'partner'
      ? validatePartnerInquiry(body)
      : validateContactMessage(body);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const id = generateId(kind);
  const recipient = ORION_ORG.email;
  const emailContent = formatEmailPayload(body, kind);

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const { data, error } = await resend.emails.send(
        {
          from: process.env.RESEND_FROM_EMAIL || 'Orion Website <onboarding@resend.dev>',
          to: [recipient],
          replyTo: emailContent.replyTo,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
        },
        { idempotencyKey: `${kind}/${id}` }
      );

      if (error) {
        console.error('[api/contact] Email provider error:', error.name, error.message);
        return NextResponse.json(
          { ok: false, error: 'Failed to dispatch email via provider.' },
          { status: 502 }
        );
      }

      console.info('[api/contact] Email dispatched via Resend:', {
        id,
        kind,
        emailId: data?.id,
      });

      return NextResponse.json(
        { ok: true, recipient, id, emailId: data?.id, delivery: 'resend' },
        { status: 200 }
      );
    } catch (err) {
      console.error('[api/contact] Email provider request failed:', err);
      return NextResponse.json(
        { ok: false, error: 'Failed to connect to email provider.' },
        { status: 502 }
      );
    }
  }

  if (process.env.NODE_ENV === 'production') {
    console.warn(
      '[api/contact] RESEND_API_KEY is not configured in production; rejecting automated relay:',
      { id, kind, recipient }
    );
    return NextResponse.json(
      {
        ok: false,
        code: 'RELAY_NOT_CONFIGURED',
        recipient,
        id,
        error:
          'Direct automated email relay is currently offline. Please send your prepared message using the direct email button below.',
      },
      { status: 503 }
    );
  }

  // Local / preview fallback when RESEND_API_KEY is not configured
  console.info('[api/contact] Dispatch queued (no RESEND_API_KEY configured):', {
    id,
    kind,
    recipient,
  });

  return NextResponse.json(
    { ok: true, recipient, id, delivery: 'logged' },
    { status: 200 }
  );
}
