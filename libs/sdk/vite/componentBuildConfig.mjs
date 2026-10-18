import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const defineShimId = '\0awaitio-define-component';

// Vite config for a component, display component or layout package: builds the browser half of one defineComponent(),
// defineDisplay() or defineLayout() file into dist/ui/ui.js.
// React, zod and `awaitio/ui` come from the SDK UI at run time (window.__AWAITIO__), so the script holds only the
// component itself. `root` is import.meta.url of the package's vite.config.mts.
export const componentBuildConfig = ({ root, entry, exportName }) => {
  const directory = dirname(fileURLToPath(root));
  const entryPath = resolve(directory, entry);

  return {
    root: directory,
    plugins: [
      react(),
      {
        name: 'awaitio-component',
        enforce: 'pre',
        // Only for the browser build; tests (vitest) import the real definition.
        apply: 'build',
        // In the browser defineComponent and defineLayout only hand the definition back; the server versions live in
        // `awaitio`.
        resolveId(id) {
          return id === 'awaitio' ? defineShimId : null;
        },
        load(id) {
          return id === defineShimId
            ? [
                "export const defineComponent = (definition) => ({ kind: 'awaitio-component', ...definition, uiDirectory: null });",
                "export const defineDisplay = (definition) => ({ kind: 'awaitio-display', ...definition, uiDirectory: null });",
                "export const defineLayout = (definition) => ({ kind: 'awaitio-layout', ...definition, uiDirectory: null });",
              ].join('\n')
            : null;
        },
        // The definition file itself is the entry; registering its browser half is appended to it.
        transform(code, id) {
          if (id !== entryPath) {
            return null;
          }

          return [
            code,
            "import { registerComponentUi as __registerComponentUi, registerDisplayUi as __registerDisplayUi, registerLayoutUi as __registerLayoutUi } from 'awaitio/client';",
            `if (${exportName}.kind === 'awaitio-layout') {`,
            `  __registerLayoutUi({ component: ${exportName}.component });`,
            `} else if (${exportName}.kind === 'awaitio-display') {`,
            `  __registerDisplayUi({ component: ${exportName}.component });`,
            '} else {',
            `  __registerComponentUi({ component: ${exportName}.component, initialValue: ${exportName}.initialValue, wrap: ${exportName}.wrap ?? true });`,
            '}',
          ].join('\n');
        },
      },
    ],
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
      outDir: resolve(directory, 'dist/ui'),
      emptyOutDir: true,
      lib: {
        entry: entryPath,
        formats: ['iife'],
        name: 'awaitioComponent',
        fileName: () => {
          return 'ui.js';
        },
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'zod', 'awaitio/ui'],
        output: {
          globals: {
            react: '__AWAITIO__.React',
            'react/jsx-runtime': '__AWAITIO__.jsxRuntime',
            zod: '__AWAITIO__.zod',
            'awaitio/ui': '__AWAITIO__.ui',
          },
        },
      },
    },
  };
};
