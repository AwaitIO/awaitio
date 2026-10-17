import { hostGlobalName } from './hostGlobalName';
import type { AwaitIOHost } from './types/AwaitIOHost';
import type { ComponentUi } from './types/ComponentUi';

// Called once by a component package's UI script when the SDK UI loads it. The SDK tags the <script> with the
// component type it was loaded for (its key path, e.g. 'input.textarea'), so the script does not need to know it.
export const registerComponentUi = <TProps, TValue>(ui: ComponentUi<TProps, TValue>) => {
  const host = (window as unknown as Record<string, AwaitIOHost | undefined>)[hostGlobalName];
  const script = document.currentScript;
  const type = script instanceof HTMLScriptElement ? script.dataset.type : undefined;

  if (!host || !type) {
    throw new Error('A component UI script must be loaded by the AwaitIO UI.');
  }

  // The host stores every component under one type; each one only ever gets the props and values of its own type.
  host.registerComponent(type, ui as unknown as ComponentUi<unknown, unknown>);
};
