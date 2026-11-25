import { NextResponse } from 'next/server';
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

function formatEmailPayload(body: ContactApiPayload, kind: 'contact' | 'partner'): {
  subject: string;
  text: string;
  replyTo: string;
} {
  if (kind === 'partner') {
    const org = String(body.organizationName ?? '').trim();
    const country = String(body.country ?? '').trim();
    const contactPerson = String(body.contactPerson ?? '').trim();
    const email = String(body.email ?? '').trim();
    const topic = String(body.topic ?? '').trim();
    const message = String(body.message ?? '').trim();

    return {
      subject: `[Orion Partner Inquiry] ${topic} — ${org} (${country})`,
      replyTo: email,
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
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const subjectLine = String(body.subject ?? '').trim();
  const message = String(body.message ?? '').trim();

  return {
    subject: `[Orion Contact · ${modeLabel}] ${subjectLine}`,
    replyTo: email,
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
      const providerResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'Orion Website <onboarding@resend.dev>',
          to: [recipient],
          reply_to: emailContent.replyTo,
          subject: emailContent.subject,
          text: emailContent.text,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (!providerResponse.ok) {
        const providerError = await providerResponse.text().catch(() => '');
        console.error('[api/contact] Email provider error:', providerResponse.status, providerError);
        return NextResponse.json(
          { ok: false, error: 'Failed to dispatch email via provider.' },
          { status: 502 }
        );
      }

      return NextResponse.json(
        { ok: true, recipient, id, delivery: 'resend' },
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
