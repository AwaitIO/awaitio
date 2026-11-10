import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Everything the static export is built from: the site's own files, the root LICENSE (the pricing page reads it) and the lockfile (dependency versions change the chunks).
const SOURCES = ['src', 'public', 'package.json', 'next.config.ts', 'postcss.config.mjs', '../../LICENSE', '../../pnpm-lock.yaml'];

// A hash of the site's sources, so the same sources give the same build id and an unchanged build leaves out/ as it is.
export const hashSiteSources = ({ siteDir }: { siteDir: string }) => {
  const hash = createHash('sha256');

  for (const source of SOURCES) {
    const path = join(siteDir, source);
    const files = statSync(path).isDirectory() ? readdirSync(path, { recursive: true, encoding: 'utf8' }).sort().map((file) => join(path, file)) : [path];

    for (const file of files) {
      if (statSync(file).isFile()) {
        hash.update(file.slice(siteDir.length));
        hash.update(readFileSync(file));
      }
    }
  }

  return hash.digest('hex').slice(0, 20);
};
