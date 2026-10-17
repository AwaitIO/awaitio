import { collectComponentTypes } from './collectComponentTypes';
import type { ComponentDefinition } from '../types/ComponentDefinition';
import type { ComponentTree } from '../types/ComponentTree';

export type CreateComponentRegistryArgs = {
  tree: ComponentTree;
};

export const createComponentRegistry = ({ tree }: CreateComponentRegistryArgs) => {
  if ('group' in tree) {
    throw new Error('"group" is reserved for io.group() and cannot be a component key.');
  }

  const byType = new Map<string, ComponentDefinition>();
  collectComponentTypes({ tree, prefix: '', byType });

  return { tree, byType };
};
