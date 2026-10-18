import type { ComponentDefinition } from '../types/ComponentDefinition';
import type { ComponentTree } from '../types/ComponentTree';
import type { DisplayDefinition } from '../types/DisplayDefinition';

export const isDisplayDefinition = (node: ComponentDefinition | DisplayDefinition | ComponentTree): node is DisplayDefinition => {
  return node.kind === 'awaitio-display';
};
