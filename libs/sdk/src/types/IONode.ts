import type { IOPromise } from '../classes/IOPromise';

export type IONode = ((label: string, props?: unknown) => IOPromise<unknown>) | { [key: string]: IONode };
