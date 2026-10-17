export type AwaitIOListenArgs = {
  // Absolute path of the folder with the action files: one app.action(...) per file, folders become groups.
  // e.g. path.join(__dirname, 'actions').
  actionsDirectory: string;
  port: number;
  // Interface to listen on. Defaults to 127.0.0.1, so only this machine can reach the server; pass '0.0.0.0'
  // (e.g. in Docker behind a reverse proxy) to accept connections from the network.
  host?: string;
};
