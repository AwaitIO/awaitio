// One part of the detailed comparison on /vs/<slug>: a heading and its paragraphs, optionally split further into
// subsections. Text between backticks shows as inline code.
export type ComparisonSection = {
  heading: string;
  paragraphs: string[];
  subsections?: { heading: string; paragraphs: string[] }[];
};
