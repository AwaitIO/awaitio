import type { ComponentUi } from './ComponentUi';
import type { DisplayUi } from './DisplayUi';
import type { LayoutUi } from './LayoutUi';
import type * as Ui from '../../uikit';
import type * as React from 'react';
import type * as JsxRuntime from 'react/jsx-runtime';
import type * as Zod from 'zod';

// What the SDK UI puts on window.__AWAITIO__. Component scripts take React, zod and the `awaitio/ui` kit from here,
// so there is one copy of each and components ship no styles of their own.
export type AwaitIOHost = {
  React: typeof React;
  jsxRuntime: typeof JsxRuntime;
  zod: typeof Zod;
  ui: typeof Ui;
  registerComponent: (type: string, ui: ComponentUi<unknown, unknown>) => void;
  registerDisplay: (type: string, ui: DisplayUi<unknown>) => void;
  registerLayout: (type: string, ui: LayoutUi<unknown>) => void;
};
