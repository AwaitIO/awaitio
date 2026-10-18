// What io.display.<name>(label, props) returns in a page: one block for a layout to place.
export type DisplayElement = {
  kind: 'awaitio-display-element';
  type: string;
  label: string;
  props: unknown;
};
