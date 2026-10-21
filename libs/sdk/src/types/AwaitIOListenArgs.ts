export type AwaitIOListenArgs = {
  port: number;
  // Interface to listen on. Defaults to 127.0.0.1, so only this machine can reach the server; pass '0.0.0.0'
  // (e.g. in Docker behind a reverse proxy) to accept connections from the network.
  host?: string;
  // The path AwaitIO is served under when it shares a domain with another app, e.g. '/backoffice' for
  // example.com/backoffice. The UI, the API and the session cookie all live under it. Defaults to the root.
  basePath?: string;
};
