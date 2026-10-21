// Copies the root LICENSE into every package in libs/, so npm ships it with each package. The copies are gitignored.
import { copyFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const libs = join(root, 'libs');

for (const name of readdirSync(libs)) {
  if (existsSync(join(libs, name, 'package.json'))) {
    copyFileSync(join(root, 'LICENSE'), join(libs, name, 'LICENSE'));
  }
}
