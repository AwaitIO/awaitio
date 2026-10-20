import { componentBuildConfig } from 'awaitio/vite';
import { defineConfig } from 'vite';

// Builds the browser half of the theme into dist/ui/ui.js and its Tailwind styles into dist/ui/ui.css.
export default defineConfig(componentBuildConfig({ root: import.meta.url, entry: 'src/defaultTheme.tsx', exportName: 'defaultTheme', css: 'src/theme.css' }));
