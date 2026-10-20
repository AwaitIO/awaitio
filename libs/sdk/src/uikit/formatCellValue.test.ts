import { expect, test } from 'vitest';
import { formatCellValue } from './formatCellValue';

test('Should show a cell object as its formatted label', () => {
  expect(formatCellValue({ label: 'Active', highlightColor: 'green' })).toBe('Active');

  expect(formatCellValue({ label: 1234.5, url: 'https://example.com' })).toBe('1,234.5');
});

test('Should keep other objects as JSON and empty values as N/A', () => {
  expect(formatCellValue({ tags: ['a'] })).toBe('{"tags":["a"]}');

  expect(formatCellValue(null)).toBe('N/A');
});
