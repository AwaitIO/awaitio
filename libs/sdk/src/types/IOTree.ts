import type { ComponentDefinition } from './ComponentDefinition';
import type { ComponentTree } from './ComponentTree';
import type { IOMethod } from './IOMethod';

export type IOTree<T extends ComponentTree> = {
  [K in keyof T]: T[K] extends ComponentDefinition ? IOMethod<T[K]> : T[K] extends ComponentTree ? IOTree<T[K]> : never;
};
