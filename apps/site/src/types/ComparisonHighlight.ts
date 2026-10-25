import type { ComparisonIllustration } from './ComparisonIllustration';

// One of the four illustrated cards under the hero of /vs/<slug>: why a team would pick AwaitIO over this tool.
export type ComparisonHighlight = {
  illustration: ComparisonIllustration;
  title: string;
  body: string;
};
