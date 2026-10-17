import { ComponentUiRegistry } from './classes/ComponentUiRegistry';

// One registry for the whole page: main.tsx hands its register to component scripts, useComponentUis loads from it.
export const componentUiRegistry = new ComponentUiRegistry();
