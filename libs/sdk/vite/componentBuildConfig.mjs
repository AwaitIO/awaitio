import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const defineShimId = '\0awaitit-define-component';

// Vite config for a component package: builds the browser half of one defineComponent() file into dist/ui/ui.js.
// React, zod and `awaitit/ui` come from the SDK UI at run time (window.__AWAITIT__), so the script holds only the
// component itself. `root` is import.meta.url of the package's vite.config.mts.
export const componentBuildConfig = ({ root, entry, exportName }) => {
  const directory = dirname(fileURLToPath(root));
  const entryPath = resolve(directory, entry);

  return {
    root: directory,
    plugins: [
      react(),
      {
        name: 'awaitit-component',
        enforce: 'pre',
        // Only for the browser build; tests (vitest) import the real definition.
        apply: 'build',
        // In the browser defineComponent only has to hand the definition back; the server version lives in `awaitit`.
        resolveId(id) {
          return id === 'awaitit' ? defineShimId : null;
        },
        load(id) {
          return id === defineShimId ? "export const defineComponent = (definition) => ({ kind: 'awaitit-component', ...definition, uiDirectory: null });" : null;
        },
        // The definition file itself is the entry; registering its browser half is appended to it.
        transform(code, id) {
          if (id !== entryPath) {
            return null;
          }

          return [
            code,
            "import { registerComponentUi as __registerComponentUi } from 'awaitit/client';",
            `__registerComponentUi({ component: ${exportName}.component, initialValue: ${exportName}.initialValue, wrap: ${exportName}.wrap ?? true });`,
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
        name: 'awaititComponent',
        fileName: () => {
          return 'ui.js';
        },
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'zod', 'awaitit/ui'],
        output: {
          globals: {
            react: '__AWAITIT__.React',
            'react/jsx-runtime': '__AWAITIT__.jsxRuntime',
            zod: '__AWAITIT__.zod',
            'awaitit/ui': '__AWAITIT__.ui',
          },
        },
      },
    },
  };
};
