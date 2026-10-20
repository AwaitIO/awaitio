import { expect, test } from 'vitest';
import { routes } from './routes';

const RUN_ID = '3f2b8c1e-9d4a-4b6f-8e2a-1c5d7f9b0a12';

test('Should build every URL of the UI', () => {
  expect([routes.actionList(), routes.access(), routes.group({ group: 'billing/invoices' })]).toEqual(['/', '/access', '/groups/billing/invoices']);

  expect([routes.action({ slug: 'billing/refund_order' }), routes.action({ slug: 'billing/refund_order', runId: RUN_ID })]).toEqual(['/actions/billing/refund_order', `/actions/billing/refund_order/${RUN_ID}`]);
});

test('Should parse an action, with or without a run, keeping the folders of its slug', () => {
  expect(routes.parse({ pathname: '/actions/billing/refund_order' })).toEqual({ kind: 'action', slug: 'billing/refund_order', runId: null });

  expect(routes.parse({ pathname: `/actions/billing/refund_order/${RUN_ID}/` })).toEqual({ kind: 'action', slug: 'billing/refund_order', runId: RUN_ID });
});

test('Should parse a folder, the access page and fall back to the action list', () => {
  expect(routes.parse({ pathname: '/groups/billing/invoices' })).toEqual({ kind: 'list', group: 'billing/invoices' });

  expect([routes.parse({ pathname: '/access' }), routes.parse({ pathname: '/access/' })]).toEqual([{ kind: 'access' }, { kind: 'access' }]);

  expect([routes.parse({ pathname: '/' }), routes.parse({ pathname: '/unknown' })]).toEqual([
    { kind: 'list', group: null },
    { kind: 'list', group: null },
  ]);
});

test('Should read back what it builds, also for names that need encoding', () => {
  const slug = 'reports/q1 2026';

  expect(routes.parse({ pathname: routes.action({ slug, runId: RUN_ID }) })).toEqual({ kind: 'action', slug, runId: RUN_ID });

  expect(routes.parse({ pathname: routes.group({ group: slug }) })).toEqual({ kind: 'list', group: slug });
});
