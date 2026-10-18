import { z } from 'zod';
import { constants as sharedConstants } from '../shared/constants';
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

  const byType: LayoutRegistry['byType'] = new Map([[sharedConstants.BASIC_LAYOUT_TYPE, { props: z.object({ title: z.string().optional(), description: z.string().optional() }), uiDirectory: null }]]);
  const typeByKey = new Map([['basic', sharedConstants.BASIC_LAYOUT_TYPE]]);
  Object.entries(tree).forEach(([key, definition]) => {
    byType.set(key, definition);
    typeByKey.set(key, key);
  });

  return { byType, typeByKey };
};
