import { expect, test } from 'vitest';
import { z } from 'zod/v4';
import { Page } from './Page';

const handler = async () => {
  return [];
};

test('Should link to the page with its params as strings and its name as the label', () => {
  const page = new Page<unknown, z.ZodObject<{ role: z.ZodString; since: z.ZodOptional<z.ZodDate> }>>({
    name: 'Users',
    params: z.object({ role: z.string(), since: z.coerce.date().optional() }),
    handler,
  });
  page.slug = 'users';

  expect(page.route({ params: { role: 'admin', since: new Date('2026-10-20T00:00:00.000Z') } })).toEqual({
    label: 'Users',
    page: 'users',
    params: { role: 'admin', since: '2026-10-20T00:00:00.000Z' },
  });

  expect(page.route({ params: { role: 'admin' }, label: 'Admins' })).toEqual({ label: 'Admins', page: 'users', params: { role: 'admin' } });
});

test('Should name the link after the folder when the page has no name', () => {
  const page = new Page<unknown, undefined>({ handler });
  page.slug = 'billing/audit_logs';

  expect(page.route()).toEqual({ label: 'Audit logs', page: 'billing/audit_logs', params: {} });
});

test('Should still require the params when the schema needs one', () => {
  const page = new Page<unknown, z.ZodObject<{ role: z.ZodString }>>({ name: 'Users', params: z.object({ role: z.string() }), handler });
  page.slug = 'users';

  // @ts-expect-error role is required, so params cannot be left out
  expect(page.route({ label: 'Users' })).toEqual({ label: 'Users', page: 'users', params: {} });

  // @ts-expect-error role must be a string
  expect(page.route({ params: { role: 1 } })).toEqual({ label: 'Users', page: 'users', params: { role: '1' } });
});

test('Should refuse a route before the actions directory is loaded', () => {
  expect(() => {
    return new Page<unknown, undefined>({ name: 'Users', handler }).route();
  }).toThrow('The page "Users" has no route');
});
