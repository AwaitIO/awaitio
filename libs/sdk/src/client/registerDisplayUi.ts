import { hostGlobalName } from './hostGlobalName';
import type { AwaitIOHost } from './types/AwaitIOHost';
import type { DisplayUi } from './types/DisplayUi';

// Called once by a display component's UI script when the SDK UI loads it; the <script> carries the component's key
// path in data-type, like an input component script.
export const registerDisplayUi = <TProps>(ui: DisplayUi<TProps>) => {
  const host = (window as unknown as Record<string, AwaitIOHost | undefined>)[hostGlobalName];
  const script = document.currentScript;
  const type = script instanceof HTMLScriptElement ? script.dataset.type : undefined;

  if (!host || !type) {
    throw new Error('A display component UI script must be loaded by the AwaitIO UI.');
  }

  host.registerDisplay(type, ui as unknown as DisplayUi<unknown>);
};
