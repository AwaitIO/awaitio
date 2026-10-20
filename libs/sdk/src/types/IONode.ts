import type { IOPromise } from '../classes/IOPromise';

export type IONode =
  | ((label: string, props?: Record<string, unknown>) => IOPromise<unknown>)
  | ((label: string | null, props?: Record<string, unknown>) => IOPromise<unknown>)
  | { [key: string]: IONode };
