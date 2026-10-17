import { expect, test } from 'vitest';
import { listFolder } from './listFolder';

const actions = ['hello', 'forms/full_name', 'forms/text/word_count', 'users', 'users/messages/multi_step', 'users/messages/archive/old'].map((slug) => {
  return { slug, name: slug, description: null };
});
const slugs = ({ folder }: { folder: string }) => {
  const shown = listFolder({ actions, folder });

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
