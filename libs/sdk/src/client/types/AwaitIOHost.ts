import type { AwaitIOHostUi } from './AwaitIOHostUi';
import type { ComponentUi } from './ComponentUi';
import type { DisplayUi } from './DisplayUi';
import type { LayoutUi } from './LayoutUi';
import type { ThemeUi } from './ThemeUi';
import type * as React from 'react';
import type * as JsxRuntime from 'react/jsx-runtime';
import type * as Zod from 'zod/v4';

// What the SDK UI puts on window.__AWAITIO__. Component scripts take React, zod and the `awaitio/ui` blocks from here,
// so there is one copy of each and the theme decides how every block looks.
export type AwaitIOHost = {
  React: typeof React;
  jsxRuntime: typeof JsxRuntime;
  zod: typeof Zod;
  ui: AwaitIOHostUi;
  registerComponent: (type: string, ui: ComponentUi<unknown, unknown>) => void;
  registerDisplay: (type: string, ui: DisplayUi<unknown>) => void;
  registerLayout: (type: string, ui: LayoutUi<unknown>) => void;
  registerTheme: (type: string, ui: ThemeUi) => void;
};
