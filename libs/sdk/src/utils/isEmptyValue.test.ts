import { expect, test } from 'vitest';
import { isEmptyValue } from './isEmptyValue';

test('Should treat nothing, blank text and nothing picked as empty', () => {
  expect([undefined, null, '', '   ', []].map((value) => isEmptyValue({ value }))).toEqual([true, true, true, true, true]);
});

test('Should treat an answer as not empty, false and 0 included', () => {
  expect(['a', ['x'], false, 0].map((value) => isEmptyValue({ value }))).toEqual([false, false, false, false]);
});
