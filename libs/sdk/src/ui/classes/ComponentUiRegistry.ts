import type { ComponentUi } from '../../client/types/ComponentUi';

type AnyComponentUi = ComponentUi<unknown, unknown>;

// Component UIs are not part of the SDK bundle: each one is a script served by its package
// (/components/:type/ui.js) that calls registerComponentUi() when it runs. The <script> carries the
// type in data-type, which is how registerComponentUi() knows what it registers.
export class ComponentUiRegistry {
  private readonly uis = new Map<string, AnyComponentUi>();
  private readonly loads = new Map<string, Promise<AnyComponentUi>>();
  private readonly waiters = new Map<string, (ui: AnyComponentUi) => void>();

  // Arrow properties, because both are handed around unbound (window.__AWAITIO__.registerComponent, .map(load)).
  register = (type: string, ui: AnyComponentUi) => {
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

    const base = `/components/${encodeURIComponent(type)}`;
    const load = new Promise<AnyComponentUi>((resolve, reject) => {
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
          reject(new Error(`The UI script of ${type} did not register a component.`));
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
