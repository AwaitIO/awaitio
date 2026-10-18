import { UiScriptRegistry } from './classes/UiScriptRegistry';
import type { DisplayUi } from '../client/types/DisplayUi';

// Display components live in the component tree, so their scripts are served next to the inputs' (/components/…).
export const displayUiRegistry = new UiScriptRegistry<DisplayUi<unknown>>({ kind: 'components' });
