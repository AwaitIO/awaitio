import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

// The UI is built into dist/ui next to the compiled server, which serves it (see src/http/createUiRouter.ts).
// `pnpm dev:ui` runs Vite with HMR and proxies the API to the demo server from the root .env.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, fileURLToPath(new URL('../..', import.meta.url)), '');

  return {
    root: fileURLToPath(new URL('./src/ui', import.meta.url)),
    // Relative, so the assets load under any listen({ basePath }); the server's <base href> anchors them on every route.
    base: './',
    plugins: [react(), tailwindcss()],
    build: {
      outDir: fileURLToPath(new URL('./dist/ui', import.meta.url)),
      emptyOutDir: true,
    },
    server: {
      proxy: {
        '/api': `http://localhost:${env.PORT ?? 3000}`,
        '/components': `http://localhost:${env.PORT ?? 3000}`,
        '/layouts': `http://localhost:${env.PORT ?? 3000}`,
        '/themes': `http://localhost:${env.PORT ?? 3000}`,
      },
    },
  };
});
