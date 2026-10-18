import { readdirSync } from 'fs';
import { join } from 'path';
import { toSlugSegment } from './toSlugSegment';
import { constants } from '../constants';

export type FindActionFilesArgs = {
  directory: string;
  // Slug segments of the folders above `directory`.
  parents?: string[];
};

export type ActionFile = {
  file: string;
  slug: string;
  // index.* stands for its folder; only such a file may hold a page.
  isIndex: boolean;
};

// Every action file under `directory`, any depth, in a stable order: files of a folder before its subfolders, each
// sorted by name, a folder's index file first. A file's slug is its path: billing/invoices/sendReminder.ts → billing/invoices/send_reminder.
// index.ts stands for the folder itself (billing/index.ts → billing).
export const findActionFiles = ({ directory, parents = [] }: FindActionFilesArgs): ActionFile[] => {
  const entries = readdirSync(directory, { withFileTypes: true }).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const files = entries
    .filter((entry) => {
      return entry.isFile() && constants.ACTION_FILE_PATTERN.test(entry.name);
    })
    .map((entry) => {
      const isIndex = /^index\.[a-z]+$/.test(entry.name);

      if (isIndex && parents.length === 0) {
        throw new Error(`${join(directory, entry.name)}: an index file needs a folder to stand for; name the action file instead.`);
      }

      return { file: join(directory, entry.name), slug: (isIndex ? parents : [...parents, toSlugSegment({ name: entry.name })]).join('/'), isIndex };
    })
    // The folder's own page leads its list.
    .sort((a, b) => {
      return Number(b.isIndex) - Number(a.isIndex);
    });
  const nested = entries
    .filter((entry) => {
      return entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.startsWith('_') && entry.name !== 'node_modules';
    })
    .flatMap((entry) => {
      return findActionFiles({ directory: join(directory, entry.name), parents: [...parents, toSlugSegment({ name: entry.name })] });
    });

  return [...files, ...nested];
};
