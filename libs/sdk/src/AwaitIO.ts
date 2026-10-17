import { createServer, type Server } from 'http';
import { Action } from './classes/Action';
import { RunManager } from './classes/RunManager';
import { Sessions } from './classes/Sessions';
import { constants } from './constants';
import { createApp } from './http/createApp';
import type { ActionOptions } from './types/ActionOptions';
import type { AwaitIOEnvironment } from './types/AwaitIOEnvironment';
import type { AwaitIOListenArgs } from './types/AwaitIOListenArgs';
import type { AwaitIOOptions } from './types/AwaitIOOptions';
import type { ComponentRegistry } from './types/ComponentRegistry';
import type { ComponentTree } from './types/ComponentTree';
import type { IO } from './types/IO';
import { createComponentRegistry } from './utils/createComponentRegistry';
import { validateEnvironments } from './utils/validateEnvironments';
import { walkRoutes } from './utils/walkRoutes';

// The whole product in one object: component registry, action runtime, HTTP API and the UI.
// Components are fixed here so action files can import the instance and get a typed io from app.action();
// routes come at listen() time, after all action files are loaded.
export class AwaitIO<T extends ComponentTree = Record<string, never>> {
  private readonly registry: ComponentRegistry;
  private readonly sessions: Sessions;
  private readonly name: string;
  private readonly environments: AwaitIOEnvironment[];
  private running: { server: Server; manager: RunManager } | null = null;

  constructor({ name, environments = [], secret, users, components }: AwaitIOOptions<T>) {
    if (name.trim().length === 0) {
      throw new Error('The name must not be empty.');
    }

    validateEnvironments({ environments });
    this.name = name.trim();
    this.environments = environments;
    this.sessions = new Sessions({ secret, users });
    this.registry = createComponentRegistry({ tree: components ?? {} });
  }

  action(options: ActionOptions<IO<T>>) {
    return new Action(options);
  }

  // Resolves once the port is open. Pass port 0 to get a free port (see server.address()).
  listen({ routes, port, host }: AwaitIOListenArgs<IO<T>>) {
    if (this.running) {
      throw new Error('This AwaitIO app is already listening.');
    }

    const manager = new RunManager({ registry: this.registry });
    const server = createServer(createApp({ name: this.name, environments: this.environments, sessions: this.sessions, actions: walkRoutes({ routes }), manager, registry: this.registry }));
    const running = { server, manager };
    this.running = running;

    return new Promise<Server>((resolve, reject) => {
      // A port that is already taken must not leave the instance half started: listen() can be tried again.
      const fail = (error: Error) => {
        manager.close();

        if (this.running === running) {
          this.running = null;
        }

        reject(error);
      };

      server.once('error', fail);
      server.listen(port, host ?? constants.DEFAULT_HOST, () => {
        server.off('error', fail);
        resolve(server);
      });
    });
  }

  close() {
    const running = this.running;
    this.running = null;

    if (!running) {
      return Promise.resolve();
    }

    running.manager.close();
    // Open SSE streams would otherwise keep the server alive.
    running.server.closeAllConnections();

    return new Promise<void>((resolve, reject) => {
      running.server.close((error) => {
        // Closing before the port was bound (listen still resolving the host) is still a successful close.
        if (error && (error as NodeJS.ErrnoException).code !== 'ERR_SERVER_NOT_RUNNING') {
          return reject(error);
        }

        return resolve();
      });
    });
  }
}
