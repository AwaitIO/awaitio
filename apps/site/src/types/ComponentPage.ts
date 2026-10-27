import type { CodeToken } from './CodeToken';
import type { ComponentDocsLink } from './ComponentDocsLink';
import type { ComponentOption } from './ComponentOption';
import type { FC } from 'react';

// The presentation page of one io component, /components/<slug>: what it is, what you can set, the simplest code and
// roughly what it shows. Not documentation: it points at the docs for everything else. Text between backticks shows as
// inline code.
export type ComponentPage = {
  // The last part of the page URL, the same as the component's page in the docs (/io/<slug>).
  slug: string;
  method: string;
  // The picture of the component in dots at the top, see `DotMatrixPicture`. Any size; each page sets its own width.
  picture: { rows: string[]; label: string; className: string };
  headline: string;
  // One line for the meta description.
  summary: string;
  // What it is and what it is good for, a few short sentences under the headline.
  intro: string;
  // Illustrated cards in full rows of three: six or nine.
  options: ComponentOption[];
  // The simplest complete use, as in the docs.
  example: { file: string; lines: CodeToken[][]; focus: number[] };
  // Roughly what the example shows in the browser, drawn in the site's colors.
  Output: FC;
  outputUrl: string;
  docs: ComponentDocsLink[];
  // ISO date the page was last changed: og:updated_time and the sitemap's lastmod.
  lastModifiedAt: string;
};
