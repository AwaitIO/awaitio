import { componentBuildConfig } from 'awaitio/vite';
import { defineConfig } from 'vite';

// Builds the browser half of the display component into dist/ui/ui.js and the viewer's styles into dist/ui/ui.css.
export default defineConfig(componentBuildConfig({ root: import.meta.url, entry: 'src/displayObject.tsx', exportName: 'displayObject', css: 'src/displayObject.css' }));
