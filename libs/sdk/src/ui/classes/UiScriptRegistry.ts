import { withBasePath } from '../../uikit/withBasePath';

export type UiScriptRegistryArgs = {
  // Where the scripts are served: /components/:type/ui.js, /layouts/:type/ui.js or /themes/:index/ui.js.
  kind: 'components' | 'layouts' | 'themes';
};

// Component and layout UIs are not part of the SDK bundle: each one is a script served by its package
// (/components/:type/ui.js, /layouts/:type/ui.js) that calls registerComponentUi() or registerLayoutUi() when it runs.
// The <script> carries the type in data-type, which is how the script knows what it registers.
export class UiScriptRegistry<TUi> {
  private readonly kind: UiScriptRegistryArgs['kind'];
  private readonly uis = new Map<string, TUi>();
  private readonly loads = new Map<string, Promise<TUi>>();
  private readonly waiters = new Map<string, (ui: TUi) => void>();

  constructor({ kind }: UiScriptRegistryArgs) {
    this.kind = kind;
  }

  // Arrow properties, because both are handed around unbound (window.__AWAITIO__.registerComponent, .map(load)).
  register = (type: string, ui: TUi) => {
    this.uis.set(type, ui);
    this.waiters.get(type)?.(ui);
    this.waiters.delete(type);
  };

  load = (type: string) => {
    const registered = this.uis.get(type);

    if (registered) {
      return Promise.resolve(registered);
    }

    const pending = this.loads.get(type);

    if (pending) {
      return pending;
    }

    const base = withBasePath(`/${this.kind}/${encodeURIComponent(type)}`);
    const load = new Promise<TUi>((resolve, reject) => {
      this.waiters.set(type, resolve);

      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = `${base}/ui.css`;
      document.head.append(style);

      const script = document.createElement('script');
      script.src = `${base}/ui.js`;
      script.dataset.type = type;
      script.addEventListener('load', () => {
        // A script that loads but does not register itself would leave the form waiting forever.
        if (!this.uis.has(type)) {
          reject(new Error(`The UI script of ${type} did not register itself.`));
        }
      });
      script.addEventListener('error', () => {
        reject(new Error(`The UI of ${type} could not be loaded.`));
      });
      document.head.append(script);
    });

    load.catch(() => {
      this.loads.delete(type);
      this.waiters.delete(type);
    });
    this.loads.set(type, load);

    return load;
  };
}
