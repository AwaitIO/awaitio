import { isComponentDefinition } from './isComponentDefinition';
import { isDisplayDefinition } from './isDisplayDefinition';
import type { ComponentDefinition } from '../types/ComponentDefinition';
import type { ComponentTree } from '../types/ComponentTree';
import type { DisplayDefinition } from '../types/DisplayDefinition';

export type CollectComponentTypesArgs = {
  tree: ComponentTree;
  prefix: string;
  byType: Map<string, ComponentDefinition>;
  displayByType: Map<string, DisplayDefinition>;
};

// A component's identity is its key path in the tree ('input.textarea'): unique by construction, so definitions
// need no name of their own. The same definition under two keys is simply two types.
export const collectComponentTypes = ({ tree, prefix, byType, displayByType }: CollectComponentTypesArgs) => {
  Object.entries(tree).forEach(([key, node]) => {
    const type = prefix ? `${prefix}.${key}` : key;

    if (isComponentDefinition(node)) {
      byType.set(type, node);

      return;
    }

    if (isDisplayDefinition(node)) {
      displayByType.set(type, node);

      return;
    }

    collectComponentTypes({ tree: node, prefix: type, byType, displayByType });
  });
};
