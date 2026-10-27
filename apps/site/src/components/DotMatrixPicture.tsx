import type { FC } from 'react';

export type DotMatrixPictureProps = {
  // One string per row: `x` an orange dot, `-` a light orange one, `o` a grey one and `.` an unlit dot of the board.
  rows: string[];
  // What the picture shows, read by screen readers instead of the dots.
  label: string;
  className?: string;
};

const fills: Record<string, string> = {
  x: 'fill-orange-500',
  '-': 'fill-orange-200',
  o: 'fill-gray-500',
  '.': 'fill-gray-200',
};

// A small picture drawn in the round dots of the dotted headings, on its unlit board, as one SVG that scales to its
// box. Still, without animation.
export const DotMatrixPicture: FC<DotMatrixPictureProps> = ({ rows, label, className }) => {
  return (
    <svg viewBox={`0 0 ${rows[0].length} ${rows.length}`} className={className} role="img" aria-label={label}>
      {rows.map((row, y) => {
        return [...row].map((value, x) => {
          return <circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r={0.36} className={fills[value] ?? fills['.']} />;
        });
      })}
    </svg>
  );
};
