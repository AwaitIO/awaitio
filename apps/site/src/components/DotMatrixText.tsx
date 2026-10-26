import { dotMatrixCells } from '../utils/dotMatrixCells';
import type { FC } from 'react';

export type DotMatrixTextProps = {
  lines: string[];
  className?: string;
  // Round dots like a dot-matrix display, or the brand's square pixels.
  shape?: 'dot' | 'square';
  // Draws the unlit dots of the board too, not only the letters.
  board?: boolean;
  padding?: number;
  litClassName?: string;
  unlitClassName?: string;
  // `wave` dims the letters column by column from left to right, `twinkle` blinks scattered dots like the hero sun.
  animation?: 'none' | 'wave' | 'twinkle';
};

// A heading spelled out in big dots on a 5 × 7 letter grid, drawn as one SVG that scales to its box. Screen readers
// read the text, not the dots. Still with reduced motion.
export const DotMatrixText: FC<DotMatrixTextProps> = ({
  lines,
  className,
  shape = 'dot',
  board = false,
  padding = 0,
  litClassName = 'fill-orange-500',
  unlitClassName = 'fill-gray-300',
  animation = 'none',
}) => {
  const { width, height, cells } = dotMatrixCells({ lines, padding });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label={lines.join(' ')}>
      {cells.map((cell) => {
        if (!cell.lit && !board) {
          return null;
        }

        // A scattered but stable delay for every dot, so neighbours rarely blink together.
        const hash = (Math.imul(cell.x, 73856093) ^ Math.imul(cell.y, 19349663)) >>> 0;
        const animated = cell.lit && animation !== 'none';
        const style = animated ? { animationDelay: animation === 'wave' ? `${(cell.x - width) * 0.05}s` : `${-(hash % 40) * 0.1}s` } : undefined;
        const fillClassName = [
          cell.lit ? litClassName : unlitClassName,
          animated && animation === 'wave' && 'motion-safe:animate-dot-wave',
          animated && animation === 'twinkle' && 'motion-safe:animate-dot-twinkle',
        ]
          .filter(Boolean)
          .join(' ');

        if (shape === 'square') {
          return <rect key={`${cell.x}-${cell.y}`} x={cell.x + 0.08} y={cell.y + 0.08} width={0.84} height={0.84} className={fillClassName} style={style} />;
        }

        return <circle key={`${cell.x}-${cell.y}`} cx={cell.x + 0.5} cy={cell.y + 0.5} r={0.4} className={fillClassName} style={style} />;
      })}
    </svg>
  );
};
