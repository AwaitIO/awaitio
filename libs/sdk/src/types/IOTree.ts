import type { ComponentDefinition } from './ComponentDefinition';
import type { ComponentTree } from './ComponentTree';
import type { DisplayDefinition } from './DisplayDefinition';
import type { DisplayIOMethod } from './DisplayIOMethod';
import type { IOMethod } from './IOMethod';

// An action's io: inputs return the answer, display components show something in the step and return undefined.
// A component with a signature from withSignature() gets that method instead of one typed from its schema.
export type IOTree<T extends ComponentTree> = {
  [K in keyof T]: T[K] extends ComponentDefinition
    ? NonNullable<T[K]['signature']> extends (...args: never) => unknown
      ? NonNullable<T[K]['signature']>
      : IOMethod<T[K]>
    : T[K] extends DisplayDefinition
    ? NonNullable<T[K]['signature']> extends { action: infer TAction }
      ? TAction
      : DisplayIOMethod<T[K]>
    : T[K] extends ComponentTree
    ? IOTree<T[K]>
    : never;
};
