export type SegmentDistanceArgs = {
  point: [number, number];
  from: [number, number];
  to: [number, number];
};

// Distance from a point to the closest point of a line segment.
export const segmentDistance = ({ point: [x, y], from: [fromX, fromY], to: [toX, toY] }: SegmentDistanceArgs) => {
  const along = Math.max(0, Math.min(1, ((x - fromX) * (toX - fromX) + (y - fromY) * (toY - fromY)) / ((toX - fromX) ** 2 + (toY - fromY) ** 2)));

  return Math.hypot(x - fromX - along * (toX - fromX), y - fromY - along * (toY - fromY));
};
