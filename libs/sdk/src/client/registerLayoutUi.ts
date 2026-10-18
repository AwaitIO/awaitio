import { hostGlobalName } from './hostGlobalName';
import type { AwaitIOHost } from './types/AwaitIOHost';
import type { LayoutUi } from './types/LayoutUi';

// Called once by a layout package's UI script when the SDK UI loads it; the <script> carries the layout's key in
// data-type, like a component script.
export const registerLayoutUi = <TProps>(ui: LayoutUi<TProps>) => {
  const host = (window as unknown as Record<string, AwaitIOHost | undefined>)[hostGlobalName];
  const script = document.currentScript;
  const type = script instanceof HTMLScriptElement ? script.dataset.type : undefined;

  if (!host || !type) {
    throw new Error('A layout UI script must be loaded by the AwaitIO UI.');
  }

  host.registerLayout(type, ui as unknown as LayoutUi<unknown>);
};
