// The letters of the dotted headings on a 5 × 7 grid, one string per row with `x` for a lit dot. Only the characters
// the site spells out are drawn; a space is an empty column of the same width.
export const dotMatrixGlyphs: Record<string, string[]> = {
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
  A: ['.xxx.', 'x...x', 'x...x', 'xxxxx', 'x...x', 'x...x', 'x...x'],
  D: ['xxxx.', 'x...x', 'x...x', 'x...x', 'x...x', 'x...x', 'xxxx.'],
  E: ['xxxxx', 'x....', 'x....', 'xxxx.', 'x....', 'x....', 'xxxxx'],
  F: ['xxxxx', 'x....', 'x....', 'xxxx.', 'x....', 'x....', 'x....'],
  G: ['.xxx.', 'x...x', 'x....', 'x.xxx', 'x...x', 'x...x', '.xxxx'],
  N: ['x...x', 'xx..x', 'x.x.x', 'x..xx', 'x...x', 'x...x', 'x...x'],
  O: ['.xxx.', 'x...x', 'x...x', 'x...x', 'x...x', 'x...x', '.xxx.'],
  P: ['xxxx.', 'x...x', 'x...x', 'xxxx.', 'x....', 'x....', 'x....'],
  T: ['xxxxx', '..x..', '..x..', '..x..', '..x..', '..x..', '..x..'],
  U: ['x...x', 'x...x', 'x...x', 'x...x', 'x...x', 'x...x', '.xxx.'],
  '0': ['.xxx.', 'x...x', 'x..xx', 'x.x.x', 'xx..x', 'x...x', '.xxx.'],
  '4': ['...x.', '..xx.', '.x.x.', 'x..x.', 'xxxxx', '...x.', '...x.'],
};
