import { createIONodes } from './createIONodes';
import type { IOPromise } from '../classes/IOPromise';
import type { StepComponent } from '../shared/types/StepComponent';
import type { ComponentRegistry } from '../types/ComponentRegistry';
import type { ComponentTree } from '../types/ComponentTree';
import type { IO } from '../types/IO';
import type { IOGroupValues } from '../types/IOGroupValues';

export type CreateIOArgs = {
  registry: ComponentRegistry;
  render: (components: StepComponent[]) => Promise<unknown[]>;
};

// Builds `io` from the registered component tree. The static type comes from IO<T>; this only mirrors it at run time.
export const createIO = <T extends ComponentTree>({ registry, render }: CreateIOArgs) => {
  const group = async <TGroup extends Record<string, IOPromise<unknown>>>(promises: TGroup) => {
    const keys = Object.keys(promises);
    const values = await render(
      keys.map((key) => {
        return promises[key].component;
      }),
    );

    return Object.fromEntries(
      keys.map((key, index) => {
        return [key, values[index]];
      }),
    ) as IOGroupValues<TGroup>;
  };

  return { ...createIONodes({ tree: registry.tree, prefix: '', render }), group } as unknown as IO<T>;
};
