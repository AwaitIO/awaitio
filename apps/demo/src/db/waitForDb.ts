import { constants } from '../constants';
import { sleep } from '../utils/sleep';

// How long a query to a real database might take.
export const waitForDb = () => {
  return sleep({ ms: constants.DB_MIN_LATENCY_MS + Math.random() * (constants.DB_MAX_LATENCY_MS - constants.DB_MIN_LATENCY_MS) });
};
