// A docs page linked at the end of /components/<slug>, with a line on what the reader finds there.
export type ComponentDocsLink = {
  label: string;
  // The path on docs.awaitio.com, e.g. /io/display-table.
  path: string;
  description: string;
};
