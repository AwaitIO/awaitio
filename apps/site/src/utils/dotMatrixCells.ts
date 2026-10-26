import { dotMatrixGlyphs } from './dotMatrixGlyphs';

export type DotMatrixCellsArgs = {
  // One string per line, each centered on the widest one.
  lines: string[];
  // Empty dots around the text, so a lit-up board has a margin.
  padding: number;
};

// Every dot of a dotted heading on one grid: the letters side by side with one empty column between them and two empty
// rows between lines. `lit` marks the dots of the letters, the rest is the unlit board.
export const dotMatrixCells = ({ lines, padding }: DotMatrixCellsArgs) => {
  const lineWidths = lines.map((line) => {
    return line.length * 6 - 1;
  });
  const width = Math.max(...lineWidths) + padding * 2;
  const height = lines.length * 9 - 2 + padding * 2;
  const lit = new Set<string>();

  lines.forEach((line, lineIndex) => {
    const left = padding + Math.floor((width - padding * 2 - lineWidths[lineIndex]) / 2);
    const top = padding + lineIndex * 9;

    [...line.toUpperCase()].forEach((character, characterIndex) => {
      dotMatrixGlyphs[character]?.forEach((row, y) => {
        [...row].forEach((value, x) => {
          if (value === 'x') {
            lit.add(`${left + characterIndex * 6 + x},${top + y}`);
          }
        });
      });
    });
  });

  const cells = Array.from({ length: width * height }, (_, index) => {
    const x = index % width;
    const y = Math.floor(index / width);

    return { x, y, lit: lit.has(`${x},${y}`) };
  });

  return { width, height, cells };
};
