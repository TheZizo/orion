import { NextResponse } from 'next/server';
import { ORION_ORG } from '@/lib/orionData';
import { validateContactMessage, validatePartnerInquiry } from '@/lib/storage';
import type { ContactMessage, PartnerInquiry } from '@/types/orion';

interface ContactApiPayload extends Partial<ContactMessage>, Partial<PartnerInquiry> {
  kind?: 'contact' | 'partner';
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
  let body: ContactApiPayload;
  try {
    body = (await request.json()) as ContactApiPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON request body.' },
      { status: 400 }
    );
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      { ok: false, error: 'Request payload must be a JSON object.' },
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

  const id = typeof body.id === 'string' && body.id.trim() ? body.id.trim() : generateId(kind);
  const recipient = ORION_ORG.email;
  const emailContent = formatEmailPayload(body, kind);

  const resendApiKey = process.env.RESEND_API_KEY;
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

  // Local / preview fallback when RESEND_API_KEY is not configured
  console.info('[api/contact] Dispatch queued (no RESEND_API_KEY configured):', {
    id,
    kind,
    recipient,
    subject: emailContent.subject,
    replyTo: emailContent.replyTo,
  });

  return NextResponse.json(
    { ok: true, recipient, id, delivery: 'logged' },
    { status: 200 }
  );
}
