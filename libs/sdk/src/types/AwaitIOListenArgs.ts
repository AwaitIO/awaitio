import type { AwaitIORoutes } from './AwaitIORoutes';

export type AwaitIOListenArgs<TIO> = {
  routes: AwaitIORoutes<TIO>;
  port: number;
  // Interface to listen on. Defaults to 127.0.0.1, so only this machine can reach the server; pass '0.0.0.0'
  // (e.g. in Docker behind a reverse proxy) to accept connections from the network.
  host?: string;
};
