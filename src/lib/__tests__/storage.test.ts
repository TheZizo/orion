import { describe, it, expect, beforeEach } from 'vitest';
import {
  LocalStorageRepository,
  validatePartnerInquiry,
  validateContactMessage,
} from '@/lib/storage';
import { ContactMessage } from '@/types/orion';

describe('storage & validation', () => {
  describe('LocalStorageRepository', () => {
    const testKey = 'test:contact';
    let repo: LocalStorageRepository<ContactMessage>;

    beforeEach(() => {
      window.localStorage.clear();
      repo = new LocalStorageRepository<ContactMessage>(testKey);
    });

    it('saves and lists items correctly', async () => {
      const item: ContactMessage = {
        id: 'msg-1',
        createdAt: '2026-10-24T12:00:00Z',
        mode: 'participant',
        name: 'Test Participant',
        email: 'test@example.com',
        subject: 'Question about travel reimbursement',
        message: 'Can you confirm how train ticket reimbursement is documented?',
      };

      await repo.save(item);
      const list = await repo.list();
      expect(list.length).toBe(1);
      expect(list[0].id).toBe('msg-1');

      const fetched = await repo.getById('msg-1');
      expect(fetched?.name).toBe('Test Participant');
    });

    it('updates existing item if id matches', async () => {
      const item1: ContactMessage = {
        id: 'item-1',
        createdAt: '2026-10-24T12:00:00Z',
        mode: 'partner',
        name: 'Initial Contact',
        email: 'partner@example.org',
        subject: 'Initial subject',
        message: 'Initial partner message exceeding minimum characters.',
      };
      await repo.save(item1);

      const item1Updated: ContactMessage = {
        ...item1,
        subject: 'Updated subject',
      };
      await repo.save(item1Updated);

      const list = await repo.list();
      expect(list.length).toBe(1);
      expect(list[0].subject).toBe('Updated subject');
    });

    it('safely filters corrupted localStorage entries like null, numbers, or malformed items', async () => {
      window.localStorage.setItem(
        testKey,
        JSON.stringify([null, 123, 'malformed', { noId: 'fail' }, { id: 'ok', name: 'Valid' }])
      );
      const list = await repo.list();
      expect(list.length).toBe(1);
      expect(list[0].id).toBe('ok');

      const fetched = await repo.getById('ok');
      expect(fetched?.id).toBe('ok');

      const missing = await repo.getById('missing');
      expect(missing).toBeUndefined();
    });
  });

  describe('validatePartnerInquiry', () => {
    it('catches missing organization and invalid email', () => {
      const errors = validatePartnerInquiry({
        organizationName: '',
        email: 'bad-email',
      });
      expect(errors.organizationName).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.country).toBeDefined();
      expect(errors.message).toBeDefined();
    });

    it('enforces length caps on partner inquiry fields', () => {
      const errors = validatePartnerInquiry({
        organizationName: 'Valid Org',
        country: 'C'.repeat(105),
        contactPerson: 'P'.repeat(105),
        email: `${'a'.repeat(120)}@test.com`,
        topic: 'T'.repeat(155),
        message: 'Valid message content that exceeds twenty characters.',
      });
      expect(errors.country).toBeDefined();
      expect(errors.contactPerson).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.topic).toBeDefined();
    });
  });

  describe('validateContactMessage', () => {
    it('validates contact message required fields', () => {
      const errors = validateContactMessage({
        name: '',
        email: 'test@example.com',
        subject: 'Hi',
        message: 'Short',
      });
      expect(errors.name).toBeDefined();
      expect(errors.subject).toBeDefined();
      expect(errors.message).toBeDefined();
    });

    it('returns empty errors for valid input', () => {
      const errors = validateContactMessage({
        name: 'Anna Kovács',
        email: 'anna@example.hu',
        subject: 'Travel reimbursement question',
        message: 'Could you share the departure window for March 2027?',
      });
      expect(Object.keys(errors).length).toBe(0);
    });
  });
});
