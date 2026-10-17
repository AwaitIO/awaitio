import type { ComponentDefinition } from './ComponentDefinition';
import type { ComponentTree } from './ComponentTree';

export type ComponentRegistry = {
  tree: ComponentTree;
  // Key path in the tree ('input.textarea') → definition.
  byType: Map<string, ComponentDefinition>;
};
