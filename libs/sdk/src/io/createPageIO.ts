import { createDisplayNodes } from './createDisplayNodes';
import type { ComponentRegistry } from '../types/ComponentRegistry';
import type { DisplayElement } from '../types/DisplayElement';
import type { LayoutElement } from '../types/LayoutElement';
import type { LayoutRegistry } from '../types/LayoutRegistry';

export type CreatePageIOArgs = {
  registry: ComponentRegistry;
  layoutRegistry: LayoutRegistry;
};

// The runtime io of a page handler; its static type is PageIO<T, L>.
export const createPageIO = ({ registry, layoutRegistry }: CreatePageIOArgs) => {
  const layout = Object.fromEntries(
    [...layoutRegistry.typeByKey].map(([key, type]) => {
      return [
        key,
        ({ children, ...props }: { children?: DisplayElement[] }): LayoutElement => {
          return { kind: 'awaitio-layout-element', type, props, children: children ?? [] };
        },
      ];
    }),
  );

  return { ...createDisplayNodes({ tree: registry.tree, prefix: '' }), layout };
};
