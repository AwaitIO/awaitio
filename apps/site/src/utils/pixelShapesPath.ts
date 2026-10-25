import { flattenSvgPath } from './flattenSvgPath';
import type { PixelShape } from '../types/PixelShape';

export type PixelShapesPathArgs = {
  shapes: PixelShape[];
  // The square of the shapes' coordinates that the grid covers, like an SVG viewBox.
  box: { x: number; y: number; size: number };
  // Squares across the grid.
  cells: number;
  // Gap around each square as a share of its cell, so the grid of the brand shows between them.
  inset: number;
};

type Point = [number, number];

// Distance from a point to a straight piece of a line.
const segmentDistance = ([pointX, pointY]: Point, [fromX, fromY]: Point, [toX, toY]: Point) => {
  const lengthX = toX - fromX;
  const lengthY = toY - fromY;
  const lengthSquared = lengthX * lengthX + lengthY * lengthY;
  const t = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, ((pointX - fromX) * lengthX + (pointY - fromY) * lengthY) / lengthSquared));

  return Math.hypot(pointX - (fromX + t * lengthX), pointY - (fromY + t * lengthY));
};

// Whether a point lies inside closed outlines, by the even-odd rule, so the holes of a shape stay empty.
const isInside = ([pointX, pointY]: Point, subpaths: Point[][]) => {
  let inside = false;

  for (const points of subpaths) {
    for (let index = 0, previous = points.length - 1; index < points.length; previous = index++) {
      const [currentX, currentY] = points[index];
      const [previousX, previousY] = points[previous];

      if (currentY > pointY !== previousY > pointY && pointX < ((previousX - currentX) * (pointY - currentY)) / (previousY - currentY) + currentX) {
        inside = !inside;
      }
    }
  }

  return inside;
};

const cache = new Map<string, string>();

// Vector shapes turned into the brand's square pixels: a cell is filled when most of it lies on a line or inside a
// filled shape, and every filled cell becomes a square a little smaller than the cell. Returns one path in a
// `cells × cells` box.
export const pixelShapesPath = ({ shapes, box, cells, inset }: PixelShapesPathArgs) => {
  const key = JSON.stringify([shapes, box, cells, inset]);
  const cached = cache.get(key);

  if (cached !== undefined) {
    return cached;
  }

  const flattened = shapes.map((shape) => {
    const { scale, x, y } = shape.transform ?? { scale: 1, x: 0, y: 0 };
    const subpaths = flattenSvgPath(shape.d).map((points) => {
      return points.map(([pointX, pointY]): Point => {
        return [pointX * scale + x, pointY * scale + y];
      });
    });

    return { stroke: shape.stroke, subpaths };
  });
  const cellSize = box.size / cells;
  const isCovered = (point: Point) => {
    return flattened.some((shape) => {
      if (shape.stroke === undefined) {
        return isInside(point, shape.subpaths);
      }

      return shape.subpaths.some((points) => {
        return points.some((current, index) => {
          return index > 0 && segmentDistance(point, points[index - 1], current) <= shape.stroke! / 2;
        });
      });
    });
  };
  const side = 1 - inset * 2;
  let path = '';

  for (let row = 0; row < cells; row++) {
    for (let column = 0; column < cells; column++) {
      let covered = 0;

      // Three by three samples per cell; most of them decide.
      for (let sampleY = 0; sampleY < 3; sampleY++) {
        for (let sampleX = 0; sampleX < 3; sampleX++) {
          if (isCovered([box.x + (column + (sampleX + 0.5) / 3) * cellSize, box.y + (row + (sampleY + 0.5) / 3) * cellSize])) {
            covered++;
          }
        }
      }

      if (covered >= 5) {
        path += `M${column + inset} ${row + inset}h${side}v${side}h-${side}z`;
      }
    }
  }

  cache.set(key, path);

  return path;
};
