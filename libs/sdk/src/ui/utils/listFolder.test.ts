import { expect, test } from 'vitest';
import { listFolder } from './listFolder';

const actions = ['hello', 'forms/full_name', 'forms/text/word_count', 'users', 'users/messages/multi_step', 'users/messages/archive/old'].map((slug) => {
  return { slug, name: slug, description: null, order: null };
});
const slugs = ({ folder }: { folder: string }) => {
  const shown = listFolder({ actions, pages: [], folder });

  return { actions: shown.actions.map((action) => action.slug), folders: shown.folders };
};

test('Should show only the top-level actions and folders at the top', () => {
  expect(slugs({ folder: '' })).toEqual({
    actions: ['hello'],
    folders: [
      { path: 'forms', actionCount: 2 },
      { path: 'users', actionCount: 3 },
    ],
  });
});

test('Should show a folder with its index action first and its subfolders closed', () => {
  expect(slugs({ folder: 'users' })).toEqual({ actions: ['users'], folders: [{ path: 'users/messages', actionCount: 2 }] });

  expect(slugs({ folder: 'users/messages' })).toEqual({ actions: ['users/messages/multi_step'], folders: [{ path: 'users/messages/archive', actionCount: 1 }] });
});

test('Should show a folder that holds only its page', () => {
  const shown = listFolder({ actions, pages: [{ slug: 'reports', name: 'Reports', description: null, order: null, unlisted: false }], folder: '' });

  expect(shown.folders.map((folder) => folder.path)).toEqual(['forms', 'reports', 'users']);
});

test('Should leave out a folder that holds only an unlisted page, but keep one with listed actions', () => {
  const pages = [
    { slug: 'reports', name: 'Reports', description: null, order: null, unlisted: true },
    { slug: 'forms', name: 'Forms', description: null, order: null, unlisted: true },
  ];
  const shown = listFolder({ actions, pages, folder: '' });

  expect(shown.folders.map((folder) => folder.path)).toEqual(['forms', 'users']);
});

test('Should put the actions with an order first, lower first, and keep the rest alphabetical', () => {
  const ordered = ['tools/archive', 'tools/export', 'tools/import', 'tools/purge'].map((slug) => {
    return { slug, name: slug, description: null, order: { 'tools/purge': 1, 'tools/import': 2 }[slug] ?? null };
  });

  expect(listFolder({ actions: ordered, pages: [], folder: 'tools' }).actions.map((action) => action.slug)).toEqual(['tools/purge', 'tools/import', 'tools/archive', 'tools/export']);
});

test('Should keep the index action first, whatever the order of the other actions', () => {
  const ordered = [
    { slug: 'tools', name: 'Tools', description: null, order: 5 },
    { slug: 'tools/export', name: 'Export', description: null, order: 1 },
  ];

  expect(listFolder({ actions: ordered, pages: [], folder: 'tools' }).actions.map((action) => action.slug)).toEqual(['tools', 'tools/export']);
});

test('Should order the subfolders by their index page, the ones without one after them', () => {
  const pages = [
    { slug: 'users', name: 'Users', description: null, order: 2, unlisted: false },
    { slug: 'reports', name: 'Reports', description: null, order: 1, unlisted: false },
  ];
  const shown = listFolder({ actions, pages, folder: '' });

  expect(shown.folders.map((folder) => folder.path)).toEqual(['reports', 'users', 'forms']);
});
