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
