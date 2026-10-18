import type { ComponentDefinition } from '../types/ComponentDefinition';
import type { ComponentTree } from '../types/ComponentTree';
import type { DisplayDefinition } from '../types/DisplayDefinition';

// Checked by a brand, not instanceof, so a component package may bring its own copy of the sdk.
export const isComponentDefinition = (node: ComponentDefinition | DisplayDefinition | ComponentTree): node is ComponentDefinition => {
  return node.kind === 'awaitio-component';
};
