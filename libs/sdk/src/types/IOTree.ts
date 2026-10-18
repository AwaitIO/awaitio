import type { ComponentDefinition } from './ComponentDefinition';
import type { ComponentTree } from './ComponentTree';
import type { DisplayDefinition } from './DisplayDefinition';
import type { IOMethod } from './IOMethod';

// Display components are left out: an action's io offers inputs only, pages get them as io.display.*.
export type IOTree<T extends ComponentTree> = {
  [K in keyof T as T[K] extends DisplayDefinition ? never : K]: T[K] extends ComponentDefinition ? IOMethod<T[K]> : T[K] extends ComponentTree ? IOTree<T[K]> : never;
};
