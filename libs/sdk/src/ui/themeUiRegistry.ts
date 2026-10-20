import { UiScriptRegistry } from './classes/UiScriptRegistry';
import type { ThemeUi } from '../client/types/ThemeUi';

// Theme scripts register here (window.__AWAITIO__.registerTheme), keyed by their position in the list.
export const themeUiRegistry = new UiScriptRegistry<ThemeUi>({ kind: 'themes' });
