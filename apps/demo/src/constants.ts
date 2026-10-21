import type { Plan } from './types/Plan';

export const constants = {
  // Every db call waits somewhere in this range, like a query to a real database.
  DB_MIN_LATENCY_MS: 80,
  DB_MAX_LATENCY_MS: 300,
  // Sending one invoice in the send invoices action.
  SEND_INVOICE_LATENCY_MS: 400,
  // A product photo for the display image example; any image the browser can load works.
  PRODUCT_PHOTO_URL: 'https://picsum.photos/id/425/1200/800',
  PLANS: [
    { value: 'starter', label: 'Starter · $29/mo', price: 29 },
    { value: 'growth', label: 'Growth · $99/mo', price: 99 },
    { value: 'scale', label: 'Scale · $249/mo', price: 249 },
  ] satisfies { value: Plan; label: string; price: number }[],
  ROLES: [
    { value: 'owner', label: 'Owner' },
    { value: 'admin', label: 'Admin' },
    { value: 'member', label: 'Member' },
  ] satisfies { value: 'owner' | 'admin' | 'member'; label: string }[],
};
