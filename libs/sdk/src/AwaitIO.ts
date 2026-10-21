import { createServer, type Server } from 'http';
import { Action } from './classes/Action';
import { Page } from './classes/Page';
import { RunManager } from './classes/RunManager';
import { Sessions } from './classes/Sessions';
import { constants } from './constants';
import { createApp } from './http/createApp';
import type { ActionOptions } from './types/ActionOptions';
import type { ActionParamsSchema } from './types/ActionParamsSchema';
import type { AwaitIOEnvironment } from './types/AwaitIOEnvironment';
import type { AwaitIOListenArgs } from './types/AwaitIOListenArgs';
import type { AwaitIOOptions } from './types/AwaitIOOptions';
import type { AwaitIORoutes } from './types/AwaitIORoutes';
import type { ComponentRegistry } from './types/ComponentRegistry';
import type { ComponentTree } from './types/ComponentTree';
import type { IO } from './types/IO';
import type { LayoutRegistry } from './types/LayoutRegistry';
import type { LayoutTree } from './types/LayoutTree';
import type { PageIO } from './types/PageIO';
import type { PageOptions } from './types/PageOptions';
import type { ThemeScripts } from './types/ThemeScripts';
import { createComponentRegistry } from './utils/createComponentRegistry';
import { createLayoutRegistry } from './utils/createLayoutRegistry';
import { isPage } from './utils/isPage';
import { loadActionsDirectory } from './utils/loadActionsDirectory';
import { normalizeBasePath } from './utils/normalizeBasePath';
import { toThemeScripts } from './utils/toThemeScripts';
import { validateEnvironments } from './utils/validateEnvironments';
import { walkPages } from './utils/walkPages';
import { walkRoutes } from './utils/walkRoutes';

// The whole product in one object: component registry, action runtime, HTTP API and the UI.
// Components are fixed here so action files can import the instance and get a typed io from app.defineAction();
// the actions directory is loaded at listen() time, when the action files can import the finished instance.
type AwaitIOServeArgs = {
  routes: Record<string, AwaitIORoutes<unknown>[string] | Page<unknown>>;
  port: number;
  host?: string;
  basePath: string;
};

export class AwaitIO<T extends ComponentTree = Record<string, never>, L extends LayoutTree = Record<string, never>> {
  private readonly registry: ComponentRegistry;
  private readonly layoutRegistry: LayoutRegistry;
  private readonly sessions: Sessions;
  private readonly name: string;
  private readonly actionsDirectory: string;
  private readonly environments: AwaitIOEnvironment[];
  private readonly themeScripts: ThemeScripts;
  private running: { server: Server; manager: RunManager } | null = null;
  private isStarting = false;

  constructor({ name, actionsDirectory, environments = [], secret, users, components, layouts, theme }: AwaitIOOptions<T, L>) {
    if (name.trim().length === 0) {
      throw new Error('The name must not be empty.');
    }

    validateEnvironments({ environments });
    this.themeScripts = toThemeScripts({ theme });
    this.name = name.trim();
    this.actionsDirectory = actionsDirectory;
    this.environments = environments;
    this.sessions = new Sessions({ secret, users });
    this.registry = createComponentRegistry({ tree: components ?? {} });
    this.layoutRegistry = createLayoutRegistry({ tree: layouts ?? {} });
  }

  // Defines an action; export it from its own file in the actions folder, the file's path is its URL.
  defineAction<TSchema extends ActionParamsSchema | undefined = undefined>(options: ActionOptions<IO<T>, TSchema>) {
    return new Action<IO<T>, TSchema>(options);
  }

  // What a folder shows next to its actions; export it from the folder's index file. The handler returns a layout with
  // display components in it, io.layout.basic({ children: [io.display.table('Users', { data, columns })] }), or just the
  // display components; nothing is asked.
  definePage(options: PageOptions<PageIO<T, L>>) {
    return new Page<PageIO<T, L>>(options);
  }

  // Resolves once the port is open. Pass port 0 to get a free port (see server.address()).
  async listen({ port, host, basePath }: AwaitIOListenArgs) {
    if (this.running || this.isStarting) {
      throw new Error('This AwaitIO app is already listening.');
    }

    const normalizedBasePath = normalizeBasePath({ basePath });

    this.isStarting = true;

    try {
      return await this.serve({ routes: await loadActionsDirectory({ directory: this.actionsDirectory }), port, host, basePath: normalizedBasePath });
    } finally {
      this.isStarting = false;
    }
  }

  private serve({ routes, port, host, basePath }: AwaitIOServeArgs) {
    const manager = new RunManager({ registry: this.registry });
    const actionRoutes = Object.fromEntries(
      Object.entries(routes).filter(([, route]) => {
        return !isPage(route);
      }),
    ) as AwaitIORoutes<unknown>;
    const server = createServer(
      createApp({
        name: this.name,
        basePath,
        environments: this.environments,
        sessions: this.sessions,
        actions: walkRoutes({ routes: actionRoutes }),
        pages: walkPages({ routes }),
        manager,
        registry: this.registry,
        layoutRegistry: this.layoutRegistry,
        themeScripts: this.themeScripts,
      }),
    );
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
