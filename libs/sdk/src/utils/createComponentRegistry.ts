import { collectComponentTypes } from './collectComponentTypes';
import type { ComponentDefinition } from '../types/ComponentDefinition';
import type { ComponentRegistry } from '../types/ComponentRegistry';
import type { ComponentTree } from '../types/ComponentTree';
import type { DisplayDefinition } from '../types/DisplayDefinition';

export type CreateComponentRegistryArgs = {
  tree: ComponentTree;
};

export const createComponentRegistry = ({ tree }: CreateComponentRegistryArgs): ComponentRegistry => {
  // io.group() in actions and io.layout in pages belong to the SDK.
  ['group', 'layout'].forEach((reserved) => {
    if (reserved in tree) {
      throw new Error(`"${reserved}" is reserved for io.${reserved} and cannot be a component key.`);
    }
  });

  const byType = new Map<string, ComponentDefinition>();
  const displayByType = new Map<string, DisplayDefinition>();
  collectComponentTypes({ tree, prefix: '', byType, displayByType });

  return { tree, byType, displayByType };
};
