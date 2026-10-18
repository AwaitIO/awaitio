import { UiScriptRegistry } from './classes/UiScriptRegistry';
import type { ComponentUi } from '../client/types/ComponentUi';

// One registry for the whole page: main.tsx hands its register to component scripts, StepView loads from it.
export const componentUiRegistry = new UiScriptRegistry<ComponentUi<unknown, unknown>>({ kind: 'components' });
