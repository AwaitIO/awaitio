import type { IOPromise } from './IOPromise';
import type { IOValidator } from '../types/IOValidator';
import type { StepRender } from '../types/StepRender';

export type IOGroupPromiseOptions<T> = {
  promises: Record<string, IOPromise<unknown>>;
  render: StepRender;
  validator?: IOValidator<T>;
};

// What io.group() returns: its components as one form, answered together as an object under the same keys.
export class IOGroupPromise<T> implements PromiseLike<T> {
  private readonly promises: Record<string, IOPromise<unknown>>;
  private readonly render: StepRender;
  private readonly validator?: IOValidator<T>;

  constructor({ promises, render, validator }: IOGroupPromiseOptions<T>) {
    this.promises = promises;
    this.render = render;
    this.validator = validator;
  }

  // A check across fields, e.g. an end date after the start date. Its message shows above Continue, not under one field,
  // and it runs only once every field passed its own checks.
  validate(validator: IOValidator<T>): IOGroupPromise<T> {
    return new IOGroupPromise<T>({ promises: this.promises, render: this.render, validator });
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    const keys = Object.keys(this.promises);
    const promises = keys.map((key) => {
      return this.promises[key];
    });
    const toGroupValues = (values: unknown[]) => {
      return Object.fromEntries(
        keys.map((key, index) => {
          return [key, values[index]];
        }),
      ) as T;
    };

    return this.render(
      promises.map((promise) => {
        return promise.component;
      }),
      async (values) => {
        const errors = await Promise.all(
          promises.map((promise, index) => {
            return promise.check(values[index]);
          }),
        );

        if (
          !this.validator ||
          errors.some((error) => {
            return error !== null;
          })
        ) {
          return { errors, message: null };
        }

        return { errors, message: (await this.validator(toGroupValues(values))) ?? null };
      },
    )
      .then(toGroupValues)
      .then(onfulfilled, onrejected);
  }
}
