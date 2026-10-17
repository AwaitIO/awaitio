export type EncodePathArgs = {
  path: string;
};

// Encodes each segment of a slug or folder path and keeps the slashes, so the URL stays readable.
export const encodePath = ({ path }: EncodePathArgs) => {
  return path.split('/').map(encodeURIComponent).join('/');
};
