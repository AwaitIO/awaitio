import { isPage } from './isPage';
import { slugToName } from './slugToName';
import type { PageHandler } from '../types/PageHandler';
import type { RegisteredPage } from '../types/RegisteredPage';

export type WalkPagesArgs = {
  // Actions and pages as loaded from the actions directory; only the pages are taken.
  routes: Record<string, unknown>;
};

// The pages among the loaded routes, keyed by the folder they stand for.
export const walkPages = ({ routes }: WalkPagesArgs) => {
  const pages = new Map<string, RegisteredPage>();

  Object.entries(routes).forEach(([slug, route]) => {
    if (!isPage(route)) {
      return;
    }

    // The typed layout object was checked where the page was defined; at run time it is built from the same registry.
    const handler = route.handler as PageHandler<unknown>;
    pages.set(slug, { slug, name: route.name ?? slugToName({ slug: slug.split('/').at(-1) ?? slug }), description: route.description ?? null, handler });
  });

  return pages;
};
