import type { ComparisonCheck } from './ComparisonCheck';
import type { ComparisonFacts } from './ComparisonFacts';
import type { ComparisonFaq } from './ComparisonFaq';
import type { ComparisonHighlight } from './ComparisonHighlight';
import type { ComparisonKind } from './ComparisonKind';
import type { ComparisonSection } from './ComparisonSection';

// A tool AwaitIO is compared with on /vs/<slug>. Every text comes from the research in marketing/competitors.
// Text between backticks shows as inline code. The top of the page is visual and short (hero, highlights, the
// at-a-glance table, which one fits); the detailed comparison under it is long prose for readers and search engines.
export type Competitor = {
  // The last part of the page URL, /vs/<slug>.
  slug: string;
  name: string;
  kind: ComparisonKind;
  // The tool's logo as a 128 × 128 bitmap, drawn in the brand's square pixels by `PixelLogo`.
  logo: string;
  // The page headline.
  headline: string;
  // One line for the /vs index and the meta description.
  summary: string;
  // What the tool is and how you build with it, one short paragraph each.
  about: string[];
  // Where the tool stands today. A tool that is gone gets a heading like "Looking for an Interval alternative?".
  status: { heading: string; paragraphs: string[] };
  // Eight illustrated reasons in two rows of four, each with its own drawing.
  highlights: ComparisonHighlight[];
  // The at-a-glance table, six to nine rows.
  checks: ComparisonCheck[];
  facts: ComparisonFacts;
  whenItFits: string[];
  whenAwaitIOFits: string[];
  // ISO date the comparison was last checked: the "Last updated" line, og:updated_time and the sitemap's lastmod.
  lastModifiedAt: string;
  // The detailed comparison, long-form.
  details: ComparisonSection[];
  faq: ComparisonFaq[];
};
