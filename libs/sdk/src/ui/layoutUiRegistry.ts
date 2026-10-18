import { UiScriptRegistry } from './classes/UiScriptRegistry';
import { BasicLayout } from './components/BasicLayout';
import type { LayoutUi } from '../client/types/LayoutUi';
import { constants as sharedConstants } from '../shared/constants';

// Layout scripts register here (window.__AWAITIO__.registerLayout); PageView loads from it. The basic layout ships
// with the UI, so it is registered up front and never loaded.
export const layoutUiRegistry = new UiScriptRegistry<LayoutUi<unknown>>({ kind: 'layouts' });
layoutUiRegistry.register(sharedConstants.BASIC_LAYOUT_TYPE, { component: BasicLayout as LayoutUi<unknown>['component'] });
