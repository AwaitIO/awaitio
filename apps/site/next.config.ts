import { hashSiteSources } from './scripts/hashSiteSources';
import type { NextConfig } from 'next';

// A static site: `next build` writes plain HTML to out/, which any static host serves.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Next.js picks a random build id on every build, which rewrites every page in out/; a hash of the sources keeps an unchanged build unchanged.
  generateBuildId: () => hashSiteSources({ siteDir: __dirname }),
  // Linting runs from the root ESLint config (pnpm lint), not inside next build.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// Next.js reads its config from the default export.
// eslint-disable-next-line import/no-default-export
export default nextConfig;
