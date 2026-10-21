import * as React from 'react';
import { StrictMode } from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { createRoot } from 'react-dom/client';
import * as zod from 'zod/v4';
import { App } from './App';
import { componentUiRegistry } from './componentUiRegistry';
import { displayUiRegistry } from './displayUiRegistry';
import { layoutUiRegistry } from './layoutUiRegistry';
import { themeUiRegistry } from './themeUiRegistry';
import { loadThemes } from './utils/loadThemes';
import { hostGlobalName } from '../client/hostGlobalName';
import type { AwaitIOHost } from '../client/types/AwaitIOHost';
import { actionRouteSchema } from '../shared/schemas/actionRouteSchema';
import { highlightColorSchema } from '../shared/schemas/highlightColorSchema';
import { tableCellSchema } from '../shared/schemas/tableCellSchema';
import { tableColumnSchema } from '../shared/schemas/tableColumnSchema';
import { actionHref } from '../uikit/actionHref';
import { FieldContext } from '../uikit/FieldContext';
import { formatCellValue } from '../uikit/formatCellValue';
import { navigateTo } from '../uikit/navigateTo';
import { renderTableRows } from '../uikit/renderTableRows';
import { TableCellView } from '../uikit/TableCellView';
import { themeBlockNames } from '../uikit/themeBlockNames';
import { useFieldId } from '../uikit/useFieldId';
import './index.css';

// Component scripts do not bundle React, zod or the kit; they take these, so hooks share a single React instance.
// The theme scripts add the blocks to `ui` before anything is drawn (loadThemes); the helpers are the core's own.
const host: AwaitIOHost = {
  React,
  jsxRuntime,
  zod,
  ui: {
    actionHref,
    actionRouteSchema,
    FieldContext,
    formatCellValue,
    highlightColorSchema,
    navigateTo,
    renderTableRows,
    tableCellSchema,
    TableCellView,
    tableColumnSchema,
    themeBlockNames,
    useFieldId,
  },
  registerComponent: componentUiRegistry.register,
  registerDisplay: displayUiRegistry.register,
  registerLayout: layoutUiRegistry.register,
  registerTheme: themeUiRegistry.register,
};
(window as unknown as Record<string, AwaitIOHost>)[hostGlobalName] = host;

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing #root element.');
}

// Everything on screen is drawn by the theme, so nothing renders until it is loaded.
loadThemes()
  .then(() => {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  })
  .catch((error: unknown) => {
    root.textContent = `The AwaitIO theme could not be loaded: ${error instanceof Error ? error.message : String(error)}`;
  });
