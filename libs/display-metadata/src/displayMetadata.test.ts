import { expect, test } from 'vitest';
import { displayMetadata } from './displayMetadata';

test('Should accept tiles with text, number, boolean or empty values, with or without a label', () => {
  expect(
    displayMetadata.props.safeParse({
      items: [
        { label: 'Total accounts', value: 542 },
        { label: 'Plan', value: 'Pro' },
        { label: 'Active', value: true },
        { label: 'Owner', value: null },
        { label: null, value: 'Shown without a label' },
      ],
    }).success,
  ).toBe(true);
});

test('Should refuse a tile whose value is an object', () => {
  expect(displayMetadata.props.safeParse({ items: [{ label: 'Owner', value: { name: 'Ada' } }] }).success).toBe(false);
});
