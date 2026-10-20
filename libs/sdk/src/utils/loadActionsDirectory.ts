import { existsSync, statSync } from 'fs';
import { findActionFiles } from './findActionFiles';
import { importActionFile } from './importActionFile';
import { isAction } from './isAction';
import { isPage } from './isPage';
import type { Action } from '../classes/Action';
import type { Page } from '../classes/Page';

export type LoadActionsDirectoryArgs = {
  directory: string;
};

// Imports every action file and maps it to its slug. Each file must export exactly one app.action(...) — or, in a
// folder's index file, one app.page(...) — as its default export or as the only one it exports; anything else stops
// the start with an error naming the file.
export const loadActionsDirectory = async ({ directory }: LoadActionsDirectoryArgs) => {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) {
    throw new Error(`The actions directory ${directory} does not exist.`);
  }

  const routes: Record<string, Action<unknown> | Page<unknown>> = {};

  for (const { file, slug, isIndex } of findActionFiles({ directory })) {
    const loaded = await importActionFile({ file });
    const exports = typeof loaded === 'object' && loaded !== null ? (loaded as Record<string, unknown>) : {};
    const isRoute = (value: unknown) => {
      return isAction(value) || isPage(value);
    };
    const found = isRoute(exports.default) ? [exports.default] : Object.values(exports).filter(isRoute);

    if (found.length !== 1) {
      throw new Error(`${file} must export exactly one app.action(...)${isIndex ? ' or app.page(...)' : ''}, found ${found.length}.`);
    }

    const route = found[0] as Action<unknown> | Page<unknown>;

    // A page is what a folder shows next to its actions, so it has a folder only as its index file.
    if (isPage(route) && !isIndex) {
      throw new Error(`${file} exports app.page(...), which belongs in a folder's index file (e.g. users/index.ts).`);
    }

    if (routes[slug]) {
      throw new Error(`${file}: the slug "${slug}" is already used by another action file.`);
    }

    if (isAction(route)) {
      route.slug = slug;
    }

    routes[slug] = route;
  }

  const slugs = Object.keys(routes);
  const hasFolders = slugs.some((slug) => {
    return slug.includes('/');
  });

  // With folders the navigation is one tab per folder, so a file at the top would only be reachable by its URL.
  if (hasFolders) {
    slugs
      .filter((slug) => {
        // users/index.ts has the slug "users" too, but it leads its folder.
        const isFolderIndex = slugs.some((other) => {
          return other.startsWith(`${slug}/`);
        });

        return !slug.includes('/') && !isFolderIndex;
      })
      .forEach((slug) => {
        console.warn(`AwaitIO: the action "${slug}" sits next to folders in ${directory}, so the navigation does not show it. Move it into a folder.`);
      });
  }

  return routes;
};
