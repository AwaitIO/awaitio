import { isPlainObject } from './isPlainObject';

export const isRowList = (value: unknown): value is Record<string, unknown>[] => {
  return Array.isArray(value) && value.length > 0 && value.every(isPlainObject);
};
