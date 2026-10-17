import type { IOPromise } from '../classes/IOPromise';

export type IOGroupValues<T extends Record<string, IOPromise<unknown>>> = {
  [K in keyof T]: T[K] extends IOPromise<infer R> ? R : never;
};
