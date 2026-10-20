import { expect, test } from 'vitest';
import { actionHref } from './actionHref';

test('Should build the URL of an action', () => {
  expect(actionHref({ action: 'accounts/update_account' })).toBe('/actions/accounts/update_account');
});

test('Should pass params as the query string, encoded, and leave out the label', () => {
  expect(actionHref({ label: 'Send', action: 'users/send_message', params: { id: '7', note: 'a&b c' } })).toBe('/actions/users/send_message?id=7&note=a%26b+c');

  expect(actionHref({ action: 'users/send_message', params: {} })).toBe('/actions/users/send_message');
});
