import { expect, test } from 'vitest';
import { topLevelFolders } from './topLevelFolders';

const actions = ['queue/retry', 'tools/export', 'user/ban', 'workspace/rename'].map((slug) => {
  return { slug, name: slug, description: null, order: null };
});
const page = ({ slug, order, unlisted = false }: { slug: string; order: number | null; unlisted?: boolean }) => {
  return { slug, name: slug, description: null, order, unlisted };
};

test('Should keep the folders alphabetical without an order', () => {
  expect(topLevelFolders({ list: { actions, pages: [page({ slug: 'user', order: null })] } })).toEqual(['queue', 'tools', 'user', 'workspace']);
});

test('Should put a folder that holds only its page in its alphabetical place', () => {
  expect(topLevelFolders({ list: { actions, pages: [page({ slug: 'billing', order: null })] } })).toEqual(['billing', 'queue', 'tools', 'user', 'workspace']);
});

test('Should put the folders whose index page has an order first, lower first', () => {
  const pages = [page({ slug: 'workspace', order: 2 }), page({ slug: 'user', order: 1 })];

  expect(topLevelFolders({ list: { actions, pages } })).toEqual(['user', 'workspace', 'queue', 'tools']);
});

test('Should take the order of an index action too, and of an unlisted page of a folder with listed actions', () => {
  const list = { actions: [...actions, { slug: 'tools', name: 'Tools', description: null, order: 1 }], pages: [page({ slug: 'queue', order: 2, unlisted: true })] };

  expect(topLevelFolders({ list })).toEqual(['tools', 'queue', 'user', 'workspace']);
});
