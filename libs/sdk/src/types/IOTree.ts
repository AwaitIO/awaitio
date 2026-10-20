import type { ComponentDefinition } from './ComponentDefinition';
import type { ComponentTree } from './ComponentTree';
import type { DisplayDefinition } from './DisplayDefinition';
import type { DisplayIOMethod } from './DisplayIOMethod';
import type { IOMethod } from './IOMethod';

// An action's io: inputs return the answer, display components show something in the step and return undefined.
export type IOTree<T extends ComponentTree> = {
  [K in keyof T]: T[K] extends ComponentDefinition ? IOMethod<T[K]> : T[K] extends DisplayDefinition ? DisplayIOMethod<T[K]> : T[K] extends ComponentTree ? IOTree<T[K]> : never;
};
