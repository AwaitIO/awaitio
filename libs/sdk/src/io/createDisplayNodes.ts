import type { ComponentTree } from '../types/ComponentTree';
import type { DisplayElement } from '../types/DisplayElement';
import { isComponentDefinition } from '../utils/isComponentDefinition';
import { isDisplayDefinition } from '../utils/isDisplayDefinition';

export type CreateDisplayNodesArgs = {
  tree: ComponentTree;
  prefix: string;
};

type DisplayNode = ((label: string, props?: unknown) => DisplayElement) | { [key: string]: DisplayNode };

// The display components of the tree as functions that only record what to show; the props are checked when the page
// is served. Input components are left out.
export const createDisplayNodes = ({ tree, prefix }: CreateDisplayNodesArgs): Record<string, DisplayNode> => {
  return Object.fromEntries(
    Object.entries(tree)
      .filter(([, node]) => {
        return !isComponentDefinition(node);
      })
      .map(([key, node]) => {
        const type = prefix ? `${prefix}.${key}` : key;

        if (!isDisplayDefinition(node)) {
          return [key, createDisplayNodes({ tree: node as ComponentTree, prefix: type })];
        }

        return [
          key,
          (label: string, props?: unknown): DisplayElement => {
            return { kind: 'awaitio-display-element', type, label, props: props ?? {} };
          },
        ];
      }),
  );
};
