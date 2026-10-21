import { createTable } from './createTable';
import { accounts } from './data/accounts';
import { invoices } from './data/invoices';
import { tickets } from './data/tickets';
import { users } from './data/users';

// Used like a Prisma client: await db.account.findMany(), await db.user.update({ where, data }).
export const db = {
  account: createTable({ name: 'account', rows: accounts }),
  user: createTable({ name: 'user', rows: users }),
  invoice: createTable({ name: 'invoice', rows: invoices }),
  ticket: createTable({ name: 'ticket', rows: tickets }),
};
