import { expect, test } from 'vitest';
import { displayObject } from './displayObject';

test('Should take an object or a list as data', () => {
  expect(displayObject.props.safeParse({ data: { id: 1, tags: ['a'] } }).success).toBe(true);

  expect(displayObject.props.safeParse({ data: [{ id: 1 }] }).success).toBe(true);
});

test('Should refuse a plain value or no data', () => {
  expect(displayObject.props.safeParse({ data: 'Ada' }).success).toBe(false);

  expect(displayObject.props.safeParse({}).success).toBe(false);
});
