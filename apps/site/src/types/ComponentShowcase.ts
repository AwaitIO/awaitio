import type { FC } from 'react';

export type ComponentShowcase = {
  method: string;
  description: string;
  // The component's page in the docs, e.g. /io/input-text.
  docsPath: string;
  // A rough sketch of how it looks, not the real component.
  Mock: FC;
};
