import type { FC } from 'react';

export type ComponentShowcase = {
  method: string;
  description: string;
  // The component's page on the site, /components/<slug>, the same as its page in the docs, /io/<slug>.
  slug: string;
  // A rough sketch of how it looks, not the real component.
  Mock: FC;
};
