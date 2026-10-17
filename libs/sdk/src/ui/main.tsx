import * as React from 'react';
import { StrictMode } from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { createRoot } from 'react-dom/client';
import * as zod from 'zod';
import { App } from './App';
import { componentUiRegistry } from './componentUiRegistry';
import { hostGlobalName } from '../client/hostGlobalName';
import type { AwaitItHost } from '../client/types/AwaitItHost';
import * as ui from '../uikit';
import './index.css';

// Component scripts do not bundle React, zod or the kit; they take these, so hooks share a single React instance.
const host: AwaitItHost = { React, jsxRuntime, zod, ui, registerComponent: componentUiRegistry.register };
(window as unknown as Record<string, AwaitItHost>)[hostGlobalName] = host;

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing #root element.');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
