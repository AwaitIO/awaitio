import { componentBuildConfig } from 'awaitio/vite';
import { defineConfig } from 'vite';

// Builds the browser half of the component into dist/ui/ui.js.
export default defineConfig(componentBuildConfig({ root: import.meta.url, entry: 'src/inputNumber.tsx', exportName: 'inputNumber' }));
