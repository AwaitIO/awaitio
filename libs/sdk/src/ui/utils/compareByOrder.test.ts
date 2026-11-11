import { expect, test } from 'vitest';
import { compareByOrder } from './compareByOrder';

test('Should sort lower orders first, then the entries without one, keeping their order', () => {
  const entries = [
    { name: 'a', order: null },
    { name: 'b', order: 10 },
    { name: 'c', order: null },
    { name: 'd', order: -1 },
    { name: 'e', order: 10 },
  ];

  expect(
    entries
      .sort((a, b) => {
        return compareByOrder({ a: a.order, b: b.order });
      })
      .map((entry) => entry.name),
  ).toEqual(['d', 'b', 'e', 'a', 'c']);
});
