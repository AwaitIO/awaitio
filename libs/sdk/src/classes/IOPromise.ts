import type { StepComponent } from '../shared/types/StepComponent';

export type IOPromiseOptions = {
  component: StepComponent;
  render: (components: StepComponent[]) => Promise<unknown[]>;
};

// What io.input.text() returns. Creating it sends nothing; the component is rendered only when the handler
// awaits it. That is what lets io.group() collect several of these and render them as one form.
// The value arrives already parsed by the component's `returns` schema on the server.
export class IOPromise<T> implements PromiseLike<T> {
  readonly component: StepComponent;
  private readonly render: (components: StepComponent[]) => Promise<unknown[]>;

  constructor({ component, render }: IOPromiseOptions) {
    this.component = component;
    this.render = render;
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    return this.render([this.component])
      .then(([value]) => {
        return value as T;
      })
      .then(onfulfilled, onrejected);
  }
}
