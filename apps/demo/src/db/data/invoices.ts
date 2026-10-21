import type { Invoice } from '../../types/Invoice';

export const invoices: Invoice[] = [
  { id: 'inv_01', number: 'SW-2026-0912', accountId: 'acc_01', amount: 249, status: 'paid', issuedAt: new Date('2026-09-01T09:00:00Z') },
  { id: 'inv_02', number: 'SW-2026-0913', accountId: 'acc_02', amount: 99, status: 'paid', issuedAt: new Date('2026-09-01T09:00:00Z') },
  { id: 'inv_03', number: 'SW-2026-0914', accountId: 'acc_03', amount: 29, status: 'paid', issuedAt: new Date('2026-09-01T09:00:00Z') },
  { id: 'inv_04', number: 'SW-2026-0915', accountId: 'acc_06', amount: 249, status: 'refunded', issuedAt: new Date('2026-09-01T09:00:00Z') },
  { id: 'inv_05', number: 'SW-2026-0916', accountId: 'acc_07', amount: 99, status: 'open', issuedAt: new Date('2026-09-01T09:00:00Z') },
  { id: 'inv_06', number: 'SW-2026-0917', accountId: 'acc_08', amount: 29, status: 'paid', issuedAt: new Date('2026-09-01T09:00:00Z') },
  { id: 'inv_07', number: 'SW-2026-1012', accountId: 'acc_01', amount: 249, status: 'paid', issuedAt: new Date('2026-10-01T09:00:00Z') },
  { id: 'inv_08', number: 'SW-2026-1013', accountId: 'acc_02', amount: 99, status: 'open', issuedAt: new Date('2026-10-01T09:00:00Z') },
  { id: 'inv_09', number: 'SW-2026-1014', accountId: 'acc_03', amount: 29, status: 'open', issuedAt: new Date('2026-10-01T09:00:00Z') },
  { id: 'inv_10', number: 'SW-2026-1015', accountId: 'acc_06', amount: 249, status: 'paid', issuedAt: new Date('2026-10-01T09:00:00Z') },
  { id: 'inv_11', number: 'SW-2026-1016', accountId: 'acc_07', amount: 99, status: 'open', issuedAt: new Date('2026-10-01T09:00:00Z') },
  { id: 'inv_12', number: 'SW-2026-1017', accountId: 'acc_08', amount: 29, status: 'open', issuedAt: new Date('2026-10-01T09:00:00Z') },
];
