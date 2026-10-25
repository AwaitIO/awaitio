// Every command of an SVG path with how many numbers each of its segments takes.
const argumentCounts: Record<string, number> = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };

// How many straight pieces a curve or an arc is cut into.
const curveSteps = 16;

type Point = [number, number];

// An SVG path `d` as lists of points, one list per subpath, with curves and arcs cut into short straight pieces, so
// the pixel icons can measure distances to it and test whether a point lies inside.
export const flattenSvgPath = (d: string): Point[][] => {
  const tokens = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) ?? [];
  const subpaths: Point[][] = [];
  let current: Point[] = [];
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  let lastControl: Point | null = null;
  let lastCommand = '';
  let index = 0;

  const lineTo = (nextX: number, nextY: number) => {
    x = nextX;
    y = nextY;
    current.push([x, y]);
  };

  while (index < tokens.length) {
    let command = tokens[index];

    if (/[a-zA-Z]/.test(command)) {
      index++;
    } else {
      // Repeated arguments after M continue as L, otherwise as the same command.
      command = lastCommand === 'M' ? 'L' : lastCommand === 'm' ? 'l' : lastCommand;
    }

    const upper = command.toUpperCase();
    const isRelative = command !== upper;
    const count = argumentCounts[upper];
    const values = tokens.slice(index, index + count).map(Number);
    index += count;
    const offsetX = isRelative ? x : 0;
    const offsetY = isRelative ? y : 0;

    if (upper === 'M') {
      if (current.length > 0) {
        subpaths.push(current);
      }

      x = values[0] + offsetX;
      y = values[1] + offsetY;
      startX = x;
      startY = y;
      current = [[x, y]];
      lastControl = null;
    } else if (upper === 'L') {
      lineTo(values[0] + offsetX, values[1] + offsetY);
      lastControl = null;
    } else if (upper === 'H') {
      lineTo(values[0] + offsetX, y);
      lastControl = null;
    } else if (upper === 'V') {
      lineTo(x, values[0] + (isRelative ? y : 0));
      lastControl = null;
    } else if (upper === 'C' || upper === 'S') {
      const fromX = x;
      const fromY = y;
      const [firstX, firstY]: Point =
        upper === 'C' ? [values[0] + offsetX, values[1] + offsetY] : lastControl && /[CcSs]/.test(lastCommand) ? [2 * x - lastControl[0], 2 * y - lastControl[1]] : [x, y];
      const rest = upper === 'C' ? values.slice(2) : values;
      const secondX = rest[0] + offsetX;
      const secondY = rest[1] + offsetY;
      const endX = rest[2] + offsetX;
      const endY = rest[3] + offsetY;

      for (let step = 1; step <= curveSteps; step++) {
        const t = step / curveSteps;
        const u = 1 - t;
        lineTo(
          u * u * u * fromX + 3 * u * u * t * firstX + 3 * u * t * t * secondX + t * t * t * endX,
          u * u * u * fromY + 3 * u * u * t * firstY + 3 * u * t * t * secondY + t * t * t * endY,
        );
      }

      lastControl = [secondX, secondY];
    } else if (upper === 'Q' || upper === 'T') {
      const fromX = x;
      const fromY = y;
      const [controlX, controlY]: Point =
        upper === 'Q' ? [values[0] + offsetX, values[1] + offsetY] : lastControl && /[QqTt]/.test(lastCommand) ? [2 * x - lastControl[0], 2 * y - lastControl[1]] : [x, y];
      const endX = (upper === 'Q' ? values[2] : values[0]) + offsetX;
      const endY = (upper === 'Q' ? values[3] : values[1]) + offsetY;

      for (let step = 1; step <= curveSteps; step++) {
        const t = step / curveSteps;
        const u = 1 - t;
        lineTo(u * u * fromX + 2 * u * t * controlX + t * t * endX, u * u * fromY + 2 * u * t * controlY + t * t * endY);
      }

      lastControl = [controlX, controlY];
    } else if (upper === 'A') {
      const [radiusXValue, radiusYValue, rotation, largeArc, sweep] = values;
      const endX = values[5] + offsetX;
      const endY = values[6] + offsetY;
      let radiusX = Math.abs(radiusXValue);
      let radiusY = Math.abs(radiusYValue);

      if (radiusX === 0 || radiusY === 0) {
        lineTo(endX, endY);
      } else {
        // The endpoint arc of the SVG spec turned into its centre form, then walked in steps.
        const angle = (rotation * Math.PI) / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const halfX = (x - endX) / 2;
        const halfY = (y - endY) / 2;
        const primeX = cos * halfX + sin * halfY;
        const primeY = -sin * halfX + cos * halfY;
        const scale = (primeX * primeX) / (radiusX * radiusX) + (primeY * primeY) / (radiusY * radiusY);

        if (scale > 1) {
          radiusX *= Math.sqrt(scale);
          radiusY *= Math.sqrt(scale);
        }

        const numerator = radiusX * radiusX * radiusY * radiusY - radiusX * radiusX * primeY * primeY - radiusY * radiusY * primeX * primeX;
        const denominator = radiusX * radiusX * primeY * primeY + radiusY * radiusY * primeX * primeX;
        const factor = (largeArc === sweep ? -1 : 1) * Math.sqrt(Math.max(0, numerator / denominator));
        const centerPrimeX = (factor * radiusX * primeY) / radiusY;
        const centerPrimeY = (-factor * radiusY * primeX) / radiusX;
        const centerX = cos * centerPrimeX - sin * centerPrimeY + (x + endX) / 2;
        const centerY = sin * centerPrimeX + cos * centerPrimeY + (y + endY) / 2;
        const startAngle = Math.atan2((primeY - centerPrimeY) / radiusY, (primeX - centerPrimeX) / radiusX);
        let delta = Math.atan2((-primeY - centerPrimeY) / radiusY, (-primeX - centerPrimeX) / radiusX) - startAngle;

        if (sweep === 0 && delta > 0) {
          delta -= 2 * Math.PI;
        } else if (sweep === 1 && delta < 0) {
          delta += 2 * Math.PI;
        }

        const steps = Math.max(curveSteps, Math.ceil((Math.abs(delta) / Math.PI) * curveSteps));

        for (let step = 1; step <= steps; step++) {
          const theta = startAngle + (delta * step) / steps;
          const pointX = radiusX * Math.cos(theta);
          const pointY = radiusY * Math.sin(theta);
          lineTo(cos * pointX - sin * pointY + centerX, sin * pointX + cos * pointY + centerY);
        }
      }

      lastControl = null;
    } else if (upper === 'Z') {
      lineTo(startX, startY);
      subpaths.push(current);
      current = [[startX, startY]];
      lastControl = null;
    }

    lastCommand = command;
  }

  if (current.length > 1) {
    subpaths.push(current);
  }

  return subpaths;
};
