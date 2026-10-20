import { componentBuildConfig } from 'awaitio/vite';
import { defineConfig } from 'vite';

// Builds the browser half of the display component into dist/ui/ui.js.
export default defineConfig(componentBuildConfig({ root: import.meta.url, entry: 'src/displayImage.tsx', exportName: 'displayImage' }));
