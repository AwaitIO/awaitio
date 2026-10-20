import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const defineShimId = '\0awaitio-define-component';

// Vite config for a component, display component, layout or theme package: builds the browser half of one
// defineComponent(), defineDisplay(), defineLayout() or defineTheme() file into dist/ui/ui.js.
// React, zod and `awaitio/ui` come from the SDK UI at run time (window.__AWAITIO__), so the script holds only the
// component itself. `root` is import.meta.url of the package's vite.config.mts. A theme passes `css`, a Tailwind
// stylesheet that is built into dist/ui/ui.css next to the script; components and layouts draw with the theme's blocks
// and need none.
export const componentBuildConfig = async ({ root, entry, exportName, css }) => {
  const directory = dirname(fileURLToPath(root));
  const entryPath = resolve(directory, entry);
  const cssPath = css ? resolve(directory, css) : null;
  // Loaded only for a theme, so component packages do not need Tailwind installed.
  const tailwind = cssPath ? (await import('@tailwindcss/vite')).default() : null;

  return {
    root: directory,
    plugins: [
      react(),
      ...(tailwind ? [tailwind] : []),
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
                "export const defineTheme = (blocks) => Object.fromEntries(Object.entries(blocks).map(([name, component]) => [name, { kind: 'awaitio-theme-block', name, component, uiDirectory: null }]));",
                // Types only on the server too: the definition passes through as it is.
                'export const withSignature = () => (definition) => definition;',
              ].join('\n')
            : null;
        },
        // The definition file itself is the entry; registering its browser half is appended to it.
        transform(code, id) {
          if (id !== entryPath) {
            return null;
          }

          return [
            ...(cssPath ? [`import ${JSON.stringify(cssPath)};`] : []),
            code,
            "import { registerComponentUi as __registerComponentUi, registerDisplayUi as __registerDisplayUi, registerLayoutUi as __registerLayoutUi, registerThemeUi as __registerThemeUi } from 'awaitio/client';",
            `if (Object.values(${exportName}).every((block) => block && block.kind === 'awaitio-theme-block')) {`,
            `  __registerThemeUi({ blocks: Object.fromEntries(Object.entries(${exportName}).map(([name, block]) => [name, block.component])) });`,
            `} else if (${exportName}.kind === 'awaitio-layout') {`,
            `  __registerLayoutUi({ component: ${exportName}.component });`,
            `} else if (${exportName}.kind === 'awaitio-display') {`,
            `  __registerDisplayUi({ component: ${exportName}.component, wrap: ${exportName}.wrap ?? true });`,
            '} else {',
            `  __registerComponentUi({ component: ${exportName}.component, initialValue: ${exportName}.initialValue, wrap: ${exportName}.wrap ?? true, submitButton: ${exportName}.submitButton ?? true });`,
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
        cssFileName: 'ui',
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
