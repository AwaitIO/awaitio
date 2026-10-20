import { expect, test } from 'vitest';
import { createLayoutRegistry } from './createLayoutRegistry';
import { toPageContent } from './toPageContent';
import type { ComponentRegistry } from '../types/ComponentRegistry';

test('Should refuse bare display components when no layout is registered as basic', () => {
  const page = {
    slug: 'reports',
    name: 'Reports',
    description: null,
    handler: async () => {
      return [];
    },
  };

  expect(() => {
    return toPageContent({ page, result: [], registry: {} as ComponentRegistry, layoutRegistry: createLayoutRegistry({ tree: {} }) });
  }).toThrow('Register one under basic');
});
