export type DecodePathArgs = {
  path: string;
};

// The reverse of encodePath: decodes each segment of a slug or folder path and keeps the slashes.
export const decodePath = ({ path }: DecodePathArgs) => {
  return path.split('/').map(decodeURIComponent).join('/');
};
