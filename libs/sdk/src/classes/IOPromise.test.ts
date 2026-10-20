import { expect, test } from 'vitest';
import { IOPromise } from './IOPromise';

const render = () => {
  return Promise.resolve([undefined]);
};

test('Should mark the component optional, or not when the condition is false', () => {
  const promise = new IOPromise<string>({ component: { type: 'input.text', label: 'Note', props: {} }, render });

  expect(promise.optional().component.optional).toBe(true);

  expect(promise.optional(false).component.optional).toBe(false);

  expect(promise.component.optional).toBeUndefined();
});
