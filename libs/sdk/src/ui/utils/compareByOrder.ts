export type CompareByOrderArgs = {
  a: number | null;
  b: number | null;
};

// A sort comparator for the navigation: entries with an order first, lower first; entries without one after them. A tie
// returns 0, so a stable sort keeps the alphabetical order the server lists them in.
export const compareByOrder = ({ a, b }: CompareByOrderArgs) => {
  if (a === null || b === null) {
    return Number(a === null) - Number(b === null);
  }

  return a - b;
};
