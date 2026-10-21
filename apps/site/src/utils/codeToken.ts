import { codeColors } from './codeColors';
import type { CodeToken } from '../types/CodeToken';

export const codeToken = (text: string, className: string = codeColors.plain): CodeToken => {
  return { text, className };
};
