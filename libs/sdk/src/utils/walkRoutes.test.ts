import { expect, test } from 'vitest';
import { walkRoutes } from './walkRoutes';
import { Action } from '../classes/Action';

const handler = async () => {
  return 'ok';
};

test('Should take the name from the action', () => {
  const actions = walkRoutes({ routes: { 'billing/send_reminder': new Action({ name: ' Send a reminder ', handler }) } });

  expect(actions.get('billing/send_reminder')?.name).toBe('Send a reminder');
});

test('Should refuse an action without a name', () => {
  // Plain JavaScript gets past the type.
  const unnamed = new Action({ handler } as unknown as ConstructorParameters<typeof Action>[0]);

  expect(() => {
    return walkRoutes({ routes: { 'billing/send_reminder': unnamed } });
  }).toThrow('The action "billing/send_reminder" has no name.');

  expect(() => {
    return walkRoutes({ routes: { refund: new Action({ name: '  ', handler }) } });
  }).toThrow('The action "refund" has no name.');
});

test('Should send the order of an action, and null without one', () => {
  const actions = walkRoutes({ routes: { purge: new Action({ name: 'Purge', order: 2, handler }), archive: new Action({ name: 'Archive', handler }) } });

  expect([actions.get('purge')?.order, actions.get('archive')?.order]).toEqual([2, null]);
});

test('Should refuse an order that is not a number', () => {
  // Plain JavaScript, or a value read from an env variable, gets past the type.
  const stringOrder = new Action({ name: 'Purge', order: '1' as unknown as number, handler });

  expect(() => {
    return walkRoutes({ routes: { purge: stringOrder } });
  }).toThrow('The action "purge" has order "1"; use a number, e.g. order: 1.');

  expect(() => {
    return walkRoutes({ routes: { purge: new Action({ name: 'Purge', order: Number.NaN, handler }) } });
  }).toThrow('The action "purge" has order NaN');
});
