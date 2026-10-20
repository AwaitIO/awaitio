import { createIONodes } from './createIONodes';
import { IOGroupPromise } from '../classes/IOGroupPromise';
import type { IOPromise } from '../classes/IOPromise';
import type { ComponentRegistry } from '../types/ComponentRegistry';
import type { ComponentTree } from '../types/ComponentTree';
import type { IO } from '../types/IO';
import type { IOGroupValues } from '../types/IOGroupValues';
import type { StepRender } from '../types/StepRender';

export type CreateIOArgs = {
  registry: ComponentRegistry;
  render: StepRender;
};

// Builds `io` from the registered component tree. The static type comes from IO<T>; this only mirrors it at run time.
export const createIO = <T extends ComponentTree>({ registry, render }: CreateIOArgs) => {
  const group = <TGroup extends Record<string, IOPromise<unknown>>>(promises: TGroup) => {
    return new IOGroupPromise<IOGroupValues<TGroup>>({ promises, render });
  };

  return { ...createIONodes({ tree: registry.tree, prefix: '', render }), group } as unknown as IO<T>;
};
