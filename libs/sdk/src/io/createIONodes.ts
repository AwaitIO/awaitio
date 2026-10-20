import { IOPromise } from '../classes/IOPromise';
import type { IOPromiseOptions } from '../classes/IOPromise';
import type { ComponentTree } from '../types/ComponentTree';
import type { IONode } from '../types/IONode';
import { isComponentDefinition } from '../utils/isComponentDefinition';
import { isDisplayDefinition } from '../utils/isDisplayDefinition';

export type CreateIONodesArgs = Pick<IOPromiseOptions, 'render'> & {
  tree: ComponentTree;
  prefix: string;
};

// The key path ('input.textarea') is the component's type on the wire, the same as in the registry.
// Annotated because the function is recursive and TypeScript cannot infer its own return type.
export const createIONodes = ({ tree, prefix, render }: CreateIONodesArgs): Record<string, IONode> => {
  return Object.fromEntries(
    Object.entries(tree)
      // Display components only show in pages so far; an action's io does not offer them.
      .filter(([, node]) => {
        return !isDisplayDefinition(node);
      })
      .map(([key, node]) => {
        const type = prefix ? `${prefix}.${key}` : key;

        if (!isComponentDefinition(node)) {
          return [key, createIONodes({ tree: node as ComponentTree, prefix: type, render })];
        }

        return [
          key,
          (label: string, props?: Record<string, unknown>) => {
            // `disabled` belongs to every input, so it is taken out before the component's own schema sees the props.
            const { disabled, ...componentProps } = props ?? {};

            return new IOPromise({ component: { type, label, props: node.props.parse(componentProps), disabled: disabled === true }, render });
          },
        ];
      }),
  );
};
