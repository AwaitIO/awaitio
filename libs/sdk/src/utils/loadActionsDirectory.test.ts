import { mkdirSync, mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { expect, test, vi } from 'vitest';
import { loadActionsDirectory } from './loadActionsDirectory';

// An action as another copy of the package would create it: a plain object with the marker.
const actionSource = "export default { kind: 'awaitio-action', name: null, description: null, params: null, handler: async () => 'ok' };";

const createDirectory = (files: Record<string, string>) => {
  const directory = mkdtempSync(join(tmpdir(), 'awaitio-actions-'));
  Object.entries(files).forEach(([path, source]) => {
    mkdirSync(dirname(join(directory, path)), { recursive: true });
    writeFileSync(join(directory, path), source);
  });

  return directory;
};

test('Should map nested files to slugs, the index file to its folder', async () => {
  const directory = createDirectory({
    'hello.mjs': actionSource,
    'billing/refundOrder.mjs': actionSource,
    'billing/index.mjs': actionSource,
    'billing/Late Invoices/send-reminder.mjs': actionSource,
  });

  expect(Object.keys(await loadActionsDirectory({ directory }))).toEqual(['hello', 'billing', 'billing/refund_order', 'billing/late_invoices/send_reminder']);
});

test('Should skip tests, declarations and files or folders starting with _ or .', async () => {
  const directory = createDirectory({
    'hello.mjs': actionSource,
    'hello.test.mjs': 'throw new Error("loaded");',
    'types.d.ts': 'export {};',
    '_shared.mjs': 'throw new Error("loaded");',
    '_lib/helper.mjs': 'throw new Error("loaded");',
  });

  expect(Object.keys(await loadActionsDirectory({ directory }))).toEqual(['hello']);
});

test('Should take the only exported action when there is no default export', async () => {
  const directory = createDirectory({ 'hello.mjs': `export const helper = () => 1;\n${actionSource.replace('export default', 'export const hello =')}` });

  expect(Object.keys(await loadActionsDirectory({ directory }))).toEqual(['hello']);
});

test('Should refuse a file without exactly one action', async () => {
  await expect(loadActionsDirectory({ directory: createDirectory({ 'empty.mjs': 'export const value = 1;' }) })).rejects.toThrow('must export exactly one app.action(...), found 0');

  const two = `${actionSource.replace('export default', 'export const a =')}\n${actionSource.replace('export default', 'export const b =')}`;

  await expect(loadActionsDirectory({ directory: createDirectory({ 'two.mjs': two }) })).rejects.toThrow('found 2');
});

test('Should refuse two files with the same slug', async () => {
  const directory = createDirectory({ 'fullName.mjs': actionSource, 'full_name.mjs': actionSource });

  await expect(loadActionsDirectory({ directory })).rejects.toThrow('the slug "full_name" is already used');
});

test('Should refuse an index file at the top and a missing directory', async () => {
  await expect(loadActionsDirectory({ directory: createDirectory({ 'index.mjs': actionSource }) })).rejects.toThrow('an index file needs a folder');

  await expect(loadActionsDirectory({ directory: join(tmpdir(), 'awaitio-missing-actions') })).rejects.toThrow('does not exist');
});

test('Should warn about a top-level file next to folders, not about a folder index', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {
    return undefined;
  });

  await loadActionsDirectory({ directory: createDirectory({ 'hello.mjs': actionSource, 'users/index.mjs': actionSource, 'users/list.mjs': actionSource }) });

  expect(warn.mock.calls.map(([message]) => String(message).match(/"(\w+)"/)?.[1])).toEqual(['hello']);

  warn.mockRestore();
});

test('Should accept a page only as a folder index file', async () => {
  const pageSource = "export default { kind: 'awaitio-page', name: null, description: null, handler: async () => [] };";

  expect(Object.keys(await loadActionsDirectory({ directory: createDirectory({ 'users/index.mjs': pageSource, 'users/list.mjs': actionSource }) }))).toEqual(['users', 'users/list']);

  await expect(loadActionsDirectory({ directory: createDirectory({ 'users/report.mjs': pageSource }) })).rejects.toThrow("belongs in a folder's index file");
});
