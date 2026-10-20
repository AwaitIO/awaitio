import type { LayoutRegistry } from '../types/LayoutRegistry';
import type { LayoutTree } from '../types/LayoutTree';

export type CreateLayoutRegistryArgs = {
  tree: LayoutTree;
};

export const createLayoutRegistry = ({ tree }: CreateLayoutRegistryArgs): LayoutRegistry => {
  Object.entries(tree).forEach(([key, definition]) => {
    if (definition.kind !== 'awaitio-layout') {
      throw new Error(`layouts.${key} is not a layout. Create it with defineLayout().`);
    }
  });

  // Every layout is a package registered in `layouts`; none is built in, not even basic.
  const byType: LayoutRegistry['byType'] = new Map();
  const typeByKey = new Map<string, string>();
  Object.entries(tree).forEach(([key, definition]) => {
    byType.set(key, definition);
    typeByKey.set(key, key);
  });

  return { byType, typeByKey };
};
