import { existsSync, statSync } from 'fs';
import { findActionFiles } from './findActionFiles';
import { importActionFile } from './importActionFile';
import { isAction } from './isAction';
import type { Action } from '../classes/Action';

export type LoadActionsDirectoryArgs = {
  directory: string;
};

// Imports every action file and maps it to its slug. Each file must export exactly one app.action(...), as its
// default export or as the only exported action; anything else stops the start with an error naming the file.
export const loadActionsDirectory = async ({ directory }: LoadActionsDirectoryArgs) => {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) {
    throw new Error(`The actions directory ${directory} does not exist.`);
  }

  const routes: Record<string, Action<unknown>> = {};

  for (const { file, slug } of findActionFiles({ directory })) {
    const loaded = await importActionFile({ file });
    const exports = typeof loaded === 'object' && loaded !== null ? (loaded as Record<string, unknown>) : {};
    const actions = isAction(exports.default)
      ? [exports.default]
      : Object.values(exports).filter((value) => {
          return isAction(value);
        });

    if (actions.length !== 1) {
      throw new Error(`${file} must export exactly one app.action(...), found ${actions.length}.`);
    }

    if (routes[slug]) {
      throw new Error(`${file}: the slug "${slug}" is already used by another action file.`);
    }

    routes[slug] = actions[0] as Action<unknown>;
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
