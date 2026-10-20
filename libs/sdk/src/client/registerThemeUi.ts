import { hostGlobalName } from './hostGlobalName';
import type { AwaitIOHost } from './types/AwaitIOHost';
import type { ThemeUi } from './types/ThemeUi';

// Called once by a theme package's UI script; the <script> carries the theme's position in the list in data-type.
export const registerThemeUi = (ui: ThemeUi) => {
  const host = (window as unknown as Record<string, AwaitIOHost | undefined>)[hostGlobalName];
  const script = document.currentScript;
  const type = script instanceof HTMLScriptElement ? script.dataset.type : undefined;

  if (!host || !type) {
    throw new Error('A theme UI script must be loaded by the AwaitIO UI.');
  }

  host.registerTheme(type, ui);
};
