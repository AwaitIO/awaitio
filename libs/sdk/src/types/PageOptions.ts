import type { PageHandler } from './PageHandler';

export type PageOptions<TIO> = {
  // Shown as the page's title. Defaults to the folder's name in words.
  name?: string;
  description?: string;
  handler: PageHandler<TIO>;
};
