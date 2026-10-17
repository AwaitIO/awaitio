import type { ComponentTree } from './ComponentTree';
import type { IOGroupValues } from './IOGroupValues';
import type { IOTree } from './IOTree';
import type { IOPromise } from '../classes/IOPromise';

export type IO<T extends ComponentTree> = IOTree<T> & {
  group: <TGroup extends Record<string, IOPromise<unknown>>>(promises: TGroup) => Promise<IOGroupValues<TGroup>>;
};
