import { PartnerInquiry, ContactMessage } from '@/types/orion';

/**
 * Generic Submission Repository Contract
 */
export interface SubmissionRepository<T extends { id: string }> {
  save(item: T): Promise<T>;
  list(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  clear?(): Promise<void>;
}

/**
 * Defensive, SSR-safe LocalStorage Repository Implementation
 */
export class LocalStorageRepository<T extends { id: string }>
  implements SubmissionRepository<T>
{
  constructor(private readonly storageKey: string) {}

  private isClient(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  async list(): Promise<T[]> {
    if (!this.isClient()) {
      return [];
    }
    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item): item is T =>
          Boolean(
            item &&
            typeof item === 'object' &&
            !Array.isArray(item) &&
            typeof (item as Record<string, unknown>).id === 'string' &&
            !Object.prototype.hasOwnProperty.call(item, '__proto__')
          )
      );
    } catch (err) {
      console.warn(`[LocalStorageRepository] Error parsing key ${this.storageKey}:`, err);
      return [];
    }
  }

  async getById(id: string): Promise<T | undefined> {
    try {
      const all = await this.list();
      return all.find((item) => item && typeof item === 'object' && item.id === id);
    } catch {
      return undefined;
    }
  }

  async save(item: T): Promise<T> {
    if (!this.isClient()) {
      return item;
    }
    const all = await this.list();
    const existingIdx = all.findIndex((existing) => existing?.id === item.id);
    let updated: T[];
    if (existingIdx >= 0) {
      updated = [...all];
      updated[existingIdx] = item;
    } else {
      updated = [item, ...all];
    }
    // Let QuotaExceededError bubble up so callers can present an error state to users
    window.localStorage.setItem(this.storageKey, JSON.stringify(updated));
    return item;
  }

  async clear(): Promise<void> {
    if (!this.isClient()) return;
    try {
      window.localStorage.removeItem(this.storageKey);
    } catch (err) {
      console.warn(`[LocalStorageRepository] Error clearing key ${this.storageKey}:`, err);
    }
  }
}

/**
 * Standard Storage Keys
 */
export const STORAGE_KEYS = {
  PARTNER_INQUIRIES: 'orion:partner-inquiries:v1',
  CONTACT: 'orion:contact:v1',
} as const;

/**
 * Singleton Repository Instances
 */
export const partnerInquiryRepository = new LocalStorageRepository<PartnerInquiry>(
  STORAGE_KEYS.PARTNER_INQUIRIES
);

export const contactRepository = new LocalStorageRepository<ContactMessage>(
  STORAGE_KEYS.CONTACT
);

/* ==========================================================================
   Defensive Validation Helpers (Sanitization, Length Caps, Regex)
   ========================================================================== */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val.trim();
}

export function validatePartnerInquiry(
  data: Partial<PartnerInquiry>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const organizationName = sanitize(data.organizationName);
  if (!organizationName) {
    errors.organizationName = 'Organization name is required.';
  } else if (organizationName.length < 2) {
    errors.organizationName = 'Organization name must be at least 2 characters.';
  } else if (organizationName.length > 120) {
    errors.organizationName = 'Organization name cannot exceed 120 characters.';
  }

  const country = sanitize(data.country);
  if (!country) {
    errors.country = 'Country is required.';
  } else if (country.length < 2) {
    errors.country = 'Country must be at least 2 characters.';
  } else if (country.length > 100) {
    errors.country = 'Country cannot exceed 100 characters.';
  }

  const contactPerson = sanitize(data.contactPerson);
  if (!contactPerson) {
    errors.contactPerson = 'Contact person name is required.';
  } else if (contactPerson.length < 2) {
    errors.contactPerson = 'Contact person name must be at least 2 characters.';
  } else if (contactPerson.length > 100) {
    errors.contactPerson = 'Contact person name cannot exceed 100 characters.';
  }

  const email = sanitize(data.email);
  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please provide a valid email address.';
  } else if (email.length > 120) {
    errors.email = 'Email address cannot exceed 120 characters.';
  }

  const topic = sanitize(data.topic);
  if (!topic) {
    errors.topic = 'Project topic / field is required.';
  } else if (topic.length < 2) {
    errors.topic = 'Project topic must be at least 2 characters.';
  } else if (topic.length > 150) {
    errors.topic = 'Project topic cannot exceed 150 characters.';
  }

  const message = sanitize(data.message);
  if (!message) {
    errors.message = 'Please provide details regarding your partnership proposal.';
  } else if (message.length < 20) {
    errors.message = 'Message must be at least 20 characters.';
  } else if (message.length > 4000) {
    errors.message = 'Message cannot exceed 4000 characters.';
  }

  return errors;
}

export function validateContactMessage(
  data: Partial<ContactMessage>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const name = sanitize(data.name);
  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 100) {
    errors.name = 'Name cannot exceed 100 characters.';
  }

  const email = sanitize(data.email);
  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please provide a valid email address.';
  } else if (email.length > 120) {
    errors.email = 'Email address cannot exceed 120 characters.';
  }

  const subject = sanitize(data.subject);
  if (!subject) {
    errors.subject = 'Subject is required.';
  } else if (subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  } else if (subject.length > 150) {
    errors.subject = 'Subject cannot exceed 150 characters.';
  }

  const message = sanitize(data.message);
  if (!message) {
    errors.message = 'Message content is required.';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  } else if (message.length > 3000) {
    errors.message = 'Message cannot exceed 3000 characters.';
  }

  return errors;
}
