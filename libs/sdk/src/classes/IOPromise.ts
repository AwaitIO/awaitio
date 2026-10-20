import type { StepComponent } from '../shared/types/StepComponent';
import type { IOValidator } from '../types/IOValidator';
import type { StepRender } from '../types/StepRender';

export type IOPromiseOptions = {
  component: StepComponent;
  render: StepRender;
  // Stored without its type: .optional() widens T, and the validator only ever sees answers, never undefined.
  validator?: IOValidator<unknown>;
  // The component's toValue with the handler's props bound: the checked answer into what the handler gets.
  toValue?: (value: unknown) => unknown;
};

// What io.input.text() returns. Creating it sends nothing; the component is rendered only when the handler
// awaits it. That is what lets io.group() collect several of these and render them as one form.
// The value arrives already parsed by the component's `returns` schema on the server.
export class IOPromise<T> implements PromiseLike<T> {
  readonly component: StepComponent;
  private readonly render: StepRender;
  private readonly validator?: IOValidator<unknown>;
  private readonly toValue?: (value: unknown) => unknown;

  constructor({ component, render, validator, toValue }: IOPromiseOptions) {
    this.component = component;
    this.render = render;
    this.validator = validator;
    this.toValue = toValue;
  }

  // Lets the person leave the field empty: the handler gets undefined then, and the component's checks do not run.
  // Pass a condition to decide at run time: .optional(!user.isAdmin).
  optional(isOptional = true): IOPromise<T | undefined> {
    return new IOPromise<T | undefined>({ component: { ...this.component, optional: isOptional }, render: this.render, validator: this.validator, toValue: this.toValue });
  }

  // The handler's own check, on top of the component's: return a message to show under the field and ask again.
  // It runs on the server and may be async, e.g. to look the value up in the database.
  validate(validator: IOValidator<Exclude<T, undefined>>): IOPromise<T> {
    return new IOPromise<T>({ component: this.component, render: this.render, validator: validator as IOValidator<unknown>, toValue: this.toValue });
  }

  // What the handler gets for the answer the components accepted; an optional field left empty stays undefined.
  toHandlerValue(value: unknown): unknown {
    return value === undefined || !this.toValue ? value : this.toValue(value);
  }

  // An optional field left empty, a disabled field and a display component give no answer, so there is nothing to check.
  // The validator sees the value the handler would get.
  async check(value: unknown): Promise<string | null> {
    if (!this.validator || value === undefined || this.component.disabled || this.component.display) {
      return null;
    }

    return (await this.validator(this.toHandlerValue(value))) ?? null;
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    return this.render([this.component], async ([value]) => {
      return { errors: [await this.check(value)], message: null };
    })
      .then(([value]) => {
        return this.toHandlerValue(value) as T;
      })
      .then(onfulfilled, onrejected);
  }
}
