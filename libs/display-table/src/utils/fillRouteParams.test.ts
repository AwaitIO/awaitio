import { expect, test } from 'vitest';
import { fillRouteParams } from './fillRouteParams';

test('Should replace {key} in the params with that key of the row', () => {
  expect(fillRouteParams({ route: { label: 'Edit', action: 'users/update', params: { id: '{id}', ref: 'user-{id}-{name}' } }, row: { id: 7, name: 'Ada' } })).toEqual({
    label: 'Edit',
    action: 'users/update',
    params: { id: '7', ref: 'user-7-Ada' },
  });
});

test('Should leave plain values as they are and fill a missing key with nothing', () => {
  expect(fillRouteParams({ route: { action: 'users/update', params: { role: 'admin', id: '{missing}' } }, row: {} }).params).toEqual({ role: 'admin', id: '' });
});
