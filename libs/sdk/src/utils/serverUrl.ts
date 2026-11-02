export type ServerUrlArgs = {
  host: string;
  port: number;
  basePath: string;
};

// The address to open in a browser: a loopback or wildcard host is reachable as localhost.
export const serverUrl = ({ host, port, basePath }: ServerUrlArgs) => {
  return `http://${host === '127.0.0.1' || host === '0.0.0.0' ? 'localhost' : host}:${port}${basePath}`;
};
