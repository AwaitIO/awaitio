import { UiScriptRegistry } from './classes/UiScriptRegistry';
import type { LayoutUi } from '../client/types/LayoutUi';

// Layout scripts register here (window.__AWAITIO__.registerLayout); PageView loads from it. Every layout is a
// package, the basic one too, so each comes with its own script.
export const layoutUiRegistry = new UiScriptRegistry<LayoutUi<unknown>>({ kind: 'layouts' });
