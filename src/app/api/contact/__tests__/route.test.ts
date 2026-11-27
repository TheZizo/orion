import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const { sendMock, ResendMock } = vi.hoisted(() => {
  const sendMock = vi.fn();
  const ResendMock = vi.fn(function (this: { emails: { send: typeof sendMock } }) {
    this.emails = { send: sendMock };
  });
  return { sendMock, ResendMock };
});

vi.mock('resend', () => ({
  Resend: ResendMock,
}));

import { POST, resetContactRateLimit } from '../route';

describe('POST /api/contact', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.restoreAllMocks();
    sendMock.mockReset();
    ResendMock.mockClear();
    resetContactRateLimit();
    process.env = { ...originalEnv };
    delete process.env.RESEND_API_KEY;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('returns 400 when contact payload validation fails', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'contact',
        mode: 'participant',
        name: '',
        email: 'not-an-email',
        subject: '',
        message: 'short',
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.errors).toBeDefined();
    expect(data.errors.name).toBeDefined();
    expect(data.errors.email).toBeDefined();
  });

  it('returns 400 when partner payload validation fails', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'partner',
        organizationName: '',
        country: '',
        contactPerson: '',
        email: 'bad',
        topic: '',
        message: 'too short',
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.errors.organizationName).toBe('Organisation name is required.');
  });

  it('returns 400 when honeypot field is populated', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'contact',
        mode: 'participant',
        name: 'Bot User',
        email: 'bot@example.com',
        subject: 'Spam offer',
        message: 'This is an automated submission with a filled honeypot field.',
        orion_hp_trap: 'https://spam.example.com',
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.error).toBe('Invalid submission.');
  });

  it('enforces per-IP sliding window rate limit (429 after 5 requests)', async () => {
    const makeReq = () =>
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '203.0.113.42, 10.0.0.1',
        },
        body: JSON.stringify({
          kind: 'contact',
          mode: 'participant',
          name: 'Bence Varga',
          email: 'bence@varga-mail.hu',
          subject: 'Question regarding travel reimbursement',
          message: 'Hello Orion! Could you clarify how train tickets are reimbursed for Hungary?',
        }),
      });

    for (let i = 0; i < 5; i++) {
      const res = await POST(makeReq());
      expect(res.status).toBe(200);
    }

    const limitedRes = await POST(makeReq());
    const limitedData = await limitedRes.json();

    expect(limitedRes.status).toBe(429);
    expect(limitedData.ok).toBe(false);
    expect(limitedData.error).toContain('Too many requests');
  });

  it('returns 503 RELAY_NOT_CONFIGURED in production when RESEND_API_KEY is unset', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    delete process.env.RESEND_API_KEY;
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const req = new Request('https://www.orionyouth.eu/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        origin: 'https://www.orionyouth.eu',
      },
      body: JSON.stringify({
        kind: 'contact',
        mode: 'participant',
        name: 'Bence Varga',
        email: 'bence@varga-mail.hu',
        subject: 'Question regarding travel reimbursement',
        message: 'Hello Orion! Could you clarify how train tickets are reimbursed for Hungary?',
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(503);
    expect(data.ok).toBe(false);
    expect(data.code).toBe('RELAY_NOT_CONFIGURED');
    expect(data.recipient).toBe('zeid@orionyouth.eu');
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it('rejects requests from disallowed or missing origins in production with 403', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    const evilReq = new Request('https://www.orionyouth.eu/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        origin: 'https://evil.example.com',
      },
      body: JSON.stringify({
        kind: 'contact',
        mode: 'participant',
        name: 'Bence Varga',
        email: 'bence@varga-mail.hu',
        subject: 'Question regarding travel reimbursement',
        message: 'Hello Orion! Could you clarify how train tickets are reimbursed for Hungary?',
      }),
    });

    const evilRes = await POST(evilReq);
    const evilData = await evilRes.json();

    expect(evilRes.status).toBe(403);
    expect(evilData.ok).toBe(false);
    expect(evilData.error).toBe('Forbidden origin.');

    const noOriginReq = new Request('https://www.orionyouth.eu/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'contact',
        mode: 'participant',
        name: 'Bence Varga',
        email: 'bence@varga-mail.hu',
        subject: 'Question regarding travel reimbursement',
        message: 'Hello Orion! Could you clarify how train tickets are reimbursed for Hungary?',
      }),
    });

    const noOriginRes = await POST(noOriginReq);
    expect(noOriginRes.status).toBe(403);
  });

  it('dispatches valid contact message targeting zeid@orionyouth.eu (logged fallback when no API key)', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'contact',
        mode: 'participant',
        name: 'Bence Varga',
        email: 'bence@varga-mail.hu',
        subject: 'Question regarding travel reimbursement',
        message: 'Hello Orion! Could you clarify how train tickets are reimbursed for Hungary?',
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.recipient).toBe('zeid@orionyouth.eu');
    expect(data.delivery).toBe('logged');
  });

  it('dispatches valid partner inquiry via Resend when RESEND_API_KEY is configured', async () => {
    process.env.RESEND_API_KEY = 're_test_key';
    process.env.RESEND_FROM_EMAIL = 'Orion Website <noreply@send.orionyouth.eu>';
    sendMock.mockResolvedValue({
      data: { id: 'email_123' },
      error: null,
    });

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'partner',
        organizationName: 'Asociación Aurora',
        country: 'Spain',
        contactPerson: 'Sofia Ruiz',
        email: 'sofia@aurora-youth.es',
        topic: 'KA152 Youth Exchange Consortium',
        message:
          'We are preparing a <script>alert(1)</script> KA152 proposal and would love Orion to act as partner.',
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.recipient).toBe('zeid@orionyouth.eu');
    expect(data.emailId).toBe('email_123');
    expect(data.delivery).toBe('resend');
    expect(ResendMock).toHaveBeenCalledWith('re_test_key');
    expect(sendMock).toHaveBeenCalledTimes(1);

    const [sentPayload, requestOptions] = sendMock.mock.calls[0];
    expect(sentPayload.from).toBe('Orion Website <noreply@send.orionyouth.eu>');
    expect(sentPayload.to).toEqual(['zeid@orionyouth.eu']);
    expect(sentPayload.replyTo).toBe('sofia@aurora-youth.es');
    expect(sentPayload.subject).toContain('KA152 Youth Exchange Consortium');
    expect(sentPayload.text).toContain('Asociación Aurora');
    expect(sentPayload.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(sentPayload.html).not.toContain('<script>');
    expect(requestOptions).toEqual({
      idempotencyKey: expect.stringMatching(/^partner\//),
    });
  });

  it('returns 502 when Resend returns an error object', async () => {
    process.env.RESEND_API_KEY = 're_test_key';
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    sendMock.mockResolvedValue({
      data: null,
      error: {
        name: 'validation_error',
        message: 'The send.orionyouth.eu domain is not verified.',
      },
    });

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'contact',
        mode: 'participant',
        name: 'Bence Varga',
        email: 'bence@varga-mail.hu',
        subject: 'Question regarding travel reimbursement',
        message: 'Hello Orion! Could you clarify how train tickets are reimbursed for Hungary?',
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(502);
    expect(data.ok).toBe(false);
    expect(data.error).toBe('Failed to dispatch email via provider.');
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
